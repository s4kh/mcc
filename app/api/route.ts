import "dotenv/config";
import { db } from "@/db";
import { merchantCategories, merchants } from "@/db/schema";
import { and, eq, ilike, SQL } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { RateLimitError } from "../components/types";
import rateLimit from "./rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function POST(req: NextRequest) {
  const schema = z.object({
    mcc: z.string().min(4),
    merchantName: z.string().min(1),
    location: z.string().optional(),
    cardType: z.enum(["visa", "mastercard", "amex", "other", "discover"]),
    cardName: z.string().min(4),
  });

  try {
    const ip = req.headers.get("x-forwarded-for");
    await limiter.check(10, ip || "CACHE_TOKEN");
    const body = await req.json();

    const captchaToken = body.token;
    const captchResp = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${process.env.CAPTCHA_SECRET}&response=${captchaToken}s`,
      }
    );
    if (captchResp.ok) {
      const captchBody = await captchResp.json();
      if (!captchBody.success) {
        return NextResponse.json(
          {
            errors: {
              captcha:
                "We couldn't verify that you're a human. Please refresh the page and try again.",
            },
          },
          { status: 400 }
        );
      }
    }

    const data = schema.parse({
      mcc: body.mcc,
      merchantName: body.merchantName,
      location: body.location,
      cardType: body.cardType,
      cardName: body.cardUsed,
    });

    const dbData = await db.transaction(async (tx) => {
      let merchant = await tx
        .select()
        .from(merchants)
        .where(and(eq(merchants.name, data.merchantName)))
        .limit(1);
      if (merchant.length === 0) {
        merchant = await tx
          .insert(merchants)
          .values({
            name: data.merchantName,
            location: data.location,
          })
          .returning();
      }
      const [mapping] = await tx
        .insert(merchantCategories)
        .values({
          cardType: data.cardType,
          cardName: data.cardName,
          mcc: data.mcc,
          merchantId: merchant[0].id,
        })
        .onConflictDoUpdate({
          target: [merchantCategories.merchantId, merchantCategories.cardType],
          set: {
            mcc: data.mcc,
          },
        })
        .returning();

      return {
        ...merchant[0],
        merchantCategories: mapping,
      };
    });

    return NextResponse.json(
      {
        message:
          "Thank you for your contribution. We have submitted your record.",
        data: dbData,
      },
      { status: 201 }
    );
  } catch (e) {
    if (e instanceof z.ZodError) {
      // Return validation errors
      return NextResponse.json(
        {
          errors: e.errors.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          }, {} as { [key: string]: string }),
        },
        { status: 400 }
      );
    }
    if (e instanceof RateLimitError) {
      return NextResponse.json({ error: e.message }, { status: e.statusCode });
    }
    console.log(e);
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
        error: e instanceof Error ? e.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for");
    await limiter.check(10, ip || "CACHE_TOKEN");
    const searchParams = req.nextUrl.searchParams;
    const name = searchParams.get("name");
    const filters: SQL[] = [];
    if (name) {
      filters.push(ilike(merchants.name, `%${name}%`));
    }
    const page = parseInt(searchParams.get("page") || "1", 10) || 1;
    let pageSize = parseInt(searchParams.get("pageSize") || "1", 10) || 10;
    if (pageSize > 10) {
      pageSize = 2;
    }

    const data = await db.query.merchants.findMany({
      with: {
        categories: true,
      },
      where: and(...filters),
      orderBy: (merchants, { desc }) => desc(merchants.updatedAt),
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });

    return NextResponse.json({ data });
  } catch (err) {
    if (err instanceof RateLimitError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }
    console.log(err);
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}

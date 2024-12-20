import { db } from "@/db";
import { merchantCategories, merchants } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: NextRequest) {
  try {
    const schema = z.object({
      merchantId: z.number(),
      merchantCatId: z.number(),
      status: z.enum(["pending", "published"]),
    });
    const body = await req.json();

    const data = schema.parse({
      merchantId: body.id,
      merchantCatId: body.merchantCatId,
      status: body.status,
    });
    await db.transaction(async (tx) => {
      const merchant = await tx
        .update(merchants)
        .set({
          status: data.status,
        })
        .from(merchants)
        .where(and(eq(merchants.id, data.merchantId)))
        .returning();
      const [mapping] = await tx
        .update(merchantCategories)
        .set({
          status: data.status,
        })
        .where(eq(merchantCategories.id, data.merchantCatId))
        .returning();

      return {
        ...merchant[0],
        merchantCategories: mapping,
      };
    });
    return NextResponse.json({}, { status: 204 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Return validation errors
      return NextResponse.json(
        {
          errors: err.errors.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          }, {} as { [key: string]: string }),
        },
        { status: 400 }
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

export async function POST(req: NextRequest) {
  try {
    const schema = z.object({
      mcc: z.string().min(4),
      merchantName: z.string().min(1),
      location: z.string().optional(),
      cardType: z.enum(["visa", "mastercard", "amex", "other", "discover"]),
      cardName: z.string().min(4),
    });
    const body = await req.json();

    const data = schema.parse({
      mcc: body.mcc,
      merchantName: body.merchantName,
      location: body.location,
      cardType: body.cardType,
      cardName: body.cardUsed,
    });

    const dbData = await db.transaction(async (tx) => {
      const merchant = await tx
        .update(merchants)
        .set({
          name: body.merchantName,
          location: body.location,
        })
        .from(merchants)
        .where(and(eq(merchants.name, data.merchantName)))
        .returning();
      const [mapping] = await tx
        .update(merchantCategories)
        .set({
          cardType: data.cardType,
          cardName: data.cardName,
          mcc: data.mcc,
        })
        .where(eq(merchantCategories.merchantId, merchant[0].id))
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
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      // Return validation errors
      return NextResponse.json(
        {
          errors: err.errors.reduce((acc, curr) => {
            acc[curr.path[0]] = curr.message;
            return acc;
          }, {} as { [key: string]: string }),
        },
        { status: 400 }
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

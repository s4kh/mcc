import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  unique,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", ["pending", "published"]);

export const merchants = pgTable("merchants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  location: varchar("location", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  status: statusEnum().default("pending"),
});

export const merchantCategories = pgTable(
  "merchant_categories",
  {
    id: serial("id").primaryKey(),
    merchantId: integer("merchant_id").references(() => merchants.id),
    mcc: varchar("mcc", { length: 4 }),
    cardType: varchar("card_type", { length: 10 }),
    cardName: varchar("card_name", { length: 80 }),
    count: integer("count"),
    status: statusEnum().default("pending"),
  },
  (table) => ({
    unqiueMerchantIssuer: unique().on(table.merchantId, table.cardType),
  })
);

export const merchantRelations = relations(merchants, ({ many }) => ({
  categories: many(merchantCategories),
}));

export const merchantCatRelation = relations(merchantCategories, ({ one }) => ({
  merchant: one(merchants, {
    fields: [merchantCategories.merchantId],
    references: [merchants.id],
  }),
}));

import { InferModel } from "drizzle-orm";
import { pgTable, varchar, integer, serial, PgDatabase } from "drizzle-orm/pg-core";

export const cartTable = pgTable("cart", {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", {length: 255,}).notNull(),
    product_id: varchar("product_id", {length: 255,}).notNull(),
    quantity: integer("quantity").notNull(),
    price: integer("price")
  });
  
  export type Cart  = InferModel<typeof cartTable>;
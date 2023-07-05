import { sql } from '@vercel/postgres';
import {pgTable, varchar, integer, serial} from 'drizzle-orm/pg-core';
import {drizzle} from "drizzle-orm/vercel-postgres";

// import { PostgresConnector } from '@drizzle-orm/postgres';

// export const drizzle = new Drizzle({
//   connector: new PostgresConnector({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   }),
// });


export const cartTable = pgTable("cart",{
    id: serial("id").primaryKey(),
    user_id: varchar("user_id",{
        length: 255
    }).notNull(),
    product_id: varchar("product_id", {
        length:255
    }).notNull(),
    quantity: integer("quantity").notNull()

});

export const db = drizzle(sql);

export { drizzle };


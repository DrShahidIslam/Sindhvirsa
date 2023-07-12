import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import {cartTable, Cart} from "./schema";


export const db  = drizzle<Cart>(sql);

export { drizzle };
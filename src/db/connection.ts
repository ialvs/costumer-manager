import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
    host: `${process.env.DB_HOST}`,
    port: process.env.DB_PORT as number | undefined,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_DATABASE}`,
});

export const db = drizzle(pool);

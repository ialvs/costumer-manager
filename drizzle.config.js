/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./src/db/schema.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        host: `${process.env.DB_HOST}`,
        port: `${process.env.DB_PORT}`,
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        database: `${process.env.DB_DATABASE}`,
    },
};

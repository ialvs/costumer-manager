import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./connection";

const runMigration = async () => {
    await migrate(db, { migrationsFolder: "drizzle" });
};

runMigration();

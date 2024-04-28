import {
    pgTable,
    text,
    integer,
    uuid,
    date,
    smallserial,
    timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid("id")
        .default(sql`gen_random_uuid()`)
        .primaryKey()
        .notNull(),
    name: text("name").notNull(),
    phone: text("phone"),
    email: text("email").notNull().unique(),
    birthDate: date("birthDate").notNull(),
    rg: text("rg"),
    cpf: text("cpf").unique(),
    password: text("password").notNull(),
    login: text("login").notNull().unique(),
    createdAt: timestamp("created_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" }),

    userRole: smallserial("user_role")
        .notNull()
        .references(() => roles.id, { onDelete: "no action" }),
});

export const cards = pgTable("cards", {
    id: uuid("id")
        .default(sql`gen_random_uuid()`)
        .primaryKey()
        .notNull(),
    type: text("text").notNull(),
    number: text("number").notNull(),
    cvv: text("cvv").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" }),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
});

export const associativePlans = pgTable("associative_plans", {
    id: smallserial("id").notNull().primaryKey(),
    plan: text("plan").notNull().unique(),
    createdAt: timestamp("created_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" }),
});

export const address = pgTable("address", {
    id: uuid("id")
        .default(sql`gen_random_uuid()`)
        .primaryKey()
        .notNull(),
    cep: text("cep").notNull(),
    number: text("number"),
    address: text("address").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" }),
    userId: uuid("userID")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
});

export const roles = pgTable("roles", {
    id: smallserial("id").notNull().primaryKey(),
    role: text("role").notNull().unique(),
    createdAt: timestamp("created_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" }),
});

export const sales = pgTable("sales", {
    id: uuid("id")
        .default(sql`gen_random_uuid()`)
        .primaryKey()
        .notNull(),
    createdAt: timestamp("created_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" }),
    value: integer("value").notNull(),
    saleStatus: smallserial("sale_status").references(() => saleStatus.id),
    salerId: uuid("saler_id")
        .notNull()
        .references(() => users.id),
    costumerId: uuid("costumer_id")
        .notNull()
        .references(() => users.id),
    planId: smallserial("plan_id")
        .notNull()
        .references(() => associativePlans.id),
    paymentCard: uuid("payment_card")
        .notNull()
        .references(() => cards.id),
});

export const saleStatus = pgTable("sale_status", {
    id: smallserial("id").primaryKey().notNull(),
    status: text("status").notNull().unique(),
    createdAt: timestamp("created_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" }),
});

export const documents = pgTable("documents", {
    id: uuid("id")
        .default(sql`gen_random_uuid()`)
        .primaryKey()
        .notNull(),
    name: text("name").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" }),
    documentUser: uuid("document_user")
        .notNull()
        .references(() => users.id),
    documentType: smallserial("document_type")
        .notNull()
        .references(() => documentType.id),
});

export const documentType = pgTable("document_type", {
    id: smallserial("id").notNull().primaryKey(),
    type: text("type").notNull().unique(),
    createdAt: timestamp("created_at", { mode: "date" }),
    updatedAt: timestamp("updated_at", { mode: "date" }),
});

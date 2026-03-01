import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

/**
 * Create postgres client
 * ssl required for Neon
 */
const client = postgres(connectionString, {
  ssl: "require",
});

/**
 * Create drizzle instance with full schema typing
 */
export const db = drizzle(client, {
  schema,
});

/**
 * Export types for usage in routers
 */
export type DB = typeof db;

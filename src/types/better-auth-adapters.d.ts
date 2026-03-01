// For the drizzle adapter
declare module "better-auth/adapters/drizzle" {
  import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

  export function drizzleAdapter(
    db: PostgresJsDatabase<any>,
    options?: { provider: "pg" | "mysql" }
  ): any;
}
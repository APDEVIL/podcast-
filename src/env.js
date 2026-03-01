import { z } from "zod";

/**
 * Environment variables validation
 * Used across server only
 */
export const env = z
  .object({
    // Database
    DATABASE_URL: z.string().url(),

    // App
    NODE_ENV: z.enum(["development", "test", "production"]),
    NEXT_PUBLIC_APP_URL: z.string().url(),

    // Better Auth
    BETTER_AUTH_SECRET: z.string(),

    BETTER_AUTH_GITHUB_CLIENT_ID: z.string(),
    BETTER_AUTH_GITHUB_CLIENT_SECRET: z.string(),

    BETTER_AUTH_GOOGLE_CLIENT_ID: z.string().optional(),
    BETTER_AUTH_GOOGLE_CLIENT_SECRET: z.string().optional(),
  })
  .parse(process.env);

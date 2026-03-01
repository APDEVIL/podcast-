import "server-only";
import { cache } from "react";
import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

/**
 * Cached tRPC context for Server Components
 */
const createContext = cache(async () => {
  return createTRPCContext();
});

/**
 * Server-side tRPC caller
 */
export const serverApi = async () => {
  const ctx = await createContext();
  return appRouter.createCaller(ctx);
};

import { createTRPCRouter, protectedProcedure } from "../trpc";

/**
 * AUTH ROUTER (tRPC-level helpers)
 *
 * IMPORTANT:
 * - Does NOT handle login/signup (Better-Auth does that)
 * - Only exposes auth/session info to frontend
 */

export const authRouter = createTRPCRouter({
  /**
   * Get current session user (auth + db)
   */
  getSession: protectedProcedure.query(({ ctx }) => {
    return {
      authUser: ctx.authUser,
      dbUser: ctx.dbUser,
    };
  }),

  /**
   * Simple auth check
   */
  isAuthenticated: protectedProcedure.query(() => {
    return { authenticated: true };
  }),
});

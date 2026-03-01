import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { users } from "@/server/db/schema";

/**
 * USER ROUTER
 * Roles:
 * - USER
 * - HOST
 * - ADMIN
 *
 * Purpose:
 * - Fetch current user profile
 * - Update own profile
 */

export const userRouter = createTRPCRouter({
  /**
   * Get current logged-in user's profile
   */
  me: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.dbUser) {
      throw new Error("Unauthorized");
    }

    return ctx.dbUser;
  }),

  /**
   * Update my profile
   */
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).optional(),
        image: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.dbUser) {
        throw new Error("Unauthorized");
      }

      await ctx.db
        .update(users)
        .set({
          ...(input.name !== undefined && { name: input.name }),
          ...(input.image !== undefined && { image: input.image }),
        })
        .where(eq(users.id, ctx.dbUser.id));

      return { success: true };
    }),
});

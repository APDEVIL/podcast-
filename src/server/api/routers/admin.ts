import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import {
  users,
  listings,
  bookings,
  reviews,
} from "@/server/db/schema";

/**
 * ADMIN ROUTER
 * Role: ADMIN only
 */

const adminOnly = protectedProcedure.use(({ ctx, next }) => {
  if (!ctx.dbUser || ctx.dbUser.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  return next();
});

export const adminRouter = createTRPCRouter({
  /**
   * USERS
   */
  getAllUsers: adminOnly.query(({ ctx }) => {
    return ctx.db.select().from(users);
  }),

  /**
   * LISTINGS
   */
  getAllListings: adminOnly.query(({ ctx }) => {
    return ctx.db.select().from(listings);
  }),

  /**
   * Activate / Deactivate listing
   */
  toggleListingStatus: adminOnly
    .input(
      z.object({
        listingId: z.string().uuid(),
        isActive: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(listings)
        .set({ isActive: input.isActive })
        .where(eq(listings.id, input.listingId));

      return { success: true };
    }),

  /**
   * BOOKINGS (read-only)
   */
  getAllBookings: adminOnly.query(({ ctx }) => {
    return ctx.db.select().from(bookings);
  }),

  /**
   * REVIEWS (read-only / moderation-ready)
   */
  getAllReviews: adminOnly.query(({ ctx }) => {
    return ctx.db.select().from(reviews);
  }),

  /**
   * Remove review
   */
  deleteReview: adminOnly
    .input(
      z.object({
        reviewId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(reviews)
        .where(eq(reviews.id, input.reviewId));

      return { success: true };
    }),
});

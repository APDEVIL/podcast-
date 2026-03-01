// src/server/api/routers/review.ts
import { z } from "zod";
import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { db } from "../../db";
import { reviews, bookings } from "../../db/schema";

export const reviewRouter = createTRPCRouter({
  // ===============================
  // CREATE REVIEW
  // ===============================
  create: protectedProcedure
    .input(
      z.object({
        bookingId: z.string(),
        rating: z.number().min(1).max(5),
        comment: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.dbUser.role !== "USER") {
        throw new Error("Unauthorized");
      }

      // Find the booking
      const booking = await ctx.db.query.bookings.findFirst({
        where: eq(bookings.id, input.bookingId),
      });

      if (!booking || booking.userId !== ctx.dbUser.id) {
        throw new Error("Unauthorized");
      }

      // Insert review
      const [createdReview] = await ctx.db
        .insert(reviews)
        .values({
          bookingId: input.bookingId,
          rating: input.rating,
          comment: input.comment ?? null,
        })
        .returning();

      return createdReview;
    }),

  // ===============================
  // GET REVIEWS BY LISTING
  // ===============================
  byListing: protectedProcedure
    .input(z.object({ listingId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db
        .select({
          id: reviews.id,
          bookingId: reviews.bookingId,
          rating: reviews.rating,
          comment: reviews.comment,
          createdAt: reviews.createdAt,
          updatedAt: reviews.updatedAt,
        })
        .from(reviews)
        .innerJoin(bookings, eq(reviews.bookingId, bookings.id))
        .where(eq(bookings.listingId, input.listingId));
    }),

  // ===============================
  // GET ALL REVIEWS (FOR HOMEPAGE)
  // ===============================
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.reviews.findMany();
  }),
});
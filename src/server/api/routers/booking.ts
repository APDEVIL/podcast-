// src/server/api/routers/booking.ts
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { bookings, listings } from "@/server/db/schema";
import type { Booking } from "@/types/booking";

export const bookingRouter = createTRPCRouter({
  // ==================================
  // USER: MY BOOKINGS (GET)
  // ==================================
  myBookings: protectedProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db
      .select()
      .from(bookings)
      .innerJoin(listings, eq(bookings.listingId, listings.id))
      .where(eq(bookings.userId, ctx.dbUser.id));

    const result: Booking[] = rows.map((row) => ({
      id: row.bookings.id,
      userId: row.bookings.userId,
      status: row.bookings.status,
      createdAt: row.bookings.createdAt,
      listing: {
        id: row.listings.id,
        hostId: row.listings.hostId,
        title: row.listings.title,
        description: row.listings.description,
        category: row.listings.category,
        price: row.listings.price,
        isActive: row.listings.isActive,
        createdAt: row.listings.createdAt,
      },
    }));

    return result;
  }),

  // ==================================
  // HOST: BOOKINGS ON MY LISTINGS (GET)
  // ==================================
  hostBookings: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.dbUser.role !== "HOST") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    const rows = await ctx.db
      .select()
      .from(bookings)
      .innerJoin(listings, eq(bookings.listingId, listings.id))
      .where(eq(listings.hostId, ctx.dbUser.id));

    const result: Booking[] = rows.map((row) => ({
      id: row.bookings.id,
      userId: row.bookings.userId,
      status: row.bookings.status,
      createdAt: row.bookings.createdAt,
      listing: {
        id: row.listings.id,
        hostId: row.listings.hostId,
        title: row.listings.title,
        description: row.listings.description,
        category: row.listings.category,
        price: row.listings.price,
        isActive: row.listings.isActive,
        createdAt: row.listings.createdAt,
      },
    }));

    return result;
  }),

  // ==================================
  // Mutations (leave as-is)
  // ==================================
  create: protectedProcedure
    .input(z.object({ listingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.dbUser.role !== "USER") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Only users can create bookings" });
      }

      const listing = await ctx.db.query.listings.findFirst({
        where: eq(listings.id, input.listingId),
      });

      if (!listing || !listing.isActive) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Listing not available" });
      }

      const [booking] = await ctx.db
        .insert(bookings)
        .values({ listingId: input.listingId, userId: ctx.dbUser.id, status: "PENDING" })
        .returning();

      return booking;
    }),

  updateStatus: protectedProcedure
    .input(z.object({ bookingId: z.string(), status: z.enum(["CONFIRMED", "CANCELLED"]) }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.dbUser.role !== "HOST") throw new TRPCError({ code: "FORBIDDEN" });

      const booking = await ctx.db.query.bookings.findFirst({
        where: eq(bookings.id, input.bookingId),
      });
      if (!booking) throw new TRPCError({ code: "NOT_FOUND" });

      const listing = await ctx.db.query.listings.findFirst({
        where: eq(listings.id, booking.listingId),
      });
      if (!listing || listing.hostId !== ctx.dbUser.id) throw new TRPCError({ code: "FORBIDDEN" });

      const [updated] = await ctx.db
        .update(bookings)
        .set({ status: input.status })
        .where(eq(bookings.id, input.bookingId))
        .returning();

      return updated;
    }),

  cancel: protectedProcedure
    .input(z.object({ bookingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.query.bookings.findFirst({
        where: and(eq(bookings.id, input.bookingId), eq(bookings.userId, ctx.dbUser.id)),
      });
      if (!booking) throw new TRPCError({ code: "NOT_FOUND" });

      const [updated] = await ctx.db
        .update(bookings)
        .set({ status: "CANCELLED" })
        .where(eq(bookings.id, input.bookingId))
        .returning();

      return updated;
    }),
});
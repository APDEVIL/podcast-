import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { eq, and, ilike } from "drizzle-orm";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { listings } from "@/server/db/schema";

export const listingRouter = createTRPCRouter({
  // ===============================
  // CREATE LISTING (POSTMAN MODE)
  // ===============================
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        category: z.string().min(2),
        price: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      /**
       * AUTH BYPASSED TEMPORARILY
       * ctx.dbUser is still guaranteed by protectedProcedure
       */

      const [listing] = await ctx.db
        .insert(listings)
        .values({
          hostId: ctx.dbUser.id, // first user in DB
          title: input.title,
          description: input.description,
          category: input.category,
          price: input.price,
          isActive: true,
        })
        .returning();

      return listing;
    }),

  // ===============================
  // UPDATE LISTING (OWNER ONLY)
  // ===============================
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.string().optional(),
        price: z.string().optional(),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existing = await ctx.db.query.listings.findFirst({
        where: eq(listings.id, input.id),
      });

      if (!existing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (existing.hostId !== ctx.dbUser.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const { id, ...data } = input;

      const [updated] = await ctx.db
        .update(listings)
        .set(data)
        .where(eq(listings.id, id))
        .returning();

      return updated;
    }),

  // ===============================
  // DELETE LISTING (HOST / ADMIN)
  // ===============================
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const listing = await ctx.db.query.listings.findFirst({
        where: eq(listings.id, input.id),
      });

      if (!listing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (
        listing.hostId !== ctx.dbUser.id &&
        ctx.dbUser.role !== "ADMIN"
      ) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await ctx.db.delete(listings).where(eq(listings.id, input.id));

      return { success: true };
    }),

  // ===============================
  // GET ALL ACTIVE LISTINGS
  // ===============================
  getAll: publicProcedure
    .input(
      z
        .object({
          search: z.string().optional(),
          category: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const conditions = [];

      if (input?.search) {
        conditions.push(ilike(listings.title, `%${input.search}%`));
      }

      if (input?.category) {
        conditions.push(eq(listings.category, input.category));
      }

      return ctx.db.query.listings.findMany({
        where: and(eq(listings.isActive, true), ...conditions),
      });
    }),

  // ===============================
  // GET LISTING BY ID
  // ===============================
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const listing = await ctx.db.query.listings.findFirst({
        where: eq(listings.id, input.id),
      });

      if (!listing) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return listing;
    }),
});
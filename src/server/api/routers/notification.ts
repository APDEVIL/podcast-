import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { notifications } from "@/server/db/schema";

/**
 * NOTIFICATION ROUTER
 * Roles:
 * - USER
 * - HOST
 * - ADMIN
 *
 * Notifications are role-agnostic.
 */

export const notificationRouter = createTRPCRouter({
  /**
   * Get my notifications
   */
  getMyNotifications: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.dbUser) {
      throw new Error("Unauthorized");
    }

    // Select all fields including updatedAt
    return ctx.db
      .select({
        id: notifications.id,
        userId: notifications.userId,
        message: notifications.message,
        isRead: notifications.isRead,
        createdAt: notifications.createdAt,
        updatedAt: notifications.updatedAt, // ✅ include updatedAt
      })
      .from(notifications)
      .where(eq(notifications.userId, ctx.dbUser.id))
      .orderBy(notifications.createdAt);
  }),

  /**
   * Mark notification as read
   */
  markAsRead: protectedProcedure
    .input(
      z.object({
        notificationId: z.string().uuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.dbUser) {
        throw new Error("Unauthorized");
      }

      await ctx.db
        .update(notifications)
        .set({ isRead: true })
        .where(
          and(
            eq(notifications.id, input.notificationId),
            eq(notifications.userId, ctx.dbUser.id)
          )
        );

      return { success: true };
    }),

  /**
   * Mark all notifications as read
   */
  markAllAsRead: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.dbUser) {
      throw new Error("Unauthorized");
    }

    await ctx.db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, ctx.dbUser.id));

    return { success: true };
  }),
});
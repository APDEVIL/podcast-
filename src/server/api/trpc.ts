import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { eq } from "drizzle-orm";

import { db } from "@/server/db";
import { users } from "@/server/db/schema";

/* =====================================================
   BASE CONTEXT (AUTH DISABLED FOR NOW)
===================================================== */

export const createTRPCContext = async () => {
  return {
    db,
    authUser: null, // ❌ auth disabled temporarily
  };
};

type BaseContext = Awaited<ReturnType<typeof createTRPCContext>>;

/* =====================================================
   INIT TRPC
===================================================== */

const t = initTRPC.context<BaseContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

/* =====================================================
   AUTH MIDDLEWARE (TEMP DISABLED)
===================================================== */

type DbUser = typeof users.$inferSelect;

type AuthedContext = BaseContext & {
  dbUser: DbUser;
};

const isAuthed = t.middleware(async ({ ctx, next }) => {
  // ❌ auth bypass for Postman testing
  const dbUser = await ctx.db.query.users.findFirst();

  if (!dbUser) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No users in database",
    });
  }

  return next({
    ctx: {
      ...ctx,
      dbUser,
    } satisfies AuthedContext,
  });
});

/* =====================================================
   PROCEDURES
===================================================== */

export const protectedProcedure = t.procedure.use(isAuthed);

export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.dbUser.role !== "ADMIN") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next();
});

export const hostProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.dbUser.role !== "HOST") {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next();
});
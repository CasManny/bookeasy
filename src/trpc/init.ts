import { auth } from "@/lib/auth";
import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { cache } from "react";
import superjson from 'superjson'
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;

export const protectedProcedure = baseProcedure.use(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "unauthorized" });
  }
  return next({ ctx: { ...ctx, user: session.user, userId: session.user.id } });
});


export const providerProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const isProvider = ctx.user.role === 'provider'
  const providerUserId = ctx.user.id
  if (!isProvider) {
    throw new TRPCError({code:"UNAUTHORIZED", message: "Unauthorized operation"})
  }
  
  return next({ctx: { ...ctx, providerId: providerUserId}})
})

export const adminProvider = protectedProcedure.use(async ({ ctx, next }) => {
  const isAdmin = ctx.user.role === 'admin'
  if (!isAdmin) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Unauthorized operation",
    });
  }

  const adminId = ctx.user.id
  
  return next({ctx: { ...ctx, adminId}})
})
/* eslint-disable @typescript-eslint/no-explicit-any */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

interface Context {
  session: any | null;
  ip: string | undefined;
  requestUrl: string;
}

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const procedure = t.procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;
  return opts.next({
    ctx: {
      session: ctx.session,
      ip: ctx.ip,
    },
  });
});

export const { router, createCallerFactory } = t;
export const publicProcedure = t.procedure.use(async function isAuthed(opts) {
  return opts.next();
});

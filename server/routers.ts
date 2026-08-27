import { COOKIE_NAME } from "@shared/const";
import { createContactRequest, listContactRequests } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { contactRequestInput } from "../shared/contact";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  contact: router({
    submit: publicProcedure.input(contactRequestInput).mutation(async ({ input }) => {
      const { website, ...request } = input;

      if (website) {
        return { success: true } as const;
      }

      await createContactRequest(request);
      return { success: true } as const;
    }),
    list: adminProcedure.query(() => listContactRequests()),
  }),
});

export type AppRouter = typeof appRouter;

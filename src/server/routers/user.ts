import { z } from "zod";
import { USER_LIST } from "../fixtures";
import { User, userSchema } from "../fixtures";
import { t } from "../trpc";

export const userRouter = t.router({
  list: t.procedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return USER_LIST;
  }),

  detail: t.procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const user = USER_LIST.find((u: User) => u.id === input.id);
      if (!user) throw new Error("not found");
      return user;
    }),

  update: t.procedure
    .input(
      z.object({
        id: z.number(),
        data: userSchema.partial(),
      })
    )
    .mutation(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const idx = USER_LIST.findIndex((u: User) => u.id === input.id);
      if (idx === -1) throw new Error("not found");
      USER_LIST[idx] = { ...USER_LIST[idx], ...input.data };
      return USER_LIST[idx];
    }),
});

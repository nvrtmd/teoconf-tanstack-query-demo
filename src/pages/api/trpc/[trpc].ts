import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: ({ req }) => ({
    session: null,
    ip: req.headers["x-forwarded-for"] as string | undefined,
    requestUrl: req.url || "",
  }),
});

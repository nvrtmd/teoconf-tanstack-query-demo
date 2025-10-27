import { httpLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../server/routers/_app";

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

function getBaseUrl() {
  if (typeof window !== "undefined") return "";

  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
          async headers() {
            return {};
          },
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            retry: 0,
          },
        },
      },
      abortOnUnmount: true, // 핵심: 이 설정이 문제의 원인
    };
  },
  transformer: superjson,
  ssr: false,
});

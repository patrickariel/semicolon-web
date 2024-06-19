import type { AppRouter } from "@binar-semicolon/api";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: process.env.API_BASE_URL!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
          transformer: superjson,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            });
          },
        }),
      ],
    };
  },
  transformer: superjson,
  ssr: false,
});

import type { AppRouter } from "@semicolon/api";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: process.env.API_BASE_URL!,
          transformer: superjson,
        }),
      ],
    };
  },
  transformer: superjson,
  ssr: false,
});

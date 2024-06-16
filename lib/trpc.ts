import type { AppRouter } from "@semicolon/api";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { cookies } from "next/headers";
import superjson from "superjson";

export default createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: process.env.API_BASE_URL!,
      async headers() {
        return {
          Cookie: cookies().toString(),
        };
      },
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
      transformer: superjson,
    }),
  ],
});

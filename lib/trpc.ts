import type { AppRouter } from "@binar-semicolon/api";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { cookies } from "next/headers";
import superjson from "superjson";

export const trpc = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.API_BASE_URL}/trpc`, // eslint-disable-line @typescript-eslint/no-non-null-assertion
      headers() {
        return {
          Cookie: cookies().toString(),
          "X-Auth-Secret": process.env.AUTH_SECRET,
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

import { search } from "./routes/search";
import { user } from "./routes/user";
import { router } from "./trpc";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export const appRouter = router({
  user,
  search,
});

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export { createContext } from "./trpc";

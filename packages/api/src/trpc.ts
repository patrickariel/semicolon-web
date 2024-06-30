import { PrismaClient } from "@prisma/client";
import { auth } from "@semicolon/auth";
import { TRPCError, initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import superjson from "superjson";
import { OpenApiMeta } from "trpc-openapi";

const prisma = new PrismaClient();

export const createContext = async ({
  req: _req,
}: FetchCreateContextFnOptions) => {
  const session = await auth();

  console.log(`fucks: ${session}`);

  return { session };
};

const t = initTRPC
  .meta<OpenApiMeta>()
  .context<Context>()
  .create({ transformer: superjson });

type Context = Awaited<ReturnType<typeof createContext>>;

export const optUserProcedure = t.procedure.use(
  async ({ ctx: { session }, next }) =>
    next({
      ctx: {
        user: session?.user?.email
          ? await prisma.user.findUnique({
              where: { email: session.user.email },
            })
          : null,
        session,
      },
    }),
);

export const incompleteUserProcedure = optUserProcedure.use(
  async ({ ctx: { user, ...ctx }, next }) => {
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    } else {
      return next({
        ctx: {
          user: { ...user, name: user.name, username: user.username },
          ...ctx,
        },
      });
    }
  },
);

export const userProcedure = incompleteUserProcedure.use(
  async ({ ctx: { user, ...ctx }, next }) => {
    if (!(user.name && user.username)) {
      throw new TRPCError({ code: "PRECONDITION_FAILED" });
    } else {
      return next({
        ctx: {
          user: { ...user, name: user.name, username: user.username },
          ...ctx,
        },
      });
    }
  },
);

export const router = t.router;
export const publicProcedure = t.procedure;

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
        user: session?.user?.id
          ? await prisma.user.findUnique({
              where: { id: session.user.id },
            })
          : null,
        session,
      },
    }),
);

export const newUserProcedure = optUserProcedure.use(
  async ({ ctx: { user, ...ctx }, next }) => {
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    } else if (user.registered) {
      throw new TRPCError({ code: "PRECONDITION_FAILED" });
    } else {
      return next({
        ctx: { user, ...ctx },
      });
    }
  },
);

export const userProcedure = optUserProcedure.use(
  async ({ ctx: { user, ...ctx }, next }) => {
    if (!user?.registered) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    } else {
      return next({
        ctx: {
          user: {
            ...user,
            // The following three fields should always be present if the user is registered
            /* eslint-disable @typescript-eslint/no-non-null-assertion */
            name: user.name!,
            username: user.username!,
            birthday: user.birthday!,
            /* eslint-enable @typescript-eslint/no-non-null-assertion */
          },
          ...ctx,
        },
      });
    }
  },
);

export const router = t.router;
export const publicProcedure = t.procedure;

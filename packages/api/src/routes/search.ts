import { router, publicProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// root/packages/api/src/routes/search.ts

const prisma = new PrismaClient();

export const search = router({
  searchPosts: publicProcedure.input(z.string()).query(async ({ input }) => {
    const postResults = await prisma.post.findMany({
      where: {
        content: {
          contains: input,
          mode: "insensitive",
        },
      },
      include: {
        user: true,
      },
    });

    const userResults = await prisma.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: input,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: input,
              mode: "insensitive",
            },
          },
          {
            bio: {
              contains: input,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (!postResults.length && !userResults.length) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No results matched",
      });
    }

    return { postResults, userResults };
  }),
});

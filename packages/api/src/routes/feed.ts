import { PostResolvedSchema } from "../schema";
import { router, userProcedure } from "../trpc";
import { db } from "@semicolon/db";
import { z } from "zod";

export const feed = router({
  recommend: userProcedure
    .meta({ openapi: { method: "GET", path: "/users/me" } })
    .input(
      z.object({
        cursor: z.string().uuid().nullish(),
        maxResults: z.number().min(1).max(100).default(50),
      }),
    )
    .output(
      z.object({
        results: z.array(PostResolvedSchema),
        nextCursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx: { user }, input: { cursor, maxResults } }) => {
      const posts = await db.post.findMany({
        where: {
          userId: {
            not: user.id,
          },
          parentId: {
            equals: null,
          },
        },
        ...(cursor && { cursor: { id: cursor } }),
        take: maxResults + 1,
        orderBy: [
          {
            likes: { _count: "desc" },
          },
          {
            views: "desc",
          },
          {
            id: "asc",
          },
        ],
        include: {
          user: true,
          _count: {
            select: {
              likes: true,
              children: true,
            },
          },
        },
      });

      let nextCursor: typeof cursor | undefined;

      if (posts.length > maxResults) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }

      return {
        results: posts.map((post) => ({
          ...post,
          name: post.user.name!,
          username: post.user.username!,
          verified: post.user.verified,
          avatar: post.user.image,
          likeCount: post._count.likes,
          replyCount: post._count.children,
        })),
        nextCursor,
      };
    }),
});

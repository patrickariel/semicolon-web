import { PostResolvedSchema } from "../schema";
import { router, userProcedure } from "../trpc";
import { db } from "@semicolon/db";
import { NotNull, sql } from "kysely";
import { z } from "zod";

export const feed = router({
  recommended: userProcedure
    .meta({ openapi: { method: "GET", path: "/feed/recommended" } })
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
      let dbQuery = db.$kysely
        .selectFrom([
          db.$kysely
            .selectFrom("Post")
            .leftJoin(
              (eb) =>
                eb
                  .selectFrom("User")
                  .select([
                    "User.id",
                    "User.name",
                    "User.username",
                    "User.image",
                    "User.verified",
                  ])
                  .as("Author"),
              (join) => join.onRef("Post.userId", "=", "Author.id"),
            )
            .leftJoin(
              (eb) =>
                eb
                  .selectFrom("_Like")
                  .select((eb) => [
                    "_Like.A",
                    eb.cast<number>(eb.fn.countAll(), "integer").as("count"),
                  ])
                  .groupBy("_Like.A")
                  .as("AggrLike"),
              (join) => join.onRef("Post.id", "=", "AggrLike.A"),
            )
            .leftJoin(
              (eb) =>
                eb
                  .selectFrom("Post")
                  .select((eb) => [
                    "Post.parentId",
                    eb.cast<number>(eb.fn.countAll(), "integer").as("count"),
                  ])
                  .groupBy("Post.parentId")
                  .as("AggrReply"),
              (join) => join.onRef("Post.id", "=", "AggrReply.parentId"),
            )
            .leftJoin("Post as ParentPost", (join) =>
              join.onRef("ParentPost.id", "=", "Post.parentId"),
            )
            .leftJoin("User as ParentAuthor", (join) =>
              join.onRef("ParentAuthor.id", "=", "ParentPost.userId"),
            )
            .select([
              "Post.id",
              "Post.createdAt",
              "Post.userId",
              "Post.content",
              "Post.parentId",
              "Post.media",
              "Post.views",
              "ParentAuthor.username as to",
              "Author.name",
              "Author.username",
              "Author.verified",
              "Author.image as avatar",
              (eb) =>
                eb.fn
                  .coalesce("AggrLike.count", sql<number>`0`)
                  .as("likeCount"),
              (eb) =>
                eb.fn
                  .coalesce("AggrReply.count", sql<number>`0`)
                  .as("replyCount"),
              sql<number>`"AggrLike".count * "Post".views / extract(day from now()-"Post"."createdAt"::timestamptz)`.as(
                "rank",
              ),
            ])
            .where(({ eb, and }) =>
              and([
                eb("Author.id", "!=", eb.cast<string>(eb.val(user.id), "uuid")),
                eb("ParentAuthor.id", "is", null),
              ]),
            )
            .$narrowType<{
              name: NotNull;
              username: NotNull;
              verified: NotNull;
            }>()
            .as("Post"),
        ])
        .selectAll()
        .orderBy(["Post.rank desc", "Post.id asc"])
        .limit(maxResults + 1);

      if (cursor) {
        dbQuery = dbQuery.where(({ eb, and, or }) => {
          const tieBreaker = eb(
            "Post.id",
            ">=",
            eb
              .selectFrom("Post")
              .select("Post.id")
              .where("Post.id", "=", cursor),
          );

          const cursorQuery = eb
            .selectFrom("Post")
            .select("Post.rank")
            .where("Post.id", "=", cursor);

          return or([
            and([eb("Post.rank", "=", cursorQuery), tieBreaker]),
            eb("Post.rank", "<", cursorQuery),
          ]);
        });
      }

      const results = await dbQuery.execute();

      let nextCursor: typeof cursor | undefined;

      if (results.length > maxResults) {
        const nextItem = results.pop();
        nextCursor = nextItem!.id;
      }

      return {
        results,
        nextCursor,
      };
    }),
  following: userProcedure
    .meta({ openapi: { method: "GET", path: "/feed/following" } })
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
    .query(
      async ({
        ctx: {
          user: { id },
        },
        input: { cursor, maxResults },
      }) => {
        const posts = await db.post.findMany({
          where: {
            user: {
              followedBy: {
                some: {
                  id,
                },
              },
            },
          },
          include: {
            user: true,
            _count: {
              select: {
                likes: true,
                children: true,
              },
            },
            parent: {
              include: {
                user: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
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
            to: post.parent?.user.username ?? null,
            username: post.user.username!,
            verified: post.user.verified,
            avatar: post.user.image,
            likeCount: post._count.likes,
            replyCount: post._count.children,
          })),
          nextCursor,
        };
      },
    ),
});

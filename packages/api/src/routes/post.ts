import { router, publicProcedure, userProcedure } from "../trpc";
import { Username } from "@semicolon/api/schema";
import { db } from "@semicolon/db";
import { PostSchema } from "@semicolon/db/zod";
import { TRPCError } from "@trpc/server";
import { Expression, SqlBool } from "kysely";
import { sql } from "kysely";
import _ from "lodash";
import { z } from "zod";

export const post = router({
  id: publicProcedure
    .meta({ openapi: { method: "GET", path: "/posts/id/{id}" } })
    .input(z.object({ id: z.string().uuid() }))
    .output(PostSchema.omit({ createdAt: true }))
    .query(async ({ input: { id } }) => {
      const post = await db.post.findUnique({
        where: { id },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The requested post does not exist",
        });
      }
      return post;
    }),
  create: userProcedure
    .meta({ openapi: { method: "POST", path: "/posts/new" } })
    .input(z.object({ content: z.string(), to: z.string().uuid().optional() }))
    .mutation(async ({ ctx: { user }, input: { content, to } }) => {
      await db.post.create({
        data: {
          userId: user.id,
          parentId: to,
          content,
        },
      });
    }),
  update: userProcedure
    .meta({ openapi: { method: "PUT", path: "/posts/id/{id}" } })
    .input(
      z.object({
        id: z.string(),
        content: z.string(),
      }),
    )
    .mutation(async ({ ctx: { user }, input: { id, content } }) => {
      const post = await db.post.findUnique({
        select: { userId: true },
        where: {
          id,
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Requested post not found",
        });
      }

      if (post.userId !== user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not permitted to modify requested post",
        });
      }

      await db.post.update({
        where: { id: id },
        data: {
          content,
        },
      });
    }),
  delete: userProcedure
    .meta({ openapi: { method: "DELETE", path: "/posts/id/{id}" } })
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx: { user }, input: { id } }) => {
      const post = await db.post.findUnique({
        select: { userId: true },
        where: {
          id,
        },
      });

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Requested post not found",
        });
      }

      if (post.userId !== user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not permitted to modify requested post",
        });
      }

      await db.post.delete({
        where: { id },
      });
    }),
  search: publicProcedure
    .meta({ openapi: { method: "GET", path: "/posts/search" } })
    .input(
      z
        .object({
          query: z.string().optional(),
          since: z.date().optional(),
          until: z.date().optional(),
          from: Username.optional(),
          to: Username.optional(),
          minLikes: z.number().optional(),
          minReplies: z.number().optional(),
          sortBy: z
            .union([z.literal("recency"), z.literal("relevancy")])
            .default("recency"),
          cursor: z.string().uuid().nullish(),
          maxResults: z.number().min(1).max(100).default(50),
        })
        .transform((obj) => ({
          ...obj,
          ...(obj.query && { query: obj.query.split(/\s+/).join(" & ") }),
        })),
    )
    .output(
      z.object({
        results: z.array(
          PostSchema.merge(
            z.object({ likeCount: z.number(), replyCount: z.number() }),
          ),
        ),
        nextCursor: z.string().uuid().nullish(),
      }),
    )
    .query(
      async ({
        input: {
          query,
          since,
          until,
          from,
          to,
          minLikes,
          minReplies,
          sortBy,
          cursor,
          maxResults,
        },
      }) => {
        // We need to do raw queries here, because Prisma can't filter on aggregrate counts
        // https://github.com/prisma/prisma/issues/6570

        let dbQuery = db.$kysely
          .selectFrom("Post")
          .leftJoin(
            (eb) =>
              eb
                .selectFrom("_Like")
                .select(["_Like.A", sql<number>`COUNT(*)::int`.as("count")])
                .groupBy("_Like.A")
                .as("AggrLike"),
            (join) => join.onRef("Post.id", "=", "AggrLike.A"),
          )
          .leftJoin(
            (eb) =>
              eb
                .selectFrom("Post")
                .select([
                  "Post.parentId",
                  sql<number>`COUNT(*)::int`.as("count"),
                ])
                .groupBy("Post.parentId")
                .as("AggrReply"),
            (join) => join.onRef("Post.id", "=", "AggrReply.parentId"),
          )
          .select([
            "Post.id",
            "Post.createdAt",
            "Post.userId",
            "Post.content",
            "Post.parentId",
            (eb) =>
              eb.fn.coalesce("AggrLike.count", sql<number>`0`).as("likeCount"),
            (eb) =>
              eb.fn
                .coalesce("AggrReply.count", sql<number>`0`)
                .as("replyCount"),
          ])
          .limit(maxResults + 1);

        const toTsvector = sql`to_tsvector(concat_ws(' ', "Post"."content"))`;
        const toTsquery = sql`to_tsquery(${query})`;
        const tsRank = sql<number>`ts_rank(${toTsvector}, ${toTsquery})`;

        if (query) {
          dbQuery = dbQuery.where(({ eb }) => eb(toTsvector, "@@", toTsquery));
        }

        if (since ?? until) {
          dbQuery = dbQuery.where(({ eb, and }) => {
            const ors: Expression<SqlBool>[] = [];
            if (since) {
              ors.push(eb("Post.createdAt", ">=", since));
            }
            if (until) {
              ors.push(eb("Post.createdAt", "<=", until));
            }
            return and(ors);
          });
        }

        if (from) {
          dbQuery = dbQuery
            .leftJoin("User as Author", (join) =>
              join.onRef("Author.id", "=", "Post.userId"),
            )
            .where(({ eb, and }) =>
              and([
                eb("Author.username", "=", from),
                eb("Author.id", "is not", null),
              ]),
            );
        }

        if (to) {
          dbQuery = dbQuery
            .leftJoin("Post as ParentPost", (join) =>
              join.onRef("ParentPost.id", "=", "Post.parentId"),
            )
            .leftJoin("User as ParentAuthor", (join) =>
              join.onRef("ParentAuthor.id", "=", "ParentPost.userId"),
            )
            .where(({ eb, and }) =>
              and([
                eb("ParentAuthor.username", "=", to),
                eb("ParentAuthor.id", "is not", null),
                eb("ParentPost.id", "is not", null),
              ]),
            );
        }

        if (minLikes) {
          dbQuery = dbQuery.where(({ eb }) =>
            eb("AggrLike.count", ">=", minLikes),
          );
        }

        if (minReplies) {
          dbQuery = dbQuery.where(({ eb }) =>
            eb("AggrReply.count", ">=", minReplies),
          );
        }

        switch (sortBy) {
          case "recency":
            dbQuery = dbQuery.orderBy(["Post.createdAt desc", "Post.id asc"]);
            break;
          case "relevancy":
            if (query) {
              dbQuery = dbQuery.orderBy([sql`${tsRank} DESC`, "Post.id asc"]);
            }
            break;
        }

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

            switch (sortBy) {
              case "recency": {
                const cursorQuery = eb
                  .selectFrom("Post")
                  .select("Post.createdAt")
                  .where("Post.id", "=", cursor);

                return or([
                  and([eb("Post.createdAt", "=", cursorQuery), tieBreaker]),
                  eb("Post.createdAt", "<", cursorQuery),
                ]);
              }
              case "relevancy": {
                const cursorQuery = eb
                  .selectFrom("Post")
                  .select(tsRank.as("rank"))
                  .where("Post.id", "=", cursor);

                return or([
                  and([eb(tsRank, "=", cursorQuery), tieBreaker]),
                  eb(tsRank, "<", cursorQuery),
                ]);
              }
            }
          });
        }

        const results = await dbQuery.execute();

        if (results.length === 0) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "No results matched",
          });
        }

        let nextCursor: typeof cursor | undefined;

        if (results.length > maxResults) {
          const nextItem = results.pop();
          nextCursor = nextItem!.id; // eslint-disable-line @typescript-eslint/no-non-null-assertion
        }

        return {
          results,
          nextCursor,
        };
      },
    ),
});

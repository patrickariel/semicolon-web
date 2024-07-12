import {
  BirthdaySchema,
  PostResolvedSchema,
  PublicUserResolvedSchema,
  UserResolvedSchema,
  UsernameSchema,
} from "../schema";
import {
  router,
  publicProcedure,
  userProcedure,
  newUserProcedure,
} from "@semicolon/api/trpc";
import { update } from "@semicolon/auth";
import { Prisma, db } from "@semicolon/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const user = router({
  search: publicProcedure
    .meta({ openapi: { method: "GET", path: "/users/search" } })
    .input(z.object({ query: z.string() }))
    .output(z.array(PublicUserResolvedSchema))
    .query(async ({ input: { query } }) => {
      const users = await db.user.findMany({
        where: {
          username: {
            search: query,
          },
          bio: {
            search: query,
          },
          NOT: { registered: null },
        },
        include: {
          _count: {
            select: {
              followedBy: true,
              following: true,
            },
          },
        },
      });

      return users.map((user) => ({
        ...user,
        name: user.name!,
        username: user.username!,
        registered: user.registered!,
        following: user._count.following,
        followers: user._count.followedBy,
      }));
    }),
  me: userProcedure
    .meta({ openapi: { method: "GET", path: "/users/me" } })
    .input(z.void())
    .output(UserResolvedSchema)
    .query(({ ctx: { user } }) => user),
  register: newUserProcedure
    .meta({ openapi: { method: "POST", path: "/users/register" } })
    .input(
      z.object({
        name: z.string(),
        username: UsernameSchema,
        image: z.string().url().optional(),
        birthday: BirthdaySchema,
      }),
    )
    .output(z.void())
    .mutation(async ({ ctx: { user }, input }) => {
      const { name, username, image, registered } = await db.user
        .update({
          where: { email: user.email },
          data: { ...input, registered: new Date() },
        })
        .catch((e: unknown) => {
          if (
            e instanceof Prisma.PrismaClientKnownRequestError &&
            e.code === "P2002"
          ) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "The username is already taken",
            });
          }
          throw e;
        });

      await update({ user: { name, username, image, registered } });
    }),
  id: publicProcedure
    .meta({ openapi: { method: "GET", path: "/users/by/id/{id}" } })
    .input(z.object({ id: z.string().uuid() }))
    .output(PublicUserResolvedSchema)
    .query(async ({ input: { id } }) => {
      const user = await db.user.findUnique({
        where: { id, registered: { not: null } },
        include: {
          _count: {
            select: {
              followedBy: true,
              following: true,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The requested user does not exist",
        });
      }

      return {
        ...user,
        name: user.name!,
        username: user.username!,
        registered: user.registered!,
        following: user._count.following,
        followers: user._count.followedBy,
      };
    }),
  username: publicProcedure
    .meta({ openapi: { method: "GET", path: "/users/{username}" } })
    .input(z.object({ username: UsernameSchema }))
    .output(PublicUserResolvedSchema)
    .query(async ({ input: { username } }) => {
      const user = await db.user.findUnique({
        where: { username, registered: { not: null } },
        include: {
          _count: {
            select: {
              followedBy: true,
              following: true,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The requested user does not exist",
        });
      }

      return {
        ...user,
        name: user.name!,
        username: user.username!,
        registered: user.registered!,
        following: user._count.following,
        followers: user._count.followedBy,
      };
    }),
  posts: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/users/{username}/posts" },
    })
    .input(
      z.object({
        username: z.string(),
        cursor: z.string().uuid().optional(),
        maxResults: z.number().min(1).max(100).default(50),
      }),
    )
    .output(
      z.object({
        posts: z.array(PostResolvedSchema),
        nextCursor: z.string().uuid().optional(),
      }),
    )
    .query(async ({ input: { username, cursor, maxResults } }) => {
      const posts = await db.post.findMany({
        where: {
          user: {
            username,
          },
          parentId: { equals: null },
        },
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
        take: maxResults + 1,
        include: {
          parent: {
            include: {
              user: true,
            },
          },
          user: true,
          _count: {
            select: {
              likes: true,
              children: true,
            },
          },
        },
        ...(cursor && { cursor: { id: cursor } }),
      });

      let nextCursor: typeof cursor | undefined;

      if (posts.length > maxResults) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      }

      return {
        posts: posts.map((post) => ({
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
    }),
  replies: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/users/{username}/replies" },
    })
    .input(
      z.object({
        username: z.string(),
        cursor: z.string().uuid().optional(),
        maxResults: z.number().min(1).max(100).default(50),
      }),
    )
    .output(
      z.object({
        posts: z.array(PostResolvedSchema),
        nextCursor: z.string().uuid().optional(),
      }),
    )
    .query(async ({ input: { username, cursor, maxResults } }) => {
      const posts = await db.post.findMany({
        where: {
          user: {
            username,
          },
          parentId: { not: null },
        },
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
        take: maxResults + 1,
        include: {
          parent: {
            include: {
              user: true,
            },
          },
          user: true,
          _count: {
            select: {
              likes: true,
              children: true,
            },
          },
        },
        ...(cursor && { cursor: { id: cursor } }),
      });

      let nextCursor: typeof cursor | undefined;

      if (posts.length > maxResults) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      }

      return {
        posts: posts.map((post) => ({
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
    }),
});

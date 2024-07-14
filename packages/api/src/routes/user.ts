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
  optUserProcedure,
} from "@semicolon/api/trpc";
import { update } from "@semicolon/auth";
import { Prisma, db } from "@semicolon/db";
import { TRPCError } from "@trpc/server";
import { BlobNotFoundError, head } from "@vercel/blob";
import _ from "lodash";
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
              posts: true,
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
        posts: user._count.posts,
      }));
    }),
  me: userProcedure
    .meta({ openapi: { method: "GET", path: "/users/me" } })
    .input(z.void())
    .output(UserResolvedSchema)
    .query(({ ctx: { user } }) => user),
  update: userProcedure
    .meta({ openapi: { method: "POST", path: "/users/me/update" } })
    .input(
      z.object({
        name: z.string().min(2).max(50),
        bio: z.string().optional(),
        location: z.string().optional(),
        website: z.string().url().optional(),
        birthday: z.date(),
        avatar: z.string().url().optional(),
        header: z.string().url().optional(),
      }),
    )
    .output(z.void())
    .mutation(
      async ({
        ctx: {
          user: { id },
        },
        input: { name, bio, location, website, birthday, avatar, header },
      }) => {
        if (header) {
          try {
            await head(header);
          } catch (error) {
            if (error instanceof BlobNotFoundError) {
              throw new TRPCError({
                code: "FORBIDDEN",
                message: "External media URLs are forbidden",
              });
            } else {
              throw error;
            }
          }
        }

        await db.user.update({
          where: {
            id,
          },
          data: {
            name,
            bio: bio ?? null,
            location: location ?? null,
            website: website ?? null,
            birthday,
            image: avatar ?? null,
            header: header ?? null,
          },
        });

        await update({ user: { name, image: avatar } });
      },
    ),
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
              posts: true,
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
        posts: user._count.posts,
      };
    }),
  username: optUserProcedure
    .meta({ openapi: { method: "GET", path: "/users/{username}" } })
    .input(z.object({ username: UsernameSchema }))
    .output(PublicUserResolvedSchema.merge(z.object({ followed: z.boolean() })))
    .query(async ({ input: { username }, ctx: { user: me } }) => {
      const user = await db.user.findUnique({
        where: { username, registered: { not: null } },
        include: {
          _count: {
            select: {
              followedBy: true,
              following: true,
              posts: true,
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
        ...(username !== me?.username ? { ...user, birthday: null } : user),
        name: user.name!,
        username: user.username!,
        registered: user.registered!,
        following: user._count.following,
        followers: user._count.followedBy,
        posts: user._count.posts,
        followed: me?.username
          ? !!(await db.user.findUnique({
              where: {
                username: me.username,
                following: {
                  some: {
                    username: user.username!,
                  },
                },
              },
            }))
          : false,
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
  likes: publicProcedure
    .meta({
      openapi: { method: "GET", path: "/users/{username}/likes" },
    })
    .input(
      z.object({
        username: z.string(),
        cursor: z.string().optional(),
        maxResults: z.number().min(1).max(100).default(50),
      }),
    )
    .output(
      z.object({
        posts: z.array(PostResolvedSchema),
        nextCursor: z.string().optional(),
      }),
    )
    .query(async ({ input: { username, cursor, maxResults } }) => {
      const likes = await db.like.findMany({
        where: {
          user: {
            username,
          },
        },
        orderBy: [{ createdAt: "desc" }, { postId: "asc" }, { userId: "asc" }],
        take: maxResults + 1,
        include: {
          post: {
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
          },
        },
        ...(cursor && {
          cursor: {
            postId_userId: {
              postId: cursor.split("_")[0]!,
              userId: cursor.split("_")[1]!,
            },
          },
        }),
      });

      let nextCursor: typeof cursor | undefined;

      if (likes.length > maxResults) {
        const nextItem = likes.pop();
        nextCursor = `${nextItem!.postId}_${nextItem!.userId}`;
      }

      return {
        posts: likes.map(({ post }) => ({
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
  media: publicProcedure
    .meta({ openapi: { method: "GET", path: "/users/{username}/media" } })
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
        nextCursor: z.string().uuid().nullish(),
      }),
    )
    .query(async ({ input: { username, cursor, maxResults } }) => {
      const posts = await db.post.findMany({
        where: {
          user: {
            username,
          },
          media: {
            isEmpty: false,
          },
        },
        orderBy: [{ createdAt: "desc" }, { id: "asc" }],
        take: maxResults + 1,
        ...(cursor && { cursor: { id: cursor } }),
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

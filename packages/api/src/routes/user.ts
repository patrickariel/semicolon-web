import {
  BirthdaySchema,
  PublicUserResolvedSchema,
  UsernameSchema,
} from "../schema";
import {
  router,
  publicProcedure,
  userProcedure,
  newUserProcedure,
} from "@semicolon/api/trpc";
import { update } from "@semicolon/auth";
import { db } from "@semicolon/db";
import { UserSchema } from "@semicolon/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const user = router({
  id: publicProcedure
    .meta({ openapi: { method: "GET", path: "/users/by/id/{id}" } })
    .input(z.object({ id: z.string().uuid() }))
    .output(PublicUserResolvedSchema)
    .query(async ({ input: { id } }) => {
      const user = await db.user.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              followedBy: true,
              following: true,
            },
          },
        },
      });

      if (!user?.registered) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The requested user does not exist",
        });
      }

      return {
        ...user,
        name: user.name!,
        username: user.username!,
        following: user._count.following,
        followers: user._count.followedBy,
      };
    }),
  username: publicProcedure
    .meta({ openapi: { method: "GET", path: "/users/by/username/{username}" } })
    .input(z.object({ username: UsernameSchema }))
    .output(PublicUserResolvedSchema)
    .query(async ({ input: { username } }) => {
      const user = await db.user.findUnique({
        where: { username },
        include: {
          _count: {
            select: {
              followedBy: true,
              following: true,
            },
          },
        },
      });

      if (!user?.registered) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The requested user does not exist",
        });
      }

      console.log(user._count);

      return {
        ...user,
        name: user.name!,
        username: user.username!,
        following: user._count.following,
        followers: user._count.followedBy,
      };
    }),
  me: userProcedure
    .meta({ openapi: { method: "GET", path: "/users/me" } })
    .input(z.void())
    .output(
      UserSchema.merge(
        z.object({
          name: z.string(),
          username: z.string(),
          birthday: z.date(),
        }),
      ),
    )
    .query(({ ctx: { user } }) => user),
  register: newUserProcedure
    .input(
      z.object({
        name: z.string(),
        username: UsernameSchema,
        image: z.string().url().optional(),
        birthday: BirthdaySchema,
      }),
    )
    .mutation(async ({ ctx: { user }, input }) => {
      const { name, username, image, registered } = await db.user.update({
        where: { email: user.email },
        data: { ...input, registered: true },
      });

      await update({ user: { name, username, image, registered } });
    }),
  search: publicProcedure
    .input(z.object({ query: z.string() }))
    .output(
      z.array(
        UserSchema.omit({
          email: true,
          emailVerified: true,
          updatedAt: true,
          birthday: true,
        }),
      ),
    )
    .query(
      async ({ input: { query } }) =>
        await db.user.findMany({
          where: {
            username: {
              search: query,
            },
            bio: {
              search: query,
            },
          },
        }),
    ),
});

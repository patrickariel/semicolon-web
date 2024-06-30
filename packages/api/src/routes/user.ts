import { PrismaClient } from "@prisma/client";
import {
  router,
  publicProcedure,
  userProcedure,
  newUserProcedure,
} from "@semicolon/api/trpc";
import { update } from "@semicolon/auth";
import { UserSchema } from "@semicolon/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const prisma = new PrismaClient();

export const user = router({
  id: publicProcedure
    .meta({ openapi: { method: "GET", path: "/users/id/{id}" } })
    .input(z.object({ id: z.string().uuid() }))
    .output(
      UserSchema.omit({
        email: true,
        emailVerified: true,
        updatedAt: true,
        birthday: true,
      }),
    )
    .query(async ({ input: { id } }) => {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user?.registered) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The requested user does not exist",
        });
      }

      return user;
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
        username: z.string(),
        image: z.string().url().optional(),
        birthday: z.date(),
      }),
    )
    .mutation(async ({ ctx: { user }, input }) => {
      const { name, username, image, registered } = await prisma.user.update({
        where: { email: user.email },
        data: { ...input, registered: true },
      });

      await update({ user: { name, username, image, registered } });
    }),
});

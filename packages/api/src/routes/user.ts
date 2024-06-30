import { PrismaClient } from "@prisma/client";
import {
  router,
  publicProcedure,
  userProcedure,
  incompleteUserProcedure,
} from "@semicolon/api/trpc";
import { UserSchema } from "@semicolon/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const prisma = new PrismaClient();

export const user = router({
  id: publicProcedure
    .meta({ openapi: { method: "GET", path: "/users/id/{id}" } })
    .input(z.object({ id: z.string().uuid() }))
    .output(
      UserSchema.omit({ email: true, emailVerified: true, updatedAt: true }),
    )
    .query(async ({ input: { id } }) => {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user || !(user.name && user.username)) {
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
      UserSchema.merge(z.object({ name: z.string(), username: z.string() })),
    )
    .query(({ ctx: { user } }) => user),
  updateProfile: incompleteUserProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        image: z.string().url().optional(),
        birthday: z.date(),
      }),
    )
    .mutation(async ({ ctx: { user }, input }) => {
      await prisma.user.update({
        where: { email: user.email },
        data: input,
      });
    }),
});

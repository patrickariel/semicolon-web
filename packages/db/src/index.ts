import type { DB } from "../prisma/generated/types";
import { PrismaClient } from "@prisma/client";
import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";
import kyselyExtension from "prisma-extension-kysely";

export type {
  Prisma,
  PrismaPromise,
  User,
  Post,
  Account,
  Like,
  Media,
  Session,
  VerificationToken,
} from "@prisma/client";
export { PrismaClient } from "@prisma/client";
export { UserSchema } from "@semicolon/db/zod";

const prisma = new PrismaClient();

export const db = prisma.$extends(
  kyselyExtension({
    kysely: (driver) =>
      new Kysely<DB>({
        dialect: {
          createDriver: () => driver,
          createAdapter: () => new PostgresAdapter(),
          createIntrospector: (db) => new PostgresIntrospector(db),
          createQueryCompiler: () => new PostgresQueryCompiler(),
        },
      }),
  }),
);

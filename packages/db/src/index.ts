import type { DB } from "../prisma/generated/types";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import { highlight } from "cli-highlight";
import figures from "figures";
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

const prisma = new PrismaClient(
  process.env.NODE_ENV === "development" && process.env.PRISMA_LOG_QUERY
    ? {
        log: [
          {
            emit: "event",
            level: "query",
          },
        ],
      }
    : undefined,
);

if (process.env.NODE_ENV === "development" && process.env.PRISMA_LOG_QUERY) {
  prisma.$on("query", (e) => {
    const query = highlight(e.query, { language: "sql", ignoreIllegals: true });
    const params = highlight(e.params, {
      language: "json",
      ignoreIllegals: true,
    });
    console.log(
      `QUERY ${query} ${chalk.green(figures.arrowLeft)} ${params} in ${chalk.yellow(`${e.duration.toString()}ms`)}`,
    );
  });
}

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

import type { DB } from "../prisma/generated/types";
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";
import { highlight } from "cli-highlight";
import {
  Kysely,
  PostgresAdapter,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";
import kyselyExtension from "prisma-extension-kysely";

export type {
  PrismaPromise,
  User,
  Post,
  Account,
  Session,
  VerificationToken,
} from "@prisma/client";
export { PrismaClient, Prisma } from "@prisma/client";
export { UserSchema } from "@semicolon/db/zod";

const dbSingleton = () => {
  const db = new PrismaClient(
    process.env.NODE_ENV !== "production" && process.env.PRISMA_LOG_QUERY
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

  if (process.env.NODE_ENV !== "production" && process.env.PRISMA_LOG_QUERY) {
    db.$on("query", (e) => {
      const query = highlight(e.query, {
        language: "sql",
        ignoreIllegals: true,
      });
      const params = highlight(e.params, {
        language: "json",
        ignoreIllegals: true,
      });
      console.log(
        `QUERY ${query} ${chalk.green("<==")} ${params} in ${chalk.yellow(`${e.duration.toString()}ms`)}`,
      );
    });
  }

  return db.$extends(
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
};

declare const globalThis: {
  dbGlobal?: ReturnType<typeof dbSingleton>;
} & typeof global;

export const db = globalThis.dbGlobal ?? dbSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.dbGlobal = db;
}

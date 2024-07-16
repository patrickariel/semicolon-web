import { db } from "@semicolon/db";
import { beforeEach } from "vitest";

beforeEach(async () => {
  await db.$transaction([
    db.user.deleteMany(),
    db.post.deleteMany(),
    db.like.deleteMany(),
  ]);
});

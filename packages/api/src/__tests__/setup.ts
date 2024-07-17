import { db } from "@semicolon/db";
import { beforeEach } from "vitest";

beforeEach(async () => {
  await db.$transaction([
    db.like.deleteMany(),
    db.post.deleteMany(),
    db.user.deleteMany(),
  ]);
});

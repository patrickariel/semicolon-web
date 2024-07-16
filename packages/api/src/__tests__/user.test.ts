import { createCaller } from "..";
import { db } from "@semicolon/db";
import { expect, test } from "vitest";

test("find user by username", async () => {
  const { username } = await db.user.create({
    data: {
      name: "John Smith",
      username: "john.smith",
      registered: new Date(),
    },
  });

  expect(username).not.toBeNull();

  const caller = createCaller({ session: null });
  const user = await caller.user.username({ username: username! });

  expect(user).not.toBeNull();
});

import { createUserContext, type UserContext } from "./utils";
import { db } from "@semicolon/db";
import { afterEach, beforeEach, vi } from "vitest";

vi.mock("@semicolon/auth");
vi.mock("@vercel/blob");

afterEach(() => {
  vi.restoreAllMocks();
});

beforeEach<UserContext>(async (context) => {
  await db.$transaction([
    db.like.deleteMany(),
    db.post.deleteMany(),
    db.user.deleteMany(),
  ]);

  const { user, router, session } = await createUserContext({
    name: "John Smith",
    username: "john.smith",
    birthday: new Date(),
    registered: new Date(),
  });

  context.user = user;
  context.router = router;
  context.session = session;
});

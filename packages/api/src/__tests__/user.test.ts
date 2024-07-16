import { createCaller } from "..";
import { type Session, update } from "@semicolon/auth";
import { User, db } from "@semicolon/db";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

interface UserContext {
  user: User;
  session: Session;
  caller: ReturnType<typeof createCaller>;
}

vi.mock("@semicolon/auth");

function mockUpdateImplementation(session: Session) {
  return (data: Parameters<typeof update>[0]) => {
    if (session.user) {
      session.user = {
        ...session.user,
        ...data.user,
      };
      return Promise.resolve(session);
    } else {
      return Promise.resolve(null);
    }
  };
}

async function createUserContext(
  data: Parameters<typeof db.user.create>[0]["data"],
): Promise<UserContext> {
  const user = await db.user.create({ data });

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const session = {
    user,
    expires: expires.toISOString(),
  };

  const caller = createCaller({ session });

  vi.mocked(update).mockImplementation(mockUpdateImplementation(session));

  return { user, session, caller };
}

beforeEach<UserContext>(async (context) => {
  const { user, caller, session } = await createUserContext({
    name: "John Smith",
    username: "john.smith",
    birthday: new Date(),
    registered: new Date(),
  });

  context.user = user;
  context.caller = caller;
  context.session = session;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("test user accounts", () => {
  test<UserContext>("find user by username", async ({
    user: { username },
    caller,
  }) => {
    expect(username).not.toBeNull();
    const user = await caller.user.username({ username: username! });

    expect(user).not.toBeNull();
  });

  test<UserContext>("get self", async ({ caller }) => {
    const user = await caller.user.me();

    expect(user).not.toBeNull();
  });

  test<UserContext>("update user info", async ({ session, caller }) => {
    await caller.user.update({ name: "Jane Smith" });

    const user = await caller.user.me();

    expect(user.name).toBe("Jane Smith");
    expect(session.user?.name).toBe("Jane Smith");
  });

  test("register flow", async () => {
    const { session } = await createUserContext({});

    const caller = createCaller({ session });
    await caller.user.register({
      name: "Jane Smith",
      username: "jane.smith",
      birthday: new Date(),
    });

    const me = await caller.user.me();

    expect(me.name).toBe("Jane Smith");
    expect(session.user?.name).toBe("Jane Smith");
  });
});

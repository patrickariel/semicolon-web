import { createCaller } from "..";
import { type Session, update } from "@semicolon/auth";
import { User, db } from "@semicolon/db";
import { head } from "@vercel/blob";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

interface UserContext {
  user: User;
  session: Session;
  router: ReturnType<typeof createCaller>;
}

vi.mock("@semicolon/auth");
vi.mock("@vercel/blob");

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

  const router = createCaller({ session });

  vi.mocked(update).mockImplementation(mockUpdateImplementation(session));

  return { user, session, router };
}

beforeEach<UserContext>(async (context) => {
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

afterEach(() => {
  vi.restoreAllMocks();
});

describe("test user accounts", () => {
  test<UserContext>("find user by username", async ({
    user: { username },
    router,
  }) => {
    expect(username).not.toBeNull();
    const user = await router.user.username({ username: username! });
    expect(user).not.toBeNull();
  });

  test<UserContext>("get self", async ({ router }) => {
    const user = await router.user.me();
    expect(user).not.toBeNull();
  });

  test<UserContext>("update user info", async ({ session, router }) => {
    const name = "Jane Smith";
    await router.user.update({ name });
    expect((await router.user.me()).name).toBe(name);
    expect(session.user?.name).toBe(name);

    await router.user.update({ name: undefined });
    expect((await router.user.me()).name).toBe(name);
    expect(session.user?.name).toBe(name);

    vi.mocked(head).mockImplementation((url) =>
      Promise.resolve({
        url,
        downloadUrl: `${url}?download=1`,
        size: 100,
        uploadedAt: new Date(),
        pathname: "profilesv1/image.jpg",
        contentType: "image/jpeg",
        contentDisposition: 'attachment; filename="image.jpg"',
        cacheControl: "public, max-age=31536000, s-maxage=300",
      }),
    );

    const header = "https://example.com/image.jpg";
    await router.user.update({ header });
    expect((await router.user.me()).header).toBe(header);

    await router.user.update({ header: undefined });
    expect((await router.user.me()).header).toBe(header);
    await router.user.update({ header: null });
    expect((await router.user.me()).header).toBeNull();

    const avatar = "https://example.com/picture.jpg";
    await router.user.update({ avatar });
    expect((await router.user.me()).image).toBe(avatar);
    expect(session.user?.image).toBe(avatar);

    await router.user.update({ avatar: undefined });
    expect((await router.user.me()).image).toBe(avatar);
    await router.user.update({ avatar: null });
    expect((await router.user.me()).image).toBeNull();
    expect(session.user?.image).toBeNull();
  });

  test("register flow", async () => {
    const { session } = await createUserContext({});

    const router = createCaller({ session });
    const data = {
      name: "Jane Smith",
      username: "jane.smith",
      birthday: new Date(),
    };
    await router.user.register(data);

    const { name, username, birthday } = await router.user.me();
    expect({ name, username, birthday }).toStrictEqual(data);
  });
});

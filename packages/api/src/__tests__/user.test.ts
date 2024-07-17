import { createCaller } from "..";
import { type Session, update } from "@semicolon/auth";
import { User, db } from "@semicolon/db";
import { HeadBlobResult, head } from "@vercel/blob";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

interface UserContext {
  user: User;
  session: Session;
  router: ReturnType<typeof createCaller>;
}

vi.mock("@semicolon/auth");
vi.mock("@vercel/blob");

function mockUpdateImplementation(session: Session) {
  return (data: Parameters<typeof update>[0]): Promise<Session | null> => {
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

function mockHeadImplementation() {
  return (
    url: string,
    _options?: Parameters<typeof head>[1],
  ): Promise<HeadBlobResult> =>
    Promise.resolve({
      url,
      downloadUrl: `${url}?download=1`,
      size: 100,
      uploadedAt: new Date(),
      pathname: "profilesv1/image.jpg",
      contentType: "image/jpeg",
      contentDisposition: 'attachment; filename="image.jpg"',
      cacheControl: "public, max-age=31536000, s-maxage=300",
    });
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

describe("user account interactions", () => {
  test<UserContext>("find user by username", async ({
    user: { username },
    router,
  }) => {
    expect(username).not.toBeNull();
    const user = await router.user.username({ username: username! });
    expect(user.username).toBe(username);
  });

  test<UserContext>("find user by username", async ({
    user: { id },
    router,
  }) => {
    const user = await router.user.id({ id });
    expect(user.id).toBe(id);
  });

  test<UserContext>("get self", async ({ router }) => {
    const user = await router.user.me();
    expect(user).not.toBeNull();
  });

  test<UserContext>("update user info", async ({ session, router }) => {
    {
      const updated = "Jane Smith";

      {
        await router.user.update({ name: updated });
        const { name } = await router.user.me();
        expect(name).toBe(updated);
        expect(session.user?.name).toBe(updated);
      }

      {
        await router.user.update({ name: undefined });
        const { name } = await router.user.me();
        expect(name).toBe(updated);
        expect(session.user?.name).toBe(updated);
      }
    }

    vi.mocked(head).mockImplementation(mockHeadImplementation());

    {
      const updated = "https://example.com/image.jpg";

      {
        await router.user.update({ header: updated });
        const { header } = await router.user.me();
        expect(header).toBe(updated);
      }

      {
        await router.user.update({ header: undefined });
        const { header } = await router.user.me();
        expect(header).toBe(updated);
      }

      {
        await router.user.update({ header: null });
        const { header } = await router.user.me();
        expect(header).toBeNull();
      }
    }

    {
      const updated = "https://example.com/picture.jpg";

      {
        await router.user.update({ avatar: updated });
        const { image } = await router.user.me();
        expect(image).toBe(updated);
        expect(session.user?.image).toBe(updated);
      }

      {
        await router.user.update({ avatar: undefined });
        const { image } = await router.user.me();
        expect(image).toBe(updated);
        expect(session.user?.image).toBe(updated);
      }

      {
        await router.user.update({ avatar: null });
        const { image } = await router.user.me();
        expect(image).toBeNull();
        expect(session.user?.image).toBeNull();
      }
    }
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

  test<UserContext>("follow/unfollow", async ({ router }) => {
    const jane = {
      name: "Jane Smith",
      username: "jane.smith",
      birthday: new Date(),
      registered: new Date(),
    };
    await db.user.create({ data: jane });

    {
      await router.user.follow({ username: jane.username });
      const { followed } = await router.user.username({
        username: jane.username,
      });
      expect(followed).toBe(true);
    }

    {
      await router.user.unfollow({ username: jane.username });
      const { followed } = await router.user.username({
        username: jane.username,
      });
      expect(followed).toBe(false);
    }

    {
      const router = createCaller({ session: null });
      const { followed } = await router.user.username({
        username: jane.username,
      });
      expect(followed).toBe(false);
    }
  });

  test<UserContext>("search user", async ({ user: { id }, router }) => {
    await router.user.update({ bio: "Lorem ipsum" });

    const jane = await db.user.create({
      data: {
        name: "Jane Smith",
        username: "jane.smith",
        bio: "dolor sit amet",
        birthday: new Date(),
        registered: new Date(),
      },
    });

    {
      const { users } = await router.user.search({ query: "john" });
      expect(users).toHaveLength(1);
      expect(users[0]?.id).toBe(id);
    }

    {
      const { users } = await router.user.search({ query: "ipsum" });
      expect(users).toHaveLength(1);
      expect(users[0]?.id).toBe(id);
    }

    {
      const { users } = await router.user.search({ query: "jane" });
      expect(users).toHaveLength(1);
      expect(users[0]?.id).toBe(jane.id);
    }

    {
      const { users } = await router.user.search({ query: "dolor" });
      expect(users).toHaveLength(1);
      expect(users[0]?.id).toBe(jane.id);
    }
  });
});

describe("user post interactions", () => {
  test<UserContext>("create/delete posts", async ({
    user: { username },
    router,
  }) => {
    const content = "Hello world";
    const { id } = await router.post.new({ content, media: [] });

    const post = await router.post.id({ id });
    expect(post.content).toBe(content);

    const { posts } = await router.user.posts({ username: username! });
    expect(posts).toHaveLength(1);
    expect(posts[0]?.id).toBe(id);

    await router.post.delete({ id });
    await expect(async () => router.post.id({ id })).rejects.toThrowError();
  });

  test<UserContext>("reply to post", async ({ user: { username }, router }) => {
    const { id: to } = await router.post.new({
      content: "Parent post",
      media: [],
    });
    const { id } = await router.post.new({
      to,
      content: "Child post",
      media: [],
    });

    const { posts } = await router.user.replies({ username: username! });
    expect(posts).toHaveLength(1);
    expect(posts[0]?.id).toBe(id);
  });

  test<UserContext>("like a post", async ({ user: { username }, router }) => {
    const { id } = await router.post.new({
      content: "Lorem ipsum",
      media: [],
    });

    await router.post.like({ id });

    const { posts } = await router.user.likes({ username: username! });
    expect(posts).toHaveLength(1);
    expect(posts[0]?.id).toBe(id);
  });

  test<UserContext>("post with media", async ({
    user: { username },
    router,
  }) => {
    vi.mocked(head).mockImplementation(mockHeadImplementation());

    const { id } = await router.post.new({
      content: "Lorem ipsum",
      media: ["https://example.com/image.jpg"],
    });

    const { posts } = await router.user.media({ username: username! });
    expect(posts).toHaveLength(1);
    expect(posts[0]?.id).toBe(id);
  });
});

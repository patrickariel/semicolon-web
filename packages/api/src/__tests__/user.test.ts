import { createCaller } from "..";
import {
  UserContext,
  createUserContext,
  mockHeadImplementation,
} from "./utils";
import { db } from "@semicolon/db";
import { head } from "@vercel/blob";
import { describe, expect, test, vi } from "vitest";

describe("user account interactions", () => {
  test<UserContext>("find user by username", async ({
    user: { username },
    router,
  }) => {
    expect(username).not.toBeNull();
    const user = await router.user.username({ username: username! });
    expect(user.username).toBe(username);
  });

  test<UserContext>("find user by id", async ({ user: { id }, router }) => {
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

import { createCaller } from "..";
import { createUserContext, type UserContext } from "./utils";
import { describe, expect, test } from "vitest";

describe("feed interactions", () => {
  test<UserContext>("recommended feed", async ({ router }) => {
    await router.post.new({
      content: "Hello world",
      media: [],
    });

    {
      const { posts } = await router.feed.recommended({});
      expect(posts).toHaveLength(0);
    }

    const { session } = await createUserContext({
      name: "Jane Smith",
      username: "jane.smith",
      birthday: new Date(),
      registered: new Date(),
    });

    const { id } = await createCaller({ session }).post.new({
      content: "Lorem ipsum",
      media: [],
    });

    {
      const { posts } = await router.feed.recommended({});
      expect(posts).toHaveLength(1);
      expect(posts[0]?.id).toBe(id);
    }
  });

  test<UserContext>("following feed", async ({ router }) => {
    {
      const { results } = await router.feed.following({});
      expect(results).toHaveLength(0);
    }

    const {
      user: { username },
      session,
    } = await createUserContext({
      name: "Jane Smith",
      username: "jane.smith",
      birthday: new Date(),
      registered: new Date(),
    });

    const { id } = await createCaller({ session }).post.new({
      content: "Lorem ipsum",
      media: [],
    });

    await router.user.follow({ username: username! });

    {
      const { results } = await router.feed.following({});
      expect(results).toHaveLength(1);
      expect(results[0]?.id).toBe(id);
    }
  });
});

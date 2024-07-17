import { type UserContext, mockHeadImplementation } from "./utils";
import { head } from "@vercel/blob";
import { describe, expect, test, vi } from "vitest";

describe("post interactions", () => {
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

  test<UserContext>("update a post", async ({ router }) => {
    const { id } = await router.post.new({ content: "Hello world", media: [] });

    const newContent = "Lorem ipsum";
    await router.post.update({ id, content: newContent, media: [] });

    const { content } = await router.post.id({ id });
    expect(content).toBe(newContent);
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

    const { replies } = await router.post.replies({ id: to });
    expect(replies).toHaveLength(1);
    expect(replies[0]?.id).toBe(id);
  });

  test<UserContext>("like/unlike a post", async ({
    user: { username },
    router,
  }) => {
    const { id } = await router.post.new({
      content: "Lorem ipsum",
      media: [],
    });

    await router.post.like({ id });

    {
      const { posts } = await router.user.likes({ username: username! });
      expect(posts).toHaveLength(1);
      expect(posts[0]?.id).toBe(id);

      const { likeCount } = await router.post.id({ id });
      expect(likeCount).toBe(1);
    }

    await router.post.unlike({ id });

    {
      const { posts } = await router.user.likes({ username: username! });
      expect(posts).toHaveLength(0);

      const { likeCount } = await router.post.id({ id });
      expect(likeCount).toBe(0);
    }
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

    const { media } = await router.post.id({ id });
    expect(media).toHaveLength(1);
  });

  test<UserContext>("search posts", async ({ router }) => {
    const { id } = await router.post.new({
      content: "Hello world",
      media: [],
    });

    const { results } = await router.post.search({ query: "world" });
    expect(results).toHaveLength(1);
    expect(results[0]?.id).toBe(id);
  });
});

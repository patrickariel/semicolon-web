"use client";

import { BackHeader } from "@/components/back-header";
import { PostFeed } from "@/components/post-feed";
import ProfileCard from "@/components/profile-card";
import { myPostsAtom } from "@/lib/atom";
import { trpc } from "@/lib/trpc-client";
import type { PostResolved } from "@semicolon/api/schema";
import Spinner from "@semicolon/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@semicolon/ui/tabs";
import { useAtomValue } from "jotai";
import _ from "lodash";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

enum ActiveTab {
  Posts = "posts",
  Replies = "replies",
  Media = "media",
  Likes = "likes",
}

function Posts({ username }: { username: string }) {
  const {
    data: feed,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isLoadingError,
    isFetchingNextPage,
    isFetchNextPageError,
    refetch,
  } = trpc.user.posts.useInfiniteQuery(
    { username, maxResults: 15 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  const { data: session } = useSession();

  const myPosts = useAtomValue(myPostsAtom);
  const [feedArray, setFeedArray] = useState<PostResolved[]>([]);

  useEffect(() => {
    setFeedArray((feed?.pages ?? []).flatMap((page) => page.posts));
  }, [myPosts, feed, session, username]);

  return (
    <PostFeed
      posts={feedArray}
      hasNextPage={hasNextPage}
      loading={isLoading || isFetchingNextPage}
      error={isLoadingError || isFetchNextPageError}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  );
}

function Replies({ username }: { username: string }) {
  const {
    data: feed,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isLoadingError,
    isFetchingNextPage,
    isFetchNextPageError,
    refetch,
  } = trpc.user.replies.useInfiniteQuery(
    { username, maxResults: 15 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  const [feedArray, setFeedArray] = useState<PostResolved[]>([]);

  useEffect(() => {
    setFeedArray((feed?.pages ?? []).flatMap((page) => page.posts));
  }, [feed, username]);

  return (
    <PostFeed
      posts={feedArray}
      hasNextPage={hasNextPage}
      loading={isLoading || isFetchingNextPage}
      error={isLoadingError || isFetchNextPageError}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  );
}

export default function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const { data: user } = trpc.user.username.useQuery({ username });

  if (!user) {
    return (
      <div className="flex min-h-20 items-center justify-center">
        <Spinner size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <BackHeader>
        <article className="flex flex-col">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-muted-foreground text-xs">
            {`${new Intl.NumberFormat("en-US", {
              notation: "compact",
            }).format(user.posts)} posts`}
          </p>
        </article>
      </BackHeader>
      <ProfileCard
        {...user}
        coverImage="https://picsum.photos/seed/picsum/1280/720"
        isOwner={true}
        isFollowing={false}
      />
      <Tabs defaultValue={ActiveTab.Posts} className="mt-3">
        <TabsList className="static">
          <TabsTrigger value={ActiveTab.Posts}>Posts</TabsTrigger>
          <TabsTrigger value={ActiveTab.Replies}>Replies</TabsTrigger>
          <TabsTrigger value={ActiveTab.Media}>Media</TabsTrigger>
          <TabsTrigger value={ActiveTab.Likes}>Likes</TabsTrigger>
        </TabsList>
        <TabsContent value={ActiveTab.Posts}>
          <Posts username={username} />
        </TabsContent>
        <TabsContent value={ActiveTab.Replies}>
          <Replies username={username} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

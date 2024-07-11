"use client";

import { PostFeed } from "@/components/post-feed";
import { PostForm } from "@/components/post-form";
import { myPostsAtom } from "@/lib/atom";
import { trpc } from "@/lib/trpc-client";
import { PostResolved } from "@semicolon/api/schema";
import { Separator } from "@semicolon/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@semicolon/ui/tabs";
import { useAtomValue } from "jotai";
import _ from "lodash";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function Recommended() {
  const {
    data: feed,
    fetchNextPage,
    isLoading,
    isLoadingError,
    isFetchingNextPage,
    isFetchNextPageError,
    refetch,
  } = trpc.feed.recommend.useInfiniteQuery(
    { maxResults: 15 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  const myPosts = useAtomValue(myPostsAtom);
  const [feedCustom, setFeedCustom] = useState<PostResolved[]>([]);

  useEffect(() => {
    setFeedCustom(
      myPosts.concat(
        (feed?.pages ?? [])
          .flatMap((page) => page.results)
          .filter((post) => !myPosts.find((p) => p.id === post.id)),
      ),
    );
  }, [myPosts, feed]);

  return (
    <PostFeed
      posts={feedCustom}
      loading={isLoading || isFetchingNextPage}
      error={isLoadingError || isFetchNextPageError}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
    />
  );
}

enum ActiveTab {
  Recommended = "recommended",
  Chronological = "chronological",
}

export default function Page() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <Tabs defaultValue={ActiveTab.Recommended}>
        <div className="bg-card sticky top-0 z-10">
          <TabsList>
            <TabsTrigger value={ActiveTab.Recommended}>For You</TabsTrigger>
            <TabsTrigger value={ActiveTab.Chronological}>Following</TabsTrigger>
          </TabsList>
          <Separator />
        </div>
        <PostForm avatar={session?.user?.image} />
        <Separator />
        <TabsContent value={ActiveTab.Recommended}>
          <Recommended />
        </TabsContent>
        <TabsContent value={ActiveTab.Chronological}>
          Put content here
        </TabsContent>
      </Tabs>
    </div>
  );
}

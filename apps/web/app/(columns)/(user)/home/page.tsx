"use client";

import { NavTab, NavTabItem } from "@/components/nav-tab";
import { PostFeed } from "@/components/post-feed";
import { PostForm } from "@/components/post-form";
import { myPostsAtom } from "@/lib/atom";
import { trpc } from "@/lib/trpc-client";
import { Separator } from "@semicolon/ui/separator";
import { useAtomValue } from "jotai";
import _ from "lodash";
import { useSession } from "next-auth/react";
import React from "react";

export default function Page() {
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
  const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <div className="bg-card sticky top-0 z-10">
        <NavTab>
          <NavTabItem href="#" active>
            For You
          </NavTabItem>
          <NavTabItem href="#">Following</NavTabItem>
        </NavTab>
        <Separator />
      </div>
      <PostForm avatar={session?.user?.image} />
      <Separator />
      <PostFeed
        posts={myPosts.concat(
          (feed?.pages ?? []).flatMap((page) => page.results),
        )}
        loading={isLoading || isFetchingNextPage}
        error={isLoadingError || isFetchNextPageError}
        fetchNextPage={fetchNextPage}
        refetch={refetch}
      />
    </div>
  );
}

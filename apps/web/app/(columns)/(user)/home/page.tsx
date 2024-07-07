"use client";

import { NavTab, NavTabItem } from "@/components/nav-tab";
import { Post } from "@/components/post";
import { PostForm } from "@/components/post-form";
import { trpc } from "@/lib/trpc-client";
import type { PostResolved } from "@semicolon/api/schema";
import { Separator } from "@semicolon/ui/separator";
import Spinner from "@semicolon/ui/spinner";
import _ from "lodash";
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Page() {
  const {
    data: feed,
    fetchNextPage,
    isFetchingNextPage,
  } = trpc.feed.recommend.useInfiniteQuery(
    { maxResults: 25 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  const [myPosts, setMyPosts] = useState<PostResolved[]>([]);
  const { data: session } = useSession();
  const { ref, inView } = useInView({
    threshold: 0.9,
  });

  useEffect(() => {
    if (feed && inView && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [feed, inView, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col">
      <div className="bg-card sticky top-0 z-50">
        <NavTab>
          <NavTabItem href="#" active>
            For You
          </NavTabItem>
          <NavTabItem href="#">Following</NavTabItem>
        </NavTab>
        <Separator />
      </div>
      <PostForm
        avatar={session?.user?.image}
        onSuccess={(post) => setMyPosts((posts) => [post, ...posts])}
      />
      <Separator />
      {feed ? (
        <div className="flex flex-col">
          {myPosts
            .concat(feed.pages.flatMap((page) => page.results))
            .map((tweet, i) => (
              <Fragment key={i}>
                <Post {...tweet} />
                <Separator />
              </Fragment>
            ))}
        </div>
      ) : (
        <div className="flex min-h-20 items-center justify-center">
          <Spinner size={30} />
        </div>
      )}
      {feed && (
        <div className="flex h-20 flex-row items-center justify-center">
          {isFetchingNextPage ? (
            <Spinner />
          ) : (
            <div ref={ref} className="h-full"></div>
          )}
        </div>
      )}
    </div>
  );
}

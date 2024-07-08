"use client";

import { NavTab, NavTabItem } from "@/components/nav-tab";
import { Post } from "@/components/post";
import { PostForm } from "@/components/post-form";
import { trpc } from "@/lib/trpc-client";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import type { PostResolved } from "@semicolon/api/schema";
import { Alert, AlertDescription, AlertTitle } from "@semicolon/ui/alert";
import { Button } from "@semicolon/ui/button";
import { Separator } from "@semicolon/ui/separator";
import Spinner from "@semicolon/ui/spinner";
import _ from "lodash";
import { RotateCw } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

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
      {isLoadingError && (
        <div className="border-destructive m-5 flex flex-grow flex-row items-center justify-between rounded-lg border p-0">
          <Alert variant="destructive" className="border-none">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was a problem fetching your posts.
            </AlertDescription>
          </Alert>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="hover:bg-destructive/30 mr-4 aspect-square rounded-full"
            onClick={() => refetch()}
          >
            <RotateCw className="stroke-destructive" />
          </Button>
        </div>
      )}
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
        isLoading && (
          <div className="flex min-h-20 items-center justify-center">
            <Spinner size={30} />
          </div>
        )
      )}
      {!isLoadingError && (
        <div className="flex min-h-20 flex-row items-center justify-center">
          {(isFetchNextPageError as boolean) && !isFetchingNextPage ? (
            <div className="border-destructive m-5 flex flex-grow flex-row items-center justify-between rounded-lg border p-0">
              <Alert variant="destructive" className="border-none">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  There was a problem fetching your posts.
                </AlertDescription>
              </Alert>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-destructive/30 mr-4 aspect-square rounded-full"
                onClick={() => refetch()}
              >
                <RotateCw className="stroke-destructive" />
              </Button>
            </div>
          ) : isFetchingNextPage ? (
            <Spinner />
          ) : (
            <div ref={ref} className="h-full" />
          )}
        </div>
      )}
    </div>
  );
}

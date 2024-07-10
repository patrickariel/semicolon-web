"use client";

import { PostDetail } from "@/components/post-detail";
import { PostFeed } from "@/components/post-feed";
import { PostForm } from "@/components/post-form";
import { myPostsAtom } from "@/lib/atom";
import { trpc } from "@/lib/trpc-client";
import { PostResolved } from "@semicolon/api/schema";
import { Button } from "@semicolon/ui/button";
import { Separator } from "@semicolon/ui/separator";
import Spinner from "@semicolon/ui/spinner";
import { useAtomValue } from "jotai";
import _ from "lodash";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page({
  params: { username, id },
}: {
  params: { username: string; id: string };
}) {
  const router = useRouter();
  const { data: post } = trpc.post.id.useQuery({ id });
  const { data: session } = useSession();
  const {
    data: replies,
    fetchNextPage,
    isLoading,
    isLoadingError,
    isFetchingNextPage,
    isFetchNextPageError,
    refetch,
  } = trpc.post.replies.useInfiniteQuery(
    { id, maxResults: 15 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );
  const [myReplies, setMyReplies] = useState<PostResolved[]>([]);
  const myPosts = useAtomValue(myPostsAtom);

  useEffect(() => {
    setMyReplies(
      myPosts
        .filter((post) => post.parentId === id)
        .map((reply) => {
          reply.to = null;
          return reply;
        }),
    );
  }, [id, myPosts]);

  useEffect(() => {
    if (post && username !== post.username) {
      window.history.replaceState(null, "", `/${post.username}/post/${id}`);
    }
  }, [username, post, id]);

  if (!post) {
    return (
      <div className="flex min-h-20 items-center justify-center">
        <Spinner size={30} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-row items-center gap-8 p-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full p-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="size-6" />
        </Button>
        <h3 className="text-xl font-semibold">Post</h3>
      </div>
      <PostDetail {...post} />
      <PostForm
        to={id}
        avatar={session?.user?.image}
        placeholder="Post your reply"
      />
      <Separator />
      <div className="mb-4 flex flex-col">
        <PostFeed
          posts={myReplies.concat(
            (replies?.pages ?? []).flatMap((page) => page.replies),
          )}
          loading={isLoading || isFetchingNextPage}
          error={isLoadingError || isFetchNextPageError}
          fetchNextPage={fetchNextPage}
          refetch={refetch}
        />
      </div>
    </div>
  );
}

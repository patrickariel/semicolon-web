"use client";

import { Post } from "@/components/post";
import { PostDetail } from "@/components/post-detail";
import { PostForm } from "@/components/post-form";
import { trpc } from "@/lib/trpc-client";
import { Button } from "@semicolon/ui/button";
import { Separator } from "@semicolon/ui/separator";
import Spinner from "@semicolon/ui/spinner";
import _ from "lodash";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect } from "react";

export default function Page({
  params: { username, id },
}: {
  params: { username: string; id: string };
}) {
  const router = useRouter();
  const { data: post } = trpc.post.id.useQuery({ id });
  const { data: session } = useSession();
  const { data: replies } = trpc.post.replies.useQuery({ id });

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
        {replies ? (
          replies.replies.map((post, i) => (
            <Fragment key={i}>
              <Post {...post} />
              <Separator />
            </Fragment>
          ))
        ) : (
          <div className="flex min-h-20 items-center justify-center">
            <Spinner size={30} />
          </div>
        )}
      </div>
    </div>
  );
}

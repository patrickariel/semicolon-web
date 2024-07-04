"use client";

import { CommentForm } from "@/components/comment-form";
import { HeaderWithBackButton } from "@/components/header-detail-tweet";
import { Post } from "@/components/post";
import { PostDetail } from "@/components/post-detail";
import { trpc } from "@/lib/trpc-client";
import { Separator } from "@semicolon/ui/separator";
import _ from "lodash";
import React, { Fragment } from "react";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data: tweet } = trpc.post.id.useQuery({ id });
  const { data } = trpc.post.search.useQuery({});

  if (!tweet || !data) {
    return;
  }

  return (
    <div>
      <HeaderWithBackButton />
      <PostDetail {...tweet} />
      <CommentForm />
      <Separator />
      <div className="mb-4 flex flex-col">
        {data.results.map((tweet, i) => (
          <Fragment key={i}>
            <Post {...tweet} />
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

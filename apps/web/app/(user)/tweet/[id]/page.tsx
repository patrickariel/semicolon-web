"use client";

import { CommentForm } from "@/components/comment-form";
import TweetDetail from "@/components/detail-tweet";
import HeaderWithBackButton from "@/components/header-detail-tweet";
import { Tweet } from "@/components/tweet";
import { trpc } from "@/lib/trpc-client";
import { uuidTranslator } from "@/lib/utils";
import { Separator } from "@semicolon/ui/separator";
import _ from "lodash";
import React, { Fragment } from "react";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data: tweet } = trpc.post.id.useQuery({
    id: uuidTranslator.toUUID(id),
  });

  const { data } = trpc.post.search.useQuery({});

  if (!tweet) {
    return;
  }

  if (!data) {
    return;
  }

  return (
    <div>
      <HeaderWithBackButton />
      <TweetDetail {...tweet} />
      <CommentForm />
      <Separator />
      <div className="mb-4 flex flex-col">
        {data.results.map((tweet, i) => (
          <Fragment key={i}>
            <Tweet {...tweet} />
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

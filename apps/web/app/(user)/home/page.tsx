"use client";

import { FeedHeader } from "@/components/feed-header";
import { PostForm } from "@/components/post-form";
import { Tweet } from "@/components/tweet";
import { trpc } from "@/lib/trpc-client";
import { Separator } from "@semicolon/ui/separator";
import Spinner from "@semicolon/ui/spinner";
import _ from "lodash";
import React, { Fragment } from "react";

export default function Page() {
  const { data } = trpc.post.search.useQuery({});

  if (!data) {
  }

  return (
    <div className="flex flex-col">
      <div className="bg-card sticky top-0 z-50">
        <FeedHeader />
        <Separator />
      </div>
      <PostForm />
      <Separator />
      {data ? (
        <div className="mb-4 flex flex-col">
          {data.results.map((tweet, i) => (
            <Fragment key={i}>
              <Tweet {...tweet} />
              <Separator />
            </Fragment>
          ))}
        </div>
      ) : (
        <div className="flex min-h-32 items-center justify-center">
          <Spinner size={30} />
        </div>
      )}
    </div>
  );
}

"use client";

import { FeedHeader } from "@/components/feed-header";
import { PostForm } from "@/components/post-form";
import { Tweet } from "@/components/tweet";
import { Separator } from "@semicolon/ui/separator";
import _ from "lodash";
import React, { Fragment } from "react";

export default function Page() {
  return (
    <div className="flex flex-col">
      <div className="bg-card sticky top-0 z-50">
        <FeedHeader />
        <Separator />
      </div>
      <PostForm />
      <Separator />
      <div className="mb-4 flex flex-col">
        <Tweet
          username="i_have_a_really_long_username_and_i_cannot_lie"
          date="2024-06-21"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend libero id facilisis scelerisque. Nulla nec lectus tristique, ultricies felis sed, suscipit neque."
          feeling="🤩 happy"
        />
        <Separator />
        {_.range(0, 16).map((i) => (
          <Fragment key={i}>
            <Tweet
              username="example_user"
              date="2024-06-21"
              content="This is a sample tweet content."
              feeling="🤩 happy"
            />
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

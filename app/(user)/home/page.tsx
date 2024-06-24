"use client";

import { FeedHeader } from "@/components/feed-header";
import { PostForm } from "@/components/post-form";
import { Tweet } from "@/components/tweet";
import { Separator } from "@/components/ui/separator";
import _ from "lodash";
import React from "react";

export default function Page() {
  return (
    <div className="flex h-fit min-w-[257px] grow flex-col md:max-w-[600px]">
      <FeedHeader />
      <Separator />
      <div className="px-4 pb-[16px] pt-[20px]">
        <PostForm />
      </div>
      <Separator />
      <div className="mb-4 flex flex-col">
        <Tweet
          username="i_have_a_really_long_username_and_i_cannot_lie"
          date="2024-06-21"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend libero id facilisis scelerisque. Nulla nec lectus tristique, ultricies felis sed, suscipit neque."
          feeling="🤩 happy"
        />
        <Separator />
        {_.range(0, 10).map(() => (
          <>
            <Tweet
              username="example_user"
              date="2024-06-21"
              content="This is a sample tweet content."
              feeling="🤩 happy"
            />
            <Separator />
          </>
        ))}
      </div>
    </div>
  );
}

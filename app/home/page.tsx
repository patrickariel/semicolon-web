"use client";

import { BottomBar } from "@/components/bottom-bar";
import { FeedHeader } from "@/components/feed-header";
import { PostForm } from "@/components/post-form";
import { SearchBar } from "@/components/search-bar";
import { SideBar } from "@/components/side-bar";
import { Suggestions } from "@/components/suggestions";
import { Trends } from "@/components/trends";
import { Tweet } from "@/components/tweet";
import { Separator } from "@/components/ui/separator";
import _ from "lodash";
import React from "react";

export default function Page() {
  return (
    <div className="container mx-auto flex min-h-screen w-screen min-w-[280px] flex-col px-0 md:pr-8 lg:px-8">
      <div className="flex min-h-full w-full flex-row justify-center">
        <div className="hidden max-w-[270px] px-4 py-3 min-[400px]:block md:px-8 lg:w-full lg:py-7">
          <SideBar />
        </div>

        <Separator orientation="vertical" className="h-auto min-h-screen" />

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

        <Separator orientation="vertical" className="h-auto min-h-screen" />

        <div className="hidden w-1/4 min-w-[300px] flex-none shrink-0 flex-col md:flex">
          <div className="flex flex-col gap-5 py-[30px] pl-[30px]">
            <SearchBar />
            <Suggestions />
            <div className="flex flex-col rounded-[16px] bg-secondary">
              <Trends />
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}

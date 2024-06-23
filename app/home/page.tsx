"use client";

import FeedHeader from "@/components/feed-header";
import PostForm from "@/components/post-form";
import SearchBar from "@/components/search-bar";
import { Sidebar } from "@/components/sidebar";
import Suggestions from "@/components/suggestions";
import Trends from "@/components/trends";
import { Tweet } from "@/components/tweet";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Page() {
  return (
    <div className="container mx-auto flex w-screen flex-row px-0 md:pr-8 lg:px-8">
      <div className="flex w-full flex-row">
        <div className="px-5 py-3 md:px-8 lg:py-8">
          <Sidebar />
        </div>

        <Separator orientation="vertical" className="min-h-screen" />

        <div className="flex h-fit min-w-[257px] grow flex-col">
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
              content="This is a sample tweet content."
              feeling="🤩 happy"
            />
            <Separator />
            <Tweet
              username="example_user"
              date="2024-06-21"
              content="This is a sample tweet content."
              feeling="🤩 happy"
            />
            <Separator />
          </div>
        </div>

        <Separator orientation="vertical" />

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
    </div>
  );
}

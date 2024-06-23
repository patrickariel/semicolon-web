"use client";

import FeedHeader from "@/components/feed-header";
import Logo from "@/components/logo";
import PostForm from "@/components/post-form";
import SearchBar from "@/components/search-bar";
import Sidebar from "@/components/sidebar";
import Suggestions from "@/components/suggestions";
import Trends from "@/components/trends";
import Tweet from "@/components/tweet";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

const IndexPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="max-w-7xl mx-auto text-white">
      <div className="lg:hidden flex justify-between items-center mb-8 px-4 py-2">
        <div className="rounded-full overflow-hidden">
          <Image
            src="/images/az-profile.jpg"
            alt="search"
            width={46}
            height={46}
            className="object-cover"
          />
        </div>
        <Logo className="flex-grow text-center" />
        <Button onClick={toggleSidebar} className="focus:outline-none">
          {sidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </Button>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        >
          <div className="w-2/3 bg-gray-800 h-full p-4">
            <Sidebar />
          </div>
        </div>
      )}

      <div className="px-4 lg:px-[75px] min-w-fit flex justify-between">
        <div className="min-w-[230px] hidden lg:block w-1/4">
          <Sidebar />
        </div>

        <div className="h-fit border-l-2 border-r-2 border-line mx-4 lg:mx-0">
          <div className="mb-4">
            <FeedHeader />
          </div>

          <div className="pt-[20px] pb-[16px] px-4 border-b-2 border-line">
            <PostForm />
          </div>

          <div className="mb-4">
            <Tweet
              username="example_user"
              date="2024-06-21"
              content="This is a sample tweet content."
              feeling="🤩 happy"
            />
            <Tweet
              username="example_user"
              date="2024-06-21"
              content="This is a sample tweet content."
              feeling="🤩 happy"
            />
          </div>
        </div>

        <div className="hidden lg:block w-[320px]">
          <div className="pl-[30px] flex flex-col gap-5 py-[30px]">
            <SearchBar />

            <div className="flex flex-col p-3.5 rounded-[16px] bg-secondary">
              <Suggestions />
            </div>

            <div className="flex flex-col rounded-[16px] bg-secondary">
              <Trends />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

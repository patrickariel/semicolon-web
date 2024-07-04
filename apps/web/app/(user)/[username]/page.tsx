"use client";

import { Post } from "@/components/post";
import ProfileCard from "@/components/profile-card";
import { Separator } from "@semicolon/ui/separator";
import _ from "lodash";
import React from "react";

export default function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const isOwner = true; // Replace with actual logic to check if logged-in user is the profile owner
  const isFollowing = false; // Replace with actual logic to check if logged-in user is following the profile

  return (
    <div className="flex flex-col">
      <ProfileCard
        name="example_user"
        username={username}
        bio="Newbie coder, trying to be better."
        location="Indoensia"
        following={122}
        followers={17273}
        coverImage="https://cdn.pixabay.com/photo/2017/08/05/12/58/computer-2583383_1280.jpg"
        profileImage="https://avatars.githubusercontent.com/u/28171661"
        createdAt={new Date("2024-02-01")}
        verified={true}
        isOwner={isOwner}
        isFollowing={isFollowing}
      />
      <Separator />
      <div className="mb-4 flex flex-col">
        {_.range(0, 16).map((index) => (
          <React.Fragment key={index}>
            <Post
              id=""
              name=""
              avatar={null}
              username="example_user"
              createdAt={new Date()}
              content="This is a sample tweet content."
            />
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

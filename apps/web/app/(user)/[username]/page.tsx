"use client";

import { Post } from "@/components/post";
import ProfileCard from "@/components/profile-card";
import { trpc } from "@/lib/trpc-client";
import { Separator } from "@semicolon/ui/separator";
import Spinner from "@semicolon/ui/spinner";
import _ from "lodash";
import React from "react";

export default function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const { data: user } = trpc.user.username.useQuery({ username });
  const { data: posts } = trpc.post.search.useQuery({
    from: username,
    reply: false,
  });

  if (!user) {
    return (
      <div className="flex min-h-20 items-center justify-center">
        <Spinner size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <ProfileCard
        name={user.name}
        username={username}
        bio="Newbie coder, trying to be better."
        following={user.following}
        followers={user.followers}
        coverImage="https://cdn.pixabay.com/photo/2017/08/05/12/58/computer-2583383_1280.jpg"
        profileImage={user.image}
        location="Europe"
        createdAt={new Date("2024-02-01")}
        verified={true}
        isOwner={true}
        isFollowing={false}
      />
      <Separator />
      <div className="mb-4 flex flex-col">
        {posts ? (
          posts.results.map((post, i) => (
            <React.Fragment key={i}>
              <Post {...post} />
              <Separator />
            </React.Fragment>
          ))
        ) : (
          <Spinner size={30} />
        )}
      </div>
    </div>
  );
}

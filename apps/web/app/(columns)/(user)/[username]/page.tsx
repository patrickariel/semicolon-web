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
        bio={user.bio}
        following={user.following}
        followers={user.followers}
        coverImage="https://picsum.photos/seed/picsum/1280/720"
        profileImage={user.image}
        location={user.location}
        createdAt={user.registered}
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

"use client";

import { Post } from "@/components/post";
import { BackHeader } from "@/components/back-header";
import ProfileCard from "@/components/profile-card";
import { trpc } from "@/lib/trpc-client";
import { Separator } from "@semicolon/ui/separator";
import Spinner from "@semicolon/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@semicolon/ui/tabs";
import _ from "lodash";
import React from "react";

enum ActiveTab {
  Posts = "posts",
  Replies = "replies",
  Media = "media",
  Likes = "likes",
}

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
      <BackHeader>
        <article className="flex flex-col">
          <p className="text-xl font-semibold">{user.name}</p>
          <p className="text-muted-foreground text-xs">
            {`${new Intl.NumberFormat("en-US", {
              notation: "compact",
            }).format(user.posts)} posts`}
          </p>
        </article>
      </BackHeader>
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
      <Tabs defaultValue={ActiveTab.Posts} className="mt-3">
        <TabsList>
          <TabsTrigger value={ActiveTab.Posts}>Posts</TabsTrigger>
          <TabsTrigger value={ActiveTab.Replies}>Replies</TabsTrigger>
          <TabsTrigger value={ActiveTab.Media}>Media</TabsTrigger>
          <TabsTrigger value={ActiveTab.Likes}>Likes</TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value={ActiveTab.Posts}>
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

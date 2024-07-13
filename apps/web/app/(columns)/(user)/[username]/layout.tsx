"use client";

import { BackHeader } from "@/components/back-header";
import ProfileCard from "@/components/profile-card";
import { TabsList, TabsLink } from "@/components/tabs-link";
import { trpc } from "@/lib/trpc-client";
import Spinner from "@semicolon/ui/spinner";
import _ from "lodash";
import React from "react";

export default function Page({
  params: { username },
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  const { data: user } = trpc.user.username.useQuery({ username });

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
        {...user}
        coverImage="https://picsum.photos/seed/picsum/1280/720"
        isOwner={true}
        isFollowing={false}
      />
      <TabsList className="static mt-1">
        <TabsLink href={`/${username}`}>Posts</TabsLink>
        <TabsLink href={`/${username}/replies`}>Replies</TabsLink>
        <TabsLink href={`/${username}/media`}>Media</TabsLink>
        <TabsLink href={`/${username}/likes`}>Likes</TabsLink>
      </TabsList>
      {children}
    </div>
  );
}

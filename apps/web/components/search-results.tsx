import { trpc } from "../lib/trpc";
import { Tweet } from "./tweet";
import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Button } from "@semicolon/ui/button";
import { Card, CardContent } from "@semicolon/ui/card";
import { Separator } from "@semicolon/ui/separator";
import { BadgeCheck } from "lucide-react";
import React from "react";

// root/apps/web/components/search-results.tsx

export function SearchResults({ query }: { query: string }) {
  const { data, error, isLoading } = trpc.search.searchPosts.useQuery(query);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const { postResults, userResults } = data;

  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold">Users</h2>
        {userResults.length === 0 && <p>No users found.</p>}
        {userResults.map((user) => (
          <Card key={user.id}>
            <CardContent>
              <div className="flex items-center gap-3">
                <Avatar className="size-11">
                  <AvatarImage width={300} height={300} src={user.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="flex items-center gap-2 text-base font-bold">
                    {user.name} <BadgeCheck className="size-5 stroke-sky-400" />
                  </span>
                  <p className="text-muted-foreground text-sm">
                    @{user.username}
                  </p>
                  <p className="text-muted-foreground text-sm">{user.bio}</p>
                </div>
                <Button className="ml-auto">Follow</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      <div className="mt-4">
        <h2 className="text-xl font-bold">Posts</h2>
        {postResults.length === 0 && <p>No posts found.</p>}
        {postResults.map((post) => (
          <Tweet key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const suggestions = [
  {
    name: "Rio Triadi",
    username: "superiot",
    avatar: "https://avatars.githubusercontent.com/u/29686170",
  },
  {
    name: "La Ode",
    username: "L.0de",
    avatar: "https://avatars.githubusercontent.com/u/64969059",
  },
  {
    name: "Fathan F",
    username: "a-really-long-ass-username",
    avatar:
      "https://ipfs.io/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/611.jpg",
  },
];

export function Suggestions() {
  return (
    <Card>
      <CardHeader>You might like</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          {suggestions.map((user) => (
            <div
              key={user.username}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0">
                <Avatar className="size-11">
                  <AvatarImage width={300} height={300} src={user.avatar} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col pl-2">
                  <span className="flex flex-row items-center gap-2 text-base font-bold">
                    <p className="truncate">{user.name}</p>
                    <BadgeCheck className="size-5 flex-none stroke-sky-400" />
                  </span>
                  <p className="truncate text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
              <Button
                type="submit"
                className="cursor-pointer rounded-full font-bold text-black"
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="#" className="text-sm text-sky-400 hover:underline">
          Show more
        </Link>
      </CardFooter>
    </Card>
  );
}

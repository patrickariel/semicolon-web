import { Card, CardContent, CardHeader } from "@semicolon/ui/card";
import Link from "next/link";
import React from "react";

const trends = [
  { rank: 1, topic: "bootcamp javascript", posts: "32K posts" },
  { rank: 2, topic: "mern technology", posts: "30K posts" },
  { rank: 3, topic: "how to learn next js", posts: "27K posts" },
  { rank: 4, topic: "knex vs sequelize", posts: "25K posts" },
  { rank: 5, topic: "next js or svelte?", posts: "24K posts" },
  { rank: 6, topic: "praesent sed", posts: "12K posts" },
  { rank: 7, topic: "sem commodo", posts: "15K posts" },
  { rank: 8, topic: "fermentum orci id", posts: "10K posts" },
  { rank: 9, topic: "amet mauris", posts: "11K posts" },
];

export function Trends() {
  return (
    <Card>
      <CardHeader>Indonesia trends</CardHeader>
      <CardContent className="flex flex-col gap-5">
        {trends.map((trend) => (
          <Link
            key={trend.rank}
            href="#"
            className="flex items-center justify-between"
          >
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground align-bottom text-sm">
                Topic
              </p>
              <p className="font-bold">{trend.topic}</p>
              <p className="text-muted-foreground text-sm">{trend.posts}</p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

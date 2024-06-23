import Link from "next/link";
import React from "react";

const trends = [
  { rank: 1, topic: "bootcamp javascript", posts: "32K posts" },
  { rank: 2, topic: "mern technology", posts: "30K posts" },
  { rank: 3, topic: "how to learn next js", posts: "27K posts" },
  { rank: 4, topic: "knex vs sequelize", posts: "25K posts" },
  { rank: 5, topic: "next js or svelte?", posts: "24K posts" },
];

const Trends = () => (
  <div className="flex flex-col py-3.5">
    <h2 className="font-bold text-lg pb-[7px] px-3.5">Indonesia trends</h2>
    {trends.map((trend) => (
      <Link
        key={trend.rank}
        href="#"
        className="flex justify-between items-center hover:bg-gray-800"
      >
        <div className="flex px-3.5 py-[7px]">
          <div>
            <p className="text-username text-sm">{trend.rank} • Trending</p>
            <p className="text-base font-bold">{trend.topic}</p>
            <p className="text-username text-sm">{trend.posts}</p>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

export default Trends;

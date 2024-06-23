import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const suggestions = [
  { name: "Rio Triadi", username: "superiot", avatar: "/images/girl1.png" },
  {
    name: "La Ode",
    username: "L.0de",
    avatar: "/images/man1.png",
  },
  {
    name: "Fathan F",
    username: "ff.12",
    avatar: "/images/girl2.png",
  },
];

const Suggestions = () => (
  <div className="flex flex-col gap-6">
    <h2 className="font-bold text-lg">You might like</h2>
    {suggestions.map((user) => (
      <div key={user.username} className="flex justify-between items-center">
        <div className="flex">
          <Image
            src={user.avatar}
            alt="avatar"
            width={46}
            height={46}
            className="rounded-full"
          />
          <div className="pl-2">
            <p className="text-base font-bold">
              {user.name}
              <Image
                src="/images/verify.png"
                alt="verify"
                width={26}
                height={26}
                className="inline w-5 rounded-full"
              />
            </p>
            <p className="text-username text-sm">@{user.username}</p>
          </div>
        </div>
        <Button
          type="submit"
          className="rounded-full text-black font-bold cursor-pointer"
        >
          Follow
        </Button>
      </div>
    ))}
    <Link href="#" className="font-medium text-link pl-2">
      Show more
    </Link>
  </div>
);

export default Suggestions;

import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import {
  BadgeCheck,
  BarChart2,
  Ellipsis,
  Heart,
  MessageCircle,
  Repeat2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TweetProps {
  name: string;
  username: string;
  date: string;
  content: string;
  feeling: string;
  image?: string;
}

export function Tweet({ name, username, date, content, image }: TweetProps) {
  return (
    <div className="flex w-full flex-row gap-3 p-4">
      <div className="pt-2">
        <Avatar className="size-11">
          <AvatarImage
            width={300}
            height={300}
            src="https://avatars.githubusercontent.com/u/28171661"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex w-full min-w-0 flex-col">
        <div className="flex items-center justify-between gap-2">
          <div className="flex w-full min-w-0 flex-col items-start justify-start gap-2 sm:flex-row sm:items-center">
            <div className="flex min-w-0 max-w-full gap-1">
              <div className="flex min-w-0 flex-row items-center gap-1 text-sm">
                <p className="truncate font-bold">{name}</p>
                <BadgeCheck className="size-5 flex-none stroke-sky-400" />
              </div>
            </div>
            <div className="flex min-w-0 max-w-full flex-row items-center gap-1">
              <p className="text-muted-foreground truncate align-middle text-sm">
                @{username}
              </p>
              <p className="text-muted-foreground align-middle text-sm">•</p>
              <p className="text-muted-foreground text-nowrap align-middle text-sm">
                {date}
              </p>
            </div>
          </div>
          <Ellipsis className="flex-none" />
        </div>
        <p className="text-wrap py-2.5 text-sm leading-7">{content}</p>

        {image && (
          <div className="my-3 flex items-center justify-center">
            <Image
              src={image}
              alt="tweet-image"
              width={300}
              height={200}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="flex w-full min-w-0 items-center justify-between gap-2 lg:px-3">
          <Link
            href="#"
            className="cursor flex items-center justify-start gap-1"
          >
            <MessageCircle className="stroke-muted-foreground size-[1.1rem]" />
            <p className="text-muted-foreground text-xs">15</p>
          </Link>
          <Link
            href="#"
            className="cursor flex items-center justify-start gap-1"
          >
            <Repeat2 className="stroke-muted-foreground size-[1.1rem]" />
            <p className="text-muted-foreground text-xs">15</p>
          </Link>
          <Link
            href="#"
            className="cursor flex items-center justify-start gap-1"
          >
            <Heart className="stroke-muted-foreground size-[1.1rem]" />
            <p className="text-muted-foreground text-xs">15</p>
          </Link>
          <Link
            href="#"
            className="cursor flex items-center justify-start gap-1"
          >
            <BarChart2 className="stroke-muted-foreground size-[1.1rem]" />
            <p className="text-muted-foreground text-xs">15</p>
          </Link>
          <Link href="#" className="flex items-center justify-start gap-1">
            <Upload className="stroke-muted-foreground size-[1.1rem]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

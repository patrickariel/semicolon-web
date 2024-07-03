import { uuidTranslator } from "@/lib/utils";
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
  id: string;
  name: string;
  username: string;
  avatar: string | null;
  createdAt: Date;
  content: string;
  image?: string;
}

export function Post({
  id,
  name,
  avatar,
  username,
  createdAt,
  content,
  image,
}: TweetProps) {
  return (
    <Link href={`/post/${uuidTranslator.fromUUID(id)}`}>
      <div className="flex w-full flex-row gap-3 p-4">
        <div className="pt-2">
          <Avatar className="size-11">
            {avatar && <AvatarImage width={300} height={300} src={avatar} />}
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
                  {createdAt.toDateString()}
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
            <div className="cursor flex items-center justify-start gap-1">
              <MessageCircle className="stroke-muted-foreground size-[1.1rem]" />
              <p className="text-muted-foreground text-xs">15</p>
            </div>
            <div className="cursor flex items-center justify-start gap-1">
              <Repeat2 className="stroke-muted-foreground size-[1.1rem]" />
              <p className="text-muted-foreground text-xs">15</p>
            </div>
            <div className="cursor flex items-center justify-start gap-1">
              <Heart className="stroke-muted-foreground size-[1.1rem]" />
              <p className="text-muted-foreground text-xs">15</p>
            </div>
            <div className="cursor flex items-center justify-start gap-1">
              <BarChart2 className="stroke-muted-foreground size-[1.1rem]" />
              <p className="text-muted-foreground text-xs">15</p>
            </div>
            <div className="cursor flex items-center justify-start gap-1">
              <Upload className="stroke-muted-foreground size-[1.1rem]" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

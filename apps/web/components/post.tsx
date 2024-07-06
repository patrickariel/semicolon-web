import { PostButton } from "./post-button";
import { ThumbGrid } from "./thumb-grid";
import { formatLongDate, formatShortDate } from "@/lib/utils";
import type { PostResolved } from "@semicolon/api/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Button } from "@semicolon/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@semicolon/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@semicolon/ui/tooltip";
import {
  BadgeCheck,
  BarChart2,
  Bookmark,
  Ellipsis,
  Flag,
  Heart,
  MessageCircle,
  Repeat2,
  Upload,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export function Post({
  id,
  name,
  avatar,
  username,
  verified,
  createdAt,
  content,
  media,
  views,
  replyCount,
  likeCount,
}: PostResolved) {
  const router = useRouter();

  return (
    <div
      className="relative flex w-full cursor-pointer flex-row gap-3 p-4 pb-2"
      tabIndex={0}
      onClick={() => {
        if (document.getSelection()?.type !== "Range") {
          router.push(`/post/${id}`);
        }
      }}
      onKeyUp={(e) => {
        e.key === "Enter" ? router.push(`/post/${id}`) : null;
      }}
    >
      <div className="pt-2">
        <Link
          href={`/${username}`}
          onClick={(e) => e.stopPropagation()}
          className="z-10"
        >
          <Avatar className="size-11">
            {avatar && <AvatarImage width={300} height={300} src={avatar} />}
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>{" "}
        </Link>
      </div>
      <div className="flex w-full min-w-0 flex-col gap-2">
        <div className="flex items-center justify-between gap-1">
          <div className="flex w-full min-w-0 flex-col items-start justify-start gap-2 sm:flex-row sm:items-center">
            <div className="flex min-w-0 max-w-full gap-1">
              <div className="flex min-w-0 flex-row items-center gap-1 text-sm">
                <Link
                  href={`/${username}`}
                  className="truncate font-bold hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {name}
                </Link>
                {verified && (
                  <BadgeCheck className="size-5 flex-none stroke-sky-400" />
                )}
              </div>
            </div>
            <div className="flex min-w-0 max-w-full flex-row items-center gap-1">
              <Link
                className="text-muted-foreground truncate align-middle text-sm"
                href={`/${username}`}
                onClick={(e) => e.stopPropagation()}
              >
                @{username}
              </Link>
              <p className="text-muted-foreground align-middle text-sm">•</p>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href={`/post/${id}`}
                    className="text-muted-foreground text-nowrap align-middle text-sm hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {formatShortDate(createdAt)}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{formatLongDate(createdAt)}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="aspect-square size-fit rounded-full p-2"
              >
                <Ellipsis className="flex-none" size={19} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-2 rounded-3xl px-0 py-4 [&>*]:min-w-40 [&>*]:text-base [&>*]:font-bold">
              <Button
                variant="ghost"
                className="justify-start gap-4 rounded-none p-6 px-4"
              >
                <UserPlus size={23} />
                <div>Follow {`@${username}`}</div>
              </Button>
              <Button
                variant="ghost"
                className="justify-start gap-4 rounded-none p-6 px-4"
              >
                <Flag size={23} />
                <div>Report post</div>
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-wrap text-sm leading-7">{content}</p>

        {media.length > 0 && <ThumbGrid srcs={media} />}

        <div className="flex w-full min-w-0 items-center justify-between">
          <PostButton
            icon={MessageCircle}
            href={`/post/${id}`}
            label={replyCount}
          />
          <PostButton
            icon={Repeat2}
            highlight="green"
            onClick={() => undefined}
            label={15}
          />
          <PostButton
            icon={Heart}
            highlight="pink"
            onClick={() => undefined}
            label={likeCount}
          />
          <PostButton
            icon={BarChart2}
            onClick={() => undefined}
            label={views}
          />
          <div className="flex flex-row">
            <PostButton icon={Bookmark} onClick={() => undefined} />
            <PostButton icon={Upload} onClick={() => undefined} />
          </div>
        </div>
      </div>
    </div>
  );
}

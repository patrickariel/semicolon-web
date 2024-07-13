import { PostButton } from "./post-button";
import { PostDropdown } from "./post-dropdown";
import { PostForm } from "./post-form";
import { ThumbGrid } from "./thumb-grid";
import { trpc } from "@/lib/trpc-client";
import { formatLongDate, formatShortDate } from "@/lib/utils";
import type { PostResolved } from "@semicolon/api/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@semicolon/ui/dialog";
import { Separator } from "@semicolon/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@semicolon/ui/tooltip";
import {
  BadgeCheck,
  BarChart2,
  Bookmark,
  Heart,
  MessageCircle,
  Repeat2,
  Upload,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function ReplyIndicator({
  name,
  avatar,
  username,
  verified,
  createdAt,
  content,
}: PostResolved) {
  return (
    <div className="relative flex w-full flex-row gap-3 p-3 pb-2">
      <div className="flex flex-col items-center pt-2">
        <Avatar className="size-11">
          {avatar && <AvatarImage width={300} height={300} src={avatar} />}
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
        <Separator orientation="vertical" className="shrink border-2" />
      </div>
      <div className="flex w-full min-w-0 flex-col gap-2">
        <div className="flex flex-col gap-0">
          <div className="flex items-center justify-between gap-1">
            <div className="flex w-full min-w-0 flex-col items-start justify-start gap-2 sm:flex-row sm:items-center">
              <div className="flex min-w-0 max-w-full gap-1">
                <div className="flex min-w-0 flex-row items-center gap-1 text-sm">
                  <p className="truncate font-bold">{name}</p>
                  {verified && (
                    <BadgeCheck className="size-5 flex-none stroke-sky-400" />
                  )}
                </div>
              </div>
              <div className="flex min-w-0 max-w-full flex-row items-center gap-1">
                <p className="text-muted-foreground truncate align-middle text-sm">
                  @{username}
                </p>
                <p className="text-muted-foreground align-middle text-sm">•</p>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-muted-foreground text-nowrap align-middle text-sm">
                      {formatShortDate(createdAt)}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{formatLongDate(createdAt)}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <p className="text-wrap text-sm leading-7">{content}</p>
          <p className="mt-3 text-[15px]">
            Replying to <span className="text-sky-400">@{username}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Post(post: PostResolved) {
  const router = useRouter();
  const {
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
    to,
  } = post;
  const utils = trpc.useUtils();
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();

  return (
    <div
      className="relative flex w-full cursor-pointer flex-row gap-3 p-4 pb-2"
      tabIndex={0}
      onClick={() => {
        if (document.getSelection()?.type !== "Range") {
          utils.post.id.setData({ id }, post);
          router.push(`/${username}/post/${id}`);
        }
      }}
      onKeyUp={(e) => {
        e.key === "Enter" ? router.push(`/${username}/post/${id}`) : null;
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
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <div className="flex w-full min-w-0 flex-col gap-2">
        <div className="flex flex-col gap-0">
          <div className="flex items-center justify-between gap-1">
            <div className="flex w-full min-w-0 flex-col items-start justify-start gap-0 sm:flex-row sm:items-center sm:gap-2">
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
                  <TooltipTrigger asChild>
                    <Link
                      href={`/${username}/post/${id}`}
                      className="text-muted-foreground text-nowrap align-middle text-sm hover:underline"
                      onClick={(e) => {
                        utils.post.id.setData({ id }, post);
                        e.stopPropagation();
                      }}
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
            <PostDropdown
              {...post}
              isOwner={session?.user?.name === post.name}
            />
          </div>
          {to && (
            <p className="text-sm">
              <span className="text-muted-foreground">Replying to</span>{" "}
              <Link
                href={`/${to}`}
                className="truncate font-bold text-sky-400 hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                @{to}
              </Link>
            </p>
          )}
          <p className="text-wrap text-[15px] leading-7">{content}</p>
        </div>

        {media.length > 0 && <ThumbGrid {...post} />}

        <div className="flex w-full min-w-0 items-center justify-between">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <PostButton icon={MessageCircle} label={replyCount} />
            </DialogTrigger>
            <DialogContent
              onClick={(e) => e.stopPropagation()}
              onKeyUp={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col">
                <ReplyIndicator {...post} />
                <PostForm
                  to={id}
                  placeholder="Post your reply"
                  avatar={session?.user?.image}
                  className="pt-0"
                  onPost={() => setOpen(false)}
                />
              </div>
            </DialogContent>
          </Dialog>
          <PostButton icon={Repeat2} highlight="green" label={15} />
          <PostButton
            icon={Heart}
            highlight="pink"
            label={new Intl.NumberFormat("en-US", {
              notation: "compact",
            }).format(likeCount)}
          />
          <PostButton
            icon={BarChart2}
            label={new Intl.NumberFormat("en-US", {
              notation: "compact",
            }).format(views)}
          />
          <div className="flex flex-row">
            <PostButton icon={Bookmark} />
            <PostButton icon={Upload} />
          </div>
        </div>
      </div>
    </div>
  );
}

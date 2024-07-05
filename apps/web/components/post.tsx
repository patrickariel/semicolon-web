import { ThumbGrid } from "./thumb-grid";
import { formatShortDate } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { PostResolved } from "@semicolon/api/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Button, ButtonProps } from "@semicolon/ui/button";
import { cn } from "@semicolon/ui/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  BadgeCheck,
  BarChart2,
  Ellipsis,
  Heart,
  LucideIcon,
  MessageCircle,
  Repeat2,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type PostButtonProps = ButtonProps &
  (
    | {
        onClick: React.MouseEventHandler<HTMLButtonElement>;
        href?: never;
      }
    | {
        href: string;
        onClick?: never;
      }
  ) & {
    icon: LucideIcon;
    label?: string | number;
  } & VariantProps<typeof highlightVariants>;

const highlightVariants = cva([], {
  variants: {
    highlight: {
      blue: "hover:bg-blue-400/20 [&>*]:group-hover:stroke-blue-400 [&~*]:group-hover:text-blue-400",
      pink: "hover:bg-pink-500/20 [&>*]:group-hover:stroke-pink-500 [&~*]:group-hover:text-pink-500",
      green:
        "hover:bg-green-600/20 [&>*]:group-hover:stroke-green-600 [&~*]:group-hover:text-green-600",
      yellow:
        "hover:bg-yellow-400/20 [&>*]:group-hover:stroke-yellow-400 [&~*]:group-hover:text-yellow-400",
    },
  },
  defaultVariants: {
    highlight: "blue",
  },
});

export function PostButton({
  icon: Icon,
  label,
  children,
  href,
  onClick,
  className,
  highlight,
  ...props
}: PostButtonProps) {
  const Comp = href
    ? ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <Link href={href} onClick={(e) => e.stopPropagation()} {...props}>
          {children}
        </Link>
      )
    : Slot;

  return (
    <div className="group relative flex flex-row items-center">
      <Button
        variant={"ghost"}
        className={cn(
          highlightVariants({ highlight, className }),
          "flex h-8 items-center justify-start gap-0 rounded-full p-2 after:absolute after:inset-0 after:block after:content-['']",
        )}
        asChild={href ? true : false}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.(e);
        }}
        {...props}
      >
        <Comp>
          <Icon className={`stroke-muted-foreground size-[1.1rem]`} />
        </Comp>
      </Button>
      {label !== undefined && (
        <p className="text-muted-foreground text-xs">{label}</p>
      )}
      {children}
    </div>
  );
}

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
              <Link
                href={`/post/${id}`}
                className="text-muted-foreground text-nowrap align-middle text-sm hover:underline"
                onClick={(e) => e.stopPropagation()}
              >
                {formatShortDate(createdAt)}
              </Link>
            </div>
          </div>
          <Ellipsis className="flex-none" />
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
          <PostButton icon={Upload} onClick={() => undefined} />
        </div>
      </div>
    </div>
  );
}

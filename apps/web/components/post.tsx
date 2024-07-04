import { uuidTranslator } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import type { PostResolved } from "@semicolon/api/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Button, ButtonProps } from "@semicolon/ui/button";
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
import Image from "next/image";
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
    label?: string;
  };

export function PostButton({
  icon: Icon,
  label,
  children,
  href,
  onClick,
  ...props
}: PostButtonProps) {
  const Comp = href
    ? ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
        <Link href={href} {...props} onClick={(e) => e.stopPropagation()}>
          {children}
        </Link>
      )
    : Slot;

  return (
    <div className="group relative flex flex-row items-center">
      <Button
        variant={"ghost"}
        className="flex h-8 items-center justify-start gap-0 rounded-full p-2 after:absolute after:inset-0 after:block after:content-[''] hover:bg-blue-400/20"
        asChild={href ? true : false}
        onClick={(e) => {
          onClick?.(e);
          e.stopPropagation();
        }}
        {...props}
      >
        <Comp>
          <Icon className="stroke-muted-foreground size-[1.1rem] group-hover:stroke-blue-400" />
        </Comp>
      </Button>
      {label && (
        <p className="text-muted-foreground text-xs group-hover:text-blue-400">
          {label}
        </p>
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
  createdAt,
  content,
}: PostResolved) {
  const router = useRouter();
  const shortId = uuidTranslator.fromUUID(id);

  return (
    <div
      className="relative flex w-full cursor-pointer flex-row gap-3 p-4 pb-2"
      tabIndex={0}
      onClick={() =>
        document.getSelection()?.type !== "Range" &&
        router.push(`/post/${shortId}`)
      }
      onKeyUp={(e) => {
        e.key === "Enter" ? router.push(`/post/${shortId}`) : null;
      }}
    >
      <div className="pt-2">
        <Link
          href={`/${username}`}
          className="z-10"
          onClick={(e) => e.stopPropagation()}
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
                <BadgeCheck className="size-5 flex-none stroke-sky-400" />
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
                href={`/post/${shortId}`}
                className="text-muted-foreground text-nowrap align-middle text-sm hover:underline"
              >
                {createdAt.toDateString()}
              </Link>
            </div>
          </div>
          <Ellipsis className="flex-none" />
        </div>
        <p className="text-wrap text-sm leading-7">{content}</p>

        {/* {image && (
            <div className="my-3 flex items-center justify-center">
              <Image
                src={image}
                alt="tweet-image"
                width={300}
                height={200}
                className="rounded-lg"
              />
            </div>
          )} */}

        <div className="flex w-full min-w-0 items-center justify-between">
          <PostButton
            icon={MessageCircle}
            href={`/post/${shortId}`}
            label="15"
          />
          <PostButton icon={Repeat2} onClick={() => undefined} label="15" />
          <PostButton icon={Heart} onClick={() => undefined} label="15" />
          <PostButton icon={BarChart2} onClick={() => undefined} label="15" />
          <PostButton icon={Upload} onClick={() => undefined} />
        </div>
      </div>
    </div>
  );
}

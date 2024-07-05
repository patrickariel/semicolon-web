import { ThumbGrid } from "./thumb-grid";
import { formatLongDate } from "@/lib/utils";
import type { PostResolved } from "@semicolon/api/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Separator } from "@semicolon/ui/separator";
import { BarChart2, Heart, MessageCircle, Repeat2, Upload } from "lucide-react";

export function PostDetail({
  name,
  avatar,
  username,
  createdAt,
  content,
  views,
  media,
}: PostResolved) {
  return (
    <div className="flex flex-col gap-3 px-4">
      <div className="flex flex-row items-center gap-3">
        <Avatar className="size-11">
          {avatar && <AvatarImage width={300} height={300} src={avatar} />}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-md font-semibold">{name}</h4>
              <p className="text-sm text-zinc-500">@{username}</p>
            </div>
          </div>
        </div>
      </div>
      <p>{content}</p>
      {media.length > 0 && <ThumbGrid srcs={media} />}
      <div className="flex flex-row items-center gap-1">
        <div className="text-sm text-zinc-500">
          {formatLongDate(createdAt)}
          {" · "}
          {new Intl.NumberFormat(undefined, { notation: "compact" }).format(
            views,
          )}{" "}
          views
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Separator />
        <div className="flex w-full min-w-0 items-center justify-between gap-2 lg:px-3">
          <div className="cursor flex items-center justify-start gap-2">
            <MessageCircle className="stroke-muted-foreground size-[1.3rem]" />
            <p className="text-muted-foreground text-xs">15</p>
          </div>
          <div className="cursor flex items-center justify-start gap-2">
            <Repeat2 className="stroke-muted-foreground size-[1.3rem]" />
            <p className="text-muted-foreground text-xs">15</p>
          </div>
          <div className="cursor flex items-center justify-start gap-2">
            <Heart className="stroke-muted-foreground size-[1.3rem]" />
            <p className="text-muted-foreground text-xs">15</p>
          </div>
          <div className="cursor flex items-center justify-start gap-2">
            <BarChart2 className="stroke-muted-foreground size-[1.3rem]" />
            <p className="text-muted-foreground text-xs">15</p>
          </div>
          <div className="cursor flex items-center justify-start gap-2">
            <Upload className="stroke-muted-foreground size-[1.3rem]" />
          </div>
        </div>
        <Separator />
      </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Separator } from "@semicolon/ui/separator";
import { BarChart2, Heart, MessageCircle, Repeat2, Upload } from "lucide-react";
import Image from "next/image";

interface TweetProps {
  id: string;
  avatar: string;
  name: string;
  username: string;
  content: string;
  createdAt: Date;
  image?: string;
  replyCount: number;
  likeCount: number;
}

export function TweetDetail({
  name,
  avatar,
  username,
  createdAt,
  content,
  image,
}: TweetProps) {
  return (
    <div className="flex flex-col gap-3 px-4">
      <div className="flex flex-row items-center gap-3">
        <Avatar className="size-11">
          <AvatarImage width={300} height={300} src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">{name}</h4>
              <p className="text-sm text-gray-600">@{username}</p>
            </div>
          </div>
          {image && (
            <div className="mt-4">
              <Image
                src={image}
                alt="Tweet Image"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
      </div>
      <p>{content}</p>
      <div className="text-sm text-zinc-600">{createdAt.toDateString()}</div>
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

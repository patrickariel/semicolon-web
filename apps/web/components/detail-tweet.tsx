import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Separator } from "@semicolon/ui/separator";
import { BarChart2, Heart, MessageCircle, Repeat2, Upload } from "lucide-react";
import Image from "next/image";

interface User {
  name: string;
  username: string;
  profile_image_url: string;
}

interface Tweet {
  id: string;
  user: User;
  text: string;
  created_at: string;
  image?: string;
  reply_count: number;
  retweet_count: number;
  like_count: number;
}

interface TweetDetailProps {
  tweet: Tweet;
}

const TweetDetail: React.FC<TweetDetailProps> = ({ tweet }) => {
  return (
    <div className="mx-automax-w-xl rounded-lg p-4 shadow-md">
      <div className="flex items-start space-x-4">
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
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold">{tweet.user.name}</h4>
              <p className="text-sm text-gray-600">@{tweet.user.username}</p>
            </div>
            <div className="text-gray-600">{tweet.created_at}</div>
          </div>
          <p className="mt-2">{tweet.text}</p>
          {tweet.image && (
            <div className="mt-4">
              <Image
                src={tweet.image}
                alt="Tweet Image"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>
          )}
          <Separator className="mt-3" />
          <div className="mt-3 flex w-full min-w-0 items-center justify-between gap-2 lg:px-3">
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
          <Separator className="mt-3" />
        </div>
      </div>
    </div>
  );
};

export default TweetDetail;

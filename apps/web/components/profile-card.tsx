import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Button } from "@semicolon/ui/button";
import { TabsList, TabsTrigger } from "@semicolon/ui/tabs";
import { BadgeCheck, CalendarDays, MapPin, User } from "lucide-react";
import Image from "next/image";
import React from "react";

interface ProfileCardProps {
  name: string;
  username: string;
  bio: string | null;
  location: string | null;
  following: number;
  followers: number;
  coverImage: string;
  profileImage: string | null;
  createdAt: Date;
  verified?: boolean;
  isOwner: boolean;
  isFollowing: boolean;
}

enum ActiveTab {
  Posts = "posts",
  Replies = "replies",
  Media = "media",
  Likes = "likes",
}

const ProfileCard = ({
  name,
  username,
  bio,
  location,
  following,
  followers,
  coverImage,
  profileImage,
  createdAt,
  verified = true,
  isOwner,
  isFollowing,
}: ProfileCardProps) => {
  const joinDate = `Joined ${createdAt.toLocaleString("default", { month: "long" })} ${createdAt.getFullYear()}`;

  return (
    <div className="flex h-fit flex-col gap-5">
      <div className="relative">
        <div className="relative h-[200px] w-full">
          <Image
            className="object-cover"
            alt={`${username}'s header image`}
            fill
            src={coverImage}
          />
        </div>
      </div>

      <div className="flex flex-col justify-start gap-3">
        <div className="flex flex-col gap-3.5 px-5">
          <div className="flex flex-row justify-between">
            <Avatar className="bg-background -mt-20 h-[120px] w-[120px] rounded-full border-4 border-black object-cover">
              {profileImage && (
                <AvatarImage src={profileImage} alt="Profile Photo" />
              )}
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>

            {isOwner ? (
              <Button className="min-w-[100px] rounded-full">
                <span className="font-bold">Edit profile</span>
              </Button>
            ) : (
              <Button
                type="submit"
                className="min-w-[100px] cursor-pointer text-nowrap rounded-full font-bold text-black"
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span className="flex flex-row items-center gap-2 text-base font-bold">
                <p className="truncate">{name}</p>
                {verified && (
                  <BadgeCheck className="size-5 flex-none stroke-sky-400" />
                )}
              </span>
              <p
                id="username"
                className="text-username text-muted-foreground text-sm"
              >
                @{username}
              </p>
            </div>
          </div>

          {bio && <p className="text-sm leading-[26px]">{bio}</p>}

          <div className="flex gap-5">
            <div className="flex gap-1.5">
              <MapPin className="stroke-muted-foreground h-[18px] w-[18px]" />
              <p className="text-muted-foreground text-sm">{location}</p>
            </div>
            <div className="flex gap-1.5">
              <CalendarDays className="stroke-muted-foreground h-[18px] w-[18px]" />
              <p className="text-muted-foreground text-sm">{joinDate}</p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex flex-row items-center gap-2">
              <span className="text-sm font-bold">{following}</span>
              <span className="text-muted-foreground text-sm">Following</span>
            </div>

            <div className="flex flex-row items-center gap-2">
              <span className="text-sm font-bold">{followers}</span>
              <span className="text-muted-foreground text-sm">Followers</span>
            </div>
          </div>
        </div>

        <TabsList className="flex justify-between gap-2 overflow-x-auto sm:gap-0">
          <TabsTrigger value={ActiveTab.Posts} className="px-2.5 pb-3.5">
            Posts
          </TabsTrigger>
          <TabsTrigger value={ActiveTab.Replies} className="px-2.5 pb-3.5">
            Replies
          </TabsTrigger>
          <TabsTrigger value={ActiveTab.Media} className="px-2.5 pb-3.5">
            Media
          </TabsTrigger>
          <TabsTrigger value={ActiveTab.Likes} className="px-2.5 pb-3.5">
            Likes
          </TabsTrigger>
        </TabsList>
      </div>
    </div>
  );
};

export default ProfileCard;

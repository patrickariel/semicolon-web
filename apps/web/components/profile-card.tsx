import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Button } from "@semicolon/ui/button";
import { BadgeCheck, CalendarDays, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ProfileCardProps {
  name: string;
  username: string;
  bio: string;
  location: string;
  following: number;
  followers: number;
  coverImage: string;
  profileImage: string;
  createdAt: Date;
  verified?: boolean;
  isOwner: boolean;
  isFollowing: boolean;
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
    <div className="h-fit">
      <div className="relative">
        <div
          className="h-[200px] w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage})` }}
        ></div>

        <div className="absolute top-[140px] pl-5">
          <Avatar className="h-[120px] w-[120px] rounded-full border-4 border-black object-cover">
            <AvatarImage src={profileImage} alt="Profile Photo" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="px-5">
        <div className="flex flex-col justify-start gap-3.5 pt-[70px]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="flex flex-row items-center gap-2 text-base font-bold">
                <p className="truncate">{name}</p>
                {verified && (
                  <BadgeCheck className="size-5 flex-none stroke-sky-400" />
                )}
              </span>
              <p id="username" className="text-username text-sm">
                @{username}
              </p>
            </div>

            <div className="flex">
              {isOwner ? (
                <Link
                  href={"#"}
                  className="min-w-[100px] cursor-pointer text-nowrap rounded-full border px-4 py-1"
                >
                  <span>Edit profile</span>
                </Link>
              ) : (
                <Button
                  type="submit"
                  className="min-w-[100px] cursor-pointer text-nowrap rounded-full font-bold text-black"
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </Button>
              )}
            </div>
          </div>

          <p className="text-sm leading-[26px]">{bio}</p>

          <div className="flex gap-5">
            <div className="flex gap-1.5">
              <MapPin className="h-[20px] w-[20px]" />
              <p className="text-sm">{location}</p>
            </div>
            <div className="flex gap-1.5">
              <CalendarDays className="h-[20px] w-[20px]" />
              <p className="text-sm">{joinDate}</p>
            </div>
          </div>

          <div className="flex gap-5">
            <div>
              <span className="text-base font-bold">{following}</span>
              <span className="text-sm"> Following</span>
            </div>

            <div>
              <span className="text-base font-bold">{followers}</span>
              <span className="text-sm"> Followers</span>
            </div>
          </div>

          <div className="no-scrollbar flex justify-between gap-2 overflow-x-auto px-[10px] sm:gap-0">
            <Link
              href="#"
              className="border-link w-full border-b-4 border-sky-500 px-2.5 pb-3.5 text-center text-base font-bold sm:w-auto"
            >
              Posts
            </Link>
            <Link
              href="#"
              className="text-username w-full px-2.5 pb-3.5 text-center text-base sm:w-auto"
            >
              Replies
            </Link>
            <Link
              href="#"
              className="text-username w-full px-2.5 pb-3.5 text-center text-base sm:w-auto"
            >
              Highlights
            </Link>
            <Link
              href="#"
              className="text-username w-full px-2.5 pb-3.5 text-center text-base sm:w-auto"
            >
              Articles
            </Link>
            <Link
              href="#"
              className="text-username w-full px-2.5 pb-3.5 text-center text-base sm:w-auto"
            >
              Media
            </Link>
            <Link
              href="#"
              className="text-username w-full px-2.5 pb-3.5 text-center text-base sm:w-auto"
            >
              Likes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

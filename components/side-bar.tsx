import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import { cn } from "@/lib/utils";
import {
  Bell,
  CalendarPlus,
  CircleUser,
  Crown,
  Home,
  Mail,
  OctagonX,
  Search,
} from "lucide-react";
import React from "react";

export function SideBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "sticky top-0 hidden h-screen max-w-[270px] flex-col gap-[30px] px-4 py-3 min-[500px]:flex md:px-8 lg:w-full lg:py-7",
        className,
      )}
      {...props}
    >
      <Logo href="#" />
      <NavItem href="#" icon={Home} label="Home" />
      <NavItem href="#" icon={Search} label="Explore" />
      <NavItem href="#" icon={Bell} label="Notifications" />
      <NavItem href="#" icon={Mail} label="Messages" />
      <NavItem href="#" icon={CalendarPlus} label="Bookmarks" />
      <NavItem href="#" icon={Crown} label="Communities" />
      <NavItem href="#" icon={CircleUser} label="Profile" />
      <NavItem href="#" icon={OctagonX} label="Sign Out" />
    </div>
  );
}

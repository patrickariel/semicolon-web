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
    <div className={cn("flex flex-col gap-[30px]", className)} {...props}>
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

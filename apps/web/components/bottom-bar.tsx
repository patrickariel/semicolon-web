import { cn } from "@semicolon/ui/utils";
import {
  Bell,
  CalendarPlus,
  CircleUser,
  Home,
  Mail,
  Search,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export function BottomBar({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-card sticky bottom-0 flex w-full flex-row justify-around gap-2 border py-3.5 min-[500px]:hidden",
        className,
      )}
      {...props}
    >
      <Link href="/home">
        <Home />
      </Link>
      <Link href="#">
        <Search />
      </Link>
      <Link href="#">
        <Bell />
      </Link>
      <Link href="#">
        <Mail />
      </Link>
      <Link href="#">
        <CalendarPlus />
      </Link>
      <Link href="#">
        <CircleUser />
      </Link>
    </div>
  );
}

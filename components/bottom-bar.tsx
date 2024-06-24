import { cn } from "@/lib/utils";
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
        "flex flex-row justify-around gap-2 border bg-card py-3",
        className,
      )}
      {...props}
    >
      <Link href="#">
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

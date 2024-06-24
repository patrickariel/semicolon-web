import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export function FeedHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex justify-around pt-4", className)} {...props}>
      <Link
        href="#"
        className="border-link border-b-4 border-sky-500 px-2.5 pb-3.5 text-base font-bold"
      >
        For You
      </Link>
      <Link
        href="#"
        className="text-username px-2.5 pb-3.5 text-base font-bold"
      >
        Following
      </Link>
    </div>
  );
}

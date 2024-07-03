"use client";

import { cn } from "@semicolon/ui/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// root/apps/web/components/search-feed-header.tsx

export function SearchFeedHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const linkClasses = (path: string) =>
    cn(
      "px-2.5 pb-3.5 text-base font-bold",
      currentPath === path ? "border-b-4 border-sky-500" : "text-username",
    );

  return (
    <div className={cn("flex justify-around pt-4", className)} {...props}>
      <Link href="/search" className={linkClasses("/search")}>
        Top
      </Link>
      <Link href="/search/latest" className={linkClasses("/search/latest")}>
        Latest
      </Link>
      <Link href="/search/people" className={linkClasses("/search/people")}>
        People
      </Link>
    </div>
  );
}

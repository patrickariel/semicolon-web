import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export function Logo({
  className,
  children,
  href,
  ...props
}: Parameters<typeof Link>[0]) {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row justify-center gap-2 lg:justify-start",
        className,
      )}
      {...props}
    >
      <h2 className="hidden text-[28px] font-bold lg:block">semicolon</h2>
      <h2 className="text-[28px] font-bold text-sky-400">;</h2>
    </Link>
  );
}

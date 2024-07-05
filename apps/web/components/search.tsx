"use client";

import { Input } from "@semicolon/ui/input";
import { cn } from "@semicolon/ui/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import React from "react";

export function SearchBar() {
  return (
    <form
      onSubmit={() => undefined}
      className="relative flex flex-grow items-center justify-start"
    >
      <Search className="absolute left-6 block items-center" />
      <Input
        type="text"
        placeholder="Search"
        id="search"
        className="h-12 flex-grow rounded-full bg-transparent pl-16 text-base text-white"
        value={undefined}
        onChange={() => undefined}
      />
    </form>
  );
}

function TabItem({
  children,
  href,
  className,
  active = false,
  ...props
}: Parameters<typeof Link>[0] & { active?: boolean }) {
  return (
    <Link
      href={href}
      className="hover:bg-accent hover:text-accent-foreground relative flex h-14 flex-auto flex-col items-center justify-center px-8 text-base font-bold transition-colors"
      {...props}
    >
      <p>{children}</p>
      {active && (
        <div className="absolute inset-x-0 bottom-0 mx-auto block h-1 w-2/3 rounded-full bg-sky-400" />
      )}
    </Link>
  );
}

export function SearchTabs({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex justify-stretch", className)} {...props}>
      <TabItem href="#" active>
        Top
      </TabItem>
      <TabItem href="#">Latest</TabItem>
      <TabItem href="#">People</TabItem>
    </div>
  );
}

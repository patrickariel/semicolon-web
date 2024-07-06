"use client";

import { Input } from "@semicolon/ui/input";
import { Search } from "lucide-react";
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

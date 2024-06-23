import { Input } from "./ui/input";
import { Search } from "lucide-react";
import React from "react";

export function SearchBar() {
  return (
    <div className="flex items-center justify-start gap-4 rounded-full border pl-4">
      <Search />
      <Input
        type="text"
        placeholder="Search"
        id="search"
        className="h-12 flex-grow rounded-r-full border-none bg-transparent text-base text-white"
      />
    </div>
  );
}

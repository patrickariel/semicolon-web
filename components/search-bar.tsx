import { Input } from "./ui/input";
import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => (
  <div className="flex items-center justify-start rounded-full border pl-5">
    <Search />
    <Input
      type="text"
      placeholder="Search"
      id="search"
      className="h-12 flex-grow border-none bg-transparent text-base text-white"
    />
  </div>
);

export default SearchBar;

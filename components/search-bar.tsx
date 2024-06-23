import { Input } from "./ui/input";
import Image from "next/image";
import React from "react";

const SearchBar = () => (
  <div className="flex items-center justify-start rounded-full bg-secondary">
    <Image
      src="/images/search-normal-dim.svg"
      alt="search"
      width={26}
      height={26}
      className="ml-4 mr-3"
    />
    <Input
      type="text"
      placeholder="Search"
      id="search"
      className="flex-grow h-12  text-white bg-transparent text-base placeholder:text-base rounded-full"
    />
  </div>
);

export default SearchBar;

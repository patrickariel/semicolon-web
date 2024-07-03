import { Input } from "@semicolon/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

// root/apps/web/components/search-bar.tsx

export function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-start gap-4 rounded-full border pl-4"
    >
      <button type="submit" className="flex items-center">
        <Search />
      </button>
      <Input
        type="text"
        placeholder="Search"
        id="search"
        className="h-12 flex-grow rounded-r-full border-none bg-transparent text-base text-white"
        value={input}
        onChange={handleInputChange}
      />
    </form>
  );
}

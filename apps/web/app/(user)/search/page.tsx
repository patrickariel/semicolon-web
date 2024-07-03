"use client";

import { Separator } from "../../../../../packages/ui/src/separator";
import { SearchBar } from "@/components/search-bar";
import { SearchFeedHeader } from "@/components/search-feed-header";
import { SearchResults } from "@/components/search-results";
import React, { useState } from "react";

// root/apps/web/(user)/search/page.tsx

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col">
      <div className="bg-card sticky top-0 z-40 pl-4 pr-4 pt-4">
        <SearchBar onSearch={setSearchTerm} />
        <SearchFeedHeader />
        <Separator />
      </div>
      <Separator />
      <div className="mb-4 flex flex-col">
        {searchTerm ? (
          <SearchResults query={searchTerm} />
        ) : (
          <p className="mt-4 text-center">Enter a search term to see results</p>
        )}
      </div>
    </div>
  );
}

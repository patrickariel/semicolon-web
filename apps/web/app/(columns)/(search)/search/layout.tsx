import { BackHeader } from "@/components/back-header";
import { SearchBar } from "@/components/search-bar";
import { TabsList, TabsLink } from "@/components/tabs-link";
import { Button } from "@semicolon/ui/button";
import { Ellipsis } from "lucide-react";
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative z-0 flex w-full flex-col">
      <div className="sticky top-0 z-10 flex flex-col backdrop-blur-md">
        <BackHeader className="flex flex-row px-3">
          <SearchBar />
          <Button
            variant="ghost"
            size="icon"
            className="aspect-square size-fit rounded-full p-2"
          >
            <Ellipsis className="flex-none" size={19} />
          </Button>
        </BackHeader>
        <TabsList className="relative">
          <TabsLink href="/search" query={{ f: null }}>
            Relevance
          </TabsLink>
          <TabsLink href="/search" query={{ f: "latest" }}>
            Latest
          </TabsLink>
          <TabsLink href="/search" query={{ f: "people" }}>
            People
          </TabsLink>
        </TabsList>
      </div>
      {children}
    </div>
  );
}

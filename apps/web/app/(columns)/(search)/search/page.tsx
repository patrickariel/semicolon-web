"use client";

import { BackHeader } from "@/components/back-header";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@semicolon/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@semicolon/ui/tabs";
import { Ellipsis } from "lucide-react";
import React from "react";

enum ActiveTab {
  Top = "top",
  Latest = "latest",
  People = "people",
}

export default function Page() {
  return (
    <Tabs className="flex h-full flex-col" defaultValue={ActiveTab.Top}>
      <div className="bg-card sticky top-0 z-40 flex flex-col gap-1">
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
        <TabsList>
          <TabsTrigger value={ActiveTab.Top}>Top</TabsTrigger>
          <TabsTrigger value={ActiveTab.Latest}>Latest</TabsTrigger>
          <TabsTrigger value={ActiveTab.People}>People</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value={ActiveTab.Top}>
        <div className="mb-4 flex flex-col"></div>
      </TabsContent>
    </Tabs>
  );
}

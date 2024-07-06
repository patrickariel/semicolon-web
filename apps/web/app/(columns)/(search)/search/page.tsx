"use client";

import { SearchBar } from "@/components/search-bar";
import { NavTab, TabItem } from "@/components/tab";
import { Button } from "@semicolon/ui/button";
import { Separator } from "@semicolon/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex h-full flex-col">
      <div className="bg-card sticky top-0 z-40 flex flex-col gap-0 pt-4">
        <div className="flex flex-row gap-1 px-3">
          <Button
            variant="ghost"
            className="aspect-square h-auto rounded-full p-0"
            onClick={() => router.push("/home")}
          >
            <ArrowLeft size={25} />
          </Button>
          <SearchBar />
        </div>
        <NavTab>
          <TabItem href="#" active>
            Top
          </TabItem>
          <TabItem href="#">Latest</TabItem>
          <TabItem href="#">People</TabItem>
        </NavTab>
        <Separator />
      </div>
      <div className="mb-4 flex flex-col"></div>
    </div>
  );
}

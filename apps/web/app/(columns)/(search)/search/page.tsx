"use client";

import { SearchBar, SearchTabs } from "@/components/search";
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
        <SearchTabs />
        <Separator />
      </div>
      <div className="mb-4 flex flex-col"></div>
    </div>
  );
}

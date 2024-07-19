"use client";

import { PostSearch, UserSearch } from "@/components/search-view";
import Spinner from "@semicolon/ui/spinner";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

export default function Page() {
  const searchParams = useSearchParams();
  const [params, setParams] = useState<{
    query: string;
    tab: "rel" | "latest" | "people";
  } | null>(null);

  useEffect(() => {
    const query = searchParams.get("q");
    if (query === null) {
      redirect("/home");
    }

    const { data: tab } = z
      .union([z.null(), z.literal("latest"), z.literal("people")])
      .safeParse(searchParams.get("f"));

    if (!tab) {
      const updated = new URLSearchParams(searchParams.toString());
      updated.delete("f");
      window.history.replaceState(null, "", `?${updated.toString()}`);
      setParams({ query, tab: "rel" });
    } else {
      setParams({ query, tab });
    }
  }, [searchParams]);

  return (
    <>
      {params ? (
        params.tab === "people" ? (
          <UserSearch query={params.query} />
        ) : (
          <PostSearch
            query={params.query}
            sortBy={params.tab === "rel" ? "relevancy" : "recency"}
          />
        )
      ) : (
        <div className="flex min-h-20 items-center justify-center">
          <Spinner size={30} />
        </div>
      )}
    </>
  );
}

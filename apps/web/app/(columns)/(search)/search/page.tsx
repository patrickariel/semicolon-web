"use client";

import { PostFeed } from "@/components/post-feed";
import { UserList } from "@/components/user-list";
import { trpc } from "@/lib/trpc";
import type { RouterInput } from "@semicolon/api";
import { PostResolved, PublicUserResolved } from "@semicolon/api/schema";
import Spinner from "@semicolon/ui/spinner";
import { cn } from "@semicolon/ui/utils";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";

function NoResults({
  term,
  className,
}: React.ComponentProps<"article"> & { term: string }) {
  return (
    <article className={cn("flex max-w-[450px] flex-col gap-3 p-9", className)}>
      <p className="text-3xl font-black">No results for {`"${term}"`}</p>
      <p className="text-muted-foreground text-base">
        Try searching for something else, or check if you made a mistake in your
        query.
      </p>
    </article>
  );
}

function PostSearch({
  query,
  sortBy,
  maxResults,
}: RouterInput["post"]["search"] & { query: string }) {
  const [results, setResults] = useState<PostResolved[]>([]);

  const {
    data: rawResults,
    fetchNextPage,
    isLoading,
    isLoadingError,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
    refetch,
  } = trpc.post.search.useInfiniteQuery(
    {
      query,
      sortBy,
      maxResults,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  useEffect(() => {
    setResults((rawResults?.pages ?? []).flatMap((page) => page.results));
  }, [rawResults]);

  return (
    <>
      <PostFeed
        posts={results}
        loading={isLoading || isFetchingNextPage}
        error={isLoadingError || isFetchNextPageError}
        fetchNextPage={fetchNextPage}
        refetch={refetch}
        hasNextPage={hasNextPage}
      />
      {rawResults?.pages[0]?.results?.length === 0 && (
        <NoResults term={query} />
      )}
    </>
  );
}

function UserSearch({ query, maxResults }: RouterInput["user"]["search"]) {
  const [results, setResults] = useState<PublicUserResolved[]>([]);

  const {
    data: rawResults,
    fetchNextPage,
    isLoading,
    isLoadingError,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
    refetch,
  } = trpc.user.search.useInfiniteQuery(
    {
      query,
      maxResults,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  useEffect(() => {
    setResults((rawResults?.pages ?? []).flatMap((page) => page.users));
  }, [rawResults]);

  return (
    <>
      <UserList
        users={results}
        loading={isLoading || isFetchingNextPage}
        error={isLoadingError || isFetchNextPageError}
        fetchNextPage={fetchNextPage}
        refetch={refetch}
        hasNextPage={hasNextPage}
      />
      {rawResults?.pages[0]?.users?.length === 0 && <NoResults term={query} />}
    </>
  );
}
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
    <div className="flex w-full flex-col items-center">
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
    </div>
  );
}

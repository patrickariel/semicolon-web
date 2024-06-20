"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spinner from "@/components/ui/spinner";
import { trpc } from "@/lib/trpc-client";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
  const { data, isFetching, isError } = trpc.user.me.useQuery(undefined, {
    retry: (_failureCount, error) => {
      if (
        error.data?.code === "UNAUTHORIZED" ||
        error.data?.code === "PRECONDITION_FAILED"
      ) {
        return false;
      }
      return true;
    },
  });

  if (isError) {
    redirect("/flow/signup");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {!isFetching && data ? (
        <Card className="h-[250px] w-[300px]">
          <CardHeader>
            <CardTitle>{data.name}</CardTitle>
            <CardDescription>{data.username}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{data.bio}</p>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">{data.id}</p>
          </CardFooter>
          <CardContent>
            <Button className="w-full" onClick={() => signOut()}>
              Log out
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Spinner />
      )}
    </main>
  );
}

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/lib/trpc-client";
import { redirect } from "next/navigation";

export default function Page() {
  const { data, isFetching, isError } = trpc.user.me.useQuery(undefined, {
    retry: (_failureCount, error) => {
      if (
        error.data?.code === "FORBIDDEN" ||
        error.data?.code === "PRECONDITION_FAILED"
      ) {
        return false;
      }
      return true;
    },
  });

  if (isFetching) {
    return <div>loading</div>;
  }

  if (isError || !data) {
    redirect("/flow/signup");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="h-[200px] w-[300px]">
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
      </Card>
    </main>
  );
}

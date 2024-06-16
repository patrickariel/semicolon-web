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

export default function Page() {
  const { data } = trpc.user.get.useQuery({
    id: "baf0014e-94cf-4980-888c-5f0d437c65f6",
  });

  if (!data) {
    return;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-[300px] h-[200px]">
        <CardHeader>
          <CardTitle>{data.fullName}</CardTitle>
          <CardDescription>{data.username}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{data.bio}</p>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground text-xs">{data.userId}</p>
        </CardFooter>
      </Card>
    </main>
  );
}

"use client";

import { PostButton } from "@/components/post-button";
import { trpc } from "@/lib/trpc-client";
import * as Dialog from "@radix-ui/react-dialog";
import { AspectRatio } from "@semicolon/ui/aspect-ratio";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@semicolon/ui/carousel";
import { Separator } from "@semicolon/ui/separator";
import _ from "lodash";
import { Bookmark, Heart, MessageCircle, Repeat2, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page({
  params: { id, num },
}: {
  params: { id: string; num: string };
}) {
  const router = useRouter();
  const [api, setApi] = React.useState<CarouselApi>();
  const { data: post } = trpc.post.id.useQuery({ id });

  const [startIndex, setStartIndex] = useState(() => {
    const int = parseInt(num);
    if (isNaN(int)) {
      return 0;
    } else {
      return _.clamp(int - 1, 0, 3);
    }
  });
  const [initialStartIndex] = useState(() => startIndex);

  useEffect(() => {
    if (!api) {
      return;
    }
    api.on("select", () => {
      setStartIndex(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    window.history.pushState(null, "", `/post/${id}/photo/${startIndex}`);
  }, [id, startIndex]);

  if (!post) {
    return <div>loading...</div>;
  }

  const { replyCount, likeCount } = post;

  return (
    <Dialog.Root defaultOpen={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex h-screen flex-row items-center justify-stretch"
          onEscapeKeyDown={() => router.back()}
          onPointerDownOutside={() => router.back()}
        >
          <div className="flex h-full min-h-0 min-w-0 flex-grow flex-col justify-between">
            <div className="flex min-h-0 min-w-0 flex-grow flex-col">
              <Carousel
                opts={{ startIndex: initialStartIndex }}
                setApi={setApi}
                className="my-auto h-full [&>*:first-child]:h-full"
              >
                <CarouselContent className="-ml-0 h-full">
                  {post.media.map((media, i) => (
                    <CarouselItem
                      key={i}
                      className="relative h-full min-h-0 min-w-0 pl-0 [&>*]:max-h-full"
                    >
                      <Image
                        src={media}
                        alt={`${post.username}'s image (${i + 1})`}
                        className="my-auto min-w-0 object-contain"
                        fill
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-3 top-1/2 -translate-y-1/2" />
                <CarouselNext className="right-3 top-1/2 -translate-y-1/2" />
              </Carousel>
            </div>
            <div className="flex h-14 w-full flex-none flex-row justify-between px-5 sm:px-16">
              <PostButton
                icon={MessageCircle}
                iconSize="big"
                href={`/post/${id}`}
                label={replyCount}
              />
              <PostButton
                icon={Repeat2}
                iconSize="big"
                highlight="green"
                onClick={() => undefined}
                label={15}
              />
              <PostButton
                icon={Heart}
                iconSize="big"
                highlight="pink"
                onClick={() => undefined}
                label={likeCount}
              />
              <PostButton
                icon={Bookmark}
                iconSize="big"
                onClick={() => undefined}
                label={15}
              />
              <PostButton icon={Upload} onClick={() => undefined} />
            </div>
          </div>
          <div className="bg-background hidden h-full w-1/4 lg:flex"></div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

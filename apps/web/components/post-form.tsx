"use client";

import { uploadMedia } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Button } from "@semicolon/ui/button";
import { FormField, FormItem, FormControl, Form } from "@semicolon/ui/form";
import { Input } from "@semicolon/ui/input";
import { Textarea } from "@semicolon/ui/textarea";
import { useToast } from "@semicolon/ui/use-toast";
import { cn } from "@semicolon/ui/utils";
import _ from "lodash";
import { Smile, User, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PostSchema = z.object({
  content: z.string().optional(),
  media: z.record(
    z.string(),
    z.object({
      file: z.instanceof(File),
      url: z.string().optional(),
      isUploading: z.boolean(),
    }),
  ),
});

export function PostForm({
  className,
  avatar,
  placeholder = "What is happening?!",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  avatar?: string | null;
  placeholder?: string;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    const subscription = form.watch(({ content, media }) => {
      if (media && Object.keys(media).length > 0) {
        setSubmitDisabled(
          Object.entries(media).some(([_, info]) => info?.isUploading),
        );
      } else {
        setSubmitDisabled((content?.length ?? 0) === 0);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, form.watch]);

  const handleSubmit = (data: z.infer<typeof PostSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className={cn("flex w-full flex-row gap-3 p-3", className)} {...props}>
      <div className="pt-2">
        <Avatar className="size-11">
          <AvatarImage src={avatar ?? undefined} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col gap-3"
        >
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full flex-grow">
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={placeholder}
                    className="h-[80px] w-full resize-none border-none p-2 text-lg text-white placeholder:text-lg focus-visible:outline-none focus-visible:ring-0"
                    maxLength={200}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            Object.entries(form.getValues("media") ?? {}).map(
              ([blobUrl], i) => (
                <Image
                  key={i}
                  src={blobUrl}
                  alt={`Media upload preview (${i})`}
                  width={300}
                  height={200}
                />
              ),
            )
          }

          <FormField
            name="media"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <Input
                  {..._.omit(field, "value")}
                  type="file"
                  id="upload"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  multiple
                  onChange={async (e) => {
                    if (e.target.files) {
                      const fileMap: typeof field.value = {};
                      for (const file of [...e.target.files]) {
                        const blobUrl = URL.createObjectURL(file);
                        fileMap[blobUrl] = {
                          file,
                          isUploading: true,
                        };
                      }

                      field.onChange({
                        ...field.value,
                        ...fileMap,
                      });

                      await Promise.allSettled(
                        Object.entries(fileMap).map(
                          async ([objUrl, { file }]) => {
                            const uploadForm = new FormData();
                            uploadForm.append("media", file);
                            const { url } = await uploadMedia(uploadForm);

                            fileMap[objUrl]!.isUploading = false;
                            fileMap[objUrl]!.url = url;
                            field.onChange({
                              ...field.value,
                              ...fileMap,
                            });
                          },
                        ),
                      );
                    }
                  }}
                />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-center gap-2.5">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-sky-400/10"
              >
                <Smile className="stroke-sky-400" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="m-0 rounded-full hover:bg-sky-400/10"
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }}
              >
                <ImageIcon className="stroke-sky-400" />
              </Button>
            </div>

            <Button
              type="submit"
              className="text-foreground w-fit max-w-36 cursor-pointer rounded-full bg-sky-500 px-6 font-bold hover:bg-sky-600"
              disabled={submitDisabled}
            >
              <p className="text-base font-bold">Post</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

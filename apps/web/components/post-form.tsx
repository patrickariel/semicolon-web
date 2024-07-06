import { Avatar, AvatarFallback, AvatarImage } from "@semicolon/ui/avatar";
import { Button } from "@semicolon/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from "@semicolon/ui/form";
import { Input } from "@semicolon/ui/input";
import { Textarea } from "@semicolon/ui/textarea";
import { cn } from "@semicolon/ui/utils";
import { Smile, User, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  content: string;
  upload: FileList | null;
}

export function PostForm({
  className,
  avatar,
  placeholder = "What is happening?!",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  avatar?: string | null;
  placeholder?: string;
}) {
  const form = useForm<FormValues>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);

  const handleSubmit = (data: FormValues) => {
    console.log("Tweet posted:", data.content);
    if (data.upload && data.upload.length > 0) {
      const file = data.upload[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileURL = reader.result as string;
        setPreview(fileURL);
        setIsVideo(file !== undefined ? file.type.startsWith("video") : false);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
      console.log("File uploaded:", file);
    }
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
          <FormItem className="flex w-full items-start justify-start">
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormItem>

          {preview && (
            <div className="ml-14 mt-4">
              {isVideo ? (
                <video width={300} height={200} controls>
                  <source src={preview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={preview}
                  alt="image-preview"
                  width={300}
                  height={200}
                />
              )}
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center justify-center gap-2.5">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-sky-400/10"
              >
                <Smile className="stroke-sky-400" />
              </Button>
              <FormField
                name="upload"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <Input
                      type="file"
                      id="upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                          field.onChange(files);
                          const file = files[0];
                          if (file) {
                            setPreview(URL.createObjectURL(file));
                            setIsVideo(file.type.startsWith("video"));
                          }
                        }
                      }}
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-sky-400/10"
                    >
                      <ImageIcon className="stroke-sky-400" />
                    </Button>
                  </div>
                )}
              />
            </div>
            <Button
              type="submit"
              className="text-foreground w-fit max-w-36 cursor-pointer rounded-full bg-sky-500 px-6 font-bold"
            >
              <p className="text-base font-bold">Post</p>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

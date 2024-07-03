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
import { Label } from "@semicolon/ui/label";
import { Textarea } from "@semicolon/ui/textarea";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdFileUpload } from "react-icons/md";

interface FormValues {
  commentContent: string;
  upload: FileList | null;
}

export function CommentForm() {
  const form = useForm<FormValues>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);

  const handleSubmit = (data: FormValues) => {
    console.log("Comment posted:", data.commentContent);
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
    <div className="flex w-full flex-row gap-3 px-4 pb-[16px] pt-[10px]">
      <div className="pt-2">
        <Avatar className="size-11">
          <AvatarImage
            width={300}
            height={300}
            src="https://avatars.githubusercontent.com/u/28171661"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
          <FormItem className="flex w-full items-start justify-start">
            <FormField
              name="commentContent"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full flex-grow">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Post your reply..."
                      className="h-[100px] w-full resize-none overflow-hidden py-3 text-base text-white placeholder:text-sm focus:border-transparent focus:font-semibold focus:outline-none focus:ring-0"
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

          <div className="flex items-center justify-between gap-4 pt-[17px]">
            <div className="flex items-center justify-center gap-2.5">
              <div className="item-feeling border-line flex cursor-pointer items-center justify-center gap-1.5 rounded-full border-2 px-3 py-1.5">
                <p>🤩</p>
                <p className="hidden text-sm font-semibold sm:block">Emotes</p>
              </div>
              <FormField
                name="upload"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center">
                    <Input
                      type="file"
                      id="upload"
                      accept="image/*,video/*"
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

                    <Label
                      htmlFor="upload"
                      className="flex cursor-pointer items-center text-white"
                    >
                      <MdFileUpload size={24} className="mr-2" />
                      <p className="hidden sm:block">Media</p>
                    </Label>
                  </div>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full max-w-36 cursor-pointer rounded-full font-bold"
            >
              Reply
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import React, { useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { MdFileUpload } from "react-icons/md";

type FormValues = {
  twittContent: string;
  upload: FileList | null;
};

const PostForm = () => {
  const methods = useForm<FormValues>();
  const [preview, setPreview] = useState<string | null>(null);
  const [isVideo, setIsVideo] = useState<boolean>(false);

  const handleSubmit = async (data: FormValues) => {
    console.log("Tweet posted:", data.twittContent);
    if (data.upload && data.upload.length > 0) {
      const file = data.upload[0];
      const reader = new FileReader();

      reader.onload = () => {
        const fileURL = reader.result as string;
        setPreview(fileURL);
        setIsVideo(file.type.startsWith("video"));
      };

      reader.readAsDataURL(file);
      console.log("File uploaded:", file);
    }
  };

  return (
    <div className="w-full">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="w-full">
          <FormItem className="flex items-start justify-start w-full">
            <Image
              src="/images/az-profile.jpg"
              id="ownerPhoto"
              alt="photo profile"
              className="object-cover rounded-full mr-3"
              width={46}
              height={46}
            />
            <FormField
              name="twittContent"
              control={methods.control}
              render={({ field }) => (
                <FormItem className="flex-grow w-full">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="What is happening ?!"
                      className="w-full h-[100px] py-3 text-white text-base placeholder:text-sm focus:outline-none focus:ring-0 focus:font-semibold resize-none focus:border-transparent overflow-hidden"
                      maxLength={200}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormItem>

          {preview && (
            <div className="mt-4 ml-14">
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

          <div className="w-[90%] flex justify-between items-center ml-[54px] mr-4 pt-[17px]">
            <div className="flex justify-center items-center gap-2.5">
              <div
                data-feeling="🤩 Happy"
                className="item-feeling cursor-pointer border-line flex justify-center items-center rounded-full px-3 py-1.5 border-2 gap-1.5"
              >
                <p>🤩</p>
                <p className="text-sm font-semibold">Happy</p>
              </div>
              <div
                data-feeling="😥 Sad"
                className="item-feeling cursor-pointer flex justify-center items-center rounded-full px-3 py-1.5 border-line border-2 gap-1.5"
              >
                <p>😥</p>
                <p className="text-sm font-semibold">Sad</p>
              </div>
              <Controller
                name="upload"
                control={methods.control}
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
                          setPreview(URL.createObjectURL(file));
                          setIsVideo(file.type.startsWith("video"));
                        }
                      }}
                    />

                    <Label
                      htmlFor="upload"
                      className="cursor-pointer text-white flex items-center"
                    >
                      <MdFileUpload size={24} className="mr-2" />
                      Img / Vid
                    </Label>
                  </div>
                )}
              />
            </div>
            <Button
              type="submit"
              className="btn-blue cursor-pointer font-bold rounded-full px-12"
            >
              Post
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default PostForm;

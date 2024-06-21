"use client";

import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import Spinner from "./ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { z } from "zod";

const VerifySchema = z.object({
  email: z
    .string({ required_error: "E-mail address is required." })
    .email("Not a valid e-mail address."),
});

const CompleteSchema = z.object({
  username: z.string({ required_error: "Username is required." }),
  name: z.string({ required_error: "Username is required." }),
  birthday: z.date({ required_error: "Date of birth is required." }),
});

export enum AuthVariant {
  SignUp = "Sign up",
  LogIn = "Log in",
}

function SuggestionMessage({
  variant = AuthVariant.SignUp,
}: {
  variant?: AuthVariant;
}) {
  const { message, action, href } = (() => {
    switch (variant) {
      case AuthVariant.SignUp:
        return {
          message: "Already have an account? ",
          action: "Sign in",
          href: "/flow/login",
        };
      case AuthVariant.LogIn:
        return {
          message: "Don't have an account? ",
          action: "Sign up",
          href: "/flow/signup",
        };
    }
  })();

  return (
    <p className="my-5 text-center text-zinc-400">
      {message}
      <Link
        href={href}
        className="cursor-pointer font-bold text-sky-400 hover:underline"
      >
        {action}
      </Link>
    </p>
  );
}

function VerifyForm({
  variant = AuthVariant.SignUp,
}: {
  variant?: AuthVariant;
}) {
  const form = useForm<z.infer<typeof VerifySchema>>({
    resolver: zodResolver(VerifySchema),
  });

  const onSubmit = async (data: z.infer<typeof VerifySchema>) => {
    await signIn("resend", data);
  };

  const flavorText = (() => {
    switch (variant) {
      case AuthVariant.SignUp:
        return "Come and build the next social phenomenon with us.";
      case AuthVariant.LogIn:
        return "Catch up on everything you've missed.";
    }
  })();

  return (
    <>
      <h1 className="text-3xl font-bold">{variant}</h1>
      <p className="mb-12 mt-5 text-zinc-400">{flavorText}</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="john.smith@semicolon.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            <span className="font-2xl ml-2">{variant}</span>
          </Button>
        </form>
      </Form>

      <SuggestionMessage variant={variant} />

      <div className="my-5 flex items-center gap-2">
        <div className="h-1 w-full border-b-2"></div>
        <span className="font-bold">Or</span>
        <div className="h-1 w-full border-b-2"></div>
      </div>

      <div className="my-2">
        <Button
          variant="outline"
          className="flex w-full items-center gap-3 text-zinc-700 dark:text-zinc-300"
          onClick={() => signIn("google")}
        >
          <FcGoogle className="size-6" />
          <span>{variant} with Google</span>
        </Button>
      </div>
      <div className="my-2">
        <Button
          variant="outline"
          className="flex w-full items-center gap-3 text-zinc-700 dark:text-zinc-300"
          onClick={() => signIn("discord")}
        >
          <FaDiscord className="size-6 fill-[#536dfe]" />
          <span>{variant} with Discord</span>
        </Button>
      </div>
      <div className="my-2">
        <Button
          variant="outline"
          className="flex w-full items-center gap-3 text-zinc-700 dark:text-zinc-300"
          onClick={() => signIn("github")}
        >
          <IoLogoGithub className="size-6" />
          <span>{variant} with GitHub</span>
        </Button>
      </div>
    </>
  );
}

function CompleteForm() {
  const { update } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof CompleteSchema>>({
    resolver: zodResolver(CompleteSchema),
  });

  const { mutate } = trpc.user.updateProfile.useMutation({
    onSuccess: async () => {
      await update({});
      router.push("/");
    },
  });

  const onSubmit = (data: z.infer<typeof CompleteSchema>) => mutate(data);

  return (
    <>
      <h1 className="text-3xl font-bold">Complete registration</h1>
      <p className="mb-12 mt-5 text-zinc-400">
        Just one more thing before we{"'"}re done.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="john.smith" {...field} />
                </FormControl>
                <FormDescription className={error ? "hidden" : ""}>
                  Your username should be unique.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} />
                </FormControl>
                <FormDescription className={error ? "hidden" : ""}>
                  However you want yourself to be called.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="birthday"
            render={({ field, fieldState: { error } }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground", // eslint-disable-line @typescript-eslint/no-unnecessary-condition
                        )}
                      >
                        {field.value ? ( // eslint-disable-line @typescript-eslint/no-unnecessary-condition
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    side="top"
                  >
                    <Calendar
                      captionLayout="dropdown"
                      fromDate={new Date("1970-01-01")}
                      toDate={new Date()}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className={error ? "hidden" : ""}>
                  Your date of birth is used to determine your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-10 w-full">
            <span className="font-2xl ml-2">Confirm</span>
          </Button>
        </form>
      </Form>
    </>
  );
}

export function AuthForm({
  variant = AuthVariant.SignUp,
}: {
  variant?: AuthVariant;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="flex h-full max-h-[720px] min-h-[660px] w-full min-w-[280px] flex-row items-center justify-center rounded-lg px-5 sm:border sm:px-10 lg:px-14">
      <div className="flex h-full w-full flex-col justify-center lg:min-w-[400px]">
        {(() => {
          if (status === "loading") {
            return <Spinner className="self-center" />;
          } else if (status === "unauthenticated") {
            return <VerifyForm variant={variant} />;
          } else if (!session?.user?.name) {
            return <CompleteForm />;
          } else {
            router.push("/");
            return <Spinner className="self-center" />;
          }
        })()}
      </div>
    </div>
  );
}

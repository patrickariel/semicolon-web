"use client";

import Spinner from "./ui/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail address is required.")
    .email("Not a valid e-mail address."),
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        router.push("/home");
      }
    }
  }, [router]);

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

export function AuthForm({
  variant = AuthVariant.SignUp,
}: {
  variant?: AuthVariant;
}) {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <div className="flex h-full max-h-[730px] min-h-[660px] w-full min-w-[280px] flex-row items-center justify-center rounded-lg px-5 sm:border sm:px-10 lg:px-14 xl:px-20">
      <div className="flex h-full w-full flex-col justify-center lg:min-w-[400px]">
        {(() => {
          if (status === "loading") {
            return <Spinner className="self-center" />;
          } else if (status === "unauthenticated") {
            return <VerifyForm variant={variant} />;
          } else {
            return <VerifyForm variant={variant} />;
          }
        })()}
      </div>
    </div>
  );
}

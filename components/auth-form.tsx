"use client";

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
import { signIn } from "next-auth/react";
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
    <p className="text-zinc-400 my-5 text-center">
      {message}
      <Link
        href={href}
        className="text-sky-400 font-bold cursor-pointer hover:underline"
      >
        {action}
      </Link>
    </p>
  );
}

export function AuthForm({
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
    <div className="p-5 sm:p-10 lg:p-14 xl:p-20 flex flex-row justify-center rounded-lg sm:border min-w-[250px] sm:min-w-[520px]">
      <div className="w-full lg:min-w-[400px]">
        <h1 className="font-bold text-3xl mt-auto">{variant}</h1>
        <p className="text-zinc-400 mt-5 mb-12">{flavorText}</p>

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
              <span className="ml-2 font-2xl">{variant}</span>
            </Button>
          </form>
        </Form>

        <SuggestionMessage variant={variant} />

        <div className="flex items-center gap-2 my-5">
          <div className="w-full h-1 border-b-2"></div>
          <span className="font-bold">Or</span>
          <div className="w-full h-1 border-b-2"></div>
        </div>

        <div className="my-2">
          <Button
            variant="outline"
            className="w-full flex gap-3 items-center text-zinc-700 dark:text-zinc-300 "
            onClick={() => signIn("google")}
          >
            <FcGoogle className="size-6" />
            <span>{variant} with Google</span>
          </Button>
        </div>
        <div className="my-2">
          <Button
            variant="outline"
            className="w-full flex gap-3 items-center text-zinc-700 dark:text-zinc-300 "
            onClick={() => signIn("discord")}
          >
            <FaDiscord className="size-6 fill-[#536dfe]" />
            <span>{variant} with Discord</span>
          </Button>
        </div>
        <div className="my-2">
          <Button
            variant="outline"
            className="w-full flex gap-3 items-center text-zinc-700 dark:text-zinc-300"
            onClick={() => signIn("github")}
          >
            <IoLogoGithub className="size-6" />
            <span>{variant} with GitHub</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

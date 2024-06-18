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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineFacebook } from "react-icons/md";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(1, "Username is required!"),
  email: z.string().min(1, "Email is required").email("Invalid email format!"),
  password: z.string().min(1, "Password is required!"),
});

export default function RegisterPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      console.log("Form data:", data);
      // Simulate API call delay
      setTimeout(() => {
        setLoading(false);
        router.push("/home");
      }, 1000);
    } catch (error) {
      setErrorMessage("An error occurs during registration!");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("token")) {
        router.push("/home");
      }
    }
  }, [router]);

  return (
    <section className="h-screen flex gap-5 w-full p-4 justify-center">
      <div className="w-full lg:w-1/2 my-auto">
        <div className="px-7">
          <div className="px-9">
            <h1 className="font-bold text-3xl mt-auto">Sign Up</h1>
            <p className="text-zinc-400 mt-5 mb-12">
              What{"'"}s trend, what{"'"}s good for you.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.smith@semicolon.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="•••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" loading={loading}>
                  <span className="ml-2 font-2xl">Sign up</span>
                </Button>
              </form>
            </Form>

            <p className="mt-8 text-center text-zinc-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-zinc-600 font-bold cursor-pointer hover:text-slate-300"
              >
                Sign in
              </Link>
            </p>

            <div className="flex items-center gap-2 my-5">
              <div className="w-full h-1 border-b-2"></div>
              <span className="font-bold">Or</span>
              <div className="w-full h-1 border-b-2"></div>
            </div>

            <div className="my-2">
              <Button
                variant="outline"
                className="w-full flex gap-3 items-center text-zinc-700 dark:text-zinc-300 "
                onClick={() => console.log("Sign up with Google")}
              >
                <FcGoogle className="size-6" />
                <span>Sign up with Google</span>
              </Button>
            </div>
            <div className="my-2">
              <Button
                variant="outline"
                className="w-full flex gap-3 items-center text-zinc-700 dark:text-zinc-300"
                onClick={() => console.log("Sign up with Facebook")}
              >
                <MdOutlineFacebook className="size-7 fill-[#2aa4f4]" />
                <span>Sign up with Facebook</span>
              </Button>
            </div>
            <div className="my-2">
              <Button
                variant="outline"
                className="w-full flex gap-3 items-center text-zinc-700 dark:text-zinc-300 "
                onClick={() => console.log("Sign up with Discord")}
              >
                <FaDiscord className="size-6 fill-[#536dfe]" />
                <span>Sign up with Discord</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator
        orientation="vertical"
        className="h-5/6 self-center hidden lg:block"
      />
      <div className="w-1/2 flex-col gap-14 justify-center items-center hidden lg:flex">
        <div className="flex flex-row gap-6">
          <h1 className="text-7xl xl:text-8xl font-bold">semicolon</h1>
          <h1 className="text-7xl xl:text-8xl text-sky-300 font-extrabold">
            ;
          </h1>
        </div>
        <h3 className="text-2xl text-muted-foreground">
          Where conversation happens.
        </h3>
      </div>
    </section>
  );
}

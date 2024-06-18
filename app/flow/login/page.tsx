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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaDiscord } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineFacebook } from "react-icons/md";
import { z } from "zod";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "Email must be filled in!")
    .email("Invalid email format!"),
  password: z.string().min(1, "Password must be filled in!"),
});

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      // Implement login logic here, for now, I'll just log the data
      console.log("Login data:", data);
      router.push("/home");
    } catch (error) {
      setErrorMessage("Failed to login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-7">
      <div className="px-9">
        <h1 className="font-bold text-3xl mt-auto">Sign in</h1>
        <p className="text-zinc-400 mt-5 mb-12">
          Catch up on everything you{"'"}ve missed.
        </p>

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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="•••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <span className="ml-2 font-2xl">Sign in</span>
            </Button>
          </form>
        </Form>

        <p className="text-zinc-500 my-5 text-center">
          Don{"'"}t have an account?{" "}
          <Link
            href="/flow/register"
            className="text-blue-200 font-bold cursor-pointer hover:text-blue-300"
          >
            Sign up
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
  );
}

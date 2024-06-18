"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaLocationArrow } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Username is required!"),
  email: yup
    .string()
    .email("Invalid email format!")
    .required("Email is required"),
  password: yup.string().required("Password is required!"),
});

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = (data: any) => {
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
    <section className="h-screen flex gap-5 w-full p-4">
      <div className="w-full md:w-[50%] my-auto font-poppins">
        <div className="px-7">
          <div className="px-9">
            <h1 className="font-bold text-3xl mt-auto">Sign Up</h1>
            <p className="text-gray-400 mt-5 mb-12">
              What&apos;s trend, what&apos;s good for you.
            </p>

            <form className="mt-5" onSubmit={handleSubmit(handleRegister)}>
              {errorMessage && (
                <Alert variant="error" className="mb-6">
                  {errorMessage}
                </Alert>
              )}
              <div className="mb-6">
                <Label htmlFor="name">Username</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Username"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div className="mb-6">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="your.email@gmail.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="mb-6">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="********"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button
                type="submit"
                className="btn-primary w-full"
                loading={loading}
              >
                <span className="ml-2 font-2xl">Sign up</span>
              </Button>
            </form>

            <p className="mt-8 text-center text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-gray-600 font-bold cursor-pointer hover:text-slate-300"
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
                className="w-full flex gap-3 items-center text-gray-700 dark:text-gray-300 "
                onClick={() => console.log("Sign up with Google")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:h-6 sm:w-6"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#e53935"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4caf50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1565c0"
                    d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                <span>Sign up with Google</span>
              </Button>
            </div>
            <div className="my-2">
              <Button
                variant="outline"
                className="w-full flex gap-3 items-center text-gray-700 dark:text-gray-300"
                onClick={() => console.log("Sign up with Facebook")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:h-6 sm:w-6"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <linearGradient
                    id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1"
                    x1="9.993"
                    x2="40.615"
                    y1="9.993"
                    y2="40.615"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stop-color="#2aa4f4"></stop>
                    <stop offset="1" stop-color="#007ad9"></stop>
                  </linearGradient>
                  <path
                    fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)"
                    d="M24,4C12.954,4,4,12.954,4,24c0,9.668,7.164,17.636,16.5,19.592V30.89h-5.1v-6.5h5.1v-4.949	c0-5.066,3.074-7.828,7.559-7.828c2.148,0,3.992,0.159,4.53,0.23v5.25H29.96c-2.261,0-2.699,1.074-2.699,2.652v3.645h5.4	l-0.869,6.5h-4.531v12.702C36.836,41.637,44,33.669,44,24C44,12.954,35.046,4,24,4z"
                  ></path>
                </svg>
                <span>Sign up with Facebook</span>
              </Button>
            </div>
            <div className="my-2">
              <Button
                variant="outline"
                className="w-full flex gap-3 items-center text-gray-700 dark:text-gray-300 "
                onClick={() => console.log("Sign up with Discord")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:h-6 sm:w-6"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#536dfe"
                    d="M39.248,10.177c-2.804-1.287-5.812-2.235-8.956-2.778c-0.057-0.01-0.114,0.016-0.144,0.068	c-0.387,0.688-0.815,1.585-1.115,2.291c-3.382-0.506-6.747-0.506-10.059,0c-0.3-0.721-0.744-1.603-1.133-2.291	c-0.03-0.051-0.087-0.077-0.144-0.068c-3.143,0.541-6.15,1.489-8.956,2.778c-0.024,0.01-0.045,0.028-0.059,0.051	c-5.704,8.522-7.267,16.835-6.5,25.044c0.003,0.04,0.026,0.079,0.057,0.103c3.763,2.764,7.409,4.442,10.987,5.554	c0.057,0.017,0.118-0.003,0.154-0.051c0.846-1.156,1.601-2.374,2.248-3.656c0.038-0.075,0.002-0.164-0.076-0.194	c-1.197-0.454-2.336-1.007-3.432-1.636c-0.087-0.051-0.094-0.175-0.014-0.234c0.231-0.173,0.461-0.353,0.682-0.534	c0.04-0.033,0.095-0.04,0.142-0.019c7.201,3.288,14.997,3.288,22.113,0c0.047-0.023,0.102-0.016,0.144,0.017	c0.22,0.182,0.451,0.363,0.683,0.536c0.08,0.059,0.075,0.183-0.012,0.234c-1.096,0.641-2.236,1.182-3.434,1.634	c-0.078,0.03-0.113,0.12-0.075,0.196c0.661,1.28,1.415,2.498,2.246,3.654c0.035,0.049,0.097,0.07,0.154,0.052	c3.595-1.112,7.241-2.79,11.004-5.554c0.033-0.024,0.054-0.061,0.057-0.101c0.917-9.491-1.537-17.735-6.505-25.044	C39.293,10.205,39.272,10.187,39.248,10.177z M16.703,30.273c-2.168,0-3.954-1.99-3.954-4.435s1.752-4.435,3.954-4.435	c2.22,0,3.989,2.008,3.954,4.435C20.658,28.282,18.906,30.273,16.703,30.273z M31.324,30.273c-2.168,0-3.954-1.99-3.954-4.435	s1.752-4.435,3.954-4.435c2.22,0,3.989,2.008,3.954,4.435C35.278,28.282,33.544,30.273,31.324,30.273z"
                  ></path>
                </svg>
                <span>Sign up with Discord</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[50%] relative hidden md:block">
        <Image
          src="/images/bg-auth1.png"
          alt="bg-auth"
          width={1920}
          height={1080}
          objectFit="cover"
          className="h-full w-full object-cover rounded-2xl"
        />
      </div>
    </section>
  );
}

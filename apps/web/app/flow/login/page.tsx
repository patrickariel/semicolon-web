"use client";

import { AuthForm, AuthVariant } from "@/components/auth-form";

export default function Page() {
  return <AuthForm variant={AuthVariant.LogIn} />;
}

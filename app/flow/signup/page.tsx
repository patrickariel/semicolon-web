"use client";

import { AuthForm, AuthVariant } from "@/components/auth-form";
import React from "react";

export default function Page() {
  return <AuthForm variant={AuthVariant.SignUp} />;
}

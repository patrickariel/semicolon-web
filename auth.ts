import { TrpcAdapter } from "./adapter";
import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Resend({ from: "onboarding@resend.dev" }),
    Google,
    Discord,
    GitHub,
  ],
  adapter: TrpcAdapter,
  session: { strategy: "jwt" },
});

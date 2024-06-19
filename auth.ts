import { TrpcAdapter } from "./adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Resend({ from: "onboarding@resend.dev" })],
  adapter: TrpcAdapter,
  session: { strategy: "jwt" },
});

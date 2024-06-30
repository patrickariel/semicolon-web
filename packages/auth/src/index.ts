import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@semicolon/db";
import NextAuth, { DefaultSession } from "next-auth";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

declare module "next-auth" {
  interface Session {
    user?: {
      username?: string;
    } & DefaultSession["user"];
  }
}

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Resend({ from: "onboarding@resend.dev" }),
    Google,
    Discord,
    GitHub,
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, trigger }) {
      if (trigger === "update" && token.email) {
        const user = await prisma.user.findUnique({
          where: { email: token.email },
        });
        token = {
          ...token,
          name: user?.name,
          username: user?.username,
        };
      }
      return token;
    },
  },
});

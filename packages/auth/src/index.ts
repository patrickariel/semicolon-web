import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@semicolon/db";
import NextAuth, { DefaultSession } from "next-auth";
import type { JWT as _ } from "next-auth/jwt";
import Discord from "next-auth/providers/discord";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { z } from "zod";

declare module "next-auth" {
  interface Session {
    user?: {
      id: string; // ID will be automatically supplied on sign up
      email: string; // We only use providers that supports emails
      username?: string | null;
      image?: string | null;
      registered?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    username?: string | null;
    image?: string | null;
    registered?: boolean;
  }
}

const prisma = new PrismaClient();

const UpdateSchema = z.object({
  name: z.string(),
  username: z.string(),
  image: z.string().url().optional(),
  registered: z.boolean(),
});

export const {
  handlers,
  signIn,
  signOut,
  unstable_update: update,
  auth,
} = NextAuth({
  providers: [
    Resend({ from: "onboarding@resend.dev" }),
    Google,
    Discord,
    GitHub,
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user?.id) {
        token.id = user.id;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (trigger === "update" && session.user) {
        // HACK: Massively insecure
        // HACK: See https://github.com/nextauthjs/next-auth/discussions/9715#discussioncomment-8475629 and https://github.com/nextauthjs/next-auth/discussions/3941
        const update = UpdateSchema.safeParse(session.user); // eslint-disable-line @typescript-eslint/no-unsafe-member-access
        if (update.data) {
          token = {
            ...token,
            ...update.data,
          };
        }
      } else if (trigger === "signIn") {
        const user = await prisma.user.findUnique({
          where: { id: token.id },
        });
        token = {
          ...token,
          ...{
            name: user?.name,
            username: user?.username,
            image: user?.image,
            registered: user?.registered,
          },
        };
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.registered = token.registered;
      return session;
    },
  },
});

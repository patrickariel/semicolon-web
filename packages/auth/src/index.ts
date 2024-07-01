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
      id: string; // ID should always be present
      username?: string | null;
      registered?: boolean | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username?: string | null;
    registered?: boolean | null;
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
        // HACK: Remove this once we have the ability to update sessions directly from the server
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

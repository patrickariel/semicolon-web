import { createCaller } from "..";
import { type Session, update } from "@semicolon/auth";
import { User, db } from "@semicolon/db";
import { HeadBlobResult, head } from "@vercel/blob";
import { vi } from "vitest";

export interface UserContext {
  user: User;
  session: Session;
  router: ReturnType<typeof createCaller>;
}

export function mockUpdateImplementation(session: Session) {
  return (data: Parameters<typeof update>[0]): Promise<Session | null> => {
    if (session.user) {
      session.user = {
        ...session.user,
        ...data.user,
      };
      return Promise.resolve(session);
    } else {
      return Promise.resolve(null);
    }
  };
}

export function mockHeadImplementation() {
  return (
    url: string,
    _options?: Parameters<typeof head>[1],
  ): Promise<HeadBlobResult> =>
    Promise.resolve({
      url,
      downloadUrl: `${url}?download=1`,
      size: 100,
      uploadedAt: new Date(),
      pathname: "profilesv1/image.jpg",
      contentType: "image/jpeg",
      contentDisposition: 'attachment; filename="image.jpg"',
      cacheControl: "public, max-age=31536000, s-maxage=300",
    });
}

export async function createUserContext(
  data: Parameters<typeof db.user.create>[0]["data"],
): Promise<UserContext> {
  const user = await db.user.create({ data });

  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const session = {
    user,
    expires: expires.toISOString(),
  };

  const router = createCaller({ session });

  vi.mocked(update).mockImplementation(mockUpdateImplementation(session));

  return { user, session, router };
}

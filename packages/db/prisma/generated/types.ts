import type { ColumnType } from "kysely";

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Account = {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};
export type Like = {
  id: Generated<string>;
  userId: string;
  postId: string;
  createdAt: Generated<Timestamp>;
};
export type Media = {
  id: Generated<string>;
  postId: string;
  mediaUrl: string;
  mediaType: string;
};
export type Post = {
  id: Generated<string>;
  createdAt: Generated<Timestamp>;
  userId: string;
  content: string;
  parentId: string | null;
};
export type Session = {
  sessionToken: string;
  userId: string;
  expires: Timestamp;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};
export type User = {
  id: Generated<string>;
  username: string | null;
  name: string | null;
  email: string;
  registered: Generated<boolean>;
  emailVerified: Timestamp | null;
  birthday: Timestamp | null;
  image: string | null;
  bio: string | null;
  createdAt: Generated<Timestamp>;
  updatedAt: Timestamp;
};
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Timestamp;
};
export type DB = {
  Account: Account;
  Like: Like;
  Media: Media;
  Post: Post;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
};

import { PostSchema, UserSchema } from "@semicolon/db/zod";
import short from "short-uuid";
import isAlphanumeric from "validator/es/lib/isAlphanumeric";
import { z } from "zod";

export const UsernameSchema = z
  .string({ required_error: "Username is required" })
  .max(15, "Username cannot be longer than 15 characters")
  .refine((arg) => isAlphanumeric(arg, undefined, { ignore: "-_." }), {
    message:
      "Username must only contain letters, numbers, periods, hyphens or dashes",
  });

export const BirthdaySchema = z
  .date({ required_error: "Birthday is required" })
  .refine((date) => date < new Date(), {
    message: "Invalid birth date",
  });

const uuidTranslator = short(short.constants.flickrBase58);

export const ShortToUUID = z.string().transform((val, ctx) => {
  try {
    return uuidTranslator.toUUID(val) as string;
  } catch (_) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid suuid",
    });
    return z.NEVER;
  }
});

export const UUIDToShort = z
  .string()
  .uuid()
  .transform((val, ctx) => {
    try {
      return uuidTranslator.fromUUID(val) as string;
    } catch (_) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Cannot shorten uuid",
      });
      return z.NEVER;
    }
  });

export const UserResolvedSchema = UserSchema.merge(
  z.object({
    name: z.string(),
    username: z.string(),
    registered: z.date(),
    following: z.number(),
    followers: z.number(),
    followed: z.boolean(),
    posts: z.number(),
    birthday: z.date().nullable(),
  }),
);

export const PublicUserResolvedSchema = UserResolvedSchema.omit({
  email: true,
  emailVerified: true,
  updatedAt: true,
});

export const PostResolvedSchema = PostSchema.merge(
  z.object({
    id: UUIDToShort,
    parentId: UUIDToShort.nullable(),
    name: z.string(),
    username: z.string(),
    verified: z.boolean(),
    followed: z.boolean(),
    liked: z.boolean(),
    avatar: z.string().nullable(),
    likeCount: z.number(),
    replyCount: z.number(),
    to: z.string().nullable(),
  }),
);

export type PostResolved = z.infer<typeof PostResolvedSchema>;
export type PublicUserResolved = z.infer<typeof PublicUserResolvedSchema>;

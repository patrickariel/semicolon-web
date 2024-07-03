import type { Prisma } from "@prisma/client";
import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  "ReadUncommitted",
  "ReadCommitted",
  "RepeatableRead",
  "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
  "id",
  "username",
  "name",
  "email",
  "registered",
  "emailVerified",
  "birthday",
  "image",
  "bio",
  "createdAt",
  "updatedAt",
]);

export const AccountScalarFieldEnumSchema = z.enum([
  "userId",
  "type",
  "provider",
  "providerAccountId",
  "refresh_token",
  "access_token",
  "expires_at",
  "token_type",
  "scope",
  "id_token",
  "session_state",
  "createdAt",
  "updatedAt",
]);

export const SessionScalarFieldEnumSchema = z.enum([
  "sessionToken",
  "userId",
  "expires",
  "createdAt",
  "updatedAt",
]);

export const VerificationTokenScalarFieldEnumSchema = z.enum([
  "identifier",
  "token",
  "expires",
]);

export const PostScalarFieldEnumSchema = z.enum([
  "id",
  "createdAt",
  "userId",
  "content",
  "parentId",
]);

export const MediaScalarFieldEnumSchema = z.enum([
  "id",
  "postId",
  "mediaUrl",
  "mediaType",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);

export const UserOrderByRelevanceFieldEnumSchema = z.enum([
  "id",
  "username",
  "name",
  "email",
  "image",
  "bio",
]);

export const AccountOrderByRelevanceFieldEnumSchema = z.enum([
  "userId",
  "type",
  "provider",
  "providerAccountId",
  "refresh_token",
  "access_token",
  "token_type",
  "scope",
  "id_token",
  "session_state",
]);

export const SessionOrderByRelevanceFieldEnumSchema = z.enum([
  "sessionToken",
  "userId",
]);

export const VerificationTokenOrderByRelevanceFieldEnumSchema = z.enum([
  "identifier",
  "token",
]);

export const PostOrderByRelevanceFieldEnumSchema = z.enum([
  "id",
  "userId",
  "content",
  "parentId",
]);

export const MediaOrderByRelevanceFieldEnumSchema = z.enum([
  "id",
  "postId",
  "mediaUrl",
  "mediaType",
]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().nullable(),
  name: z.string().nullable(),
  email: z.string(),
  registered: z.boolean(),
  emailVerified: z.coerce.date().nullable(),
  birthday: z.coerce.date().nullable(),
  image: z.string().nullable(),
  bio: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Account = z.infer<typeof AccountSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Session = z.infer<typeof SessionSchema>;

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
});

export type VerificationToken = z.infer<typeof VerificationTokenSchema>;

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  userId: z.string(),
  content: z.string(),
  parentId: z.string().nullable(),
});

export type Post = z.infer<typeof PostSchema>;

/////////////////////////////////////////
// MEDIA SCHEMA
/////////////////////////////////////////

export const MediaSchema = z.object({
  id: z.string(),
  postId: z.string(),
  mediaUrl: z.string(),
  mediaType: z.string(),
});

export type Media = z.infer<typeof MediaSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    followedBy: z
      .union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
      .optional(),
    following: z
      .union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
      .optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    posts: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
    likes: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      followedBy: z.boolean().optional(),
      following: z.boolean().optional(),
      accounts: z.boolean().optional(),
      sessions: z.boolean().optional(),
      posts: z.boolean().optional(),
      likes: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    username: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    registered: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    birthday: z.boolean().optional(),
    image: z.boolean().optional(),
    bio: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    followedBy: z
      .union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
      .optional(),
    following: z
      .union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
      .optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    posts: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
    likes: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z
  .object({
    select: z.lazy(() => AccountSelectSchema).optional(),
    include: z.lazy(() => AccountIncludeSchema).optional(),
  })
  .strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z
  .object({
    userId: z.boolean().optional(),
    type: z.boolean().optional(),
    provider: z.boolean().optional(),
    providerAccountId: z.boolean().optional(),
    refresh_token: z.boolean().optional(),
    access_token: z.boolean().optional(),
    expires_at: z.boolean().optional(),
    token_type: z.boolean().optional(),
    scope: z.boolean().optional(),
    id_token: z.boolean().optional(),
    session_state: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z
  .object({
    select: z.lazy(() => SessionSelectSchema).optional(),
    include: z.lazy(() => SessionIncludeSchema).optional(),
  })
  .strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z
  .object({
    sessionToken: z.boolean().optional(),
    userId: z.boolean().optional(),
    expires: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict();

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> =
  z
    .object({
      identifier: z.boolean().optional(),
      token: z.boolean().optional(),
      expires: z.boolean().optional(),
    })
    .strict();

// POST
//------------------------------------------------------

export const PostIncludeSchema: z.ZodType<Prisma.PostInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    parent: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
    children: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
    likes: z
      .union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
      .optional(),
    media: z
      .union([z.boolean(), z.lazy(() => MediaFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => PostCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const PostArgsSchema: z.ZodType<Prisma.PostDefaultArgs> = z
  .object({
    select: z.lazy(() => PostSelectSchema).optional(),
    include: z.lazy(() => PostIncludeSchema).optional(),
  })
  .strict();

export const PostCountOutputTypeArgsSchema: z.ZodType<Prisma.PostCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => PostCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const PostCountOutputTypeSelectSchema: z.ZodType<Prisma.PostCountOutputTypeSelect> =
  z
    .object({
      children: z.boolean().optional(),
      likes: z.boolean().optional(),
      media: z.boolean().optional(),
    })
    .strict();

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    content: z.boolean().optional(),
    parentId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    parent: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
    children: z
      .union([z.boolean(), z.lazy(() => PostFindManyArgsSchema)])
      .optional(),
    likes: z
      .union([z.boolean(), z.lazy(() => UserFindManyArgsSchema)])
      .optional(),
    media: z
      .union([z.boolean(), z.lazy(() => MediaFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => PostCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// MEDIA
//------------------------------------------------------

export const MediaIncludeSchema: z.ZodType<Prisma.MediaInclude> = z
  .object({
    post: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
  })
  .strict();

export const MediaArgsSchema: z.ZodType<Prisma.MediaDefaultArgs> = z
  .object({
    select: z.lazy(() => MediaSelectSchema).optional(),
    include: z.lazy(() => MediaIncludeSchema).optional(),
  })
  .strict();

export const MediaSelectSchema: z.ZodType<Prisma.MediaSelect> = z
  .object({
    id: z.boolean().optional(),
    postId: z.boolean().optional(),
    mediaUrl: z.boolean().optional(),
    mediaType: z.boolean().optional(),
    post: z.union([z.boolean(), z.lazy(() => PostArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    username: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    name: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    registered: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    emailVerified: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    birthday: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    bio: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    followedBy: z.lazy(() => UserListRelationFilterSchema).optional(),
    following: z.lazy(() => UserListRelationFilterSchema).optional(),
    accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
    sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
    posts: z.lazy(() => PostListRelationFilterSchema).optional(),
    likes: z.lazy(() => PostListRelationFilterSchema).optional(),
  })
  .strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      username: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      registered: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      birthday: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      bio: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      followedBy: z
        .lazy(() => UserOrderByRelationAggregateInputSchema)
        .optional(),
      following: z
        .lazy(() => UserOrderByRelationAggregateInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountOrderByRelationAggregateInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionOrderByRelationAggregateInputSchema)
        .optional(),
      posts: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
      likes: z.lazy(() => PostOrderByRelationAggregateInputSchema).optional(),
      _relevance: z.lazy(() => UserOrderByRelevanceInputSchema).optional(),
    })
    .strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        username: z.string(),
        email: z.string(),
      }),
      z.object({
        id: z.string(),
        username: z.string(),
      }),
      z.object({
        id: z.string(),
        email: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        username: z.string(),
        email: z.string(),
      }),
      z.object({
        username: z.string(),
      }),
      z.object({
        email: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.string().optional(),
          username: z.string().optional(),
          email: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          registered: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          emailVerified: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          birthday: z
            .union([
              z.lazy(() => DateTimeNullableFilterSchema),
              z.coerce.date(),
            ])
            .optional()
            .nullable(),
          image: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          bio: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          followedBy: z.lazy(() => UserListRelationFilterSchema).optional(),
          following: z.lazy(() => UserListRelationFilterSchema).optional(),
          accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
          sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
          posts: z.lazy(() => PostListRelationFilterSchema).optional(),
          likes: z.lazy(() => PostListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      username: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      registered: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      birthday: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      bio: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      username: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      email: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      registered: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      emailVerified: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    userId: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    provider: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    providerAccountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    refresh_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    access_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    expires_at: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    token_type: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    id_token: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    session_state: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      access_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      expires_at: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      token_type: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      scope: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      session_state: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      _relevance: z.lazy(() => AccountOrderByRelevanceInputSchema).optional(),
    })
    .strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> =
  z
    .object({
      provider_providerAccountId: z.lazy(
        () => AccountProviderProviderAccountIdCompoundUniqueInputSchema,
      ),
    })
    .and(
      z
        .object({
          provider_providerAccountId: z
            .lazy(
              () => AccountProviderProviderAccountIdCompoundUniqueInputSchema,
            )
            .optional(),
          AND: z
            .union([
              z.lazy(() => AccountWhereInputSchema),
              z.lazy(() => AccountWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => AccountWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => AccountWhereInputSchema),
              z.lazy(() => AccountWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          type: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          provider: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          providerAccountId: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          refresh_token: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          access_token: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          expires_at: z
            .union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
            .optional()
            .nullable(),
          token_type: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          scope: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          id_token: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          session_state: z
            .union([z.lazy(() => StringNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      access_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      expires_at: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      token_type: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      scope: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      id_token: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      session_state: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AccountScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
          z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      type: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      provider: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      providerAccountId: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      refresh_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    sessionToken: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userId: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    expires: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> =
  z
    .object({
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      _relevance: z.lazy(() => SessionOrderByRelevanceInputSchema).optional(),
    })
    .strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> =
  z
    .object({
      sessionToken: z.string(),
    })
    .and(
      z
        .object({
          sessionToken: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => SessionWhereInputSchema),
              z.lazy(() => SessionWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SessionWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SessionWhereInputSchema),
              z.lazy(() => SessionWhereInputSchema).array(),
            ])
            .optional(),
          userId: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          expires: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> =
  z
    .object({
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SessionScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      sessionToken: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      userId: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VerificationTokenWhereInputSchema),
          z.lazy(() => VerificationTokenWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VerificationTokenWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VerificationTokenWhereInputSchema),
          z.lazy(() => VerificationTokenWhereInputSchema).array(),
        ])
        .optional(),
      identifier: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      expires: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      _relevance: z
        .lazy(() => VerificationTokenOrderByRelevanceInputSchema)
        .optional(),
    })
    .strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> =
  z
    .object({
      identifier_token: z.lazy(
        () => VerificationTokenIdentifierTokenCompoundUniqueInputSchema,
      ),
    })
    .and(
      z
        .object({
          identifier_token: z
            .lazy(
              () => VerificationTokenIdentifierTokenCompoundUniqueInputSchema,
            )
            .optional(),
          AND: z
            .union([
              z.lazy(() => VerificationTokenWhereInputSchema),
              z.lazy(() => VerificationTokenWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => VerificationTokenWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => VerificationTokenWhereInputSchema),
              z.lazy(() => VerificationTokenWhereInputSchema).array(),
            ])
            .optional(),
          identifier: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          token: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          expires: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
        })
        .strict(),
    );

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => VerificationTokenCountOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => VerificationTokenMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => VerificationTokenMinOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      identifier: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      token: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      expires: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PostWhereInputSchema),
        z.lazy(() => PostWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PostWhereInputSchema),
        z.lazy(() => PostWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    userId: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    content: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    parentId: z
      .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    user: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    parent: z
      .union([
        z.lazy(() => PostNullableRelationFilterSchema),
        z.lazy(() => PostWhereInputSchema),
      ])
      .optional()
      .nullable(),
    children: z.lazy(() => PostListRelationFilterSchema).optional(),
    likes: z.lazy(() => UserListRelationFilterSchema).optional(),
    media: z.lazy(() => MediaListRelationFilterSchema).optional(),
  })
  .strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      parentId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      parent: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
      children: z
        .lazy(() => PostOrderByRelationAggregateInputSchema)
        .optional(),
      likes: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional(),
      media: z.lazy(() => MediaOrderByRelationAggregateInputSchema).optional(),
      _relevance: z.lazy(() => PostOrderByRelevanceInputSchema).optional(),
    })
    .strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => PostWhereInputSchema),
              z.lazy(() => PostWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => PostWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => PostWhereInputSchema),
              z.lazy(() => PostWhereInputSchema).array(),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          userId: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          content: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          parentId: z
            .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
            .optional()
            .nullable(),
          user: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
          parent: z
            .union([
              z.lazy(() => PostNullableRelationFilterSchema),
              z.lazy(() => PostWhereInputSchema),
            ])
            .optional()
            .nullable(),
          children: z.lazy(() => PostListRelationFilterSchema).optional(),
          likes: z.lazy(() => UserListRelationFilterSchema).optional(),
          media: z.lazy(() => MediaListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      parentId: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PostScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      userId: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      content: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      parentId: z
        .union([
          z.lazy(() => UuidNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MediaWhereInputSchema: z.ZodType<Prisma.MediaWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MediaWhereInputSchema),
        z.lazy(() => MediaWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MediaWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MediaWhereInputSchema),
        z.lazy(() => MediaWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    postId: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
    mediaUrl: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    mediaType: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    post: z
      .union([
        z.lazy(() => PostRelationFilterSchema),
        z.lazy(() => PostWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const MediaOrderByWithRelationInputSchema: z.ZodType<Prisma.MediaOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      postId: z.lazy(() => SortOrderSchema).optional(),
      mediaUrl: z.lazy(() => SortOrderSchema).optional(),
      mediaType: z.lazy(() => SortOrderSchema).optional(),
      post: z.lazy(() => PostOrderByWithRelationInputSchema).optional(),
      _relevance: z.lazy(() => MediaOrderByRelevanceInputSchema).optional(),
    })
    .strict();

export const MediaWhereUniqueInputSchema: z.ZodType<Prisma.MediaWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z
        .object({
          id: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => MediaWhereInputSchema),
              z.lazy(() => MediaWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MediaWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => MediaWhereInputSchema),
              z.lazy(() => MediaWhereInputSchema).array(),
            ])
            .optional(),
          postId: z
            .union([z.lazy(() => UuidFilterSchema), z.string()])
            .optional(),
          mediaUrl: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          mediaType: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          post: z
            .union([
              z.lazy(() => PostRelationFilterSchema),
              z.lazy(() => PostWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const MediaOrderByWithAggregationInputSchema: z.ZodType<Prisma.MediaOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      postId: z.lazy(() => SortOrderSchema).optional(),
      mediaUrl: z.lazy(() => SortOrderSchema).optional(),
      mediaType: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => MediaCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => MediaMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => MediaMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const MediaScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MediaScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MediaScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MediaScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      postId: z
        .union([z.lazy(() => UuidWithAggregatesFilterSchema), z.string()])
        .optional(),
      mediaUrl: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      mediaType: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    id: z.string().optional(),
    username: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    email: z.string(),
    registered: z.boolean().optional(),
    emailVerified: z.coerce.date().optional().nullable(),
    birthday: z.coerce.date().optional().nullable(),
    image: z.string().optional().nullable(),
    bio: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    followedBy: z
      .lazy(() => UserCreateNestedManyWithoutFollowingInputSchema)
      .optional(),
    following: z
      .lazy(() => UserCreateNestedManyWithoutFollowedByInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
    posts: z.lazy(() => PostCreateNestedManyWithoutUserInputSchema).optional(),
    likes: z.lazy(() => PostCreateNestedManyWithoutLikesInputSchema).optional(),
  })
  .strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    username: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    name: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    registered: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    birthday: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    bio: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    followedBy: z
      .lazy(() => UserUpdateManyWithoutFollowingNestedInputSchema)
      .optional(),
    following: z
      .lazy(() => UserUpdateManyWithoutFollowedByNestedInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    sessions: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    posts: z.lazy(() => PostUpdateManyWithoutUserNestedInputSchema).optional(),
    likes: z.lazy(() => PostUpdateManyWithoutLikesNestedInputSchema).optional(),
  })
  .strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z
  .object({
    type: z.string(),
    provider: z.string(),
    providerAccountId: z.string(),
    refresh_token: z.string().optional().nullable(),
    access_token: z.string().optional().nullable(),
    expires_at: z.number().int().optional().nullable(),
    token_type: z.string().optional().nullable(),
    scope: z.string().optional().nullable(),
    id_token: z.string().optional().nullable(),
    session_state: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
  })
  .strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> =
  z
    .object({
      userId: z.string(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z
  .object({
    type: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    provider: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerAccountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    refresh_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    access_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    expires_at: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    token_type: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    id_token: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    session_state: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema)
      .optional(),
  })
  .strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> =
  z
    .object({
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> =
  z
    .object({
      userId: z.string(),
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> =
  z
    .object({
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> =
  z
    .object({
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z
  .object({
    sessionToken: z.string(),
    expires: z.coerce.date(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
  })
  .strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> =
  z
    .object({
      sessionToken: z.string(),
      userId: z.string(),
      expires: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z
  .object({
    sessionToken: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expires: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema)
      .optional(),
  })
  .strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> =
  z
    .object({
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> =
  z
    .object({
      sessionToken: z.string(),
      userId: z.string(),
      expires: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> =
  z
    .object({
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> =
  z
    .object({
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
      expires: z.coerce.date(),
    })
    .strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> =
  z
    .object({
      identifier: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      token: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z
  .object({
    id: z.string().optional(),
    createdAt: z.coerce.date().optional(),
    content: z.string(),
    user: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
    parent: z
      .lazy(() => PostCreateNestedOneWithoutChildrenInputSchema)
      .optional(),
    children: z
      .lazy(() => PostCreateNestedManyWithoutParentInputSchema)
      .optional(),
    likes: z.lazy(() => UserCreateNestedManyWithoutLikesInputSchema).optional(),
    media: z.lazy(() => MediaCreateNestedManyWithoutPostInputSchema).optional(),
  })
  .strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      userId: z.string(),
      content: z.string(),
      parentId: z.string().optional().nullable(),
      children: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUncheckedCreateNestedManyWithoutPostInputSchema)
        .optional(),
    })
    .strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema)
      .optional(),
    parent: z
      .lazy(() => PostUpdateOneWithoutChildrenNestedInputSchema)
      .optional(),
    children: z
      .lazy(() => PostUpdateManyWithoutParentNestedInputSchema)
      .optional(),
    likes: z.lazy(() => UserUpdateManyWithoutLikesNestedInputSchema).optional(),
    media: z.lazy(() => MediaUpdateManyWithoutPostNestedInputSchema).optional(),
  })
  .strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      children: z
        .lazy(() => PostUncheckedUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUncheckedUpdateManyWithoutPostNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      userId: z.string(),
      content: z.string(),
      parentId: z.string().optional().nullable(),
    })
    .strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const MediaCreateInputSchema: z.ZodType<Prisma.MediaCreateInput> = z
  .object({
    id: z.string().optional(),
    mediaUrl: z.string(),
    mediaType: z.string(),
    post: z.lazy(() => PostCreateNestedOneWithoutMediaInputSchema),
  })
  .strict();

export const MediaUncheckedCreateInputSchema: z.ZodType<Prisma.MediaUncheckedCreateInput> =
  z
    .object({
      id: z.string().optional(),
      postId: z.string(),
      mediaUrl: z.string(),
      mediaType: z.string(),
    })
    .strict();

export const MediaUpdateInputSchema: z.ZodType<Prisma.MediaUpdateInput> = z
  .object({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mediaUrl: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    mediaType: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    post: z
      .lazy(() => PostUpdateOneRequiredWithoutMediaNestedInputSchema)
      .optional(),
  })
  .strict();

export const MediaUncheckedUpdateInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      postId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaCreateManyInputSchema: z.ZodType<Prisma.MediaCreateManyInput> =
  z
    .object({
      id: z.string().optional(),
      postId: z.string(),
      mediaUrl: z.string(),
      mediaType: z.string(),
    })
    .strict();

export const MediaUpdateManyMutationInputSchema: z.ZodType<Prisma.MediaUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      postId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UuidFilterSchema: z.ZodType<Prisma.UuidFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    search: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z.union([z.string(), z.lazy(() => NestedUuidFilterSchema)]).optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      search: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    search: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> =
  z
    .object({
      every: z.lazy(() => UserWhereInputSchema).optional(),
      some: z.lazy(() => UserWhereInputSchema).optional(),
      none: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> =
  z
    .object({
      every: z.lazy(() => AccountWhereInputSchema).optional(),
      some: z.lazy(() => AccountWhereInputSchema).optional(),
      none: z.lazy(() => AccountWhereInputSchema).optional(),
    })
    .strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> =
  z
    .object({
      every: z.lazy(() => SessionWhereInputSchema).optional(),
      some: z.lazy(() => SessionWhereInputSchema).optional(),
      none: z.lazy(() => SessionWhereInputSchema).optional(),
    })
    .strict();

export const PostListRelationFilterSchema: z.ZodType<Prisma.PostListRelationFilter> =
  z
    .object({
      every: z.lazy(() => PostWhereInputSchema).optional(),
      some: z.lazy(() => PostWhereInputSchema).optional(),
      none: z.lazy(() => PostWhereInputSchema).optional(),
    })
    .strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PostOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserOrderByRelevanceInputSchema: z.ZodType<Prisma.UserOrderByRelevanceInput> =
  z
    .object({
      fields: z.union([
        z.lazy(() => UserOrderByRelevanceFieldEnumSchema),
        z.lazy(() => UserOrderByRelevanceFieldEnumSchema).array(),
      ]),
      sort: z.lazy(() => SortOrderSchema),
      search: z.string(),
    })
    .strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      registered: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      birthday: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      bio: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      registered: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      birthday: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      bio: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      username: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      registered: z.lazy(() => SortOrderSchema).optional(),
      emailVerified: z.lazy(() => SortOrderSchema).optional(),
      birthday: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      bio: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UuidWithAggregatesFilterSchema: z.ZodType<Prisma.UuidWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      search: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedUuidWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      search: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      search: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict();

export const AccountOrderByRelevanceInputSchema: z.ZodType<Prisma.AccountOrderByRelevanceInput> =
  z
    .object({
      fields: z.union([
        z.lazy(() => AccountOrderByRelevanceFieldEnumSchema),
        z.lazy(() => AccountOrderByRelevanceFieldEnumSchema).array(),
      ]),
      sort: z.lazy(() => SortOrderSchema),
      search: z.string(),
    })
    .strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> =
  z
    .object({
      provider: z.string(),
      providerAccountId: z.string(),
    })
    .strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> =
  z
    .object({
      expires_at: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> =
  z
    .object({
      userId: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      provider: z.lazy(() => SortOrderSchema).optional(),
      providerAccountId: z.lazy(() => SortOrderSchema).optional(),
      refresh_token: z.lazy(() => SortOrderSchema).optional(),
      access_token: z.lazy(() => SortOrderSchema).optional(),
      expires_at: z.lazy(() => SortOrderSchema).optional(),
      token_type: z.lazy(() => SortOrderSchema).optional(),
      scope: z.lazy(() => SortOrderSchema).optional(),
      id_token: z.lazy(() => SortOrderSchema).optional(),
      session_state: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> =
  z
    .object({
      expires_at: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const SessionOrderByRelevanceInputSchema: z.ZodType<Prisma.SessionOrderByRelevanceInput> =
  z
    .object({
      fields: z.union([
        z.lazy(() => SessionOrderByRelevanceFieldEnumSchema),
        z.lazy(() => SessionOrderByRelevanceFieldEnumSchema).array(),
      ]),
      sort: z.lazy(() => SortOrderSchema),
      search: z.string(),
    })
    .strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> =
  z
    .object({
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> =
  z
    .object({
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> =
  z
    .object({
      sessionToken: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VerificationTokenOrderByRelevanceInputSchema: z.ZodType<Prisma.VerificationTokenOrderByRelevanceInput> =
  z
    .object({
      fields: z.union([
        z.lazy(() => VerificationTokenOrderByRelevanceFieldEnumSchema),
        z.lazy(() => VerificationTokenOrderByRelevanceFieldEnumSchema).array(),
      ]),
      sort: z.lazy(() => SortOrderSchema),
      search: z.string(),
    })
    .strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> =
  z
    .object({
      identifier: z.string(),
      token: z.string(),
    })
    .strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> =
  z
    .object({
      identifier: z.lazy(() => SortOrderSchema).optional(),
      token: z.lazy(() => SortOrderSchema).optional(),
      expires: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UuidNullableFilterSchema: z.ZodType<Prisma.UuidNullableFilter> = z
  .object({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    search: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedUuidNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const PostNullableRelationFilterSchema: z.ZodType<Prisma.PostNullableRelationFilter> =
  z
    .object({
      is: z
        .lazy(() => PostWhereInputSchema)
        .optional()
        .nullable(),
      isNot: z
        .lazy(() => PostWhereInputSchema)
        .optional()
        .nullable(),
    })
    .strict();

export const MediaListRelationFilterSchema: z.ZodType<Prisma.MediaListRelationFilter> =
  z
    .object({
      every: z.lazy(() => MediaWhereInputSchema).optional(),
      some: z.lazy(() => MediaWhereInputSchema).optional(),
      none: z.lazy(() => MediaWhereInputSchema).optional(),
    })
    .strict();

export const MediaOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MediaOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostOrderByRelevanceInputSchema: z.ZodType<Prisma.PostOrderByRelevanceInput> =
  z
    .object({
      fields: z.union([
        z.lazy(() => PostOrderByRelevanceFieldEnumSchema),
        z.lazy(() => PostOrderByRelevanceFieldEnumSchema).array(),
      ]),
      sort: z.lazy(() => SortOrderSchema),
      search: z.string(),
    })
    .strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      parentId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      parentId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      userId: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      parentId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.UuidNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      search: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const PostRelationFilterSchema: z.ZodType<Prisma.PostRelationFilter> = z
  .object({
    is: z.lazy(() => PostWhereInputSchema).optional(),
    isNot: z.lazy(() => PostWhereInputSchema).optional(),
  })
  .strict();

export const MediaOrderByRelevanceInputSchema: z.ZodType<Prisma.MediaOrderByRelevanceInput> =
  z
    .object({
      fields: z.union([
        z.lazy(() => MediaOrderByRelevanceFieldEnumSchema),
        z.lazy(() => MediaOrderByRelevanceFieldEnumSchema).array(),
      ]),
      sort: z.lazy(() => SortOrderSchema),
      search: z.string(),
    })
    .strict();

export const MediaCountOrderByAggregateInputSchema: z.ZodType<Prisma.MediaCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      postId: z.lazy(() => SortOrderSchema).optional(),
      mediaUrl: z.lazy(() => SortOrderSchema).optional(),
      mediaType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MediaMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      postId: z.lazy(() => SortOrderSchema).optional(),
      mediaUrl: z.lazy(() => SortOrderSchema).optional(),
      mediaType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MediaMinOrderByAggregateInputSchema: z.ZodType<Prisma.MediaMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      postId: z.lazy(() => SortOrderSchema).optional(),
      mediaUrl: z.lazy(() => SortOrderSchema).optional(),
      mediaType: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UserCreateNestedManyWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutFollowingInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutFollowingInputSchema),
          z.lazy(() => UserCreateWithoutFollowingInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedManyWithoutFollowedByInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutFollowedByInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutFollowedByInputSchema),
          z.lazy(() => UserCreateWithoutFollowedByInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutUserInputSchema),
          z.lazy(() => PostCreateWithoutUserInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostCreateNestedManyWithoutLikesInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutLikesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutLikesInputSchema),
          z.lazy(() => PostCreateWithoutLikesInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedCreateNestedManyWithoutFollowingInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutFollowingInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutFollowingInputSchema),
          z.lazy(() => UserCreateWithoutFollowingInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedCreateNestedManyWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutFollowedByInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutFollowedByInputSchema),
          z.lazy(() => UserCreateWithoutFollowedByInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutUserInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutUserInputSchema),
          z.lazy(() => PostCreateWithoutUserInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyUserInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedCreateNestedManyWithoutLikesInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutLikesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutLikesInputSchema),
          z.lazy(() => PostCreateWithoutLikesInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const UserUpdateManyWithoutFollowingNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutFollowingNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutFollowingInputSchema),
          z.lazy(() => UserCreateWithoutFollowingInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserUpsertWithWhereUniqueWithoutFollowingInputSchema),
          z
            .lazy(() => UserUpsertWithWhereUniqueWithoutFollowingInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithWhereUniqueWithoutFollowingInputSchema),
          z
            .lazy(() => UserUpdateWithWhereUniqueWithoutFollowingInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserUpdateManyWithWhereWithoutFollowingInputSchema),
          z
            .lazy(() => UserUpdateManyWithWhereWithoutFollowingInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateManyWithoutFollowedByNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutFollowedByNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutFollowedByInputSchema),
          z.lazy(() => UserCreateWithoutFollowedByInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserUpsertWithWhereUniqueWithoutFollowedByInputSchema),
          z
            .lazy(() => UserUpsertWithWhereUniqueWithoutFollowedByInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithWhereUniqueWithoutFollowedByInputSchema),
          z
            .lazy(() => UserUpdateWithWhereUniqueWithoutFollowedByInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserUpdateManyWithWhereWithoutFollowedByInputSchema),
          z
            .lazy(() => UserUpdateManyWithWhereWithoutFollowedByInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutUserInputSchema),
          z.lazy(() => PostCreateWithoutUserInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PostUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => PostUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => PostUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PostUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => PostUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUpdateManyWithoutLikesNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutLikesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutLikesInputSchema),
          z.lazy(() => PostCreateWithoutLikesInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PostUpsertWithWhereUniqueWithoutLikesInputSchema),
          z
            .lazy(() => PostUpsertWithWhereUniqueWithoutLikesInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithWhereUniqueWithoutLikesInputSchema),
          z
            .lazy(() => PostUpdateWithWhereUniqueWithoutLikesInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PostUpdateManyWithWhereWithoutLikesInputSchema),
          z.lazy(() => PostUpdateManyWithWhereWithoutLikesInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyWithoutFollowingNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutFollowingNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutFollowingInputSchema),
          z.lazy(() => UserCreateWithoutFollowingInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutFollowingInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserUpsertWithWhereUniqueWithoutFollowingInputSchema),
          z
            .lazy(() => UserUpsertWithWhereUniqueWithoutFollowingInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithWhereUniqueWithoutFollowingInputSchema),
          z
            .lazy(() => UserUpdateWithWhereUniqueWithoutFollowingInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserUpdateManyWithWhereWithoutFollowingInputSchema),
          z
            .lazy(() => UserUpdateManyWithWhereWithoutFollowingInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyWithoutFollowedByNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutFollowedByNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutFollowedByInputSchema),
          z.lazy(() => UserCreateWithoutFollowedByInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutFollowedByInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserUpsertWithWhereUniqueWithoutFollowedByInputSchema),
          z
            .lazy(() => UserUpsertWithWhereUniqueWithoutFollowedByInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithWhereUniqueWithoutFollowedByInputSchema),
          z
            .lazy(() => UserUpdateWithWhereUniqueWithoutFollowedByInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserUpdateManyWithWhereWithoutFollowedByInputSchema),
          z
            .lazy(() => UserUpdateManyWithWhereWithoutFollowedByInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => AccountCreateWithoutUserInputSchema),
          z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => AccountWhereUniqueInputSchema),
          z.lazy(() => AccountWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SessionCreateWithoutUserInputSchema),
          z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SessionWhereUniqueInputSchema),
          z.lazy(() => SessionWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
          z
            .lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutUserNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutUserInputSchema),
          z.lazy(() => PostCreateWithoutUserInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutUserInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutUserInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutUserInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutUserInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PostUpsertWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => PostUpsertWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyUserInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithWhereUniqueWithoutUserInputSchema),
          z.lazy(() => PostUpdateWithWhereUniqueWithoutUserInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PostUpdateManyWithWhereWithoutUserInputSchema),
          z.lazy(() => PostUpdateManyWithWhereWithoutUserInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyWithoutLikesNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutLikesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutLikesInputSchema),
          z.lazy(() => PostCreateWithoutLikesInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutLikesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PostUpsertWithWhereUniqueWithoutLikesInputSchema),
          z
            .lazy(() => PostUpsertWithWhereUniqueWithoutLikesInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithWhereUniqueWithoutLikesInputSchema),
          z
            .lazy(() => PostUpdateWithWhereUniqueWithoutLikesInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PostUpdateManyWithWhereWithoutLikesInputSchema),
          z.lazy(() => PostUpdateManyWithWhereWithoutLikesInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),
          z.lazy(() => UserUpdateWithoutAccountsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSessionsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutSessionsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),
          z.lazy(() => UserUpdateWithoutSessionsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedOneWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPostsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutPostsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutPostsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict();

export const PostCreateNestedOneWithoutChildrenInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutChildrenInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutChildrenInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutChildrenInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => PostCreateOrConnectWithoutChildrenInputSchema)
        .optional(),
      connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
    })
    .strict();

export const PostCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.PostCreateNestedManyWithoutParentInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutParentInputSchema),
          z.lazy(() => PostCreateWithoutParentInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutParentInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutParentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutParentInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutParentInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyParentInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserCreateNestedManyWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutLikesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutLikesInputSchema),
          z.lazy(() => UserCreateWithoutLikesInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MediaCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.MediaCreateNestedManyWithoutPostInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutPostInputSchema),
          z.lazy(() => MediaCreateWithoutPostInputSchema).array(),
          z.lazy(() => MediaUncheckedCreateWithoutPostInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutPostInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MediaCreateOrConnectWithoutPostInputSchema),
          z.lazy(() => MediaCreateOrConnectWithoutPostInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MediaCreateManyPostInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MediaWhereUniqueInputSchema),
          z.lazy(() => MediaWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedCreateNestedManyWithoutParentInputSchema: z.ZodType<Prisma.PostUncheckedCreateNestedManyWithoutParentInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutParentInputSchema),
          z.lazy(() => PostCreateWithoutParentInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutParentInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutParentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutParentInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutParentInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyParentInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedCreateNestedManyWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutLikesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutLikesInputSchema),
          z.lazy(() => UserCreateWithoutLikesInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MediaUncheckedCreateNestedManyWithoutPostInputSchema: z.ZodType<Prisma.MediaUncheckedCreateNestedManyWithoutPostInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutPostInputSchema),
          z.lazy(() => MediaCreateWithoutPostInputSchema).array(),
          z.lazy(() => MediaUncheckedCreateWithoutPostInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutPostInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MediaCreateOrConnectWithoutPostInputSchema),
          z.lazy(() => MediaCreateOrConnectWithoutPostInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MediaCreateManyPostInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MediaWhereUniqueInputSchema),
          z.lazy(() => MediaWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateOneRequiredWithoutPostsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPostsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutPostsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutPostsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutPostsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutPostsInputSchema),
          z.lazy(() => UserUpdateWithoutPostsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUpdateOneWithoutChildrenNestedInputSchema: z.ZodType<Prisma.PostUpdateOneWithoutChildrenNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutChildrenInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutChildrenInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => PostCreateOrConnectWithoutChildrenInputSchema)
        .optional(),
      upsert: z.lazy(() => PostUpsertWithoutChildrenInputSchema).optional(),
      disconnect: z
        .union([z.boolean(), z.lazy(() => PostWhereInputSchema)])
        .optional(),
      delete: z
        .union([z.boolean(), z.lazy(() => PostWhereInputSchema)])
        .optional(),
      connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateToOneWithWhereWithoutChildrenInputSchema),
          z.lazy(() => PostUpdateWithoutChildrenInputSchema),
          z.lazy(() => PostUncheckedUpdateWithoutChildrenInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.PostUpdateManyWithoutParentNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutParentInputSchema),
          z.lazy(() => PostCreateWithoutParentInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutParentInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutParentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutParentInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutParentInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PostUpsertWithWhereUniqueWithoutParentInputSchema),
          z
            .lazy(() => PostUpsertWithWhereUniqueWithoutParentInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyParentInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithWhereUniqueWithoutParentInputSchema),
          z
            .lazy(() => PostUpdateWithWhereUniqueWithoutParentInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PostUpdateManyWithWhereWithoutParentInputSchema),
          z.lazy(() => PostUpdateManyWithWhereWithoutParentInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateManyWithoutLikesNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutLikesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutLikesInputSchema),
          z.lazy(() => UserCreateWithoutLikesInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserUpsertWithWhereUniqueWithoutLikesInputSchema),
          z
            .lazy(() => UserUpsertWithWhereUniqueWithoutLikesInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithWhereUniqueWithoutLikesInputSchema),
          z
            .lazy(() => UserUpdateWithWhereUniqueWithoutLikesInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserUpdateManyWithWhereWithoutLikesInputSchema),
          z.lazy(() => UserUpdateManyWithWhereWithoutLikesInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MediaUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.MediaUpdateManyWithoutPostNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutPostInputSchema),
          z.lazy(() => MediaCreateWithoutPostInputSchema).array(),
          z.lazy(() => MediaUncheckedCreateWithoutPostInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutPostInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MediaCreateOrConnectWithoutPostInputSchema),
          z.lazy(() => MediaCreateOrConnectWithoutPostInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MediaUpsertWithWhereUniqueWithoutPostInputSchema),
          z
            .lazy(() => MediaUpsertWithWhereUniqueWithoutPostInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MediaCreateManyPostInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MediaWhereUniqueInputSchema),
          z.lazy(() => MediaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MediaWhereUniqueInputSchema),
          z.lazy(() => MediaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MediaWhereUniqueInputSchema),
          z.lazy(() => MediaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MediaWhereUniqueInputSchema),
          z.lazy(() => MediaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MediaUpdateWithWhereUniqueWithoutPostInputSchema),
          z
            .lazy(() => MediaUpdateWithWhereUniqueWithoutPostInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MediaUpdateManyWithWhereWithoutPostInputSchema),
          z.lazy(() => MediaUpdateManyWithWhereWithoutPostInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MediaScalarWhereInputSchema),
          z.lazy(() => MediaScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyWithoutParentNestedInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutParentNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutParentInputSchema),
          z.lazy(() => PostCreateWithoutParentInputSchema).array(),
          z.lazy(() => PostUncheckedCreateWithoutParentInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutParentInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => PostCreateOrConnectWithoutParentInputSchema),
          z.lazy(() => PostCreateOrConnectWithoutParentInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => PostUpsertWithWhereUniqueWithoutParentInputSchema),
          z
            .lazy(() => PostUpsertWithWhereUniqueWithoutParentInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => PostCreateManyParentInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => PostWhereUniqueInputSchema),
          z.lazy(() => PostWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateWithWhereUniqueWithoutParentInputSchema),
          z
            .lazy(() => PostUpdateWithWhereUniqueWithoutParentInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => PostUpdateManyWithWhereWithoutParentInputSchema),
          z.lazy(() => PostUpdateManyWithWhereWithoutParentInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyWithoutLikesNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutLikesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutLikesInputSchema),
          z.lazy(() => UserCreateWithoutLikesInputSchema).array(),
          z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema),
          z.lazy(() => UserCreateOrConnectWithoutLikesInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => UserUpsertWithWhereUniqueWithoutLikesInputSchema),
          z
            .lazy(() => UserUpsertWithWhereUniqueWithoutLikesInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputSchema),
          z.lazy(() => UserWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateWithWhereUniqueWithoutLikesInputSchema),
          z
            .lazy(() => UserUpdateWithWhereUniqueWithoutLikesInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => UserUpdateManyWithWhereWithoutLikesInputSchema),
          z.lazy(() => UserUpdateManyWithWhereWithoutLikesInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MediaUncheckedUpdateManyWithoutPostNestedInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutPostNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MediaCreateWithoutPostInputSchema),
          z.lazy(() => MediaCreateWithoutPostInputSchema).array(),
          z.lazy(() => MediaUncheckedCreateWithoutPostInputSchema),
          z.lazy(() => MediaUncheckedCreateWithoutPostInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MediaCreateOrConnectWithoutPostInputSchema),
          z.lazy(() => MediaCreateOrConnectWithoutPostInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => MediaUpsertWithWhereUniqueWithoutPostInputSchema),
          z
            .lazy(() => MediaUpsertWithWhereUniqueWithoutPostInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MediaCreateManyPostInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => MediaWhereUniqueInputSchema),
          z.lazy(() => MediaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => MediaWhereUniqueInputSchema),
          z.lazy(() => MediaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => MediaWhereUniqueInputSchema),
          z.lazy(() => MediaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => MediaWhereUniqueInputSchema),
          z.lazy(() => MediaWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => MediaUpdateWithWhereUniqueWithoutPostInputSchema),
          z
            .lazy(() => MediaUpdateWithWhereUniqueWithoutPostInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => MediaUpdateManyWithWhereWithoutPostInputSchema),
          z.lazy(() => MediaUpdateManyWithWhereWithoutPostInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => MediaScalarWhereInputSchema),
          z.lazy(() => MediaScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const PostCreateNestedOneWithoutMediaInputSchema: z.ZodType<Prisma.PostCreateNestedOneWithoutMediaInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutMediaInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutMediaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => PostCreateOrConnectWithoutMediaInputSchema)
        .optional(),
      connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
    })
    .strict();

export const PostUpdateOneRequiredWithoutMediaNestedInputSchema: z.ZodType<Prisma.PostUpdateOneRequiredWithoutMediaNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => PostCreateWithoutMediaInputSchema),
          z.lazy(() => PostUncheckedCreateWithoutMediaInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => PostCreateOrConnectWithoutMediaInputSchema)
        .optional(),
      upsert: z.lazy(() => PostUpsertWithoutMediaInputSchema).optional(),
      connect: z.lazy(() => PostWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => PostUpdateToOneWithWhereWithoutMediaInputSchema),
          z.lazy(() => PostUpdateWithoutMediaInputSchema),
          z.lazy(() => PostUncheckedUpdateWithoutMediaInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedUuidFilterSchema: z.ZodType<Prisma.NestedUuidFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    search: z.string().optional(),
    not: z.union([z.string(), z.lazy(() => NestedUuidFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      search: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    search: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedUuidWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      search: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedUuidWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      search: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      search: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z.coerce.date().array().optional().nullable(),
      notIn: z.coerce.date().array().optional().nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedUuidNullableFilterSchema: z.ZodType<Prisma.NestedUuidNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      search: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedUuidNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedUuidNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedUuidNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      search: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedUuidNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const UserCreateWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateWithoutFollowingInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFollowingInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutFollowingInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFollowingInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutFollowingInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema),
      ]),
    })
    .strict();

export const UserCreateWithoutFollowedByInputSchema: z.ZodType<Prisma.UserCreateWithoutFollowedByInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      following: z
        .lazy(() => UserCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFollowedByInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      following: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutFollowedByInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFollowedByInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutFollowedByInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema),
      ]),
    })
    .strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> =
  z
    .object({
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> =
  z
    .object({
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => AccountCreateManyUserInputSchema),
        z.lazy(() => AccountCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> =
  z
    .object({
      sessionToken: z.string(),
      expires: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> =
  z
    .object({
      sessionToken: z.string(),
      expires: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => SessionCreateManyUserInputSchema),
        z.lazy(() => SessionCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PostCreateWithoutUserInputSchema: z.ZodType<Prisma.PostCreateWithoutUserInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      content: z.string(),
      parent: z
        .lazy(() => PostCreateNestedOneWithoutChildrenInputSchema)
        .optional(),
      children: z
        .lazy(() => PostCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserCreateNestedManyWithoutLikesInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaCreateNestedManyWithoutPostInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutUserInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      content: z.string(),
      parentId: z.string().optional().nullable(),
      children: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUncheckedCreateNestedManyWithoutPostInputSchema)
        .optional(),
    })
    .strict();

export const PostCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PostCreateWithoutUserInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const PostCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyUserInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => PostCreateManyUserInputSchema),
        z.lazy(() => PostCreateManyUserInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PostCreateWithoutLikesInputSchema: z.ZodType<Prisma.PostCreateWithoutLikesInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      content: z.string(),
      user: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
      parent: z
        .lazy(() => PostCreateNestedOneWithoutChildrenInputSchema)
        .optional(),
      children: z
        .lazy(() => PostCreateNestedManyWithoutParentInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaCreateNestedManyWithoutPostInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutLikesInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      userId: z.string(),
      content: z.string(),
      parentId: z.string().optional().nullable(),
      children: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutParentInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUncheckedCreateNestedManyWithoutPostInputSchema)
        .optional(),
    })
    .strict();

export const PostCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutLikesInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PostCreateWithoutLikesInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithWhereUniqueWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutFollowingInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => UserUpdateWithoutFollowingInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutFollowingInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutFollowingInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithWhereUniqueWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutFollowingInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => UserUpdateWithoutFollowingInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutFollowingInputSchema),
      ]),
    })
    .strict();

export const UserUpdateManyWithWhereWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutFollowingInput> =
  z
    .object({
      where: z.lazy(() => UserScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UserUpdateManyMutationInputSchema),
        z.lazy(() => UserUncheckedUpdateManyWithoutFollowingInputSchema),
      ]),
    })
    .strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereInputSchema),
          z.lazy(() => UserScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      username: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      name: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      registered: z
        .union([z.lazy(() => BoolFilterSchema), z.boolean()])
        .optional(),
      emailVerified: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      birthday: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
      image: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      bio: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const UserUpsertWithWhereUniqueWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutFollowedByInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => UserUpdateWithoutFollowedByInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutFollowedByInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutFollowedByInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutFollowedByInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithWhereUniqueWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutFollowedByInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => UserUpdateWithoutFollowedByInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutFollowedByInputSchema),
      ]),
    })
    .strict();

export const UserUpdateManyWithWhereWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutFollowedByInput> =
  z
    .object({
      where: z.lazy(() => UserScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UserUpdateManyMutationInputSchema),
        z.lazy(() => UserUncheckedUpdateManyWithoutFollowedByInputSchema),
      ]),
    })
    .strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => AccountScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => AccountUpdateManyMutationInputSchema),
        z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => AccountScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => AccountScalarWhereInputSchema),
          z.lazy(() => AccountScalarWhereInputSchema).array(),
        ])
        .optional(),
      userId: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      provider: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      providerAccountId: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      refresh_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      access_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      expires_at: z
        .union([z.lazy(() => IntNullableFilterSchema), z.number()])
        .optional()
        .nullable(),
      token_type: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      scope: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      id_token: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      session_state: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => SessionScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SessionUpdateManyMutationInputSchema),
        z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SessionScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SessionScalarWhereInputSchema),
          z.lazy(() => SessionScalarWhereInputSchema).array(),
        ])
        .optional(),
      sessionToken: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      userId: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      expires: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const PostUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => PostUpdateWithoutUserInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutUserInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PostCreateWithoutUserInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const PostUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => PostUpdateWithoutUserInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutUserInputSchema),
      ]),
    })
    .strict();

export const PostUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutUserInput> =
  z
    .object({
      where: z.lazy(() => PostScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => PostUpdateManyMutationInputSchema),
        z.lazy(() => PostUncheckedUpdateManyWithoutUserInputSchema),
      ]),
    })
    .strict();

export const PostScalarWhereInputSchema: z.ZodType<Prisma.PostScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PostScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PostScalarWhereInputSchema),
          z.lazy(() => PostScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      userId: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      content: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      parentId: z
        .union([z.lazy(() => UuidNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
    })
    .strict();

export const PostUpsertWithWhereUniqueWithoutLikesInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutLikesInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => PostUpdateWithoutLikesInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutLikesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PostCreateWithoutLikesInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const PostUpdateWithWhereUniqueWithoutLikesInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutLikesInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => PostUpdateWithoutLikesInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const PostUpdateManyWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutLikesInput> =
  z
    .object({
      where: z.lazy(() => PostScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => PostUpdateManyMutationInputSchema),
        z.lazy(() => PostUncheckedUpdateManyWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      following: z
        .lazy(() => UserCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      following: z
        .lazy(() => UserCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateWithoutPostsInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      following: z
        .lazy(() => UserCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutPostsInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutPostsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPostsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
      ]),
    })
    .strict();

export const PostCreateWithoutChildrenInputSchema: z.ZodType<Prisma.PostCreateWithoutChildrenInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      content: z.string(),
      user: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
      parent: z
        .lazy(() => PostCreateNestedOneWithoutChildrenInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserCreateNestedManyWithoutLikesInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaCreateNestedManyWithoutPostInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedCreateWithoutChildrenInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutChildrenInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      userId: z.string(),
      content: z.string(),
      parentId: z.string().optional().nullable(),
      likes: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUncheckedCreateNestedManyWithoutPostInputSchema)
        .optional(),
    })
    .strict();

export const PostCreateOrConnectWithoutChildrenInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutChildrenInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PostCreateWithoutChildrenInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutChildrenInputSchema),
      ]),
    })
    .strict();

export const PostCreateWithoutParentInputSchema: z.ZodType<Prisma.PostCreateWithoutParentInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      content: z.string(),
      user: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
      children: z
        .lazy(() => PostCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserCreateNestedManyWithoutLikesInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaCreateNestedManyWithoutPostInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedCreateWithoutParentInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutParentInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      userId: z.string(),
      content: z.string(),
      children: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUncheckedCreateNestedManyWithoutPostInputSchema)
        .optional(),
    })
    .strict();

export const PostCreateOrConnectWithoutParentInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutParentInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PostCreateWithoutParentInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutParentInputSchema),
      ]),
    })
    .strict();

export const PostCreateManyParentInputEnvelopeSchema: z.ZodType<Prisma.PostCreateManyParentInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => PostCreateManyParentInputSchema),
        z.lazy(() => PostCreateManyParentInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserCreateWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateWithoutLikesInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      following: z
        .lazy(() => UserCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedCreateWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutLikesInput> =
  z
    .object({
      id: z.string().optional(),
      username: z.string().optional().nullable(),
      name: z.string().optional().nullable(),
      email: z.string(),
      registered: z.boolean().optional(),
      emailVerified: z.coerce.date().optional().nullable(),
      birthday: z.coerce.date().optional().nullable(),
      image: z.string().optional().nullable(),
      bio: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      followedBy: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowingInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutFollowedByInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutUserInputSchema)
        .optional(),
    })
    .strict();

export const UserCreateOrConnectWithoutLikesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutLikesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutLikesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const MediaCreateWithoutPostInputSchema: z.ZodType<Prisma.MediaCreateWithoutPostInput> =
  z
    .object({
      id: z.string().optional(),
      mediaUrl: z.string(),
      mediaType: z.string(),
    })
    .strict();

export const MediaUncheckedCreateWithoutPostInputSchema: z.ZodType<Prisma.MediaUncheckedCreateWithoutPostInput> =
  z
    .object({
      id: z.string().optional(),
      mediaUrl: z.string(),
      mediaType: z.string(),
    })
    .strict();

export const MediaCreateOrConnectWithoutPostInputSchema: z.ZodType<Prisma.MediaCreateOrConnectWithoutPostInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MediaCreateWithoutPostInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutPostInputSchema),
      ]),
    })
    .strict();

export const MediaCreateManyPostInputEnvelopeSchema: z.ZodType<Prisma.MediaCreateManyPostInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => MediaCreateManyPostInputSchema),
        z.lazy(() => MediaCreateManyPostInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserUpsertWithoutPostsInputSchema: z.ZodType<Prisma.UserUpsertWithoutPostsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutPostsInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict();

export const UserUpdateToOneWithWhereWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPostsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutPostsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutPostsInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUpdateWithoutPostsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutPostsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutPostsInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostUpsertWithoutChildrenInputSchema: z.ZodType<Prisma.PostUpsertWithoutChildrenInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => PostUpdateWithoutChildrenInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutChildrenInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PostCreateWithoutChildrenInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutChildrenInputSchema),
      ]),
      where: z.lazy(() => PostWhereInputSchema).optional(),
    })
    .strict();

export const PostUpdateToOneWithWhereWithoutChildrenInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutChildrenInput> =
  z
    .object({
      where: z.lazy(() => PostWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => PostUpdateWithoutChildrenInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutChildrenInputSchema),
      ]),
    })
    .strict();

export const PostUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.PostUpdateWithoutChildrenInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema)
        .optional(),
      parent: z
        .lazy(() => PostUpdateOneWithoutChildrenNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUpdateManyWithoutPostNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateWithoutChildrenInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutChildrenInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      likes: z
        .lazy(() => UserUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUncheckedUpdateManyWithoutPostNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostUpsertWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.PostUpsertWithWhereUniqueWithoutParentInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => PostUpdateWithoutParentInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutParentInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PostCreateWithoutParentInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutParentInputSchema),
      ]),
    })
    .strict();

export const PostUpdateWithWhereUniqueWithoutParentInputSchema: z.ZodType<Prisma.PostUpdateWithWhereUniqueWithoutParentInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => PostUpdateWithoutParentInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutParentInputSchema),
      ]),
    })
    .strict();

export const PostUpdateManyWithWhereWithoutParentInputSchema: z.ZodType<Prisma.PostUpdateManyWithWhereWithoutParentInput> =
  z
    .object({
      where: z.lazy(() => PostScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => PostUpdateManyMutationInputSchema),
        z.lazy(() => PostUncheckedUpdateManyWithoutParentInputSchema),
      ]),
    })
    .strict();

export const UserUpsertWithWhereUniqueWithoutLikesInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutLikesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => UserUpdateWithoutLikesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutLikesInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const UserUpdateWithWhereUniqueWithoutLikesInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutLikesInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => UserUpdateWithoutLikesInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const UserUpdateManyWithWhereWithoutLikesInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutLikesInput> =
  z
    .object({
      where: z.lazy(() => UserScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => UserUpdateManyMutationInputSchema),
        z.lazy(() => UserUncheckedUpdateManyWithoutLikesInputSchema),
      ]),
    })
    .strict();

export const MediaUpsertWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.MediaUpsertWithWhereUniqueWithoutPostInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => MediaUpdateWithoutPostInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutPostInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MediaCreateWithoutPostInputSchema),
        z.lazy(() => MediaUncheckedCreateWithoutPostInputSchema),
      ]),
    })
    .strict();

export const MediaUpdateWithWhereUniqueWithoutPostInputSchema: z.ZodType<Prisma.MediaUpdateWithWhereUniqueWithoutPostInput> =
  z
    .object({
      where: z.lazy(() => MediaWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => MediaUpdateWithoutPostInputSchema),
        z.lazy(() => MediaUncheckedUpdateWithoutPostInputSchema),
      ]),
    })
    .strict();

export const MediaUpdateManyWithWhereWithoutPostInputSchema: z.ZodType<Prisma.MediaUpdateManyWithWhereWithoutPostInput> =
  z
    .object({
      where: z.lazy(() => MediaScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => MediaUpdateManyMutationInputSchema),
        z.lazy(() => MediaUncheckedUpdateManyWithoutPostInputSchema),
      ]),
    })
    .strict();

export const MediaScalarWhereInputSchema: z.ZodType<Prisma.MediaScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MediaScalarWhereInputSchema),
          z.lazy(() => MediaScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MediaScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MediaScalarWhereInputSchema),
          z.lazy(() => MediaScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      postId: z.union([z.lazy(() => UuidFilterSchema), z.string()]).optional(),
      mediaUrl: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      mediaType: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const PostCreateWithoutMediaInputSchema: z.ZodType<Prisma.PostCreateWithoutMediaInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      content: z.string(),
      user: z.lazy(() => UserCreateNestedOneWithoutPostsInputSchema),
      parent: z
        .lazy(() => PostCreateNestedOneWithoutChildrenInputSchema)
        .optional(),
      children: z
        .lazy(() => PostCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedCreateWithoutMediaInputSchema: z.ZodType<Prisma.PostUncheckedCreateWithoutMediaInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      userId: z.string(),
      content: z.string(),
      parentId: z.string().optional().nullable(),
      children: z
        .lazy(() => PostUncheckedCreateNestedManyWithoutParentInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUncheckedCreateNestedManyWithoutLikesInputSchema)
        .optional(),
    })
    .strict();

export const PostCreateOrConnectWithoutMediaInputSchema: z.ZodType<Prisma.PostCreateOrConnectWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => PostWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => PostCreateWithoutMediaInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const PostUpsertWithoutMediaInputSchema: z.ZodType<Prisma.PostUpsertWithoutMediaInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => PostUpdateWithoutMediaInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutMediaInputSchema),
      ]),
      create: z.union([
        z.lazy(() => PostCreateWithoutMediaInputSchema),
        z.lazy(() => PostUncheckedCreateWithoutMediaInputSchema),
      ]),
      where: z.lazy(() => PostWhereInputSchema).optional(),
    })
    .strict();

export const PostUpdateToOneWithWhereWithoutMediaInputSchema: z.ZodType<Prisma.PostUpdateToOneWithWhereWithoutMediaInput> =
  z
    .object({
      where: z.lazy(() => PostWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => PostUpdateWithoutMediaInputSchema),
        z.lazy(() => PostUncheckedUpdateWithoutMediaInputSchema),
      ]),
    })
    .strict();

export const PostUpdateWithoutMediaInputSchema: z.ZodType<Prisma.PostUpdateWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema)
        .optional(),
      parent: z
        .lazy(() => PostUpdateOneWithoutChildrenNestedInputSchema)
        .optional(),
      children: z
        .lazy(() => PostUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateWithoutMediaInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutMediaInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      children: z
        .lazy(() => PostUncheckedUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> =
  z
    .object({
      type: z.string(),
      provider: z.string(),
      providerAccountId: z.string(),
      refresh_token: z.string().optional().nullable(),
      access_token: z.string().optional().nullable(),
      expires_at: z.number().int().optional().nullable(),
      token_type: z.string().optional().nullable(),
      scope: z.string().optional().nullable(),
      id_token: z.string().optional().nullable(),
      session_state: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> =
  z
    .object({
      sessionToken: z.string(),
      expires: z.coerce.date(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const PostCreateManyUserInputSchema: z.ZodType<Prisma.PostCreateManyUserInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      content: z.string(),
      parentId: z.string().optional().nullable(),
    })
    .strict();

export const UserUpdateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUpdateWithoutFollowingInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutFollowingInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFollowingInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyWithoutFollowingInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutFollowingInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUpdateWithoutFollowedByInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      following: z
        .lazy(() => UserUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFollowedByInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      following: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => PostUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyWithoutFollowedByInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutFollowedByInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> =
  z
    .object({
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> =
  z
    .object({
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      type: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      provider: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      providerAccountId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      refresh_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      access_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      expires_at: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      token_type: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      scope: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      id_token: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      session_state: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> =
  z
    .object({
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> =
  z
    .object({
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      sessionToken: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      expires: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUpdateWithoutUserInputSchema: z.ZodType<Prisma.PostUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parent: z
        .lazy(() => PostUpdateOneWithoutChildrenNestedInputSchema)
        .optional(),
      children: z
        .lazy(() => PostUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUpdateManyWithoutPostNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      children: z
        .lazy(() => PostUncheckedUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUncheckedUpdateManyWithoutPostNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutUserInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PostUpdateWithoutLikesInputSchema: z.ZodType<Prisma.PostUpdateWithoutLikesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema)
        .optional(),
      parent: z
        .lazy(() => PostUpdateOneWithoutChildrenNestedInputSchema)
        .optional(),
      children: z
        .lazy(() => PostUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUpdateManyWithoutPostNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutLikesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      children: z
        .lazy(() => PostUncheckedUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUncheckedUpdateManyWithoutPostNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyWithoutLikesInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutLikesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      parentId: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const PostCreateManyParentInputSchema: z.ZodType<Prisma.PostCreateManyParentInput> =
  z
    .object({
      id: z.string().optional(),
      createdAt: z.coerce.date().optional(),
      userId: z.string(),
      content: z.string(),
    })
    .strict();

export const MediaCreateManyPostInputSchema: z.ZodType<Prisma.MediaCreateManyPostInput> =
  z
    .object({
      id: z.string().optional(),
      mediaUrl: z.string(),
      mediaType: z.string(),
    })
    .strict();

export const PostUpdateWithoutParentInputSchema: z.ZodType<Prisma.PostUpdateWithoutParentInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      user: z
        .lazy(() => UserUpdateOneRequiredWithoutPostsNestedInputSchema)
        .optional(),
      children: z
        .lazy(() => PostUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUpdateManyWithoutPostNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateWithoutParentInputSchema: z.ZodType<Prisma.PostUncheckedUpdateWithoutParentInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      children: z
        .lazy(() => PostUncheckedUpdateManyWithoutParentNestedInputSchema)
        .optional(),
      likes: z
        .lazy(() => UserUncheckedUpdateManyWithoutLikesNestedInputSchema)
        .optional(),
      media: z
        .lazy(() => MediaUncheckedUpdateManyWithoutPostNestedInputSchema)
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyWithoutParentInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyWithoutParentInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      userId: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UserUpdateWithoutLikesInputSchema: z.ZodType<Prisma.UserUpdateWithoutLikesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutLikesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      followedBy: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowingNestedInputSchema)
        .optional(),
      following: z
        .lazy(() => UserUncheckedUpdateManyWithoutFollowedByNestedInputSchema)
        .optional(),
      accounts: z
        .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      sessions: z
        .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
      posts: z
        .lazy(() => PostUncheckedUpdateManyWithoutUserNestedInputSchema)
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyWithoutLikesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutLikesInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      username: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      name: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      email: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      registered: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      emailVerified: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      birthday: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      bio: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaUpdateWithoutPostInputSchema: z.ZodType<Prisma.MediaUpdateWithoutPostInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaUncheckedUpdateWithoutPostInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateWithoutPostInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MediaUncheckedUpdateManyWithoutPostInputSchema: z.ZodType<Prisma.MediaUncheckedUpdateManyWithoutPostInput> =
  z
    .object({
      id: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      mediaType: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict();

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z
  .object({
    where: AccountWhereInputSchema.optional(),
    orderBy: z
      .union([
        AccountOrderByWithAggregationInputSchema.array(),
        AccountOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: AccountScalarFieldEnumSchema.array(),
    having: AccountScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict();

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
    orderBy: z
      .union([
        SessionOrderByWithAggregationInputSchema.array(),
        SessionOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: SessionScalarFieldEnumSchema.array(),
    having: SessionScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict();

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationTokenScalarFieldEnumSchema,
          VerificationTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationTokenScalarFieldEnumSchema,
          VerificationTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationTokenScalarFieldEnumSchema,
          VerificationTokenScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithRelationInputSchema.array(),
          VerificationTokenOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationTokenWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationTokenOrderByWithAggregationInputSchema.array(),
          VerificationTokenOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: VerificationTokenScalarFieldEnumSchema.array(),
      having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> =
  z
    .object({
      select: PostSelectSchema.optional(),
      include: PostIncludeSchema.optional(),
      where: PostWhereInputSchema.optional(),
      orderBy: z
        .union([
          PostOrderByWithRelationInputSchema.array(),
          PostOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PostWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([PostScalarFieldEnumSchema, PostScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithAggregationInputSchema.array(),
        PostOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: PostScalarFieldEnumSchema.array(),
    having: PostScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> =
  z
    .object({
      select: PostSelectSchema.optional(),
      include: PostIncludeSchema.optional(),
      where: PostWhereUniqueInputSchema,
    })
    .strict();

export const MediaFindFirstArgsSchema: z.ZodType<Prisma.MediaFindFirstArgs> = z
  .object({
    select: MediaSelectSchema.optional(),
    include: MediaIncludeSchema.optional(),
    where: MediaWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaOrderByWithRelationInputSchema.array(),
        MediaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([MediaScalarFieldEnumSchema, MediaScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const MediaFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MediaFindFirstOrThrowArgs> =
  z
    .object({
      select: MediaSelectSchema.optional(),
      include: MediaIncludeSchema.optional(),
      where: MediaWhereInputSchema.optional(),
      orderBy: z
        .union([
          MediaOrderByWithRelationInputSchema.array(),
          MediaOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MediaWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([MediaScalarFieldEnumSchema, MediaScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const MediaFindManyArgsSchema: z.ZodType<Prisma.MediaFindManyArgs> = z
  .object({
    select: MediaSelectSchema.optional(),
    include: MediaIncludeSchema.optional(),
    where: MediaWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaOrderByWithRelationInputSchema.array(),
        MediaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([MediaScalarFieldEnumSchema, MediaScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const MediaAggregateArgsSchema: z.ZodType<Prisma.MediaAggregateArgs> = z
  .object({
    where: MediaWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaOrderByWithRelationInputSchema.array(),
        MediaOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MediaWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const MediaGroupByArgsSchema: z.ZodType<Prisma.MediaGroupByArgs> = z
  .object({
    where: MediaWhereInputSchema.optional(),
    orderBy: z
      .union([
        MediaOrderByWithAggregationInputSchema.array(),
        MediaOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: MediaScalarFieldEnumSchema.array(),
    having: MediaScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const MediaFindUniqueArgsSchema: z.ZodType<Prisma.MediaFindUniqueArgs> =
  z
    .object({
      select: MediaSelectSchema.optional(),
      include: MediaIncludeSchema.optional(),
      where: MediaWhereUniqueInputSchema,
    })
    .strict();

export const MediaFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MediaFindUniqueOrThrowArgs> =
  z
    .object({
      select: MediaSelectSchema.optional(),
      include: MediaIncludeSchema.optional(),
      where: MediaWhereUniqueInputSchema,
    })
    .strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UserCreateManyInputSchema,
        UserCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict();

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
    create: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
    update: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
    where: AccountWhereUniqueInputSchema,
  })
  .strict();

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
    })
    .strict();

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
    create: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
    update: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> =
  z
    .object({
      data: z.union([
        SessionCreateManyInputSchema,
        SessionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        SessionCreateManyInputSchema,
        SessionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
    where: SessionWhereUniqueInputSchema,
  })
  .strict();

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SessionUpdateManyMutationInputSchema,
        SessionUncheckedUpdateManyInputSchema,
      ]),
      where: SessionWhereInputSchema.optional(),
    })
    .strict();

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
    })
    .strict();

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      data: z.union([
        VerificationTokenCreateInputSchema,
        VerificationTokenUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
      create: z.union([
        VerificationTokenCreateInputSchema,
        VerificationTokenUncheckedCreateInputSchema,
      ]),
      update: z.union([
        VerificationTokenUpdateInputSchema,
        VerificationTokenUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationTokenCreateManyInputSchema,
        VerificationTokenCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VerificationTokenCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VerificationTokenCreateManyInputSchema,
        VerificationTokenCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> =
  z
    .object({
      select: VerificationTokenSelectSchema.optional(),
      data: z.union([
        VerificationTokenUpdateInputSchema,
        VerificationTokenUncheckedUpdateInputSchema,
      ]),
      where: VerificationTokenWhereUniqueInputSchema,
    })
    .strict();

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationTokenUpdateManyMutationInputSchema,
        VerificationTokenUncheckedUpdateManyInputSchema,
      ]),
      where: VerificationTokenWhereInputSchema.optional(),
    })
    .strict();

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> =
  z
    .object({
      where: VerificationTokenWhereInputSchema.optional(),
    })
    .strict();

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    data: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
  })
  .strict();

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereUniqueInputSchema,
    create: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
    update: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
  })
  .strict();

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z
  .object({
    data: z.union([
      PostCreateManyInputSchema,
      PostCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const PostCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        PostCreateManyInputSchema,
        PostCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    include: PostIncludeSchema.optional(),
    data: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z
  .object({
    data: z.union([
      PostUpdateManyMutationInputSchema,
      PostUncheckedUpdateManyInputSchema,
    ]),
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const MediaCreateArgsSchema: z.ZodType<Prisma.MediaCreateArgs> = z
  .object({
    select: MediaSelectSchema.optional(),
    include: MediaIncludeSchema.optional(),
    data: z.union([MediaCreateInputSchema, MediaUncheckedCreateInputSchema]),
  })
  .strict();

export const MediaUpsertArgsSchema: z.ZodType<Prisma.MediaUpsertArgs> = z
  .object({
    select: MediaSelectSchema.optional(),
    include: MediaIncludeSchema.optional(),
    where: MediaWhereUniqueInputSchema,
    create: z.union([MediaCreateInputSchema, MediaUncheckedCreateInputSchema]),
    update: z.union([MediaUpdateInputSchema, MediaUncheckedUpdateInputSchema]),
  })
  .strict();

export const MediaCreateManyArgsSchema: z.ZodType<Prisma.MediaCreateManyArgs> =
  z
    .object({
      data: z.union([
        MediaCreateManyInputSchema,
        MediaCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MediaCreateManyAndReturnArgsSchema: z.ZodType<Prisma.MediaCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        MediaCreateManyInputSchema,
        MediaCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const MediaDeleteArgsSchema: z.ZodType<Prisma.MediaDeleteArgs> = z
  .object({
    select: MediaSelectSchema.optional(),
    include: MediaIncludeSchema.optional(),
    where: MediaWhereUniqueInputSchema,
  })
  .strict();

export const MediaUpdateArgsSchema: z.ZodType<Prisma.MediaUpdateArgs> = z
  .object({
    select: MediaSelectSchema.optional(),
    include: MediaIncludeSchema.optional(),
    data: z.union([MediaUpdateInputSchema, MediaUncheckedUpdateInputSchema]),
    where: MediaWhereUniqueInputSchema,
  })
  .strict();

export const MediaUpdateManyArgsSchema: z.ZodType<Prisma.MediaUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MediaUpdateManyMutationInputSchema,
        MediaUncheckedUpdateManyInputSchema,
      ]),
      where: MediaWhereInputSchema.optional(),
    })
    .strict();

export const MediaDeleteManyArgsSchema: z.ZodType<Prisma.MediaDeleteManyArgs> =
  z
    .object({
      where: MediaWhereInputSchema.optional(),
    })
    .strict();

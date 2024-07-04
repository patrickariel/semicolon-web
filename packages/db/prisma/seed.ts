import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { db } from "@semicolon/db";
import _ from "lodash";

function randomExcluded(min: number, max: number, exclude: number) {
  let n = Math.floor(Math.random() * (max - min) + min);
  if (n >= exclude) n++;
  return n;
}

async function main() {
  await db.user.create({
    data: {
      id: "baf0014e-94cf-4980-888c-5f0d437c65f6",
      name: "John Smith",
      username: "john.smith",
      email: "john.smith@example.com",
      bio: "Software developer.",
      image: faker.image.avatar(),
    },
  });

  const users = await db.user.createManyAndReturn({
    data: _.range(0, 50).map(() => ({
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      bio: faker.person.bio(),
      image: faker.image.avatar(),
    })),
  });

  await db.$kysely
    .insertInto("_UserFollow")
    .values((eb) =>
      users.map(({ id }, i) => ({
        A: eb.cast(
          eb.val(users[randomExcluded(0, users.length - 1, i)]!.id), // eslint-disable-line @typescript-eslint/no-non-null-assertion
          "uuid",
        ),
        B: eb.cast(eb.val(id), "uuid"), // eslint-disable-line @typescript-eslint/no-non-null-assertion
      })),
    )
    .execute();

  const posts = await db.post.createManyAndReturn({
    data: _.flattenDeep(
      users.map((user) =>
        _.range(0, 25).map((): Prisma.PostCreateManyAndReturnArgs["data"] => ({
          userId: user.id,
          content: faker.lorem.paragraph({
            min: 1,
            max: 4,
          }),
          createdAt: faker.date.between({
            from: "2020-01-01",
            to: "2024-01-01",
          }),
        })),
      ),
    ),
  });

  for (const chunk of _.chunk(posts, 32767 / 2)) {
    await db.$kysely
      .insertInto("_Like")
      .values((eb) =>
        chunk.map((post) => ({
          A: eb.cast(eb.val(post.id), "uuid"),
          B: eb.cast(eb.val(_.sample(users)!.id), "uuid"), // eslint-disable-line @typescript-eslint/no-non-null-assertion
        })),
      )
      .execute();
  }

  const replies = await db.post.createManyAndReturn({
    data: _.flattenDeep(
      posts.map((post) =>
        _.range(0, 5).map((): Prisma.PostCreateManyAndReturnArgs["data"] => ({
          parentId: post.id,
          userId: _.sample(users)!.id, // eslint-disable-line @typescript-eslint/no-non-null-assertion
          content: faker.lorem.paragraph({
            min: 1,
            max: 4,
          }),
          createdAt: faker.date.between({
            from: post.createdAt,
            to: "2024-01-01",
          }),
        })),
      ),
    ),
  });

  for (const posts of _.chunk(replies, 32767 / 2)) {
    await db.$kysely
      .insertInto("_Like")
      .values((eb) =>
        posts.map((post) => ({
          A: eb.cast(eb.val(post.id), "uuid"),
          B: eb.cast(eb.val(_.sample(users)!.id), "uuid"), // eslint-disable-line @typescript-eslint/no-non-null-assertion
        })),
      )
      .execute();
  }

  const moreReplies = await db.post.createManyAndReturn({
    data: _.flattenDeep(
      replies.map((reply) =>
        _.range(0, 5).map((): Prisma.PostCreateManyAndReturnArgs["data"] => ({
          parentId: reply.id,
          userId: _.sample(users)!.id, // eslint-disable-line @typescript-eslint/no-non-null-assertion
          content: faker.lorem.paragraph({
            min: 1,
            max: 4,
          }),
          createdAt: faker.date.between({
            from: reply.createdAt,
            to: "2024-01-01",
          }),
        })),
      ),
    ),
  });

  for (const replies of _.chunk(moreReplies, 32767 / 2)) {
    await db.$kysely
      .insertInto("_Like")
      .values((eb) =>
        replies.map((post) => ({
          A: eb.cast(eb.val(post.id), "uuid"),
          B: eb.cast(eb.val(_.sample(users)!.id), "uuid"), // eslint-disable-line @typescript-eslint/no-non-null-assertion
        })),
      )
      .execute();
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e: unknown) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });

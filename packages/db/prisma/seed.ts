import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";
import _ from "lodash";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      id: "baf0014e-94cf-4980-888c-5f0d437c65f6",
      name: "John Smith",
      username: "john.smith",
      email: "john.smith@example.com",
      bio: "Software developer.",
    },
  });

  const users = await prisma.user.createManyAndReturn({
    data: _.range(0, 50).map(() => ({
      name: faker.person.fullName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      bio: faker.person.bio(),
    })),
  });

  const posts = await prisma.post.createManyAndReturn({
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

  const replies = await prisma.post.createManyAndReturn({
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

  const _moreReplies = await prisma.post.createManyAndReturn({
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
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: unknown) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

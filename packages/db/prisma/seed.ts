import { faker } from "@faker-js/faker";
import { Prisma } from "@prisma/client";
import { db } from "@semicolon/db";
import _ from "lodash";

async function main() {
  await db.user.create({
    data: {
      id: "baf0014e-94cf-4980-888c-5f0d437c65f6",
      name: "John Smith",
      username: "john.smith",
      email: "john.smith@example.com",
      bio: "Software developer.",
      location: faker.location.country(),
      verified: true,
      image: faker.image.avatar(),
      birthday: faker.date.between({
        from: "1990-01-01",
        to: "2007-01-01",
      }),
      registered: faker.date.between({
        from: "2020-01-01",
        to: "2024-01-01",
      }),
    },
  });

  const users = await db.user.createManyAndReturn({
    data: _.range(0, 50).map(() => ({
      name: faker.person.fullName(),
      username: faker.internet.userName().substring(0, 15),
      email: faker.internet.email(),
      location: faker.location.country(),
      verified: _.sample([true, false]),
      website: faker.internet.url(),
      bio: faker.person.bio(),
      image: faker.image.avatar(),
      header: faker.image.urlPicsumPhotos({
        width: 600,
        height: 400,
      }),
      birthday: faker.date.between({
        from: "1990-01-01",
        to: "2007-01-01",
      }),
      registered: faker.date.between({
        from: "2020-01-01",
        to: "2024-01-01",
      }),
    })),
  });

  await db.$kysely
    .insertInto("_UserFollow")
    .values((eb) =>
      users.flatMap(({ id }, i) => {
        const otherUsers = users.slice();
        otherUsers.splice(i, 1);
        const sampledUsers = _.sampleSize(otherUsers, _.random(5, 50));
        return sampledUsers.map((user) => ({
          A: eb.cast(eb.val(user.id), "uuid"),
          B: eb.cast(eb.val(id), "uuid"),
        }));
      }),
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
            to: new Date(),
          }),
          views: _.random(5, 500),
          media: _.sample([
            [],
            _.range(0, _.random(1, 4)).map(() =>
              faker.image.urlPicsumPhotos({
                width: _.random(800, 1600),
                height: _.random(800, 1600),
              }),
            ),
          ]),
        })),
      ),
    ),
  });

  await db.like.createMany({
    data: posts.flatMap((post) =>
      _.sampleSize(users, _.random(5, users.length)).map((user) => ({
        postId: post.id,
        userId: user.id,
      })),
    ),
  });

  const replies = await db.post.createManyAndReturn({
    data: _.flattenDeep(
      posts.map((post) =>
        _.range(0, 5).map((): Prisma.PostCreateManyAndReturnArgs["data"] => ({
          parentId: post.id,
          userId: _.sample(users)!.id,
          content: faker.lorem.paragraph({
            min: 1,
            max: 4,
          }),
          createdAt: faker.date.between({
            from: post.createdAt,
            to: new Date(),
          }),
          views: _.random(5, 500),
          media: _.sample([
            [],
            _.range(0, _.random(1, 4)).map(() =>
              faker.image.urlPicsumPhotos({
                width: _.random(800, 1600),
                height: _.random(800, 1600),
              }),
            ),
          ]),
        })),
      ),
    ),
  });

  await db.like.createMany({
    data: replies.flatMap((post) =>
      _.sampleSize(users, _.random(5, users.length)).map((user) => ({
        postId: post.id,
        userId: user.id,
      })),
    ),
  });

  const moreReplies = await db.post.createManyAndReturn({
    data: _.flattenDeep(
      replies.map((reply) =>
        _.range(0, 5).map((): Prisma.PostCreateManyAndReturnArgs["data"] => ({
          parentId: reply.id,
          userId: _.sample(users)!.id,
          content: faker.lorem.paragraph({
            min: 1,
            max: 4,
          }),
          createdAt: faker.date.between({
            from: reply.createdAt,
            to: new Date(),
          }),
          views: _.random(5, 500),
          media: _.sample([
            [],
            _.range(0, _.random(1, 4)).map(() =>
              faker.image.urlPicsumPhotos({
                width: _.random(800, 1600),
                height: _.random(800, 1600),
              }),
            ),
          ]),
        })),
      ),
    ),
  });

  await db.like.createMany({
    data: moreReplies.flatMap((post) =>
      _.sampleSize(users, _.random(5, users.length)).map((user) => ({
        postId: post.id,
        userId: user.id,
      })),
    ),
  });
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

import { PrismaClient } from "@prisma/client";

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

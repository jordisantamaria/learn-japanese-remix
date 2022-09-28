import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  await prisma.vocabList.deleteMany().catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  const vocabList = {
    name: "Saludaciones",
    vocabItems: [
      {
        word: "こんにちは",
        translation: "Hola",
        pronunciation: "konnichiha",
      },
      {
        word: "おはよう",
        translation: "Buenos dia",
        pronunciation: "ohayou",
      },
      {
        word: "こんばんわ",
        translation: "Buenas tardes",
        pronunciation: "konbanwa",
      },
      {
        word: "おやすみなさい",
        translation: "Buenas noches",
        pronunciation: "oyasuminasai",
      },
    ],
  };

  const vocabListCreated = await prisma.vocabList.create({
    data: { name: vocabList.name },
  });

  vocabList.vocabItems.map(async (item) => {
    await prisma.vocabItem.create({
      data: { ...item, vocabListId: vocabListCreated.id },
    });
  });

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


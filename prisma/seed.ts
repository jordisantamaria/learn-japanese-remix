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

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.note.create({
    data: {
      title: "My first note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  await prisma.note.create({
    data: {
      title: "My second note",
      body: "Hello, world!",
      userId: user.id,
    },
  });

  const vocabLists = [
    {
      name: "Saludaciones",
    },
    {
      name: "Sample list",
    },
    {
      name: "Sample list 2",
    },
    {
      name: "Sample list 3",
    },
  ];

  vocabLists.forEach(async (list) => {
    await prisma.vocabList.create({
      data: list
    })
  })

  await prisma.vocabItems.create({
    data: 
      {
        word: 'こんにちは',
        translation: 'Hola',
        pronunciation: 'konnichiha',
        association: ''
      },

  })

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


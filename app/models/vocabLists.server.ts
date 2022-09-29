import { VocabList } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getVocabList(id: string) {
  return prisma.vocabList.findUnique({
    where: { id },
    include: {
      vocabItems: true,
    },
  });
}

export async function getVocabLists() {
  return prisma.vocabList.findMany();
}

export async function createVocabList(vocabList: Pick<VocabList, "name">) {
  return prisma.vocabList.create({ data: vocabList });
}

export async function updateVocabList(
  id: string,
  vocabList: Pick<VocabList, "name">
) {
  return prisma.vocabList.update({ data: vocabList, where: { id } });
}

export function deleteVocabList(id: string) {
  return prisma.vocabList.delete({
    where: { id },
  });
}



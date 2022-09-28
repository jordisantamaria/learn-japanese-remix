import { VocabList } from "@prisma/client";
import { prisma } from "~/db.server";

export async function getVocabLists(): Promise<Array<Partial<VocabList>>> {
  return prisma.vocabList.findMany();
}

export async function createVocabList(vocabList: Pick<VocabList, 'name'>) {
  return prisma.vocabList.create({data: vocabList})
}

export async function updateVocabList(id: string, vocabList: Pick<VocabList, 'name'>) {
  return prisma.vocabList.update({data: vocabList, where: {id}})
}

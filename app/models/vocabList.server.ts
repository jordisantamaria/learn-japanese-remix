import { VocabList } from "types";

export async function getVocabList(): Promise<VocabList> {
  return {
    name: 'Saludaciones',
    id: 1,
    vocabItems: [
      {
        id: 1,
        word: 'こんにちは',
        translation: 'Hola',
        pronunciation: 'konnichiha',
      },
      {
        id: 2,
        word: 'おはよう',
        translation: 'Buenos dia',
        pronunciation: 'ohayou',
      },
      {
        id: 3,
        word: 'こんばんわ',
        translation: 'Buenas tardes',
        pronunciation: 'konbanwa',
      },
      {
        id: 4,
        word: 'おやすみなさい',
        translation: 'Buenas noches',
        pronunciation: 'oyasuminasai',
      },
    ]
  }
}



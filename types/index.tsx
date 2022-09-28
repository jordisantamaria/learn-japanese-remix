// export interface VocabList {
//   name: string;
//   id: string;
//   vocabItems: VocabItem[];
// }

export interface VocabItem {
  id: number;
  word: string;
  translation: string;
  pronunciation: string;
  association?: string;
}



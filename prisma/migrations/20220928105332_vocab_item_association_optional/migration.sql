-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_VocabItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "word" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    "association" TEXT,
    "vocabListId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VocabItem_vocabListId_fkey" FOREIGN KEY ("vocabListId") REFERENCES "VocabList" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_VocabItem" ("association", "createdAt", "id", "pronunciation", "translation", "updatedAt", "vocabListId", "word") SELECT "association", "createdAt", "id", "pronunciation", "translation", "updatedAt", "vocabListId", "word" FROM "VocabItem";
DROP TABLE "VocabItem";
ALTER TABLE "new_VocabItem" RENAME TO "VocabItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

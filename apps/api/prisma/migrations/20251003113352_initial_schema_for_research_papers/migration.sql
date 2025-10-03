CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE "Paper" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authors" TEXT[],
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaperChunk" (
    "id" TEXT NOT NULL,
    "paperId" TEXT NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "chunkText" TEXT NOT NULL,
    "chunkEmbedding" vector NOT NULL,

    CONSTRAINT "PaperChunk_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PaperChunk" ADD CONSTRAINT "PaperChunk_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

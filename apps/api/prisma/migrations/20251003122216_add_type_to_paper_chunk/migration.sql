/*
  Warnings:

  - Added the required column `type` to the `PaperChunk` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ChunckType" AS ENUM ('TEXT', 'IMAGE', 'TABLE');

-- AlterTable
ALTER TABLE "PaperChunk" ADD COLUMN     "type" "ChunckType" NOT NULL;

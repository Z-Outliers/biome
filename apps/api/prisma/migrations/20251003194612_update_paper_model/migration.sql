/*
  Warnings:

  - Added the required column `abstract` to the `Paper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalUrl` to the `Paper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paper" ADD COLUMN     "abstract" TEXT NOT NULL,
ADD COLUMN     "originalUrl" TEXT NOT NULL,
ADD COLUMN     "summary" TEXT;

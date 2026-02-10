/*
  Warnings:

  - You are about to alter the column `title` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `Todo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- DropIndex
DROP INDEX "Todo_description_key";

-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

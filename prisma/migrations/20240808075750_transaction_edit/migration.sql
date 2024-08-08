/*
  Warnings:

  - You are about to drop the column `notes` on the `Transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "notes",
ADD COLUMN     "description" TEXT,
ALTER COLUMN "transactionDate" DROP NOT NULL;

/*
  Warnings:

  - You are about to drop the column `hashKey` on the `Cart` table. All the data in the column will be lost.
  - The required column `secret` was added to the `Cart` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Cart` DROP COLUMN `hashKey`,
    ADD COLUMN `secret` VARCHAR(191) NOT NULL;

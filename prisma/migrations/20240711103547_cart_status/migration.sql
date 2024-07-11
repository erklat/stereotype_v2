/*
  Warnings:

  - Added the required column `createdAt` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Cart` ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `expiresAt` DATETIME(3) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'active',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

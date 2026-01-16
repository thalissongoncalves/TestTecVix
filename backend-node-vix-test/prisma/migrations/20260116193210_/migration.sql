/*
  Warnings:

  - You are about to drop the column `network` on the `vM` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `vM` DROP COLUMN `network`,
    ADD COLUMN `networkType` ENUM('public', 'public_private', 'private') NULL;

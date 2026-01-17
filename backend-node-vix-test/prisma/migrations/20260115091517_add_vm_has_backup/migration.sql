/*
  Warnings:

  - Made the column `hasBackup` on table `vM` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `vM` MODIFY `hasBackup` BOOLEAN NOT NULL DEFAULT false;

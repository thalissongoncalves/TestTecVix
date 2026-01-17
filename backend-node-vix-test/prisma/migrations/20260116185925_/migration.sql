/*
  Warnings:

  - The values [LOCAL,CLOUD,EDGE] on the enum `vM_location` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `vM` ADD COLUMN `network` ENUM('public', 'private', 'public_private') NULL,
    MODIFY `location` ENUM('USA_MIAMI', 'BRA_SAO_PAULO') NULL;

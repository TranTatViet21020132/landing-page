/*
  Warnings:

  - You are about to drop the column `customer_id` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `town` on the `address` table. All the data in the column will be lost.
  - Added the required column `street` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ward` to the `address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address_id` to the `customer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `address_customer_id_fkey`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `customer_id`,
    DROP COLUMN `town`,
    ADD COLUMN `street` VARCHAR(191) NOT NULL,
    ADD COLUMN `ward` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `customer` ADD COLUMN `address_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

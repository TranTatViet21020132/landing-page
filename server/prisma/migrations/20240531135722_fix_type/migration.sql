-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `customer_address_id_fkey`;

-- AlterTable
ALTER TABLE `customer` MODIFY `first_name` VARCHAR(191) NULL,
    MODIFY `last_name` VARCHAR(191) NULL,
    MODIFY `address_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `customer` ADD CONSTRAINT `customer_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

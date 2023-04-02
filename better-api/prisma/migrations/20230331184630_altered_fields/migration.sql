-- DropForeignKey
ALTER TABLE `list` DROP FOREIGN KEY `List_userId_fkey`;

-- AlterTable
ALTER TABLE `list` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

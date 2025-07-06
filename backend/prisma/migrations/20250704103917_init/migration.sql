/*
  Warnings:

  - You are about to drop the column `rating` on the `Rating` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `Store` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `email` on the `Store` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address` on the `Store` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(400)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(400)`.
  - A unique constraint covering the columns `[userId,storeId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "rating",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(400);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(60),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(400),
DROP COLUMN "role",
ADD COLUMN     "role" VARCHAR(20) NOT NULL;

-- DropEnum
DROP TYPE "Role";

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_storeId_key" ON "Rating"("userId", "storeId");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

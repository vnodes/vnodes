/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `AccessToken` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AccessToken` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `AccessTokenPermission` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `AccessTokenPermission` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AccessTokenPermission` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Audit` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Audit` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Hook` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Hook` table. All the data in the column will be lost.
  - You are about to drop the column `payload` on the `Hook` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Hook` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `RolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `RolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `RolePermission` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `ipAddress` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `otp` on the `User` table. All the data in the column will be lost.
  - Added the required column `scope` to the `Audit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Audit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccessTokenPermission" DROP CONSTRAINT "AccessTokenPermission_accessTokenId_fkey";

-- DropForeignKey
ALTER TABLE "AccessTokenPermission" DROP CONSTRAINT "AccessTokenPermission_permissionId_fkey";

-- DropIndex
DROP INDEX "User_firstName_idx";

-- DropIndex
DROP INDEX "User_lastName_idx";

-- DropIndex
DROP INDEX "User_middleName_idx";

-- AlterTable
ALTER TABLE "AccessToken" DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "AccessTokenPermission" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Audit" DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "scope" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hook" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "payload",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "RolePermission" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "deletedAt",
DROP COLUMN "ipAddress",
DROP COLUMN "token",
DROP COLUMN "updatedAt",
ADD COLUMN     "agent" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "hostname" TEXT,
ADD COLUMN     "ip" TEXT,
ADD COLUMN     "lastUsedAt" TIMESTAMP(3),
ADD COLUMN     "loc" TEXT,
ADD COLUMN     "org" TEXT,
ADD COLUMN     "postal" TEXT,
ADD COLUMN     "region" TEXT,
ADD COLUMN     "timezone" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleName",
DROP COLUMN "otp",
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "isEmailVerified" BOOLEAN;

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "value" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Otp_userId_key" ON "Otp"("userId");

-- CreateIndex
CREATE INDEX "Audit_actorId_idx" ON "Audit"("actorId");

-- CreateIndex
CREATE INDEX "Audit_status_idx" ON "Audit"("status");

-- CreateIndex
CREATE INDEX "Audit_resource_idx" ON "Audit"("resource");

-- CreateIndex
CREATE INDEX "Audit_operation_idx" ON "Audit"("operation");

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessTokenPermission" ADD CONSTRAINT "AccessTokenPermission_accessTokenId_fkey" FOREIGN KEY ("accessTokenId") REFERENCES "AccessToken"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessTokenPermission" ADD CONSTRAINT "AccessTokenPermission_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

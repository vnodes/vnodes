/*
  Warnings:

  - A unique constraint covering the columns `[country,state,city,street,contactId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value,contactId]` on the table `Email` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value,contactId]` on the table `Phone` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tags" TEXT[];

-- CreateIndex
CREATE INDEX "Address_zip_idx" ON "Address"("zip");

-- CreateIndex
CREATE INDEX "Address_country_idx" ON "Address"("country");

-- CreateIndex
CREATE UNIQUE INDEX "Address_country_state_city_street_contactId_key" ON "Address"("country", "state", "city", "street", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_key" ON "Contact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_value_contactId_key" ON "Email"("value", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_value_contactId_key" ON "Phone"("value", "contactId");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - The `contactType` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `contactType` column on the `Email` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `contactType` column on the `Phone` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('Personal', 'Work');

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "contactType",
ADD COLUMN     "contactType" "ContactType" NOT NULL DEFAULT 'Personal';

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "contactType",
ADD COLUMN     "contactType" "ContactType" NOT NULL DEFAULT 'Personal';

-- AlterTable
ALTER TABLE "Phone" DROP COLUMN "contactType",
ADD COLUMN     "contactType" "ContactType" NOT NULL DEFAULT 'Personal';

-- DropEnum
DROP TYPE "PersonalOrWork";

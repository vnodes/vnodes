-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'CLOSED', 'IN_PROGRESS');

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "status" "Status",
ALTER COLUMN "description" DROP NOT NULL;

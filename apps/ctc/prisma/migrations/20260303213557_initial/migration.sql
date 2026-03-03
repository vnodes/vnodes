-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "PersonalOrWork" AS ENUM ('Personal', 'Work');

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "preferedName" TEXT,
    "gender" "Gender",
    "profiles" TEXT[],
    "primaryEmailId" INTEGER,
    "primaryPhoneId" INTEGER,
    "primaryAddressId" INTEGER,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "contactType" "PersonalOrWork" NOT NULL DEFAULT 'Personal',
    "email" TEXT NOT NULL,
    "notes" TEXT,
    "openTime" JSONB DEFAULT '[]',
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Phone" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "contactType" "PersonalOrWork" NOT NULL DEFAULT 'Personal',
    "phone" TEXT NOT NULL,
    "notes" TEXT,
    "openTime" JSONB DEFAULT '[]',
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "Phone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "contactType" "PersonalOrWork" NOT NULL DEFAULT 'Personal',
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "notes" TEXT,
    "openTime" JSONB DEFAULT '[]',
    "unit" TEXT,
    "province" TEXT,
    "state" TEXT,
    "country" TEXT,
    "zip" TEXT,
    "contactId" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_uuid_key" ON "Contact"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_primaryEmailId_key" ON "Contact"("primaryEmailId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_primaryPhoneId_key" ON "Contact"("primaryPhoneId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_primaryAddressId_key" ON "Contact"("primaryAddressId");

-- CreateIndex
CREATE INDEX "Email_email_idx" ON "Email"("email");

-- CreateIndex
CREATE INDEX "Email_contactId_idx" ON "Email"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_contactId_email_key" ON "Email"("contactId", "email");

-- CreateIndex
CREATE INDEX "Phone_phone_idx" ON "Phone"("phone");

-- CreateIndex
CREATE INDEX "Phone_contactId_idx" ON "Phone"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Phone_contactId_phone_key" ON "Phone"("contactId", "phone");

-- CreateIndex
CREATE INDEX "Address_contactId_idx" ON "Address"("contactId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_primaryEmailId_fkey" FOREIGN KEY ("primaryEmailId") REFERENCES "Email"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_primaryPhoneId_fkey" FOREIGN KEY ("primaryPhoneId") REFERENCES "Phone"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_primaryAddressId_fkey" FOREIGN KEY ("primaryAddressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

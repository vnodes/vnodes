-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female');

-- CreateEnum
CREATE TYPE "ContactType" AS ENUM ('Employee', 'Customer', 'Service', 'Vendor', 'Partner', 'Supplier', 'Manufacturer', 'Competitor');

-- CreateEnum
CREATE TYPE "PersonalOrWork" AS ENUM ('Personal', 'Work');

-- CreateTable
CREATE TABLE "Department" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Industry" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "industryId" INTEGER,
    "name" TEXT NOT NULL,
    "profiles" TEXT[],
    "openTime" JSONB DEFAULT '[]',

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxInfo" (
    "id" SERIAL NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "taxNumber" TEXT NOT NULL,
    "taxCountry" TEXT NOT NULL,
    "isTaxExempt" BOOLEAN NOT NULL DEFAULT false,
    "exemptionNote" TEXT,
    "companyId" INTEGER,
    "contactId" INTEGER,

    CONSTRAINT "TaxInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Occupation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,

    CONSTRAINT "Occupation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userType" "ContactType" NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "middleName" TEXT,
    "preferedName" TEXT,
    "gender" "Gender",
    "profiles" TEXT[],
    "companyId" INTEGER,
    "occupationId" INTEGER,
    "departmentId" INTEGER,
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
    "contactId" INTEGER NOT NULL,
    "openTime" JSONB DEFAULT '[]',

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
CREATE UNIQUE INDEX "Department_name_key" ON "Department"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_name_key" ON "Industry"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TaxInfo_taxNumber_key" ON "TaxInfo"("taxNumber");

-- CreateIndex
CREATE UNIQUE INDEX "TaxInfo_companyId_key" ON "TaxInfo"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "TaxInfo_contactId_key" ON "TaxInfo"("contactId");

-- CreateIndex
CREATE UNIQUE INDEX "Occupation_name_key" ON "Occupation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_uuid_key" ON "Contact"("uuid");

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
ALTER TABLE "Company" ADD CONSTRAINT "Company_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxInfo" ADD CONSTRAINT "TaxInfo_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxInfo" ADD CONSTRAINT "TaxInfo_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_occupationId_fkey" FOREIGN KEY ("occupationId") REFERENCES "Occupation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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

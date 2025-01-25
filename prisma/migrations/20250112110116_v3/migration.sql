/*
  Warnings:

  - Added the required column `facilitiesId` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recommendedBy` to the `CoffeeShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" ADD COLUMN     "facilitiesId" INTEGER NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "recommendedBy" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "SubmissionCoffeeShop" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "recommendedBy" TEXT NOT NULL,
    "facilityId" INTEGER NOT NULL,

    CONSTRAINT "SubmissionCoffeeShop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Facilities" (
    "id" SERIAL NOT NULL,
    "wifi" BOOLEAN NOT NULL DEFAULT false,
    "beverages" BOOLEAN NOT NULL DEFAULT false,
    "snacks" BOOLEAN NOT NULL DEFAULT false,
    "meals" BOOLEAN NOT NULL DEFAULT false,
    "sockets" BOOLEAN NOT NULL DEFAULT false,
    "musholla" BOOLEAN NOT NULL DEFAULT false,
    "carParking" BOOLEAN NOT NULL DEFAULT false,
    "motorParking" BOOLEAN NOT NULL DEFAULT false,
    "babyChair" BOOLEAN DEFAULT false,
    "meetingRoom" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Facilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoffeeShop" ADD CONSTRAINT "CoffeeShop_facilitiesId_fkey" FOREIGN KEY ("facilitiesId") REFERENCES "Facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionCoffeeShop" ADD CONSTRAINT "SubmissionCoffeeShop_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "Facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

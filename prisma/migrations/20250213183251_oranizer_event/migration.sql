/*
  Warnings:

  - You are about to drop the column `eventId` on the `Organizer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Organizer` table. All the data in the column will be lost.
  - Added the required column `organizerId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrganizerRole" AS ENUM ('Owner', 'CoOrganizer', 'Staff');

-- DropForeignKey
ALTER TABLE "Organizer" DROP CONSTRAINT "Organizer_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Organizer" DROP CONSTRAINT "Organizer_userId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "organizerId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Organizer" DROP COLUMN "eventId",
DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "OrganizerUser" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "organizerId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "role" "OrganizerRole" NOT NULL,

    CONSTRAINT "OrganizerUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizerUser_organizerId_userId_key" ON "OrganizerUser"("organizerId", "userId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerUser" ADD CONSTRAINT "OrganizerUser_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerUser" ADD CONSTRAINT "OrganizerUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

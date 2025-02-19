/*
  Warnings:

  - You are about to drop the column `organizationName` on the `Organizer` table. All the data in the column will be lost.
  - You are about to drop the column `organizerId` on the `OrganizerUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organizationId,userId]` on the table `OrganizerUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "OrganizerUser" DROP CONSTRAINT "OrganizerUser_organizerId_fkey";

-- DropIndex
DROP INDEX "OrganizerUser_organizerId_userId_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "bestSuitedFor" TEXT,
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "gatesOpen" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "kidFriendly" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "language" TEXT[],
ADD COLUMN     "layout" TEXT,
ADD COLUMN     "petFriendly" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "seatingArrangement" TEXT,
ADD COLUMN     "ticketsNeededFor" TEXT,
ADD COLUMN     "toc" TEXT[];

-- AlterTable
ALTER TABLE "Organizer" DROP COLUMN "organizationName",
ADD COLUMN     "isIndividual" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "organizationId" UUID,
ADD COLUMN     "userId" UUID;

-- AlterTable
ALTER TABLE "OrganizerUser" DROP COLUMN "organizerId",
ADD COLUMN     "organizationId" UUID;

-- CreateTable
CREATE TABLE "Organization" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "address" TEXT,
    "contact" TEXT[],
    "description" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrganizerUser_organizationId_userId_key" ON "OrganizerUser"("organizationId", "userId");

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organizer" ADD CONSTRAINT "Organizer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganizerUser" ADD CONSTRAINT "OrganizerUser_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

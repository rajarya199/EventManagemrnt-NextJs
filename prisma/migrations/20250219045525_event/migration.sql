/*
  Warnings:

  - Made the column `organizationId` on table `OrganizerUser` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "OrganizerUser" DROP CONSTRAINT "OrganizerUser_organizationId_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "OrganizerUser" ALTER COLUMN "organizationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "OrganizerUser" ADD CONSTRAINT "OrganizerUser_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

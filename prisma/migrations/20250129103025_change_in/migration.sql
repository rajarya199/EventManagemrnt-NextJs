/*
  Warnings:

  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Physical', 'Virtual');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "type" "EventType" NOT NULL;

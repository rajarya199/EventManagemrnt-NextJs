-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- AlterTable
ALTER TABLE "FreeEventRegistration" ADD COLUMN     "status" "RegistrationStatus" NOT NULL DEFAULT 'PENDING';

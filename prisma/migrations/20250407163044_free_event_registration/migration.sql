-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventCapacity" INTEGER;

-- CreateTable
CREATE TABLE "FreeEventRegistration" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "eventId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FreeEventRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FreeEventRegistration_eventId_idx" ON "FreeEventRegistration"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "FreeEventRegistration_userId_eventId_key" ON "FreeEventRegistration"("userId", "eventId");

-- AddForeignKey
ALTER TABLE "FreeEventRegistration" ADD CONSTRAINT "FreeEventRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FreeEventRegistration" ADD CONSTRAINT "FreeEventRegistration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

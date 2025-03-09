/*
  Warnings:

  - You are about to drop the column `penaltyUntil` on the `Member` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Member" DROP COLUMN "penaltyUntil";

-- CreateTable
CREATE TABLE "Penalty" (
    "id" TEXT NOT NULL,
    "memberCode" TEXT NOT NULL,
    "borrowingCode" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penalty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Penalty_borrowingCode_key" ON "Penalty"("borrowingCode");

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "Member"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_borrowingCode_fkey" FOREIGN KEY ("borrowingCode") REFERENCES "Borrowing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

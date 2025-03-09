-- CreateEnum
CREATE TYPE "BorrowingStatus" AS ENUM ('BORROWED', 'RETURNED');

-- CreateTable
CREATE TABLE "Member" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Book" (
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "Borrowing" (
    "id" TEXT NOT NULL,
    "memberCode" TEXT NOT NULL,
    "bookCode" TEXT NOT NULL,
    "borrowedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3),
    "status" "BorrowingStatus" NOT NULL DEFAULT 'BORROWED',

    CONSTRAINT "Borrowing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penalty" (
    "id" TEXT NOT NULL,
    "memberCode" TEXT NOT NULL,
    "borrowingId" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Penalty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_code_key" ON "Member"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Book_code_key" ON "Book"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Penalty_borrowingId_key" ON "Penalty"("borrowingId");

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "Member"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Borrowing" ADD CONSTRAINT "Borrowing_bookCode_fkey" FOREIGN KEY ("bookCode") REFERENCES "Book"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "Member"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_borrowingId_fkey" FOREIGN KEY ("borrowingId") REFERENCES "Borrowing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

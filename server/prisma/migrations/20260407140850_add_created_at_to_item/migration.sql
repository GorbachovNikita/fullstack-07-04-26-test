-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'archived');

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "status" "Status",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

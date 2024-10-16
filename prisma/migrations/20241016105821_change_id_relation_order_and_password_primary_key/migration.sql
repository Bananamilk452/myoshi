/*
  Warnings:

  - The primary key for the `Password` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Password" DROP CONSTRAINT "Password_pkey",
ADD CONSTRAINT "Password_pkey" PRIMARY KEY ("userId");

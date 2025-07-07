/*
  Warnings:

  - You are about to drop the column `username` on the `Usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuarios_username_key";

-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "username",
ADD COLUMN     "email" CHAR(30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

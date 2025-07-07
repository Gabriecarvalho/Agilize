/*
  Warnings:

  - You are about to drop the column `email` on the `Usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `Usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nome` to the `Usuarios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuarios_email_key";

-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "nome" CHAR(120) NOT NULL,
ADD COLUMN     "username" CHAR(30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_username_key" ON "Usuarios"("username");

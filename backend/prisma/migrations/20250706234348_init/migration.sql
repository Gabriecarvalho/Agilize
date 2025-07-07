/*
  Warnings:

  - You are about to drop the column `nome` on the `Usuarios` table. All the data in the column will be lost.
  - Added the required column `name` to the `Usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuarios" DROP COLUMN "nome",
ADD COLUMN     "name" CHAR(120) NOT NULL;

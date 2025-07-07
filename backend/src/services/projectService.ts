import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarProjeto = async (usuarioId: number, nome: string, objetivo?: string) => {
  console.log("Criando projeto:", { usuarioId, nome, objetivo });
  const criado = await prisma.projeto.create({
    data: { nome, objetivo, usuarioId }
  });
  console.log("Projeto criado:", criado);
  return criado;
};

export const editarProjeto = async (id: number, nome: string, objetivo?: string) => {
  return await prisma.projeto.update({
    where: { id },
    data: { nome, objetivo }
  });
};

export const excluirProjeto = async (id: number) => {
  return await prisma.projeto.delete({
    where: { id }
  });
};

export const listarProjetosPorUsuario = async (usuarioId: number) => {
  return await prisma.projeto.findMany({
    where: { usuarioId }
  });
};

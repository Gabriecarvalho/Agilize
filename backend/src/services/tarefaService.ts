import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const criarTarefa = async (usuarioId: number, titulo: string, descricao?: string) => {
  return await prisma.tarefa.create({
    data: { titulo, descricao, usuarioId }
  });
};

export const editarTarefa = async (id: number, titulo: string, descricao?: string) => {
  return await prisma.tarefa.update({
    where: { id },
    data: { titulo, descricao }
  });
};

export const excluirTarefa = async (id: number) => {
  return await prisma.tarefa.delete({
    where: { id }
  });
};

export const listarTarefasPorUsuario = async (usuarioId: number) => {
  return await prisma.tarefa.findMany({
    where: { usuarioId }
  });
};

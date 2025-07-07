// src/controllers/tarefaController.ts
import { Request, Response } from "express";
import * as tarefaService from "../services/tarefaService";
import jwt from "jsonwebtoken";

export const criar = async (req: Request, res: Response) => {
  const { titulo, descricao } = req.body;
  const decodedToken = jwt.decode(req.cookies.token) as { id: number; nome: string; email: string };
  const usuarioId = decodedToken.id;

  try {
    const tarefa = await tarefaService.criarTarefa(Number(usuarioId), titulo, descricao);
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
  }
};

export const editar = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;

  try {
    const tarefa = await tarefaService.editarTarefa(Number(id), titulo, descricao);
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar tarefa" });
  }
};

export const excluir = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await tarefaService.excluirTarefa(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir tarefa" });
  }
};

export const listarPorUsuario = async (req: Request, res: Response) => {
  const usuarioId = Number(req.params.usuarioId);

  try {
    const tarefas = await tarefaService.listarTarefasPorUsuario(usuarioId);
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar tarefas" });
  }
};

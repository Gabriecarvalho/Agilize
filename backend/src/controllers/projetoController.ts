// src/controllers/projetoController.ts
import { Request, Response } from "express";
import * as projetoService from "../services/projectService";
import { meController } from "./userController";
import jwt from "jsonwebtoken";

export const criar = async (req: Request, res: Response) => {
  const { nome, objetivo } = req.body;
  const decodedToken = jwt.decode(req.cookies.token) as { id: number; nome: string; email: string };
  const usuarioId = decodedToken.id;
  try {
    console.log("Criando projeto:", { usuarioId, nome, objetivo });
    const projeto = await projetoService.criarProjeto(usuarioId, nome, objetivo);
    res.status(201).json(projeto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar projeto" });
    console.log(error)
  }
};

export const editar = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, objetivo } = req.body;

  try {
    const projeto = await projetoService.editarProjeto(Number(id), nome, objetivo);
    res.json(projeto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar projeto" });
  }
};

export const excluir = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await projetoService.excluirProjeto(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir projeto" });
  }
};

export const listarPorUsuario = async (req: Request, res: Response) => {
  const usuarioId = Number(req.params.usuarioId);
  console.log("Listando projetos para o usuário:", usuarioId);

  try {
    const projetos = await projetoService.listarProjetosPorUsuario(usuarioId);
    res.json(projetos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar projetos" });
  }
};

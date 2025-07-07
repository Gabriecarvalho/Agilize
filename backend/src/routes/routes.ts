import express from "express";
import * as projetoController from "../controllers/projetoController";
import * as tarefaController from "../controllers/tarefaController";

const router = express.Router();

// Projetos
router.post("/projetos", projetoController.criar);
router.put("/projetos/:id", projetoController.editar);
router.delete("/projetos/:id", projetoController.excluir);
router.get("/projetos/usuario/:usuarioId", projetoController.listarPorUsuario);

// Tarefas
router.post("/tarefas", tarefaController.criar);
router.put("/tarefas/:id", tarefaController.editar);
router.delete("/tarefas/:id", tarefaController.excluir);
router.get("/tarefas/usuario/:usuarioId", tarefaController.listarPorUsuario);

export default router;

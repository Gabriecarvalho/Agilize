import { Router } from "express";
import {
  createUserController,
  meController,
  logoutController,
  getAllUsersController,
  AttPasswordController,
  updateUserController,
} from "../controllers/userController";
import { loginController } from "../controllers/authController";

import { authenticateToken } from "../middleware/middleware";

const router = Router();

// Rotas públicas
router.post("/users", createUserController);
router.get("/logout", logoutController);
router.post("/login", loginController);

// Rotas protegidas (precisa do token)
router.get("/me", authenticateToken, meController);
router.get("/users", authenticateToken, getAllUsersController);
router.patch("/users/password", authenticateToken, AttPasswordController);
router.patch("/users", authenticateToken, updateUserController);

export default router;

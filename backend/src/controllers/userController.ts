import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { 
  createUser, 
  getAllUsers,  
  updateUserService, 
  updatePasswordService 
} from "../services/userService";
import { assignToken } from "../services/authService";

const SECRET_KEY = process.env.SECRET_KEY as string;
if (!SECRET_KEY) {
  console.error("SECRET_KEY não foi definida!");
}

// Criar usuário
export const createUserController = async (req: Request, res: Response) => {
  const { nome, email, password } = req.body;

  if (!nome) {
    res.status(400).send({ message: "Nome do usuário é obrigatório." });
    return;
  }
  if (!email) {
    res.status(400).send({ message: "Email é obrigatório." });
    return;
  }
  if (!password || password.length < 8) {
    res.status(400).send({ message: "A senha deve ter pelo menos 8 caracteres." });
    return;
  }

  try {
    await createUser({ nome, email, password });
    res.status(201).send({ message: "Conta criada com sucesso!" });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
    console.warn(error);
  }
};

// Pegar informações do usuário logado
export const meController = (req: Request, res: Response): void => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ message: "Usuário não autenticado." });
      return;
    }
    if (!SECRET_KEY) {
      res.status(500).json({ message: "SECRET_KEY não foi definida!" });
      return;
    }

    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

    res.status(200).send({
      id: decoded.id,
      nome: decoded.nome,
      email: decoded.email,
      tipo: decoded.tipo,
    });
  } catch (error) {
    res.status(403).json({ message: "Token inválido!" });
  }
};

export const logoutController = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.json({ message: "Logout realizado com sucesso" });
};

// Buscar todos os usuários
export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar usuários." });
  }
};

// Alterar senha
export const AttPasswordController = async (req: Request, res: Response) => {
  const { password, newpassword } = req.body;
  const token = req.cookies?.token;

  if (!token || !password || !newpassword) {
    res.status(400).json({ message: "Preencha todos os campos para alterar senha." });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
    await updatePasswordService(decoded.id, password, newpassword);
    res.status(200).send({ message: "Senha alterada com sucesso!" });
  } catch (error: any) {
    const errorMessage = error.message || "Erro ao alterar a senha.";
    res.status(400).json({ message: errorMessage });
  }
};

// Atualizar dados do usuário
export const updateUserController = async (req: Request, res: Response) => {
  const userData = req.body;
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Usuário não autenticado." });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

    await updateUserService(decoded.id, userData);

    const newToken = await assignToken({
      id: decoded.id,
      nome: userData.nome || decoded.nome,
      email: userData.email || decoded.email,
      tipo: decoded.tipo,
    });

    res.clearCookie("token");
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 semana
    });

    res.status(200).send({ message: "Usuário atualizado com sucesso!" });
  } catch (error) {
    res.status(500).send({ message: "Erro ao atualizar usuário." });
    console.warn(error);
  }
};

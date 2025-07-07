import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET_KEY as string;
const saltRounds = 10;

export const createUser = async (data: {
  nome: string;
  email: string;
  password: string;
  tipo?: string; 
}) => {
  const { nome, email, password, tipo = "1" } = data;

  const existingUser = await prisma.usuario.findUnique({ where: { email } });
  if (existingUser) throw new Error("Este e-mail já está em uso.");

  if (password.length < 8) throw new Error("A senha deve ter pelo menos 8 caracteres.");

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const result = await prisma.usuario.create({
    data: {
      nome,
      email,
      password: hashedPassword,
      tipo,
      status: "A",
    },
  });

  return result;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.usuario.findUnique({ where: { email } });

  if (!user) throw new Error("Usuário não encontrado.");

  // Conta bloqueada
  if (user.status === "B") throw new Error("Usuário bloqueado.");

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const senhaErrada = user.senhaErrada + 1;
    const status = senhaErrada >= 3 ? "B" : user.status;

    await prisma.usuario.update({
      where: { id: user.id },
      data: { senhaErrada, status },
    });

    if (senhaErrada >= 3) throw new Error("Usuário bloqueado após 3 tentativas.");

    throw new Error("Senha incorreta.");
  }

  // Reset contador de senhaErrada, incrementa acessos
  await prisma.usuario.update({
    where: { id: user.id },
    data: {
      senhaErrada: 0,
      quantAcesso: user.quantAcesso + 1,
    },
  });

  const token = jwt.sign(
    { id: user.id, nome: user.nome, email: user.email, tipo: user.tipo },
    SECRET_KEY,
    { expiresIn: "1d" }
  );

  return { token, user };
};

export const getUserInfo = async (token: string) => {
  const decoded = jwt.verify(token, SECRET_KEY) as { id: number };
  const user = await prisma.usuario.findUnique({
    where: { id: decoded.id },
    select: {
      id: true,
      nome: true,
      email: true,
      tipo: true,
      status: true,
      quantAcesso: true,
    },
  });

  return user;
};

export const getAllUsers = async () => {
  return prisma.usuario.findMany({
    select: {
      id: true,
      nome: true,
      email: true,
      tipo: true,
      status: true,
      quantAcesso: true,
    },
  });
};

export const getUserById = async (id: number) => {
  return prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      email: true,
      tipo: true,
      status: true,
      quantAcesso: true,
    },
  });
};

export const updateUserService = async (id: number, data: {
  nome?: string;
  email?: string;
  tipo?: string;
  status?: string;
}) => {
  return prisma.usuario.update({
    where: { id },
    data,
  });
};

export const updatePasswordService = async (
  id: number,
  currentPassword: string,
  newPassword: string
) => {
  const user = await prisma.usuario.findUnique({ where: { id } });
  if (!user) throw new Error("Usuário não encontrado.");

  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) throw new Error("Senha atual incorreta.");

  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  return prisma.usuario.update({
    where: { id },
    data: { password: hashedPassword },
  });
};

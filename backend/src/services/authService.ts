import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) {
  throw new Error('SECRET não definido.');
}

export const login = async (email: string, password: string): Promise<{ token: string }> => {

  const user = await prisma.usuario.findFirst({
    where: {email}
  })
  console.log(user)

  if (!user) {
    throw new Error('Usuário não encontrado.');
  }
  if(user.status !== "A"){
    throw new Error('Usuário inativo ou Bloqueado. Entre em contato com o administrador.');
  }

  if(user.quantAcesso >= 3){
    await prisma.usuario.update({
      where: { id: user.id },
      data: { status: "B" }
    });
    throw new Error('Usuário bloqueado após 3 tentativas de login. Entre em contato com o administrador.');
  }

  // Comparando a senha
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (isPasswordCorrect) {
    await prisma.usuario.update({
      where: { id: user.id },
      data: { quantAcesso: 0 }
    });

    const payload = {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
    await prisma.usuario.update({
      where: { id: user.id },
      data:{quantAcesso: user.quantAcesso + 1}
    });

    // Gerando o token JWT
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
    return { token };
  } else {
    await prisma.usuario.update({
      where: { id: user.id },
      data:{quantAcesso: user.quantAcesso + 1}
    });
    throw new Error('Usuário ou senha incorretos.');
  }
};

export const assignToken = async (user: { id: number; nome: string; email: string; tipo: string }) => {
  if (!SECRET_KEY) {
    throw new Error('SECRET_KEY não definido.');
  }

  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1d' });
  return token;
}
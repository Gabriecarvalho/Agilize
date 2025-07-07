import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash da senha
  const hashedPassword = await bcrypt.hash('senha123', 10);

  // Criação do usuário base
  const usuario = await prisma.usuario.create({
    data: {
      nome: 'Administrador',
      email: 'admin@teste.com',
      password: hashedPassword,
      tipo: '0', // '0' para Admin, '1' para Usuário comum
      status: 'A', // A = Ativo
      quantAcesso: 0,
      senhaErrada: 0,
    },
  });

  console.log('Usuário criado:', usuario);

  
  await prisma.projeto.createMany({
    data: [
      {
        nome: 'Projeto Agilize',
        objetivo: 'Sistema de gestão de tarefas',
        usuarioId: usuario.id,
      },
      {
        nome: 'Projeto WebApp',
        objetivo: 'Aplicação React para produtividade',
        usuarioId: usuario.id,
      },
    ],
  });

  console.log('Projetos criados.');

  
  await prisma.tarefa.createMany({
    data: [
      {
        titulo: 'Criar layout da dashboard',
        descricao: 'Utilizar Tailwind e componentes reutilizáveis',
        usuarioId: usuario.id,
      },
      {
        titulo: 'Conectar backend com frontend',
        descricao: 'Endpoints REST com autenticação via JWT',
        usuarioId: usuario.id,
      },
      {
        titulo: 'Testar fluxos de login',
        descricao: 'Validar login com senhas corretas e erradas',
        usuarioId: usuario.id,
      },
    ],
  });

  console.log('Tarefas criadas.');
}

main()
  .then(() => {
    console.log('✅ Seed finalizado com sucesso!');
    return prisma.$disconnect();
  })
  .catch((error) => {
    console.error('❌ Erro ao executar o seed:', error);
    return prisma.$disconnect().finally(() => process.exit(1));
  });

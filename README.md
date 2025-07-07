# 🚀 Agilize 

**Agilize** é uma aplicação web de gerenciamento de projetos e tarefas, com recursos de cadastro de usuários, organização de equipes e diferenciação de permissões por tipo de usuário. Projetado para treinar typescript,nodejs e postgresql

---

## 🧩 Funcionalidades

- ✅ Cadastro de usuários (com controle de tipo: admin, padrão)
- 📁 Criação e visualização de projetos
- 📋 Criação e gerenciamento de tarefas
- 🔒 Sistema de autenticação com cookies (JWT)
- 🎯 Interface diferenciada para administradores
- 🌙 Design escuro moderno com componentes responsivos
- 💬 Feedbacks visuais com toasts de sucesso/erro

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- [Next.js](https://nextjs.org/) + TypeScript
- Tailwind CSS
- Lucide Icons
- Axios
- React Hot Toast

### Backend

- API REST com rotas em Next.js App Router
- [Prisma ORM](https://www.prisma.io/)
- PostgreSQL (ou MySQL)

### Autenticação

- JWT armazenado em cookies
- Validação de tipo de usuário via `/api/me`

---

## 📦 Instalação Local

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/agilize.git
cd agilize
```

---

### 2. Configure o Banco de Dados

#### Usando PostgreSQL

Crie o banco via terminal ou psql shell:

```bash
psql -U postgres
CREATE DATABASE agilize_db;
```

#### Alternativamente

Você pode usar outro banco de dados (ex: MySQL), bastando ajustar a string de conexão no arquivo `.env`.

---

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Exemplo com PostgreSQL
DATABASE_URL="postgresql://postgres:senha@localhost:5432/agilize_db"
SECRET_KEY="minhaChaveSuperSecreta123"
```

---

### 4. Configure o Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Esses comandos irão gerar o client do Prisma e aplicar as migrações iniciais ao banco.

---

### 5. Inicie o Backend e o Frontend

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em: [http://localhost:3000](http://localhost:3000)

#### Backend (caso esteja em diretório separado)

```bash
cd backend
npm install
npm run dev
```

### 6. Insira uma base de dados testes no banco

```bash

cd backend
npx prisma db seed
```

---

Pronto! A aplicação **Agilize** estará rodando localmente com todas as funcionalidades disponíveis. 🎯

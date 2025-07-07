"use client";

import { useRouter } from "next/navigation";
import { ClipboardList, FolderOpen } from "lucide-react";
import RegisterProjeto from "@/components/registerProjeto";
import RegisterTarefa from "@/components/registerTarefa";
import RegisterUsuario from "@/components/registerUsuario";
import axios from "axios";
import { useEffect, useState } from "react";
import AlterarSenhaForm from "@/components/alterarSenhaForm";

export default function ProjetosPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/me", { withCredentials: true });
        const user = response.data;
        setIsAdmin(user.tipo === 0); // tipo 0 = admin
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1f1f1f] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-2">
          Bem-vindo ao <span className="text-green-500">Agilize</span>!
        </h1>
        <p className="text-gray-300 text-lg mb-10">
          Aqui você gerencia seus projetos e tarefas de forma rápida e eficiente.
        </p>

        {/* Ações rápidas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div
            className="bg-[#2a2a2a] rounded-2xl p-6 shadow-lg hover:shadow-xl transition hover:scale-[1.02] cursor-pointer"
            onClick={() => router.push("/home/tarefas")}
          >
            <ClipboardList className="h-8 w-8 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold">Minhas Tarefas</h3>
            <p className="text-gray-400 mt-1">
              Acompanhe e atualize suas tarefas diárias.
            </p>
          </div>

          <div
            className="bg-[#2a2a2a] rounded-2xl p-6 shadow-lg hover:shadow-xl transition hover:scale-[1.02] cursor-pointer"
            onClick={() => router.push("/home/projetos")}
          >
            <FolderOpen className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold">Meus Projetos</h3>
            <p className="text-gray-400 mt-1">
              Visualize e organize seus projetos em andamento.
            </p>
          </div>

          <RegisterProjeto />
          <RegisterTarefa />
          <AlterarSenhaForm />

          {isAdmin && <RegisterUsuario />}
        </div>
      </div>
    </div>
  );
}

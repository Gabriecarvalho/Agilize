"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/logout"); // ou use fetch
      router.push("/"); // redireciona para página inicial/login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-transparent absolute top-0 left-0 z-50">
      {/* Logo ou Nome da Aplicação */}
      <h1
        onClick={() => router.push("/home")}
        className="text-white text-2xl font-bold cursor-pointer drop-shadow-md"
      >
        Agilize
      </h1>

      {/* Botões à direita */}
      <div className="flex gap-6 items-center">
        <button
          onClick={() => router.push("/home/tarefas")}
          className="text-white text-lg font-medium hover:text-green-400 transition-colors"
        >
          Tarefas
        </button>
        <button
          onClick={() => router.push("/home/projetos")}
          className="text-white text-lg font-medium hover:text-green-400 transition-colors"
        >
          Projetos
        </button>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center gap-2 text-white text-lg font-medium hover:text-red-400 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </nav>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import EditarProjetoDialog from "../../../created-components/EditarProjetoDialog";

interface Projeto {
  id: number;
  nome: string;
  objetivo?: string;
  status?: string;
}

export default function ProjetosPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [projetoEditando, setProjetoEditando] = useState<Projeto | null>(null);

  useEffect(() => {
    async function fetchProjetos() {
      setLoading(true);
      try {
        const meResponse = await fetch("/api/me", { credentials: "include" });
        if (!meResponse.ok) throw new Error("Falha ao obter usuário");

        const meData = await meResponse.json();
        const usuarioId = meData.id;

        const projetosResponse = await fetch(`/api/projetos/usuario/${usuarioId}`, {
          credentials: "include",
        });
        if (!projetosResponse.ok) throw new Error("Falha ao obter projetos");

        const projetosData = await projetosResponse.json();
        setProjetos(projetosData);
      } catch (error) {
        console.error(error);
        setProjetos([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProjetos();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar esse projeto?")) return;
    try {
      const res = await fetch(`/api/projetos/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erro ao deletar projeto");

      setProjetos(projetos.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar projeto");
    }
  };

  const handleEdit = (projeto: Projeto) => {
    setProjetoEditando(projeto);
  };

  const handleProjetoAtualizado = (projetoAtualizado: Projeto) => {
    setProjetos((prev) =>
      prev.map((p) => (p.id === projetoAtualizado.id ? projetoAtualizado : p))
    );
  };

  if (loading) return <p>Carregando projetos...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1f1f1f] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8">Meus Projetos</h1>
        {projetos.length === 0 ? (
          <p className="text-gray-400">Nenhum projeto encontrado.</p>
        ) : (
          <ul className="space-y-4">
            {projetos.map((projeto) => (
              <li
                key={projeto.id}
                className="bg-[#2a2a2a] rounded-2xl p-6 flex justify-between items-center shadow-lg"
              >
                <div>
                  <h3 className="text-xl font-semibold">{projeto.nome}</h3>
                  {projeto.objetivo && <p className="text-gray-400">{projeto.objetivo}</p>}
                  {projeto.status && (
                    <p className="text-blue-400 mt-1">Status: {projeto.status}</p>
                  )}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(projeto)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(projeto.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Diálogo de edição */}
      {projetoEditando && (
        <EditarProjetoDialog
          projeto={projetoEditando}
          isOpen={!!projetoEditando}
          onClose={() => setProjetoEditando(null)}
          onUpdated={handleProjetoAtualizado}
        />
      )}
    </div>
  );
}

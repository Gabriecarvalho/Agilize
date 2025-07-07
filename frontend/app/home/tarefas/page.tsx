"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import EditarTarefaDialog from "../../../created-components/EditarTarefaDialog";

interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  status?: string;
}

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);

  useEffect(() => {
    async function fetchTarefas() {
      setLoading(true);
      try {
        const meResponse = await fetch("/api/me", { credentials: "include" });
        if (!meResponse.ok) throw new Error("Falha ao obter usuário");

        const meData = await meResponse.json();
        const usuarioId = meData.id;

        const tarefasResponse = await fetch(`/api/tarefas/usuario/${usuarioId}`, {
          credentials: "include",
        });
        if (!tarefasResponse.ok) throw new Error("Falha ao obter tarefas");

        const tarefasData = await tarefasResponse.json();
        setTarefas(tarefasData);
      } catch (error) {
        console.error(error);
        setTarefas([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTarefas();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar essa tarefa?")) return;
    try {
      const res = await fetch(`/api/tarefas/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Erro ao deletar tarefa");

      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao deletar tarefa");
    }
  };

  const handleEdit = (tarefa: Tarefa) => {
    setTarefaEditando(tarefa);
  };

  const handleTarefaAtualizada = (tarefaAtualizada: Tarefa) => {
    setTarefas((prev) =>
      prev.map((t) => (t.id === tarefaAtualizada.id ? tarefaAtualizada : t))
    );
  };

  if (loading) return <p>Carregando tarefas...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] to-[#1f1f1f] text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8">Minhas Tarefas</h1>
        {tarefas.length === 0 ? (
          <p className="text-gray-400">Nenhuma tarefa encontrada.</p>
        ) : (
          <ul className="space-y-4">
            {tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="bg-[#2a2a2a] rounded-2xl p-6 flex justify-between items-center shadow-lg"
              >
                <div>
                  <h3 className="text-xl font-semibold">{tarefa.titulo}</h3>
                  {tarefa.descricao && <p className="text-gray-400">{tarefa.descricao}</p>}
                  {tarefa.status && <p className="text-green-400 mt-1">Status: {tarefa.status}</p>}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(tarefa)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(tarefa.id)}
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

      {/* Dialog para edição da tarefa */}
      {tarefaEditando && (
        <EditarTarefaDialog
          tarefa={tarefaEditando}
          isOpen={!!tarefaEditando}
          onClose={() => setTarefaEditando(null)}
          onUpdated={handleTarefaAtualizada}
        />
      )}
    </div>
  );
}

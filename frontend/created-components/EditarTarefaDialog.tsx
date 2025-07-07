"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GradientText from "./GradientText";
import toast from "react-hot-toast";

interface EditarTarefaDialogProps {
  tarefa: {
    id: number;
    titulo: string;
    descricao?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (updatedTarefa: { id: number; titulo: string; descricao?: string; status?: string }) => void;
}

export default function EditarTarefaDialog({
  tarefa,
  isOpen,
  onClose,
  onUpdated,
}: EditarTarefaDialogProps) {
  const [formData, setFormData] = useState({ titulo: "", descricao: ""});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        titulo: tarefa.titulo || "",
        descricao: tarefa.descricao || "",      
      });   
    }
  }, [isOpen, tarefa]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo) {
      toast.error("O título é obrigatório.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(`/api/tarefas/${tarefa.id}`, formData, { withCredentials: true });
      onUpdated(res.data);
      toast.success("Tarefa atualizada!");
      onClose();
    } catch (err) {
      toast.error("Erro ao atualizar tarefa.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="w-full max-w-md rounded-2xl bg-[#121212] p-8 border border-gray-800 shadow-xl text-white">
        <h1 className="text-3xl font-bold text-center mb-4">
          <GradientText>Editar Tarefa</GradientText>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="titulo">Título</Label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="mt-1 w-full bg-[#1e1e1e] border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <textarea
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              className="mt-1 w-full bg-[#1e1e1e] border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-green-600 resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-full hover:bg-green-500 hover:scale-105 transition-transform"
          >
            {loading ? "Atualizando..." : "Atualizar Tarefa"}
          </Button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full text-center text-red-500 hover:text-red-700"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

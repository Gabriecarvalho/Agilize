"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GradientText from "./GradientText";
import toast from "react-hot-toast";

interface EditarProjetoDialogProps {
  projeto: {
    id: number;
    nome: string;
    objetivo?: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (updatedProjeto: { id: number; nome: string; objetivo?: string }) => void;
}

export default function EditarProjetoDialog({
  projeto,
  isOpen,
  onClose,
  onUpdated,
}: EditarProjetoDialogProps) {
  const [formData, setFormData] = useState({ nome: "", objetivo: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        nome: projeto.nome || "",
        objetivo: projeto.objetivo || "",
      });
    }
  }, [isOpen, projeto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.objetivo) {
      toast.error("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(`/api/projetos/${projeto.id}`, formData, { withCredentials: true });
      onUpdated(res.data); // atualiza a lista no pai
      toast.success("Projeto atualizado!");
      onClose();
    } catch (err) {
      toast.error("Erro ao atualizar projeto.");
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
          <GradientText>Editar Projeto</GradientText>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="nome">Nome do Projeto</Label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="mt-1 w-full bg-[#1e1e1e] border border-gray-700 rounded-md p-3 text-white focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div>
            <Label htmlFor="objetivo">Objetivo</Label>
            <textarea
              id="objetivo"
              name="objetivo"
              value={formData.objetivo}
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
            {loading ? "Atualizando..." : "Atualizar Projeto"}
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

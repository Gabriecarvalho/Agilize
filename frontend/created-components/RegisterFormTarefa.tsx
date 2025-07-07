"use client";

import axios from "axios";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GradientText from "./GradientText";
import toast from "react-hot-toast";

interface RegisterFormTarefaProps {
  onSuccess?: () => void; 
}

const RegisterFormTarefa: React.FC<RegisterFormTarefaProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo || !formData.descricao) {
      toast.error("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/tarefas", formData, { withCredentials: true });
      toast.success("Tarefa cadastrada!");
      setFormData({ titulo: "", descricao: "" });
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("Erro ao cadastrar tarefa.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-[#121212] p-8 border border-gray-800 shadow-xl text-white">
      <h1 className="text-3xl font-bold text-center mb-4">
        <GradientText>Nova Tarefa</GradientText>
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
          {loading ? "Cadastrando..." : "Cadastrar Tarefa"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterFormTarefa;

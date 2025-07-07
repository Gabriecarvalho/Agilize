"use client";

import axios from "axios";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GradientText from "./GradientText";
import toast from "react-hot-toast";

const RegisterFormProjeto: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    objetivo: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      await axios.post("/api/projetos", formData, { withCredentials: true });

      toast.success("Projeto cadastrado!");
      setFormData({ nome: "", objetivo: "" });
    } catch (err) {
      toast.error("Erro ao cadastrar projeto.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-white">
      <h1 className="text-2xl font-bold text-center mb-4">
        <GradientText>Novo Projeto</GradientText>
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
          {loading ? "Cadastrando..." : "Cadastrar Projeto"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterFormProjeto;

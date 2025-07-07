"use client";

import axios from "axios";
import { User } from "@shared/User";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GradientText from "./GradientText";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    nome: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("/api/users", formData, { withCredentials: true });
      toast.success("Cadastro realizado com sucesso!");
      if (onSuccess) onSuccess(); // Fecha o dialog se prop fornecida
      setFormData({ id: 0, nome: "", email: "", password: "" }); // Limpa o formulário
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Ocorreu um erro desconhecido.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-white">
      <h1 className="text-2xl font-bold text-center mb-4">
        <GradientText>Adicionar Usuário</GradientText>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-700 bg-[#1e1e1e] text-white p-3 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
        </div>

        <div>
          <Label htmlFor="email">E-mail</Label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-700 bg-[#1e1e1e] text-white p-3 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
        </div>

        <div className="relative">
          <Label htmlFor="password">Senha</Label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-gray-700 bg-[#1e1e1e] text-white p-3 pr-10 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-500 hover:scale-[1.02] transition-transform text-white font-semibold py-3 rounded-lg"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;

"use client";

import axios from "axios";
import { User } from "@shared/User";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GradientText from "./GradientText";
import toast from "react-hot-toast";

interface UpdateUserFormProps {
  onSuccess?: () => void;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    nome: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Busca dados do usuário atual
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/me", { withCredentials: true });
        setFormData({
          id: res.data.id,
          nome: res.data.nome || "",
          email: res.data.email || "",
          password: "", // Não traz senha por segurança
        });
      } catch (error) {
        toast.error("Erro ao carregar dados do usuário.");
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      await axios.patch(`/api/users`, formData, {
        withCredentials: true,
      });
      toast.success("Dados atualizados com sucesso!");
      if (onSuccess) onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao atualizar usuário.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto text-white">
      <h1 className="text-2xl font-bold text-center mb-4">
        <GradientText>Atualizar Perfil</GradientText>
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

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-500 hover:scale-[1.02] transition-transform text-white font-semibold py-3 rounded-lg"
        >
          {loading ? "Salvando..." : "Atualizar"}
        </Button>
      </form>
    </div>
  );
};

export default UpdateUserForm;

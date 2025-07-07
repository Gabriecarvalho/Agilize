"use client";

import axios from "axios";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import GradientText from "./GradientText";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";


interface RegisterFormTarefaProps {
    onSuccess?: () => void;
}

const AlterarSenhaForm: React.FC<RegisterFormTarefaProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        password: "",
        newpassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.password || !formData.newpassword) {
            toast.error("Preencha todos os campos.");
            return;
        }

        setLoading(true);
        try {
            await axios.patch("/api/users/password", formData, { withCredentials: true });
            toast.success("Senha alterada com sucesso!");
            setFormData({ password: "", newpassword: "" });
            if (onSuccess) onSuccess();
        } catch (err) {
            toast.error("Erro ao alterar senha.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto text-white">
            <h1 className="text-2xl font-bold text-center mb-4">
                <GradientText>Alterar senha</GradientText>
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                    <Label htmlFor="password" className="text-white">
                        Senha Atual
                    </Label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border border-gray-700 bg-[#1e1e1e] text-white p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-1 right-3 flex items-center text-gray-500 h-24 pr-1"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <div className="relative">
                    <Label htmlFor="newpassword" className="text-white">
                        Nova Senha
                    </Label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="newpassword"
                        name="newpassword"
                        value={formData.newpassword}
                        onChange={handleChange}
                        required
                        className="mt-1 w-full rounded-md border border-gray-700 bg-[#1e1e1e] text-white p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-1 right-3 flex items-center text-gray-500 h-24 pr-1"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white font-semibold py-3 rounded-full hover:bg-green-500 hover:scale-105 transition-transform"
                >
                    {loading ? "Alterando senha..." : "Alterar Senha"}
                </Button>
            </form>
        </div>
    );
};

export default AlterarSenhaForm;

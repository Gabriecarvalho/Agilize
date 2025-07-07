"use client";

import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import RegisterFormProjeto from "../created-components/RegisterFormProjeto";

export default function NovoProjetoCard() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="bg-[#2a2a2a] rounded-2xl p-6 shadow-lg hover:shadow-xl transition hover:scale-[1.02] cursor-pointer"
        >
          <PlusCircle className="h-8 w-8 text-purple-400 mb-4" />
          <h3 className="text-xl font-semibold">Novo Projeto</h3>
          <p className="text-gray-400 mt-1">
            Crie um novo projeto para começar agora.
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-[#1a1a1a] text-white p-6 rounded-2xl">
        <DialogTitle className="text-2xl font-bold mb-4">
        </DialogTitle>
        <RegisterFormProjeto />
      </DialogContent>
    </Dialog>
  );
}

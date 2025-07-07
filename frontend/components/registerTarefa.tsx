"use client";

import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import RegisterFormTarefa from "../created-components/RegisterFormTarefa"; // Assumindo que você tem um formulário parecido para tarefas

export default function NovaTarefaCard() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className="bg-[#2a2a2a] rounded-2xl p-6 shadow-lg hover:shadow-xl transition hover:scale-[1.02] cursor-pointer"
        >
          <PlusCircle className="h-8 w-8 text-green-400 mb-4" />
          <h3 className="text-xl font-semibold">Nova Tarefa</h3>
          <p className="text-gray-400 mt-1">
            Crie uma nova tarefa para começar agora.
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-[#1a1a1a] text-white p-6 rounded-2xl">
        <DialogTitle className="text-2xl font-bold mb-4">
          
        </DialogTitle>
        <RegisterFormTarefa />
      </DialogContent>
    </Dialog>
  );
}

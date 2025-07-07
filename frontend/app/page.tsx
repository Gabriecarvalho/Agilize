import GradientText from "@/created-components/GradientText";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#0e0e0e] to-[#1c1c1c] text-white flex items-center justify-center font-sans">
      <div className="absolute top-6 right-8 flex gap-4">
        <Link
          href="/login"
          className="py-2 px-5 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-black hover:scale-105 transition-transform duration-200"
        >
          Entre
        </Link>
      </div>

      <div className="flex flex-col items-center gap-8 px-6 text-center max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-white">
          Organize suas{" "}
          <GradientText size="text-7xl" weight="font-extrabold">
            Tarefas e Projetos
          </GradientText>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
          Uma plataforma simples e intuitiva para gerenciar suas tarefas diárias e projetos de forma eficiente.
        </p>

        <Link
          href="/login"
          className="mt-4 py-3 px-6 rounded-full bg-green-600 text-white text-lg font-semibold hover:bg-green-500 hover:scale-105 transition-transform duration-200"
        >
          Comece agora
        </Link>
      </div>
    </div>
  );
}

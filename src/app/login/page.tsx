
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } else {
      alert("Credenciais inválidas");
    }
  }

  return (
    <div className="flex h-screen w-full">
      {/* Lado esquerdo – Gradiente */}
      <div className="relative hidden w-1/2 bg-gradient-to-b from-orange-400 to-purple-600 lg:flex items-center justify-center">
        <div className="absolute left-10 top-10">
          {/* Aqui você pode colocar seu logo SVG */}
          <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12">
            <path d="M12 2L2 12L12 22L22 12L12 2Z" />
          </svg>
        </div>
        <h1 className="text-6xl font-light text-white">Bem-vindo de Volta!</h1>
      </div>

      {/* Lado direito – Formulário */}
      <div className="flex w-full items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center">Login Nutricionista</h2>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="seu@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Senha</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Entrar
          </Button>

          <p className="text-center text-sm">
            Ainda não tem conta?{" "}
            <a href="/register" className="text-indigo-600 hover:underline">
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

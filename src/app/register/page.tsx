// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CadastroPage() {
  const router = useRouter();

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // basic front-end validation
    if (!name || !email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: email.toLowerCase(),
          password,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(json.error || "Falha ao cadastrar.");
        setLoading(false);
        return;
      }

      // sucesso: vai para o login
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen w-full">
      {/* Lado esquerdo */}
      <div className="relative hidden w-1/2 bg-gradient-to-b from-orange-400 to-purple-600 lg:flex items-center justify-center">
        <div className="absolute left-10 top-10">
          <svg viewBox="0 0 24 24" fill="white" className="h-12 w-12">
           <path d="M12 2L2 12L12 22L22 12L12 2Z" />
          </svg>
        </div>
        <div className="flex h-full items-center justify-center">
          <h1 className="text-center font-serif text-6xl font-light leading-tight text-white">
            Crie sua
            <br />
            Conta!
          </h1>
        </div>
      </div>

      {/* Lado direito */}
      <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 px-4"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Cadastre-se no <span className="text-orange-400">VitaBox</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Preencha os dados abaixo para criar sua conta
            </p>
          </div>

          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="nome" className="text-sm text-gray-500">
                Nome completo
              </label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-500">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="exemplo@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-gray-500">
                Senha
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm text-gray-500"
              >
                Confirmar senha
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Criando..." : "Criar conta"}
            </Button>
          </div>

          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/login" className="text-orange-400 hover:underline">
              Faça login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

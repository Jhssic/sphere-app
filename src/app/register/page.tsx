"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CadastroPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      alert("As senhas não conferem")
      return
    }
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
    if (res.ok) {
      router.push("/login")
    } else {
      const { error } = await res.json()
      alert(error ?? "Erro ao cadastrar")
    }
  }

  return (
    <div className="flex h-screen w-full">
      {/* Lado esquerdo - Gradiente com mensagem de boas-vindas */}
      <div className="relative hidden w-1/2 bg-gradient-to-b from-orange-300 via-orange-400 to-purple-600 lg:block">
        <div className="absolute left-10 top-10">
          <div className="h-12 w-12">
            <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
        </div>
        <div className="flex h-full items-center justify-center">
          <h1 className="text-center font-serif text-6xl font-light leading-tight text-white">
            Crie sua
            <br />
            Conta!
          </h1>
        </div>
      </div>

      {/* Lado direito - Formulário de cadastro */}
      <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Cadastre-se no <span className="text-orange-400">VitaBox</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">Preencha os dados abaixo para criar sua conta</p>
          </div>

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
                className="rounded-md border border-gray-300 px-4 py-2"
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
                className="rounded-md border border-gray-300 px-4 py-2"
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
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm text-gray-500">
                Confirmar senha
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full rounded-md bg-gray-400 py-6 text-white hover:bg-gray-500">
                Criar conta
              </Button>
            </div>

            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <Link href="/" className="text-orange-400 hover:underline">
                Faça login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
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
            Bem-Vindo
            <br />
            de Volta!
          </h1>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
        <div className="w-full max-w-md space-y-8 px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              Faça Login no <span className="text-orange-400">VitaBox</span>
            </h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-gray-500">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="xxxxxxx@gmail.com"
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
                className="rounded-md border border-gray-300 px-4 py-2"
              />
            </div>

            <Button className="w-full rounded-md bg-gray-400 py-6 text-white hover:bg-gray-500">Login</Button>

            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link href="/cadastro" className="text-orange-400 hover:underline">
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

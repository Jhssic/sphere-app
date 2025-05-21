// src/app/pacientes/novo/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NovoPacientePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");         // novo
  const [phone, setPhone] = useState("");         // novo
  const [birthDate, setBirthDate] = useState(""); // novo, formato YYYY-MM-DD
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Informe o nome do paciente.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token")!;
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim() || undefined,           // só envia se não vazio
          phone: phone.trim() || undefined,           // idem
          birthDate: birthDate ? birthDate : undefined, // formata no back
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Falha ao criar paciente.");
      } else {
        router.push("/pacientes");
      }
    } catch {
      setError("Erro de rede. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-semibold text-center">Novo Paciente</h2>
        {error && <p className="text-sm text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Nome</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">Telefone</label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Birth Date */}
          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium">
              Data de Nascimento
            </label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : "Criar Paciente"}
          </Button>
        </form>

        <p className="text-center text-sm">
          <Link href="/pacientes" className="text-blue-600 hover:underline">
            Voltar à lista de pacientes
          </Link>
        </p>
      </div>
    </div>
  );
}

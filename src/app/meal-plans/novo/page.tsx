/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/meal-plans/novo/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function NewMealPlanPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [patientId, setPatientId] = useState<number | "">("");
  const [patients, setPatients] = useState<
    { id: number; name: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/patients", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) setPatients(await res.json());
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !content.trim() || patientId === "") {
      setError("Preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/meal-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, patientId }),
      });
      if (!res.ok) {
        const errJson = await res.json().catch(() => null);
        throw new Error(errJson?.error || "Falha ao criar plano.");
      }
      router.push("/meal-plans");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Novo Plano Alimentar</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        <label className="block text-sm mb-1">Título</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Conteúdo</label>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm mb-1">Paciente</label>
        <select
          className="w-full border rounded p-2"
          value={patientId}
          onChange={(e) => setPatientId(Number(e.target.value))}
          required
        >
          <option value="" disabled>
            Selecione um paciente
          </option>
          {patients.map((pt) => (
            <option key={pt.id} value={pt.id}>
              {pt.name}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Salvando..." : "Criar Plano"}
      </Button>
    </form>
  );
}

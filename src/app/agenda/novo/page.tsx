/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/agenda/novo/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Patient = { id: number; name: string };

export default function NewAppointmentPage() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [patientId, setPatientId] = useState<number | "">("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Carrega pacientes para o dropdown
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/patients", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Não foi possível carregar pacientes.");
        setPatients(await res.json());
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!date || patientId === "") {
      setError("Data e paciente são obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: new Date(date).toISOString(),
          notes,
          patientId,
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Falha ao criar consulta.");
      }
      router.push("/agenda");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold text-center">Nova Consulta</h1>

        {error && <p className="text-center text-red-500">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-1">Data e Hora</label>
          <Input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Paciente</label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(Number(e.target.value))}
            className="block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Selecione um paciente</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notas (opcional)</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Agendando..." : "Agendar Consulta"}
        </Button>
      </form>
    </div>
  );
}

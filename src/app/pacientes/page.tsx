/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Patient = { id: number; name: string; createdAt: string };

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPacientes() {
      try {
        const res = await fetch("/api/patients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          // tenta ler JSON de erro, senão texto
          let errMsg = "Erro ao buscar pacientes.";
          try {
            const errJson = await res.json();
            errMsg = errJson.error || errMsg;
          } catch {}
          throw new Error(errMsg);
        }

        const data: Patient[] = await res.json();
        setPacientes(data);
      } catch (err: any) {
        console.error("❌ fetchPacientes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPacientes();
  }, []);

  if (loading) return <p>Carregando pacientes...</p>;
  if (error) return <p className="text-red-600">Erro: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Pacientes</h1>
      <Button asChild>
        <Link href="/pacientes/novo">Novo Paciente</Link>
      </Button>

      <table className="table-auto w-full mt-4">
        <thead>
          <tr>
            <th className="px-2 py-1">Nome</th>
            <th className="px-2 py-1">Criado em</th>
            <th className="px-2 py-1">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id}>
              <td className="border px-2 py-1">{p.name}</td>
              <td className="border px-2 py-1">
                {new Date(p.createdAt).toLocaleDateString()}
              </td>
              <td className="border px-2 py-1">
                <Link href={`/pacientes/novo?id=${p.id}`}>
                  <Button size="sm">Editar</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

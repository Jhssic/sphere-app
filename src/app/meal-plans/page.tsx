/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/meal-plans/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MealPlansPage() {
  const [plans, setPlans] = useState<
    { id: number; title: string; patient: { name: string }; createdAt: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/meal-plans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erro ao buscar planos.");
        setPlans(await res.json());
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);

  if (error) return <p className="text-red-500 p-6">Erro: {error}</p>;
  if (!plans.length) return <p className="p-6">Nenhum plano encontrado.</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {plans.map((p) => (
        <div
          key={p.id}
          className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <h2 className="font-semibold text-lg mb-1">{p.title}</h2>
          <p className="text-sm text-gray-500 mb-2">Paciente: {p.patient.name}</p>
          <p className="text-xs text-gray-400 mb-4">
            Criado em {new Date(p.createdAt).toLocaleDateString()}
          </p>
          <Link
            href={`/meal-plans/${p.id}`}
            className="text-blue-600 hover:underline"
          >
            Editar
          </Link>
        </div>
      ))}
    </div>
  );
}
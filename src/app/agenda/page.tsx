/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/agenda/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AgendaPage() {
  const [items, setItems] = useState<
    { id: number; date: string; notes: string }[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/appointments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erro ao buscar consultas.");
        setItems(await res.json());
      } catch (err: any) {
        setError(err.message);
      }
    })();
  }, []);

  if (error) return <p className="text-red-500 p-6">Erro: {error}</p>;
  if (!items.length) return <p className="p-6">Nenhuma consulta agendada.</p>;

  return (
    <ul className="space-y-3 p-6">
      {items.map((a) => (
        <li key={a.id} className="flex items-start">
          <span className="mt-1 mr-2 h-2 w-2 rounded-full bg-primary" />
          <div className="flex-1">
            <p className="font-medium">
              Consulta em {new Date(a.date).toLocaleString()}
            </p>
            {a.notes && (
              <p className="text-sm text-gray-600">{a.notes}</p>
            )}
          </div>
          <Link
            href={`/agenda/${a.id}`}
            className="ml-4 text-blue-600 hover:underline"
          >
            Editar
          </Link>
        </li>
      ))}
    </ul>
  );
}

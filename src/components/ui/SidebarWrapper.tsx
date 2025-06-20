// src/components/SidebarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SidebarWrapper() {
  const pathname = usePathname();

  // Rotas em que NÃO queremos mostrar a sidebar
  const hideSidebarOn = ["/login", "/register"];

  // Se a rota atual for "/login" ou "/register", não renderiza nada
  if (hideSidebarOn.includes(pathname)) {
    return null;
  }

  // Caso contrário, renderiza a sidebar normalmente
  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">VitaBox</h2>
      <nav className="flex-1 space-y-2">
        <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">
          Dashboard
        </Link>
        <Link href="/pacientes" className="block px-3 py-2 rounded hover:bg-gray-100">
          Pacientes
        </Link>
        <Link href="/pacientes/novo" className="block px-3 py-2 rounded hover:bg-gray-100">
          Novo Paciente
        </Link>
        <Link href="/meal-plans" className="block px-3 py-2 rounded hover:bg-gray-100">
          Planos Alimentares
        </Link>
        <Link href="/meal-plans/novo" className="block px-3 py-2 rounded hover:bg-gray-100">
          Novo Plano
        </Link>
        <Link href="/agenda" className="block px-3 py-2 rounded hover:bg-gray-100">
          Agenda
        </Link>
        <Link href="/agenda/novo" className="block px-3 py-2 rounded hover:bg-gray-100">
          Nova Consulta
        </Link>
      </nav>
      {/* Logout */}
      <Link
        href="/login"
        className="mt-auto block px-3 py-2 text-red-600 hover:bg-gray-100 rounded"
      >
        Sair
      </Link>
    </aside>
  );
}

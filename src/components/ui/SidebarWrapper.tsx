"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Home,
  Users,
  UserPlus,
  Utensils,
  Plus,
  Calendar,
  CalendarPlus,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function SidebarWrapper() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Rotas em que NÃO queremos mostrar a sidebar
  const hideSidebarOn = ["/", "/login", "/register", "/cadastro"]

  // Se a rota atual for uma das rotas de login/register, não renderiza nada
  if (hideSidebarOn.includes(pathname)) {
    return null
  }

  const menuItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/pacientes",
      label: "Pacientes",
      icon: Users,
    },
    {
      href: "/pacientes/novo",
      label: "Novo Paciente",
      icon: UserPlus,
    },
    {
      href: "/meal-plans",
      label: "Planos Alimentares",
      icon: Utensils,
    },
    {
      href: "/meal-plans/novo",
      label: "Novo Plano",
      icon: Plus,
    },
    {
      href: "/agenda",
      label: "Agenda",
      icon: Calendar,
    },
    {
      href: "/agenda/novo",
      label: "Nova Consulta",
      icon: CalendarPlus,
    },
  ]

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out shadow-sm`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-b from-orange-400 to-purple-600">
                <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">
                VitaBox
              </h2>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8 p-0">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-gradient-to-r from-orange-50 to-purple-50 text-orange-600 border border-orange-200"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }
                ${isCollapsed ? "justify-center" : ""}
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Profile Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-400 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">DS</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Dr. Ana Silva</p>
              <p className="text-xs text-gray-500 truncate">Nutricionista</p>
            </div>
          </div>
        </div>
      )}

      {/* Logout */}
      <div className="p-4 border-t border-gray-200">
        <Link
          href="/login"
          className={`
            flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors
            ${isCollapsed ? "justify-center" : ""}
          `}
          title={isCollapsed ? "Sair" : undefined}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span>Sair</span>}
        </Link>
      </div>
    </aside>
  )
}

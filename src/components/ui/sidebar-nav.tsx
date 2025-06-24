"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, CalendarDays, ClipboardList, Home, Settings, Users, Utensils } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Pacientes",
    href: "/pacientes",
    icon: Users,
  },
  {
    title: "Planos Alimentares",
    href: "/meal-plans",
    icon: Utensils,
  },
  {
    title: "Consultas",
    href: "/consultas",
    icon: CalendarDays,
  },
  {
    title: "Relatórios",
    href: "/relatorios",
    icon: BarChart,
  },
  {
    title: "Documentos",
    href: "/documentos",
    icon: ClipboardList,
  },
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
]

export function SidebarNav() {
  const pathname = usePathname()

  const hideSidebarOn = ["/", "/login", "/register", "/cadastro"]
  if (hideSidebarOn.includes(pathname)) {
    return null
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-b from-orange-400 to-purple-600">
              <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17" />
                <path d="M2 12L12 17L22 12" />
              </svg>
            </div>
            <span className="text-lg font-semibold">VitaBox</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-b from-orange-400 to-purple-600" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">Dr. Ana Silva</span>
            <span className="text-xs text-sidebar-foreground/70">Nutricionista</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

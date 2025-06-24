import type React from "react"
import type { Metadata } from "next"
import { headers } from "next/headers"

import "./globals.css"
import { SidebarNav } from "@/components/ui/sidebar-nav"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export const metadata: Metadata = {
  title: "VitaBox - Sistema de Nutrição",
  description: "Sistema completo para nutricionistas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = headers().get("next-url") || "/"
  const hideSidebar = ["/", "/login", "/register", "/cadastro"].includes(pathname)

  return (
    <html lang="pt-BR">
      <body className="font-sans">
        {hideSidebar ? (
          <div className="min-h-screen bg-gray-50">{children}</div>
        ) : (
          <SidebarProvider>
            <div className="flex min-h-screen bg-gray-50">
              <SidebarNav />
              <SidebarInset className="flex-1 overflow-auto">{children}</SidebarInset>
            </div>
          </SidebarProvider>
        )}
      </body>
    </html>
  )
}

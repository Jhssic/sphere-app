import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import SidebarWrapper from "@/components/ui/SidebarWrapper"

export const metadata: Metadata = {
  title: "VitaBox - Sistema de Nutrição",
  description: "Sistema completo para nutricionistas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="font-sans">
        <div className="flex min-h-screen bg-gray-50">
          <SidebarWrapper />
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}

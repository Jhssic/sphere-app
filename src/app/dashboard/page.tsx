// src/app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  Users,
  Utensils,
  ClipboardList,
  BarChart,
  Activity,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600">
            Bem-vindo(a) de volta! Aqui está um resumo das suas atividades.
          </p>
        </div>
        <Button variant="default" asChild>
          <Link href="/agenda/novo">
            <CalendarDays className="mr-2 h-5 w-5" />
            Agendar Consulta
          </Link>
        </Button>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[{
          title: "Total de Pacientes",
          icon: <Users className="h-5 w-5 text-gray-500"/>,
          value: "128",
          subtitle: "+14% em relação ao mês passado"
        },{
          title: "Consultas Agendadas",
          icon: <CalendarDays className="h-5 w-5 text-gray-500"/>,
          value: "24",
          subtitle: "12 para esta semana"
        },{
          title: "Planos Ativos",
          icon: <Utensils className="h-5 w-5 text-gray-500"/>,
          value: "42",
          subtitle: "8 novos este mês"
        },{
          title: "Taxa de Adesão",
          icon: <Activity className="h-5 w-5 text-gray-500"/>,
          value: "78%",
          subtitle: "+5% em relação ao mês passado"
        }].map((stat, idx) => (
          <Card key={idx} className="h-full">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Seções Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pacientes */}
        <Card>
          <CardHeader>
            <CardTitle>Gerenciar Pacientes</CardTitle>
            <CardDescription>Acesse e gerencie informações dos seus pacientes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link href="/pacientes">
                <Users className="mr-2 h-4 w-4" />
                Ver Todos os Pacientes
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/pacientes/novo">
                <Users className="mr-2 h-4 w-4" />
                Adicionar Novo Paciente
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Planos Alimentares */}
        <Card>
          <CardHeader>
            <CardTitle>Planos Alimentares</CardTitle>
            <CardDescription>Crie e gerencie planos alimentares</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link href="/meal-plans">
                <Utensils className="mr-2 h-4 w-4" />
                Ver Planos
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/meal-plans/novo">
                <ClipboardList className="mr-2 h-4 w-4" />
                Criar Novo Plano
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Relatórios */}
        <Card>
          <CardHeader>
            <CardTitle>Análises e Relatórios</CardTitle>
            <CardDescription>Visualize estatísticas e gere relatórios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link href="/relatorios">
                <BarChart className="mr-2 h-4 w-4" />
                Ver Relatórios
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/relatorios/novo">
                <Activity className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Atividades Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Atividades Recentes</CardTitle>
          <CardDescription>Suas últimas ações no sistema</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { date: "Hoje, 14:30", action: "Consulta realizada com Maria Silva" },
            { date: "Hoje, 10:15", action: "Plano alimentar atualizado para João Santos" },
            { date: "Ontem, 16:45", action: "Novo paciente cadastrado: Ana Oliveira" },
            { date: "Ontem, 09:20", action: "Relatório mensal gerado" },
          ].map((item, i) => (
            <div key={i} className="flex items-start space-x-2">
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
              <div>
                <p className="text-sm font-medium">{item.action}</p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

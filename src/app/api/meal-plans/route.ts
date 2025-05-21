// src/app/api/meal-plans/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/, "") || "";
  const user = verifyToken(auth);
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Buscando apenas os planos cujos pacientes pertencem ao nutricionista
  const plans = await prisma.mealPlan.findMany({
    where: {
      patient: {
        nutritionistId: user.sub,
      },
    },
    include: { patient: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(plans);
}

export async function POST(req: Request) {
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/, "") || "";
  const user = verifyToken(auth);
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { title, content, patientId } = await req.json();
  if (!title || !content || typeof patientId !== "number") {
    return NextResponse.json(
      { error: "Título, conteúdo e paciente são obrigatórios." },
      { status: 400 }
    );
  }

  // Verifica se o paciente pertence ao nutricionista
  const patient = await prisma.patient.findUnique({ where: { id: patientId } });
  if (!patient || patient.nutritionistId !== user.sub) {
    return NextResponse.json(
      { error: "Paciente não encontrado." },
      { status: 404 }
    );
  }

  // Cria o plano vinculado ao paciente
  const plan = await prisma.mealPlan.create({
    data: {
      title,
      content,
      patientId,
    },
  });

  return NextResponse.json(plan, { status: 201 });
}

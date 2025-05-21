// src/app/api/patients/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  // Autentica via JWT
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/, "");
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    // Busca só os pacientes do nutricionista logado
    const pacientes = await prisma.patient.findMany({
      where: { nutritionistId: user.sub },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pacientes);
  } catch (err) {
    console.error("[API GET /api/patients] erro:", err);
    return NextResponse.json(
      { error: "Erro ao buscar pacientes." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/, "");
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { name } = await req.json();
  if (!name || typeof name !== "string") {
    return NextResponse.json(
      { error: "Nome de paciente inválido" },
      { status: 400 }
    );
  }

  try {
    const paciente = await prisma.patient.create({
      data: {
        name,
        nutritionistId: user.sub,
      },
    });
    return NextResponse.json(paciente, { status: 201 });
  } catch (err) {
    console.error("[API POST /api/patients] erro:", err);
    return NextResponse.json(
      { error: "Erro ao criar paciente." },
      { status: 500 }
    );
  }
}

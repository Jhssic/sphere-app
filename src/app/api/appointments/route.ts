// src/app/api/appointments/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/, "") || "";
  const user = verifyToken(auth);
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const items = await prisma.appointment.findMany({
    where: {
      patient: { nutritionistId: user.sub }
    },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/, "") || "";
  const user = verifyToken(auth);
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const { date, notes, patientId } = await req.json();
  if (!date || typeof patientId !== "number") {
    return NextResponse.json(
      { error: "Date e patientId obrigatórios." },
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

  const appt = await prisma.appointment.create({
    data: {
      date: new Date(date),
      notes: notes || "",
      patientId,
    },
  });
  return NextResponse.json(appt, { status: 201 });
}
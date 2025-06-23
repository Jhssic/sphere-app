// src/app/api/appointments/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function GET(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/, "") || "";
  const user = verifyToken(auth);
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const id = Number(params.id);
  const appt = await prisma.appointment.findUnique({
    where: { id },
    include: { patient: true },
  });
  if (!appt || appt.patient.nutritionistId !== user.sub) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }
  return NextResponse.json(appt);
}

export async function PUT(
  req: Request,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { params }: any
) {
  const auth = req.headers.get("authorization")?.replace(/^Bearer\s+/, "") || "";
  const user = verifyToken(auth);
  if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 });

  const id = Number(params.id);
  const { date, notes } = await req.json();

  // Verifica permissão
  const appt = await prisma.appointment.findUnique({
    where: { id },
    include: { patient: true },
  });
  if (!appt || appt.patient.nutritionistId !== user.sub) {
    return NextResponse.json({ error: "Não encontrado" }, { status: 404 });
  }

  const updated = await prisma.appointment.update({
    where: { id },
    data: { date: new Date(date), notes: notes || "" },
  });
  return NextResponse.json(updated);
}
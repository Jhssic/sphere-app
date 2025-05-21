// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Preencha todos os campos." },
      { status: 400 }
    );
  }

  const exists = await prisma.nutritionist.findUnique({
    where: { email },
  });
  if (exists) {
    return NextResponse.json(
      { error: "Este email já está em uso." },
      { status: 400 }
    );
  }

  const hash = await bcrypt.hash(password, 10);
  await prisma.nutritionist.create({
    data: { name, email, password: hash },
  });

  // **Importante:** retornar JSON aqui!
  return NextResponse.json({ ok: true }, { status: 201 });
}

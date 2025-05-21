// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("🔥 [LOGIN] body:", body);

  const email = (body.email as string | undefined)?.toLowerCase();
  const password = body.password as string | undefined;
  if (!email || !password) {
    console.log("❌ [LOGIN] falta email ou senha");
    return NextResponse.json({ error: "Preencha email e senha." }, { status: 400 });
  }

  const user = await prisma.nutritionist.findUnique({ where: { email } });
  console.log("🔍 [LOGIN] user:", user);

  if (!user) {
    console.log("❌ [LOGIN] usuário não encontrado");
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, user.password);
  console.log("🔑 [LOGIN] bcrypt.compare:", { valid, plain: password, hash: user.password });

  if (!valid) {
    console.log("❌ [LOGIN] senha não confere");
    return NextResponse.json({ error: "Credenciais inválidas." }, { status: 401 });
  }

  const token = signToken({ sub: user.id });
  console.log("✅ [LOGIN] sucesso, token gerado");
  return NextResponse.json({ token });
}

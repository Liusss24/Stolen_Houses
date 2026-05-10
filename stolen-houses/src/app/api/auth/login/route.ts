import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  AUTH_COOKIE_NAME,
  AUTH_ROLES,
  type AuthRole,
} from "@/features/auth/model/auth.constants";

export const runtime = "nodejs";

const LOGIN_CREDENTIALS: Record<AuthRole, { email: string; password: string }> = {
  [AUTH_ROLES.admin]: {
    email: "admin@admin.com",
    password: "1234",
  },
  [AUTH_ROLES.client]: {
    email: "cliente@cliente.com",
    password: "1234",
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function parseRole(value: unknown): AuthRole | null {
  if (value === AUTH_ROLES.admin || value === AUTH_ROLES.client) {
    return value;
  }

  return null;
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Datos inválidos." },
      { status: 400 },
    );
  }

  if (!isRecord(body)) {
    return NextResponse.json(
      { message: "Datos inválidos." },
      { status: 400 },
    );
  }

  const role = parseRole(body.role);
  const email = asString(body.email);
  const password = asString(body.password);

  if (!role || !email || !password) {
    return NextResponse.json(
      { message: "Datos inválidos." },
      { status: 400 },
    );
  }

  const expected = LOGIN_CREDENTIALS[role];
  const normalizedEmail = email.trim().toLowerCase();

  const isValid =
    normalizedEmail === expected.email.toLowerCase() &&
    password === expected.password;

  if (!isValid) {
    return NextResponse.json(
      { message: "Credenciales inválidas." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ role });

  response.cookies.set(AUTH_COOKIE_NAME, role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

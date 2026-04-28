import { NextResponse } from "next/server";

import { createResumeToken, RESUME_AUTH_COOKIE } from "@/lib/resume-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const password = process.env.RESUME_PASSWORD;

  if (!password) {
    return NextResponse.json(
      { error: "Resume protection is not configured." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as {
    password?: unknown;
  } | null;

  if (body?.password !== password) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: RESUME_AUTH_COOKIE,
    value: await createResumeToken(password),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}

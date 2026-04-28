import type { NextRequest } from "next/server";

export const RESUME_AUTH_COOKIE = "resume_access";

const encoder = new TextEncoder();

export async function createResumeToken(password: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(`resume:${password}`),
  );

  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function hasResumeAccess(request: NextRequest, password: string) {
  const cookie = request.cookies.get(RESUME_AUTH_COOKIE)?.value;

  if (!cookie) {
    return false;
  }

  return cookie === (await createResumeToken(password));
}

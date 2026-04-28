import { NextResponse, type NextRequest } from "next/server";

import { hasResumeAccess } from "@/lib/resume-auth";

// Next.js 16 uses proxy.ts for the same route-protection role previously
// handled by middleware.ts. This protects /resume with RESUME_PASSWORD.
export async function proxy(request: NextRequest) {
  const publicResumePaths = [
    "/resume/login",
    "/api/resume/login",
    "/api/resume/logout",
  ];

  if (publicResumePaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const isLocalDevelopment =
    process.env.NODE_ENV === "development" &&
    ["localhost", "127.0.0.1", "::1"].includes(request.nextUrl.hostname);
  const password = process.env.RESUME_PASSWORD;

  if (isLocalDevelopment && !password) {
    return NextResponse.next();
  }

  if (!password) {
    return new Response(
      "Resume protection is not configured. Set RESUME_PASSWORD in Vercel or .env.local.",
      { status: 503 },
    );
  }

  if (await hasResumeAccess(request, password)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/resume/login", request.url));
}

export const config = {
  matcher: ["/resume/:path*", "/api/resume", "/api/resume/:path*"],
};

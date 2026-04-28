import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";

import { FadeIn } from "@/components/fade-in";
import { ResumeLogoutButton } from "@/components/resume-logout-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Resume",
  description: "Password-protected resume page.",
};

const resumeLastUpdated = "April 26, 2026";

export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Resume
        </p>
        <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Private Resume
          </h1>
          <Badge variant="outline" className="shrink-0">
            <span className="mr-1">Last updated:</span>
            <time dateTime="2026-04-26">{resumeLastUpdated}</time>
          </Badge>
        </div>
      </FadeIn>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <a
          className="flex items-center gap-3 border border-border bg-card p-4 text-sm transition-colors hover:bg-secondary"
          href={`mailto:${SITE.email}`}
        >
          <Mail className="size-4 text-accent" aria-hidden="true" />
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Email
            </span>
            <span className="font-medium">{SITE.email}</span>
          </span>
        </a>
        <a
          className="flex items-center gap-3 border border-border bg-card p-4 text-sm transition-colors hover:bg-secondary"
          href={`tel:${SITE.phone.replaceAll("-", "")}`}
        >
          <Phone className="size-4 text-accent" aria-hidden="true" />
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Phone
            </span>
            <span className="font-medium">{SITE.phone}</span>
          </span>
        </a>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Resume PDF</CardTitle>
          <CardDescription>
            The latest resume file from the protected resume directory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <iframe
            src="/api/resume"
            title="Daniel Litvak resume PDF"
            className="h-[78vh] min-h-[640px] w-full border border-border bg-background"
          />
          <a
            href="/api/resume"
            className="mt-4 inline-flex text-sm font-medium text-foreground underline underline-offset-4"
          >
            Open resume in a new tab
          </a>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end">
        <ResumeLogoutButton />
      </div>
    </div>
  );
}

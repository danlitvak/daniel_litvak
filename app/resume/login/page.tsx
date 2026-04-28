import type { Metadata } from "next";

import { FadeIn } from "@/components/fade-in";
import { ResumeLoginForm } from "@/components/resume-login-form";

export const metadata: Metadata = {
  title: "Resume Login",
  description: "Enter the resume password.",
};

export default function ResumeLoginPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-4 py-14 sm:px-6">
      <FadeIn>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Resume
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight">
          Enter password
        </h1>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          This resume is private. Enter the access password to continue.
        </p>
        <ResumeLoginForm />
      </FadeIn>
    </div>
  );
}

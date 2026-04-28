"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ResumeLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const response = await fetch("/api/resume/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      setError("That password did not work.");
      return;
    }

    window.location.href = "/resume";
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          autoComplete="current-password"
          className="h-11 w-full border border-border bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <Button className="w-full" disabled={isSubmitting} type="submit">
        <LockKeyhole aria-hidden="true" />
        {isSubmitting ? "Checking..." : "Unlock resume"}
      </Button>
    </form>
  );
}

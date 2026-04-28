"use client";

import { Mail, Send, X } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ContactButtonProps = {
  ariaLabel?: string;
  className?: string;
  iconOnly?: boolean;
  label?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost";
};

type SubmissionState = "idle" | "sending" | "success" | "error";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

export function ContactButton({
  ariaLabel,
  className,
  iconOnly = false,
  label = "Contact me",
  size = "default",
  variant = "default",
}: ContactButtonProps) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [state, setState] = useState<SubmissionState>("idle");
  const [error, setError] = useState<string | null>(null);

  function closePanel() {
    setOpen(false);
    setState("idle");
    setError(null);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePanel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(data?.error || "Message could not be sent.");
      }

      setState("success");
      setForm(initialForm);
    } catch (sendError) {
      setState("error");
      setError(
        sendError instanceof Error
          ? sendError.message
          : "Message could not be sent.",
      );
    }
  }

  return (
    <>
      <Button
        aria-label={ariaLabel ?? label}
        className={className}
        size={size}
        variant={variant}
        onClick={() => setOpen((current) => !current)}
      >
        <Mail aria-hidden="true" />
        {iconOnly ? <span className="sr-only">{label}</span> : label}
      </Button>

      {open && typeof document !== "undefined"
        ? createPortal(
        <div
          aria-labelledby={titleId}
          aria-modal="true"
          className="fixed inset-0 z-[9999] grid min-h-dvh place-items-center overflow-y-auto bg-background/70 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-6"
          role="dialog"
        >
          <button
            aria-label="Close contact form"
            className="absolute inset-0 cursor-default"
            onClick={closePanel}
            type="button"
          />
          <div className="relative grid max-h-[calc(100dvh-1.5rem)] w-full max-w-[34rem] grid-rows-[auto_minmax(0,1fr)] overflow-hidden border border-border bg-card shadow-2xl sm:max-h-[min(86dvh,44rem)]">
            <div className="flex items-start justify-between gap-4 border-b border-border p-4 sm:p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Contact
                </p>
                <h2 className="mt-2 text-xl font-semibold sm:text-2xl" id={titleId}>
                  Send a message
                </h2>
              </div>
              <Button
                aria-label="Close"
                size="icon"
                variant="outline"
                onClick={closePanel}
              >
                <X aria-hidden="true" />
              </Button>
            </div>

            <form
              className="grid min-h-0 gap-3 overflow-y-auto overscroll-contain p-4 sm:gap-4 sm:p-5"
              onSubmit={handleSubmit}
            >
              <label className="hidden">
                Company
                <input
                  autoComplete="off"
                  tabIndex={-1}
                  value={form.company}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      company: event.target.value,
                    }))
                  }
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <label className="grid gap-2 text-sm font-medium">
                  Name
                  <input
                    className="border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-ring"
                    placeholder="Your name"
                    required
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                  />
                </label>
                <label className="grid gap-2 text-sm font-medium">
                  Email
                  <input
                    className="border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-ring"
                    placeholder="you@example.com"
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium">
                Subject
                <input
                  className="border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-ring"
                  placeholder="Project inquiry, collaboration, question..."
                  required
                  value={form.subject}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                />
              </label>

              <label className="grid gap-2 text-sm font-medium">
                Message
                <textarea
                  className="min-h-24 resize-y border border-input bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-ring sm:min-h-32"
                  placeholder="Write your message..."
                  required
                  value={form.message}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                />
              </label>

              <p className="border border-border bg-secondary/40 px-3 py-2 text-xs leading-5 text-muted-foreground">
                Email me manually:{" "}
                <a
                  className="font-medium text-foreground underline underline-offset-4"
                  href={`mailto:${SITE.email}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {SITE.email}
                </a>
              </p>

              <div className="flex flex-col gap-3 border-t border-border pt-3 sm:flex-row sm:items-center sm:pt-4">
                <Button
                  className={cn("w-full sm:w-auto", state === "sending" && "opacity-70")}
                  disabled={state === "sending"}
                  type="submit"
                >
                  <Send aria-hidden="true" />
                  {state === "sending" ? "Sending" : "Send message"}
                </Button>
                {state === "success" ? (
                  <p className="text-sm font-medium text-accent" role="status">
                    Message sent. Thanks for reaching out.
                  </p>
                ) : null}
                {state === "error" && error ? (
                  <p
                    className="text-sm font-medium text-destructive"
                    role="alert"
                  >
                    {error}
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>,
            document.body,
          )
        : null}
    </>
  );
}

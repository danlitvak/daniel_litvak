import { BriefcaseBusiness, Code2 } from "lucide-react";
import Link from "next/link";

import { ContactButton } from "@/components/contact-button";
import { SITE } from "@/lib/constants";

const footerUpdated = "April 28, 2026";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/35">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em]">
            {SITE.name}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
            {/* TODO: Update social links and contact copy before launch if needed. */}
            {SITE.role}. Building simulation-heavy projects, interactive tools,
            and clear technical writing.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Updated {footerUpdated}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ContactButton
            ariaLabel="Email"
            className="border-border bg-transparent p-0 hover:bg-background [&_svg]:size-4"
            iconOnly
            label="Email"
            size="icon"
            variant="outline"
          />
          <Link
            href={SITE.github}
            className="border border-border p-2 transition-colors hover:bg-background"
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={SITE.linkedin}
            className="border border-border p-2 transition-colors hover:bg-background"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
          >
            <BriefcaseBusiness className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

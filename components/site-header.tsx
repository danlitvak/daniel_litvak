"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ContactButton } from "@/components/contact-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/coursework", label: "Coursework" },
  { href: "/blog", label: "Blog" },
  { href: "/resume", label: "Resume" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.18em]"
          onClick={() => setOpen(false)}
        >
          Daniel Litvak
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                className={cn(
                  "relative py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:bg-foreground after:transition-transform after:duration-200",
                  isActive
                    ? "text-foreground after:scale-x-100"
                    : "after:scale-x-0 hover:after:scale-x-100",
                )}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ContactButton
            className="hidden md:inline-flex"
            label="Contact"
            size="sm"
            variant="outline"
          />
          <ThemeToggle />
          <Button
            aria-label="Toggle navigation"
            className="md:hidden"
            size="icon"
            variant="outline"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "grid border-t border-border transition-[grid-template-rows] duration-200 md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <nav className="overflow-hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-6xl gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "border border-transparent px-3 py-2 text-sm transition-colors",
                    isActive
                      ? "border-border bg-secondary font-medium"
                      : "hover:border-border hover:bg-secondary",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <ContactButton
              className="mt-1 w-full justify-start"
              label="Contact me"
              size="sm"
              variant="outline"
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

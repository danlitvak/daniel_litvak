"use client";

import { Moon, Sun } from "lucide-react";

import { usePortfolioTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = usePortfolioTheme();
  const isDark = theme === "dark";

  return (
    <Button
      aria-label="Toggle dark mode"
      size="icon"
      variant="outline"
      onClick={toggleTheme}
      title="Toggle dark mode"
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}

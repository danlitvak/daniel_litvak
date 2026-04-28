"use client";

import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ResumeLogoutButton() {
  async function handleLogout() {
    await fetch("/api/resume/logout", {
      cache: "no-store",
      method: "POST",
    });

    window.location.href = "/resume/login";
  }

  return (
    <Button type="button" variant="outline" onClick={handleLogout}>
      <LogOut aria-hidden="true" />
      Log out of resume
    </Button>
  );
}

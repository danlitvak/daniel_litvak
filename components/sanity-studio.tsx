"use client";

import { NextStudio } from "next-sanity/studio/client-component";

import config from "@/sanity.config";

export function SanityStudio() {
  return <NextStudio config={config} />;
}

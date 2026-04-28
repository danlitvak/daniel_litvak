import type { Metadata, Viewport } from "next";

import { SanityStudio } from "@/components/sanity-studio";

export const dynamic = "force-static";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  referrer: "same-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <SanityStudio />;
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function HoverCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="h-full w-full"
    >
      {children}
    </motion.div>
  );
}

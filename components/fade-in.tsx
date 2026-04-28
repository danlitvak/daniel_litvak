"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";

type FadeInProps = {
  delay?: number;
} & ComponentPropsWithoutRef<typeof motion.div>;

export function FadeIn({ delay = 0, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}

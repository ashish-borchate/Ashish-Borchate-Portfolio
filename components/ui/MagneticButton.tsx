"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  external?: boolean;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: MagneticButtonProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:min-h-0";
  const variants = {
    primary: "bg-accent text-background hover:bg-[#6b99f2]",
    ghost:
      "border border-border bg-surface text-foreground hover:border-accent/40 hover:bg-accent-muted",
  };

  const content = (
    <motion.span
      className={cn(base, variants[variant], className)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  if (href.startsWith("mailto:")) {
    return <a href={href}>{content}</a>;
  }

  return <Link href={href}>{content}</Link>;
}

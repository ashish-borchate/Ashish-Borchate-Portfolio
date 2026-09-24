"use client";

import { brandName, siteNav } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { SoundToggle } from "@/components/ui/SoundToggle";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <nav
          className={cn(
            "flex w-full items-center justify-between rounded-full border border-transparent px-4 py-2 transition-all duration-300 sm:px-5",
            scrolled &&
              "border-border/80 bg-charcoal/70 py-2 shadow-sm backdrop-blur-md",
          )}
          aria-label="Primary"
        >
          <Link
            href="#top"
            className="font-mono text-[11px] font-medium tracking-[0.18em] text-foreground sm:text-xs"
          >
            {brandName}
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {siteNav.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="text-xs text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <SoundToggle />
            <button
              type="button"
              className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-surface lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((o) => !o)}
            >
              <span
                className={cn(
                  "block h-px w-4 bg-foreground transition-transform duration-200",
                  mobileOpen && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-foreground transition-opacity duration-200",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-foreground transition-transform duration-200",
                  mobileOpen && "-translate-y-[7px] -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="mx-4 mt-2 rounded-2xl border border-border bg-charcoal/95 p-4 backdrop-blur-lg lg:hidden"
          >
            <ul className="flex flex-col gap-3">
              {siteNav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="block py-2 text-sm text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

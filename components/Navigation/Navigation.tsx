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
          "mx-auto flex max-w-6xl items-center justify-between px-3 transition-all duration-300 min-[430px]:px-4 sm:px-6",
          scrolled ? "py-2 min-[430px]:py-3" : "py-3 min-[430px]:py-5",
        )}
      >
        <nav
          className={cn(
            "flex w-full min-w-0 items-center justify-between gap-2 rounded-full border border-transparent px-2.5 py-2 transition-all duration-300 min-[430px]:px-4 sm:px-5",
            scrolled &&
              "border-border/80 bg-charcoal/70 py-2 shadow-sm backdrop-blur-md",
          )}
          aria-label="Primary"
        >
          <Link
            href="#top"
            className="truncate font-mono text-[10px] font-medium tracking-[0.12em] text-foreground min-[390px]:text-[11px] min-[430px]:tracking-[0.18em] sm:text-xs"
          >
            {brandName}
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {siteNav.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="text-xs font-medium text-accent transition-colors hover:text-[#6b99f2]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <SoundToggle />
            <button
              type="button"
              className="relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-surface lg:hidden"
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
            className="mx-3 mt-2 max-h-[min(70vh,28rem)] overflow-y-auto rounded-2xl border border-border bg-charcoal/95 p-3 backdrop-blur-lg min-[430px]:mx-4 min-[430px]:p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {siteNav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-2 py-3 text-sm font-medium text-accent active:bg-surface/50"
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

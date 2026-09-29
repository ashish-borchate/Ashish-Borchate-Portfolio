"use client";

import { brandName, siteNav } from "@/data/navigation";
import { scrollToHash } from "@/lib/scrollToHash";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import { SoundToggle } from "@/components/ui/SoundToggle";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 24);
  });

  const onAnchorClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      scrollToHash(href);
      setMobileOpen(false);
    },
    [],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 border-b transition-all duration-300",
          scrolled
            ? "h-full border-border/55 bg-background/[0.98] backdrop-blur-xl"
            : "h-0 border-transparent bg-transparent",
        )}
      />
      <div
        className={cn(
          "relative mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6",
          scrolled ? "py-2 min-[430px]:py-3" : "py-3 min-[430px]:py-5",
        )}
      >
        <nav
          className={cn(
            "flex w-full min-w-0 items-center justify-between gap-2 rounded-full border border-transparent py-2 transition-all duration-300",
            scrolled &&
              "border-border/70 bg-charcoal/90 px-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-4",
          )}
          aria-label="Primary"
        >
          <Link
            href="#top"
            className="truncate font-mono text-[11px] font-medium tracking-[0.12em] text-primary sm:text-xs"
            onClick={(e) => onAnchorClick(e, "#top")}
          >
            {brandName}
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {siteNav.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="text-xs font-medium text-accent transition-opacity hover:opacity-80"
                  onClick={(e) => onAnchorClick(e, item.href)}
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
              className="relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-surface/90 lg:hidden"
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
            className="relative mx-3 mt-2 max-h-[min(70vh,28rem)] overflow-y-auto rounded-2xl border border-border bg-charcoal/98 p-3 backdrop-blur-xl min-[430px]:mx-4 min-[430px]:p-4 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {siteNav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-2 py-3 text-sm font-medium text-accent active:bg-surface/50"
                    onClick={(e) => onAnchorClick(e, item.href)}
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

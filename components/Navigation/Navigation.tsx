"use client";

import { brandName, navSectionIds, siteNav } from "@/data/navigation";
import { scrollToHash } from "@/lib/scrollToHash";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import { SoundToggle } from "@/components/ui/SoundToggle";

const navLinkBase =
  "text-xs font-medium transition-[color,opacity,box-shadow,border-color] duration-200";

const navContactClassName = cn(
  navLinkBase,
  "inline-flex min-h-9 items-center rounded-full border border-border-hover bg-accent-muted/25 px-3.5 py-2 tracking-[0.08em] text-accent",
  "hover:border-accent/50 hover:shadow-[0_0_18px_rgba(91,141,239,0.14)]",
  "active:border-accent/55 active:shadow-[0_0_22px_rgba(91,141,239,0.18)]",
);

function navItemClassName(itemId: string, isActive: boolean) {
  if (itemId === "contact") {
    return cn(
      navContactClassName,
      isActive && "border-accent/55 text-primary shadow-[0_0_18px_rgba(91,141,239,0.12)]",
    );
  }
  return cn(
    navLinkBase,
    isActive ? "text-primary opacity-100" : "text-accent opacity-85 hover:opacity-100",
  );
}

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useActiveSection(navSectionIds);
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

          <ul className="hidden items-center gap-5 lg:flex lg:gap-6">
            {siteNav.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={navItemClassName(item.id, isActive)}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => onAnchorClick(e, item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
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
              {siteNav.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-2 py-3 text-sm font-medium active:bg-surface/50",
                        navItemClassName(item.id, isActive),
                      )}
                      aria-current={isActive ? "true" : undefined}
                      onClick={(e) => onAnchorClick(e, item.href)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

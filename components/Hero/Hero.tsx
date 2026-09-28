"use client";

import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProfileImage } from "@/components/Hero/ProfileImage";
import { ResumeModal } from "@/components/Hero/ResumeModal";
import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(91,141,239,0.08),transparent_55%)]" />
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:gap-x-14">
          <motion.div
            className="min-w-0 lg:col-span-7 lg:pt-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted min-[430px]:text-[11px] min-[430px]:tracking-[0.25em]">
              {profile.name}
            </p>
            <h1 className="mt-3 text-balance text-[1.65rem] font-medium leading-[1.08] tracking-tight min-[390px]:text-4xl sm:mt-4 sm:text-5xl md:text-6xl">
              {profile.headline}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted min-[430px]:mt-6 min-[430px]:text-base sm:text-lg">
              {profile.description}
            </p>
            <p className="mt-4 text-xs font-medium leading-snug text-accent min-[430px]:mt-5 min-[430px]:text-sm sm:text-base">
              {profile.positioning}
            </p>
            <div className="mt-8 flex w-full max-w-xl flex-col gap-2.5 min-[430px]:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <MagneticButton
                href="#work"
                variant="primary"
                className="w-full shrink-0 sm:w-auto"
              >
                See What I&apos;ve Built
              </MagneticButton>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className={cn(
                  "inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-foreground transition-colors",
                  "hover:border-accent/40 hover:bg-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto",
                )}
              >
                <motion.span
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="inline-flex items-center justify-center"
                >
                  View My Resume
                </motion.span>
              </button>
            </div>
          </motion.div>

          <div className="min-w-0 lg:col-span-5 lg:flex lg:justify-end lg:pt-2">
            <ProfileImage
              className="mx-auto w-full max-w-[280px] min-[430px]:max-w-[320px] lg:mx-0 lg:max-w-md"
              priority
            />
          </div>
        </div>
      </section>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}

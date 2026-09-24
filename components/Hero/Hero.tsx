"use client";

import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroVisual } from "@/components/Hero/HeroVisual";
import { ProfileImage } from "@/components/Hero/ProfileImage";
import { motion } from "framer-motion";
import { easeOut } from "@/lib/motion";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-20 md:pt-32 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(91,141,239,0.08),transparent_55%)]" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:gap-12 sm:px-6 lg:grid-cols-12 lg:gap-8">
        <motion.div
          className="min-w-0 lg:col-span-7"
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
          <p className="mt-4 text-xs font-medium leading-snug text-accent min-[430px]:mt-6 min-[430px]:text-sm sm:text-base">
            {profile.positioning}
          </p>
          <blockquote className="mt-4 max-w-xl border-l border-border pl-3 text-sm leading-relaxed text-muted min-[430px]:mt-6 min-[430px]:pl-4 min-[430px]:text-base sm:text-lg">
            {profile.description}
          </blockquote>
          <div className="mt-8 flex flex-col gap-2.5 min-[430px]:mt-10 sm:flex-row sm:flex-wrap sm:gap-3">
            <MagneticButton href="#work" variant="primary" className="w-full sm:w-auto">
              Explore My Work
            </MagneticButton>
            <MagneticButton href="#resume" variant="ghost" className="w-full sm:w-auto">
              View Resume
            </MagneticButton>
            <MagneticButton href="#intro" variant="ghost" className="w-full sm:w-auto">
              Watch Introduction
            </MagneticButton>
          </div>
        </motion.div>

        <div className="relative min-w-0 lg:col-span-5">
          <div className="grid gap-4 sm:gap-6">
            <ProfileImage className="mx-auto w-full max-w-[280px] min-[430px]:max-w-sm lg:mr-0 lg:ml-auto" priority />
            <HeroVisual className="mx-auto max-h-[220px] max-w-md min-[430px]:max-h-none lg:max-w-lg" />
          </div>
        </div>
      </div>
    </section>
  );
}

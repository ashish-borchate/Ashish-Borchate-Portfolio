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
      className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(91,141,239,0.08),transparent_55%)]" />
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            {profile.name}
          </p>
          <h1 className="mt-4 text-balance text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            {profile.headline}
          </h1>
          <p className="mt-6 text-sm font-medium text-accent sm:text-base">
            {profile.positioning}
          </p>
          <blockquote className="mt-6 max-w-xl border-l border-border pl-4 text-base text-muted sm:text-lg">
            {profile.description}
          </blockquote>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="#work" variant="primary">
              Explore My Work
            </MagneticButton>
            <MagneticButton href="#resume" variant="ghost">
              View Resume
            </MagneticButton>
            <MagneticButton href="#intro" variant="ghost">
              Watch Introduction
            </MagneticButton>
          </div>
        </motion.div>

        <div className="relative lg:col-span-5">
          <div className="grid gap-6">
            <ProfileImage className="mx-auto lg:mr-0 lg:ml-auto" priority />
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { heroContent, heroIntro } from "@/data/hero";
import { profile } from "@/data/profile";
import { ProfileImage } from "@/components/Hero/ProfileImage";
import { HeroIntro } from "@/components/Hero/HeroIntro";
import { easeOut, usePrefersReducedMotion } from "@/lib/motion";
import { scrollToHash } from "@/lib/scrollToHash";
import { outlineCtaClassName } from "@/lib/outlineCta";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useLayoutEffect, useState } from "react";

function hasSeenIntro(): boolean {
  if (typeof window === "undefined") return true;
  try {
    return Boolean(sessionStorage.getItem(heroIntro.sessionKey));
  } catch {
    return false;
  }
}

const heroStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease: easeOut },
  },
};

const heroItemReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [introActive, setIntroActive] = useState(false);
  /** Default visible for SSR and repeat visits; first-time intro toggles off in layout effect. */
  const [heroReady, setHeroReady] = useState(true);

  const markIntroSeen = useCallback(() => {
    try {
      sessionStorage.setItem(heroIntro.sessionKey, "1");
    } catch {
      /* private mode */
    }
  }, []);

  const finishIntro = useCallback(() => {
    markIntroSeen();
    setHeroReady(true);
    setIntroActive(false);
    document.body.style.overflow = "";
  }, [markIntroSeen]);

  const beginHeroReveal = useCallback(() => {
    setHeroReady(true);
  }, []);

  useLayoutEffect(() => {
    if (reducedMotion || hasSeenIntro()) {
      setIntroActive(false);
      setHeroReady(true);
      document.body.style.overflow = "";
      return;
    }

    setIntroActive(true);
    setHeroReady(false);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [reducedMotion]);

  const itemVariant = reducedMotion ? heroItemReduced : heroItem;

  return (
    <>
      <HeroIntro
        active={introActive}
        onComplete={finishIntro}
        onSkip={finishIntro}
        onReveal={beginHeroReveal}
      />

      <section
        id="top"
        className={cn(
          "relative overflow-hidden pb-12 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:pb-16 sm:pt-[calc(6rem+env(safe-area-inset-top))] md:pb-20 md:pt-28",
          introActive && "pointer-events-none select-none",
        )}
      >
        <div className="hero-atmosphere" aria-hidden />

        <div className="relative mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6">
          <div className="flex w-full min-w-0 flex-col lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10 xl:gap-x-12">
            <motion.div
              className="order-2 mx-auto flex w-full min-w-0 max-w-3xl flex-col items-center text-center lg:order-1 lg:col-span-7 lg:mx-0 lg:max-w-none lg:items-start lg:text-left"
              variants={heroStagger}
              initial="hidden"
              animate={heroReady ? "show" : "hidden"}
            >
              <motion.p
                variants={itemVariant}
                className="w-full max-w-xl text-pretty text-secondary text-[clamp(0.625rem,2.9vw,0.875rem)] leading-snug tracking-tight sm:text-base sm:leading-[1.65]"
              >
                {heroContent.descriptor}
              </motion.p>

              <motion.div variants={itemVariant} className="mt-5 w-full sm:mt-8">
                <h1 className="w-full text-pretty text-[clamp(1.65rem,5.5vw,2.35rem)] font-semibold leading-[1.15] tracking-tight sm:text-[2.35rem] sm:leading-[1.12] md:text-[2.65rem] md:leading-[1.08]">
                  <span className="block text-primary">{heroContent.headlineLead}</span>
                  <span className="block text-accent">
                    {heroContent.headlineAccent[0]}, {heroContent.headlineAccent[1]},
                  </span>
                  <span className="block">
                    <span className="text-primary">and </span>
                    <span className="text-accent">{heroContent.headlineAccent[2]}.</span>
                  </span>
                </h1>
              </motion.div>

              <motion.div
                variants={itemVariant}
                className="mt-7 flex w-full flex-col items-center gap-4 sm:mt-10 lg:items-start"
              >
                <button
                  type="button"
                  onClick={() => scrollToHash(heroContent.ctaHref)}
                  className={cn(outlineCtaClassName, "max-w-xs sm:max-w-none")}
                >
                  {heroContent.cta}
                </button>
                <Link
                  href={profile.assets.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-accent underline-offset-4 transition-opacity hover:opacity-80 hover:underline"
                >
                  {heroContent.resumeLinkLabel}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariant}
              className="order-1 mb-6 flex w-full min-w-0 justify-center min-[390px]:mb-7 lg:order-2 lg:col-span-5 lg:mb-0 lg:justify-end"
            >
              <ProfileImage className="lg:ml-auto" priority={heroReady} />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

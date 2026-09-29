"use client";

import { heroContent, heroIntro } from "@/data/hero";
import { ProfileImage } from "@/components/Hero/ProfileImage";
import { HeroIntro } from "@/components/Hero/HeroIntro";
import { easeOut, usePrefersReducedMotion } from "@/lib/motion";
import { scrollToHash } from "@/lib/scrollToHash";
import { outlineBadgeClassName, outlineCtaClassName } from "@/lib/outlineCta";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

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
  const [heroReady, setHeroReady] = useState(false);

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

  useEffect(() => {
    let skipIntro = reducedMotion;
    try {
      skipIntro = skipIntro || Boolean(sessionStorage.getItem(heroIntro.sessionKey));
    } catch {
      skipIntro = skipIntro || false;
    }

    if (skipIntro) {
      setHeroReady(true);
      return;
    }

    setIntroActive(true);
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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(91,141,239,0.08),transparent_52%)]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10 xl:gap-x-12">
            <motion.div
              className="order-2 mx-auto flex max-w-3xl flex-col lg:order-1 lg:col-span-7 lg:mx-0 lg:max-w-none"
              variants={heroStagger}
              initial="hidden"
              animate={heroReady ? "show" : "hidden"}
            >
              <motion.p
                variants={itemVariant}
                className="text-[1.65rem] font-medium tracking-tight text-foreground min-[375px]:text-[1.85rem] min-[390px]:text-[2rem] sm:text-[2.35rem] md:text-[2.65rem]"
              >
                {heroContent.name}
              </motion.p>

              <motion.p
                variants={itemVariant}
                className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-accent min-[390px]:text-[0.9375rem] sm:mt-4 sm:text-base"
              >
                {heroContent.descriptor}
              </motion.p>

              <motion.div variants={itemVariant} className="mt-6 sm:mt-8">
                <h1 className="space-y-1 text-pretty text-[1.35rem] font-medium leading-[1.22] tracking-tight text-foreground min-[375px]:text-[1.45rem] min-[390px]:text-[1.55rem] sm:space-y-1.5 sm:text-[1.85rem] sm:leading-[1.2] md:text-[2.15rem] md:leading-[1.18]">
                  {heroContent.headlineLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h1>
              </motion.div>

              <motion.ul
                variants={itemVariant}
                className="mt-7 flex flex-wrap gap-2 sm:mt-8 sm:gap-2.5"
                aria-label="Previous companies"
              >
                {heroContent.badges.map((badge) => (
                  <li key={badge}>
                    <span className={outlineBadgeClassName}>{badge}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={itemVariant} className="mt-9 sm:mt-10">
                <button
                  type="button"
                  onClick={() => scrollToHash(heroContent.ctaHref)}
                  className={outlineCtaClassName}
                >
                  {heroContent.cta}
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariant}
              className="order-1 mt-10 flex justify-center lg:order-2 lg:col-span-5 lg:mt-0 lg:justify-end"
            >
              <ProfileImage className="lg:ml-auto" priority={heroReady} />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

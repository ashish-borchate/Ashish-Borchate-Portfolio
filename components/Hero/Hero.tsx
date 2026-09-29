"use client";

import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProfileImage } from "@/components/Hero/ProfileImage";
import { ResumeModal } from "@/components/Hero/ResumeModal";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden pt-20 pb-10 sm:pt-20 sm:pb-12 md:pt-24 md:pb-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(91,141,239,0.07),transparent_50%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6">
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-7">
            <h1 className="text-balance text-[1.6rem] font-medium leading-[1.1] tracking-tight min-[390px]:text-[2rem] sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
              {profile.headline}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-accent min-[430px]:text-base sm:mt-5 sm:text-lg">
              {profile.description}
            </p>
            <div
              className="mx-auto mt-6 flex w-full max-w-[15.5rem] flex-col gap-2 sm:mx-0 sm:mt-7 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-3"
              id="resume"
            >
              <MagneticButton
                href="#case-studies"
                variant="primary"
                className="w-full min-w-0 px-4 sm:w-auto"
              >
                See What I&apos;ve Built
              </MagneticButton>
              <MagneticButton
                href="#story"
                variant="primary"
                className="w-full min-w-0 px-4 sm:w-auto"
              >
                How I Work
              </MagneticButton>
              <button
                type="button"
                onClick={() => setResumeOpen(true)}
                className={cn(
                  "inline-flex min-h-11 w-full min-w-0 items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-background transition-colors sm:w-auto",
                  "hover:bg-[#6b99f2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                )}
              >
                Resume
              </button>
            </div>
          </div>

          <div className="order-1 min-w-0 lg:order-2 lg:col-span-5 lg:flex lg:justify-end">
            <ProfileImage className="lg:mx-0 lg:ml-auto" priority />
          </div>
        </div>
      </section>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}

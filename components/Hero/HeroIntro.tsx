"use client";

import { heroIntro } from "@/data/hero";
import { useTypewriter } from "@/components/Hero/useTypewriter";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

type HeroIntroProps = {
  active: boolean;
  onComplete: () => void;
  onSkip: () => void;
  onReveal?: () => void;
};

type IntroStep = "line1" | "pause1" | "line2" | "pause2" | "exit";

function BracketText({
  text,
  showCursor,
}: {
  text: string;
  showCursor?: boolean;
}) {
  return (
    <p className="max-w-[min(100%,19rem)] text-pretty text-center font-mono text-[0.9375rem] leading-snug tracking-tight text-foreground min-[375px]:max-w-[21rem] min-[390px]:text-base sm:max-w-none sm:text-lg">
      <span className="text-muted/80">{"{ "}</span>
      <span>{text}</span>
      <span className="text-muted/80">{" }"}</span>
      {showCursor ? (
        <span
          className="ml-px inline-block h-[1em] w-[2px] translate-y-px animate-pulse bg-accent/90 align-[-0.1em]"
          aria-hidden
        />
      ) : null}
    </p>
  );
}

export function HeroIntro({ active, onComplete, onSkip, onReveal }: HeroIntroProps) {
  const [step, setStep] = useState<IntroStep>("line1");
  const completedRef = useRef(false);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  const line1 = useTypewriter(heroIntro.line1, active && step === "line1", 34);
  const line2 = useTypewriter(heroIntro.line2, active && step === "line2", 28);

  useEffect(() => {
    if (!active) return;

    if (step === "line1" && line1.done) {
      const id = window.setTimeout(() => setStep("pause1"), 400);
      return () => window.clearTimeout(id);
    }
    if (step === "pause1") {
      const id = window.setTimeout(() => setStep("line2"), 100);
      return () => window.clearTimeout(id);
    }
    if (step === "line2" && line2.done) {
      const id = window.setTimeout(() => setStep("pause2"), 360);
      return () => window.clearTimeout(id);
    }
    if (step === "pause2") {
      const id = window.setTimeout(() => {
        onReveal?.();
        setStep("exit");
      }, 100);
      return () => window.clearTimeout(id);
    }
    if (step === "exit") {
      const id = window.setTimeout(() => finish(), 480);
      return () => window.clearTimeout(id);
    }
  }, [active, step, line1.done, line2.done, finish, onReveal]);

  if (!active) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background px-4 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)] transition-[opacity,filter] duration-500 ease-out",
        step === "exit" ? "pointer-events-none opacity-0 blur-[3px]" : "opacity-100",
      )}
      aria-live="polite"
      aria-busy={step !== "exit"}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(91,141,239,0.06),transparent_55%)]" />
      <div className="relative flex min-h-[5rem] w-full max-w-md flex-col items-center justify-center sm:min-h-[5.5rem]">
        {(step === "line1" || step === "pause1") && (
          <BracketText
            text={line1.value}
            showCursor={step === "line1" && !line1.done}
          />
        )}
        {(step === "line2" || step === "pause2" || step === "exit") && (
          <BracketText
            text={line2.value}
            showCursor={step === "line2" && !line2.done}
          />
        )}
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] rounded px-1 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted/65 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        Skip intro →
      </button>
    </div>
  );
}

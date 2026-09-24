"use client";

import { useSound, SOUND_GLOBALLY_DISABLED } from "@/context/sound-context";

export function SoundToggle() {
  const { enabled, toggle, globalDisabled } = useSound();

  if (globalDisabled || SOUND_GLOBALLY_DISABLED) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="hidden rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted transition-colors hover:border-accent/40 hover:text-foreground sm:inline-flex"
      aria-pressed={enabled}
    >
      Sound {enabled ? "On" : "Off"}
    </button>
  );
}

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
      className="hidden rounded-full border border-border px-3 py-1.5 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-muted transition-colors hover:border-border-hover hover:text-secondary sm:inline-flex"
      aria-pressed={enabled}
    >
      Sound {enabled ? "On" : "Off"}
    </button>
  );
}

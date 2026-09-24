"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "ashish-portfolio-sound";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (value: boolean) => void;
  globalDisabled: boolean;
};

const SoundContext = createContext<SoundContextValue | null>(null);

/** Set to true to disable all sound UI and playback site-wide. */
export const SOUND_GLOBALLY_DISABLED = true;

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);

  useEffect(() => {
    if (SOUND_GLOBALLY_DISABLED) return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "on") setEnabledState(true);
    } catch {
      /* ignore */
    }
  }, []);

  const setEnabled = useCallback((value: boolean) => {
    if (SOUND_GLOBALLY_DISABLED) return;
    setEnabledState(value);
    try {
      localStorage.setItem(STORAGE_KEY, value ? "on" : "off");
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => setEnabled(!enabled), [enabled, setEnabled]);

  const value = useMemo(
    () => ({
      enabled: SOUND_GLOBALLY_DISABLED ? false : enabled,
      toggle,
      setEnabled,
      globalDisabled: SOUND_GLOBALLY_DISABLED,
    }),
    [enabled, setEnabled, toggle],
  );

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error("useSound must be used within SoundProvider");
  }
  return ctx;
}

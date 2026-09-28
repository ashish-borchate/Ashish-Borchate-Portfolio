"use client";

import { useEffect, useState, type RefObject } from "react";

/** Scroll progress 0→1 while the section travels from pin start to pin end. */
export function useSectionScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight);
      const scrolled = window.scrollY - sectionTop;
      setProgress(Math.max(0, Math.min(1, scrolled / scrollable)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sectionRef]);

  return progress;
}

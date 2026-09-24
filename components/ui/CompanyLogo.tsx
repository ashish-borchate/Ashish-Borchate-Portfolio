"use client";

import { cn } from "@/lib/utils";

type CompanyLogoProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
};

/** Placeholder-friendly logo: shows [COMPANY LOGO] text when SVG missing. */
export function CompanyLogo({ src, alt, label, className }: CompanyLogoProps) {
  return (
    <div
      className={cn(
        "flex h-10 min-w-[7rem] items-center justify-center rounded-md border border-border bg-surface px-3",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="max-h-6 max-w-[5rem] object-contain opacity-90"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent && !parent.dataset.fallback) {
            parent.dataset.fallback = "true";
            const span = document.createElement("span");
            span.className =
              "font-mono text-[10px] uppercase tracking-wider text-muted";
            span.textContent = label;
            parent.appendChild(span);
          }
        }}
      />
    </div>
  );
}

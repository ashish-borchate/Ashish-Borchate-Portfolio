"use client";

import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

type ResumeModalProps = {
  open: boolean;
  onClose: () => void;
};

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleKeyDown]);

  if (typeof document === "undefined") return null;

  const linkedInUrl = profile.links.linkedInHref;
  const resumeUrl = profile.assets.resumePdf;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close resume dialog"
            className="fixed inset-0 z-50 bg-background/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              className="pointer-events-auto w-full max-w-sm rounded-xl border border-border bg-charcoal shadow-[0_0_0_1px_rgba(255,255,255,0.04)] outline-none"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                <div>
                  <p
                    id={titleId}
                    className="text-sm font-medium text-foreground"
                  >
                    Resume
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Preview, download, or view LinkedIn.
                  </p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-border px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  Close
                </button>
              </div>
              <ul className="flex flex-col gap-2 p-4">
                <ResumeAction
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  Preview Resume
                </ResumeAction>
                <ResumeAction href={resumeUrl} download>
                  Download Resume
                </ResumeAction>
                <ResumeAction
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  LinkedIn
                </ResumeAction>
              </ul>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function ResumeAction({
  children,
  className,
  href,
  download,
  target,
  rel,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
  download?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
}) {
  return (
    <li>
      <a
        href={href}
        download={download ? true : undefined}
        target={target}
        rel={rel}
        onClick={onClick}
        className={cn(
          "flex min-h-11 items-center justify-center rounded-lg border border-border bg-surface/40 px-4 py-3 text-sm font-medium text-foreground transition-colors",
          "hover:border-accent/35 hover:bg-accent-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          className,
        )}
      >
        {children}
      </a>
    </li>
  );
}

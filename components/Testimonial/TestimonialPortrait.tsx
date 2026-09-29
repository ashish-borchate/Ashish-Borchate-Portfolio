"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

type TestimonialPortraitProps = {
  name: string;
  photo?: string;
  active?: boolean;
  className?: string;
};

export function TestimonialPortrait({
  name,
  photo,
  active,
  className,
}: TestimonialPortraitProps) {
  const [failed, setFailed] = useState(!photo);

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full border border-border/80 bg-surface/40 transition-[border-color,filter,transform] duration-300",
        active ? "border-accent/35 grayscale-0" : "grayscale-[0.35]",
        className,
      )}
    >
      {!failed && photo ? (
        <Image
          src={photo}
          alt=""
          width={72}
          height={72}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-charcoal to-surface font-mono text-xs font-medium tracking-wider text-muted"
          aria-hidden
        >
          {initials(name)}
        </div>
      )}
    </div>
  );
}

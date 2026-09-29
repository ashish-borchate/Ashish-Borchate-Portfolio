"use client";

import { profile } from "@/data/profile";
import { monoLabelMuted } from "@/lib/typography";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

type ProfileImageProps = {
  className?: string;
  priority?: boolean;
};

export function ProfileImage({ className, priority }: ProfileImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex aspect-square w-full max-w-[280px] flex-col items-center justify-center rounded-full border border-border bg-gradient-to-br from-charcoal to-background p-6",
          className,
        )}
      >
        <p className={monoLabelMuted}>Profile photo</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[260px] min-[390px]:max-w-[280px] sm:max-w-[300px] lg:max-w-[320px]",
        className,
      )}
    >
      <div
        className="absolute inset-0 rounded-full border-2 border-[#d4af37]/85 shadow-[0_0_0_3px_rgba(212,175,55,0.15)]"
        aria-hidden
      />
      <div
        className="absolute inset-[6px] rounded-full border border-[#e8c547]/70"
        aria-hidden
      />
      <div className="relative m-[10px] aspect-square overflow-hidden rounded-full bg-[#f5c400]">
        <Image
          src={profile.assets.profileImage}
          alt="Ashish Borchate"
          fill
          priority={priority}
          className="object-cover object-[center_18%] contrast-[1.02]"
          sizes="(max-width: 768px) 72vw, 320px"
          onError={() => setFailed(true)}
        />
      </div>
    </div>
  );
}

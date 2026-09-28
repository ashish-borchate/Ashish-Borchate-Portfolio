"use client";

import { profile } from "@/data/profile";
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
          "flex aspect-[4/5] w-full max-w-sm flex-col justify-end rounded-sm border border-border bg-gradient-to-br from-charcoal to-background p-6",
          className,
        )}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Profile photo
        </p>
        <p className="mt-2 text-sm text-muted">
          Replace{" "}
          <code className="text-accent">/public/assets/profile.jpg</code>
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-sm border border-border",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
      <Image
        src={profile.assets.profileImage}
        alt="Ashish Borchate"
        fill
        priority={priority}
        className="object-cover object-[center_18%] contrast-[1.02]"
        sizes="(max-width: 768px) 100vw, 400px"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

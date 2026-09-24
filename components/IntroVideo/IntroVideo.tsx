"use client";

import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

export function IntroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.duration) setProgress(v.currentTime / v.duration);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, [loaded]);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  return (
    <section id="intro" className="border-y border-border py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          title="LET ME INTRODUCE MYSELF."
          subtitle="A little more than a resume can tell you."
        />
        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-charcoal sm:mt-12">
          {error ? (
            <div className="flex aspect-video flex-col items-center justify-center gap-3 p-8 text-center">
              <p className="font-mono text-xs uppercase tracking-wider text-muted">
                Video placeholder
              </p>
              <p className="max-w-md text-sm text-muted">
                Add{" "}
                <code className="text-accent">{profile.assets.introVideo}</code>{" "}
                and optional poster{" "}
                <code className="text-accent">{profile.assets.introPoster}</code>
              </p>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="aspect-video w-full bg-black object-cover"
                poster={profile.assets.introPoster}
                muted={muted}
                playsInline
                preload="none"
                onLoadedData={() => setLoaded(true)}
                onError={() => setError(true)}
              >
                <source src={profile.assets.introVideo} type="video/mp4" />
                <track kind="captions" />
              </video>
              <div className="border-t border-border p-4">
                <div
                  role="slider"
                  aria-label="Video progress"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(progress * 100)}
                  tabIndex={0}
                  className="mb-4 h-1 cursor-pointer rounded-full bg-border"
                  onClick={seek}
                  onKeyDown={(e) => {
                    const v = videoRef.current;
                    if (!v) return;
                    if (e.key === "ArrowRight") v.currentTime += 5;
                    if (e.key === "ArrowLeft") v.currentTime -= 5;
                  }}
                >
                  <div
                    className="h-full rounded-full bg-accent transition-[width]"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-2">
                  <ControlButton onClick={togglePlay}>
                    {playing ? "Pause" : "Play"}
                  </ControlButton>
                  <ControlButton
                    onClick={() => {
                      setMuted((m) => !m);
                      if (videoRef.current) videoRef.current.muted = !muted;
                    }}
                  >
                    {muted ? "Unmute" : "Mute"}
                  </ControlButton>
                  <ControlButton
                    onClick={() => videoRef.current?.requestFullscreen?.()}
                  >
                    Fullscreen
                  </ControlButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function ControlButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border border-border px-4 py-2.5 text-xs font-medium text-foreground min-h-11",
        "hover:border-accent/40 hover:bg-accent-muted",
      )}
    >
      {children}
    </button>
  );
}

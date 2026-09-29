"use client";

import { useEffect, useRef, useState } from "react";

export function useTypewriter(text: string, active: boolean, charMs = 32) {
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setValue("");
      setDone(false);
      return;
    }

    setValue("");
    setDone(false);
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      const next = text.slice(0, index);
      setValue(next);
      if (index >= text.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, charMs);

    return () => window.clearInterval(id);
  }, [text, active, charMs]);

  return { value, done };
}

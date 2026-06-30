"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { SITE } from "@/lib/site";

export default function BrandLoader() {
  const { progress, active } = useProgress();
  const [hidden, setHidden] = useState(false);

  // Hide once loaded; also a hard fallback so the overlay never gets stuck.
  useEffect(() => {
    if (!active && progress >= 100) {
      const t = setTimeout(() => setHidden(true), 450);
      return () => clearTimeout(t);
    }
  }, [active, progress]);

  useEffect(() => {
    const fallback = setTimeout(() => setHidden(true), 7000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div
      className={`absolute inset-0 z-30 flex flex-col items-center justify-center bg-bg transition-opacity duration-700 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <p className="font-display text-2xl tracking-[0.18em] text-ink sm:text-3xl">
        {SITE.name}
      </p>
      <div className="mt-6 h-px w-44 overflow-hidden bg-paper/20">
        <div
          className="h-full bg-paper transition-[width] duration-300 ease-out"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      <p className="mt-4 text-[11px] uppercase tracking-luxe text-ink-faint">
        Loading the fleet
      </p>
    </div>
  );
}

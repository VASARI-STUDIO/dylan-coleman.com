"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-7 w-7 place-items-center text-ink/70 transition hover:text-ink"
    >
      <svg
        viewBox="0 0 16 16"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden
      >
        {/* A hairline circle that fills half when in dark mode — a quiet, editorial mark */}
        <circle cx="8" cy="8" r="6.5" />
        <path
          d={
            mounted && isDark
              ? "M8 1.5 a6.5 6.5 0 0 0 0 13 z"
              : "M8 1.5 a6.5 6.5 0 0 1 0 13"
          }
          fill="currentColor"
        />
      </svg>
    </button>
  );
}

import { clsx } from "clsx";

// Placeholder monogram. Final mark will be a custom-drawn DC logotype.
// Renders as an inline SVG so it inherits currentColor in either theme.
export function Monogram({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      role="img"
      aria-label="Dylan Coleman monogram"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={clsx("inline-block", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <circle cx="16" cy="16" r="15.25" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="currentColor"
        stroke="none"
        fontFamily="var(--font-display), serif"
        fontSize="13"
        fontStyle="italic"
      >
        dc
      </text>
    </svg>
  );
}

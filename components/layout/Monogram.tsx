import { Logo } from "@/components/ui/Logo";

// Kept as a compatibility re-export — the mark is now the concentric Logo.
export function Monogram({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return <Logo size={size} className={className} />;
}

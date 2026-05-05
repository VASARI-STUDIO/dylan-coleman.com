// Dark-only design — theme provider is a passthrough kept for import compatibility.
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

// Resolve a path under /public to its public URL. On Vercel the site is served
// from the domain root, so this is normally a pass-through — it only prefixes
// anything when NEXT_PUBLIC_BASE_PATH is set (subpath hosting escape hatch).
// Use this for every <img>/asset that references a file in /public.
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}

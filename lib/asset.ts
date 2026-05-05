// Resolve a path under /public to its public URL, including the GitHub Pages
// basePath when running in production. Use this for every <img>/asset that
// references a file in /public.
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}

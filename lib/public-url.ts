/** Публичные файлы из /public с учётом NEXT_PUBLIC_BASE_PATH (GitHub Pages). */
export function publicUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

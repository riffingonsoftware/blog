export function formatDate(date: Date | undefined): string {
  return date ? date.toISOString().slice(0, 10).replaceAll("-", ".") : "";
}

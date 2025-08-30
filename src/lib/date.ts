export type DateLike = string | Date | undefined;

export function formatDate(val: DateLike): string {
  if (!val) return '';
  if (typeof val === 'string') {
    if (/^\d{4}\.\d{2}\.\d{2}$/.test(val)) return val;
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  }
  const d = val as Date;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}


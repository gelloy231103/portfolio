const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-04" → "Apr 2026" */
export function formatMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

/** A project's month and year, e.g. "Oct 2026". */
export function monthYear(p: { month: number; year: number }): string {
  return `${MONTHS[p.month - 1]} ${p.year}`;
}

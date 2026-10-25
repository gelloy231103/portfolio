export const site = {
  name: "Louise Angello Cabaña",
  shortName: "Loy Cabaña",
  nickname: "Loy",
  role: "Full-stack developer",
  description:
    "Louise Angello “Loy” Cabaña builds web apps, mobile apps and games, from the database to the last pixel.",
  email: "louiseangellopuncia@gmail.com",
  github: "https://github.com/gelloy231103",
  githubHandle: "gelloy231103",
  /** Shown in the hero status pill. */
  currentlyBuilding: "Vow & Verse",
  /** Path under /public, e.g. "/resume.pdf". Leave null to hide the résumé button. */
  resume: null as string | null,
  /** Used for the footer; kept static so pages prerender without reading the clock. */
  copyrightYear: 2026,
} as const;

export function siteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);
  return (fromEnv ?? "http://localhost:3000").replace(/\/$/, "");
}

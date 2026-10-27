export const site = {
  name: "Louise Angello Cabaña",
  /** Short form used in compact places (header mark, tab titles). */
  initials: "LAC",
  /** What people call me; used in the header and the intro. */
  nickname: "Loy",
  shortName: "Loy Cabaña",
  /** One-line professional title used in page titles and previews. */
  title: "Full-stack Developer",
  role: "Computer Programmer III",
  employer: "Commission on Elections",
  headline: "Full-stack developer for web, mobile and games.",
  description:
    "Louise Angello Cabaña is a Computer Programmer III at the Commission on Elections who builds web apps, mobile apps and games, from the database to the last pixel.",
  email: "louiseangellopuncia@gmail.com",
  github: "https://github.com/gelloy231103",
  githubHandle: "gelloy231103",
  /** Public Credly profile with verifiable badges. */
  credly: "https://www.credly.com/users/louise-angello-cabana",
  /** Path under /public, e.g. "/resume.pdf". Leave null to hide the résumé link. */
  resume: null as string | null,
  /** Kept static so pages prerender without reading the clock. */
  copyrightYear: 2026,
} as const;

export function siteUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);
  return (fromEnv ?? "http://localhost:3000").replace(/\/$/, "");
}

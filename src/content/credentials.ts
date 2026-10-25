export type Credential = {
  title: string;
  issuer: string;
  /** e.g. "2026-04" */
  date: string;
  kind: "Award" | "Certificate";
  /** Public verification link, if the issuer provides one. */
  url?: string;
};

/**
 * Awards and certificates. Keep this list short and relevant to software work;
 * the section is hidden when the list is empty.
 */
export const credentials: Credential[] = [
  {
    title: "Top 8 Finalist, Young Creative Challenges Season 2",
    issuer: "NutriVenture (team capstone)",
    date: "2026-04",
    kind: "Award",
  },
];

export type Credential = {
  /** Short name shown in bold, e.g. "Certified Data Science Professional". */
  name: string;
  /** Optional line above the name, e.g. "Oracle Cloud Infrastructure 2025". */
  series?: string;
  issuer: string;
  /** e.g. "2026-04" */
  date: string;
  /** Last month the credential is valid, e.g. "2027-09". Leave out if it never expires. */
  expires?: string;
  kind: "Award" | "Certification";
  /** Public verification link, if the issuer provides one. */
  url?: string;
};

/**
 * Awards and certifications, newest first within each kind.
 * The certifications section is hidden when there are none.
 */
export const credentials: Credential[] = [
  {
    series: "SAP Certified",
    name: "SAP HCM Payroll for SAP S/4HANA",
    issuer: "SAP",
    date: "2025-11",
    expires: "2026-11",
    kind: "Certification",
    url: "https://www.credly.com/badges/8e0cd405-d016-4536-83ac-508a6e7bd56c",
  },
  {
    series: "Oracle Cloud Infrastructure 2025",
    name: "Certified Data Science Professional",
    issuer: "Oracle",
    date: "2025-10",
    expires: "2027-10",
    kind: "Certification",
  },
  {
    series: "Oracle Cloud Infrastructure 2025",
    name: "Certified Foundations Associate",
    issuer: "Oracle",
    date: "2025-10",
    expires: "2027-10",
    kind: "Certification",
  },
  {
    series: "Oracle Cloud Infrastructure 2025",
    name: "Certified Generative AI Professional",
    issuer: "Oracle",
    date: "2025-09",
    expires: "2027-09",
    kind: "Certification",
  },
  {
    series: "Oracle Cloud Infrastructure 2025",
    name: "Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "2025-09",
    expires: "2027-09",
    kind: "Certification",
  },
  {
    name: "Top 8 Finalist, Young Creative Challenges Season 2",
    issuer: "NutriVenture (team capstone)",
    date: "2026-04",
    kind: "Award",
  },
];

export const certifications = credentials.filter((c) => c.kind === "Certification");
/** Full name for screen readers, structured data and link labels. */
export const fullName = (c: Credential) => (c.series ? `${c.series} ${c.name}` : c.name);
export const awards = credentials.filter((c) => c.kind === "Award");

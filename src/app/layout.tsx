import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Condensed } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" });
const plexCond = IBM_Plex_Sans_Condensed({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-plex-cond", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${site.name} · ${site.role}`, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.github }],
  openGraph: { type: "website", siteName: site.name, locale: "en_PH", url: "/" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1d35" },
  ],
};

// Applies the saved page style before first paint so there's no flash.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  worksFor: { "@type": "GovernmentOrganization", name: site.employer },
  url: siteUrl(),
  sameAs: [site.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning className={`${plexSans.variable} ${plexCond.variable} ${plexMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-sheet">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="sheet w-full flex-1">{children}</main>
        <footer className="sheet w-full border-t-2 border-ink">
          <div className="pad grid gap-2 py-4 font-mono text-[0.72rem] tracking-wide text-ink-2 sm:grid-cols-3">
            <span>© {site.copyrightYear} {site.name}</span>
            <span className="sm:text-center">
              Next.js · Supabase · Vercel ·{" "}
              <a href={`${site.github}/portfolio`} className="a">source</a>
            </span>
            <span className="sm:text-right">REV {site.revision}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

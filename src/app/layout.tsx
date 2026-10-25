import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${site.shortName} · ${site.role}`, template: `%s · ${site.shortName}` },
  description: site.description,
  authors: [{ name: site.name, url: site.github }],
  openGraph: { type: "website", siteName: site.shortName, locale: "en_PH", url: "/" },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eceef1" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f13" },
  ],
};

// Applies the saved theme before first paint so there's no flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.shortName,
  jobTitle: site.role,
  url: siteUrl(),
  sameAs: [site.github],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${bricolage.variable} ${figtree.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">{children}</main>
        <footer className="py-8 pb-12 text-[0.85rem] text-muted">
          <div className="wrap flex flex-wrap justify-between gap-4">
            <span>© {site.copyrightYear} {site.name}</span>
            <span>
              Built with Next.js, Supabase and Vercel ·{" "}
              <a href={`${site.github}/portfolio`} className="underline-offset-4 hover:underline">Source</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}

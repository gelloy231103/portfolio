import Link from "next/link";
import { site } from "@/content/site";
import { ArrowUp, GitHubIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid gap-1">
          <span className="font-semibold tracking-tight">{site.name}</span>
          <span className="text-sm text-ink-3">
            © {site.copyrightYear} · Built with Next.js, Supabase and Vercel ·{" "}
            <a href={`${site.github}/portfolio`} className="a" target="_blank" rel="noopener noreferrer">View source</a>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="btn size-11 p-0">
            <GitHubIcon />
          </a>
          <Link href="#main" className="btn">
            Back to top <ArrowUp />
          </Link>
        </div>
      </div>
    </footer>
  );
}

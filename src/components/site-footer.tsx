import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="wrap mt-24">
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-rule py-6 font-mono text-[0.72rem] text-ink-3">
        <span>© {site.copyrightYear} {site.name}</span>
        <span>
          Made with Next.js and Supabase ·{" "}
          <a href={`${site.github}/portfolio`} className="a" target="_blank" rel="noopener noreferrer">source</a>
        </span>
      </div>
    </footer>
  );
}

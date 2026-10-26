import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="wrap">
      <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line py-8 text-sm text-ink-3">
        <span>© {site.copyrightYear} {site.name}</span>
        <span className="flex gap-5">
          <a href={site.github} className="a" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`mailto:${site.email}`} className="a">E-mail</a>
          <a href={`${site.github}/portfolio`} className="a" target="_blank" rel="noopener noreferrer">Source</a>
        </span>
      </div>
    </footer>
  );
}

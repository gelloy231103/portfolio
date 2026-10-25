"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const links = [
  { href: "/#work", label: "Work", keep: true },
  { href: "/#about", label: "About" },
  { href: "/#journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-[env(safe-area-inset-top,0px)] z-20 border-b backdrop-blur-md transition-colors ${scrolled ? "border-line" : "border-transparent"}`}
      style={{ background: "color-mix(in srgb, var(--bg) 82%, transparent)" }}
    >
      <div className="wrap flex items-center gap-4 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-extrabold tracking-tight no-underline">
          <i className="grid size-7 place-items-center rounded-lg bg-ink text-[0.95rem] not-italic text-bg">L</i>
          {site.shortName}
        </Link>
        <nav aria-label="Sections" className="ml-auto flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3 py-2 text-[0.92rem] font-medium text-muted no-underline transition-colors hover:bg-surface hover:text-ink ${l.keep ? "" : "max-[620px]:hidden"}`}
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current = root.dataset.theme ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be unavailable (private mode); the toggle still works for this visit */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch colour theme"
      className="grid size-9.5 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-raised"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}

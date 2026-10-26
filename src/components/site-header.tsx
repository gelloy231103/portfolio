"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { getServerTheme, getTheme, setTheme, subscribeTheme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./icons";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience", hideOnPhone: true },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-[max(env(safe-area-inset-top),12px)] z-40 px-3 sm:px-4">
      <div
        className={`mx-auto flex h-14 max-w-[1120px] items-center gap-2 rounded-full border pr-1.5 pl-2 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-line bg-surface/75 shadow-[var(--shadow)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2.5 rounded-full py-1 pr-3 pl-1 no-underline" aria-label={`${site.name}, home`}>
          <span className="grid size-9 place-items-center rounded-full bg-ink font-mono text-[0.7rem] font-semibold tracking-wider text-bg transition-colors group-hover:bg-accent group-hover:text-on-accent">
            {site.initials}
          </span>
          <span className="hidden text-[0.95rem] font-semibold tracking-tight text-ink md:block">{site.shortName}</span>
        </Link>
        <nav aria-label="Sections" className="ml-auto flex items-center">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-2.5 py-1.5 text-[0.88rem] text-ink-2 no-underline transition-colors hover:bg-surface-2 hover:text-ink sm:px-3.5 ${l.hideOnPhone ? "max-sm:hidden" : ""}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  return (
    <button
      type="button"
      onClick={() => setTheme(getTheme() === "dark" ? "light" : "dark")}
      aria-label="Dark theme"
      aria-pressed={theme === null ? undefined : theme === "dark"}
      className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
    >
      <MoonIcon className="icon-moon size-[18px]" />
      <SunIcon className="icon-sun size-[18px]" />
    </button>
  );
}

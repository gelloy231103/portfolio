"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { getTheme, setTheme } from "@/lib/theme";

export function SiteHeader() {
  return (
    <header className="wrap flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pt-8 pb-4">
      <Link href="/" className="text-ink no-underline hover:text-accent">
        {site.shortName}
      </Link>
      <nav aria-label="Main" className="flex items-baseline gap-5 font-mono text-[0.78rem]">
        <Link href="/#work" className="a">Work</Link>
        <Link href="/#about" className="a">About</Link>
        <Link href="/#contact" className="a">Contact</Link>
        <button
          type="button"
          onClick={() => setTheme(getTheme() === "dark" ? "light" : "dark")}
          className="a cursor-pointer bg-transparent p-0 text-ink-3"
        >
          <span className="to-dark">Dark</span>
          <span className="to-light">Light</span>
          <span className="sr-only"> theme</span>
        </button>
      </nav>
    </header>
  );
}

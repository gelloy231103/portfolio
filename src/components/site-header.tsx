"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { getTheme, setTheme } from "@/lib/theme";
import { MoonIcon, SunIcon } from "./icons";

export function SiteHeader() {
  return (
    <header className="wrap flex items-center justify-between gap-4 py-5 sm:py-6">
      <Link href="/" className="font-display text-xl font-bold tracking-tight text-ink no-underline">
        {site.shortName}
      </Link>
      <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
        <Link href="/#work" className="rounded-full px-3 py-2 text-[0.95rem] text-ink-2 no-underline hover:text-ink">Work</Link>
        <Link href="/#about" className="rounded-full px-3 py-2 text-[0.95rem] text-ink-2 no-underline hover:text-ink max-sm:hidden">About</Link>
        <button
          type="button"
          onClick={() => setTheme(getTheme() === "dark" ? "light" : "dark")}
          aria-label="Switch between light and dark theme"
          className="grid size-10 cursor-pointer place-items-center rounded-full text-ink-2 hover:text-ink"
        >
          <MoonIcon className="icon-moon size-[18px]" />
          <SunIcon className="icon-sun size-[18px]" />
        </button>
        <Link href="/#contact" className="pill pill-dark ml-1 h-10 px-5">Let&apos;s talk</Link>
      </nav>
    </header>
  );
}

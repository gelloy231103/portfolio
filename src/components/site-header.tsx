"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { getServerTheme, getTheme, setTheme, subscribeTheme, type Theme } from "@/lib/theme";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#history", label: "History", hideOnPhone: true },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-30 border-b-2 border-ink bg-sheet">
      <div className="mx-auto flex max-w-[1120px] items-stretch">
        <Link href="/" className="flex items-center gap-3 border-r border-hair py-2.5 pr-4 pl-[clamp(16px,4vw,48px)] no-underline" aria-label={`${site.name}, home`}>
          <span className="grid h-8 w-11 place-items-center bg-ink font-mono text-[0.72rem] font-semibold tracking-wider text-sheet">{site.initials}</span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-cond text-[0.98rem] font-semibold">{site.name}</span>
            <span className="block font-mono text-[0.66rem] tracking-wide text-ink-2">DATASHEET · REV {site.revision}</span>
          </span>
        </Link>
        <nav aria-label="Sections" className="ml-auto flex items-stretch">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center border-l border-hair px-3 font-mono text-[0.78rem] tracking-wide text-ink no-underline hover:bg-fill sm:px-4 ${l.hideOnPhone ? "max-sm:hidden" : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <ThemeSwitch />
        </nav>
      </div>
    </header>
  );
}

/** Light = printed datasheet, dark = blueprint. */
function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const choose = (next: Theme) => setTheme(next);

  return (
    <div role="group" aria-label="Page style" className="flex items-stretch border-l border-hair pr-[clamp(16px,4vw,48px)]">
      {(
        [
          ["light", "Datasheet", "Sheet"],
          ["dark", "Blueprint", "Blue"],
        ] as const
      ).map(([value, label, short]) => (
        <button
          key={value}
          type="button"
          aria-pressed={theme === value}
          onClick={() => choose(value)}
          className={`cursor-pointer px-2.5 font-mono text-[0.72rem] tracking-wide transition-colors sm:px-3 ${
            theme === value ? "bg-ink text-sheet" : "text-ink-2 hover:text-ink"
          }`}
        >
          <span className="max-sm:hidden">{label}</span>
          <span className="sm:hidden">{short}</span>
        </button>
      ))}
    </div>
  );
}

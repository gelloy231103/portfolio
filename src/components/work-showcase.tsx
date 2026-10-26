"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, CloseIcon, PlayIcon } from "./icons";

export type ShowcaseItem = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  kind: "Web" | "Mobile" | "Game";
  when: string;
  role: string;
  stack: string[];
  /** e.g. { label: "Result", value: "Top 8, …" } or { label: "Status", value: "Completed, May 2025" } */
  result: { label: string; value: string };
  cover: { src: string; alt: string } | null;
  video: { src: string; poster: string; note?: string } | null;
};

const FILTERS = [
  { value: "All", label: "All" },
  { value: "Web", label: "Web" },
  { value: "Mobile", label: "Mobile" },
  { value: "Game", label: "Games" },
] as const;
type Filter = (typeof FILTERS)[number]["value"];

/**
 * Selected work. On large screens: a project list beside a preview that follows
 * hover and keyboard focus. On smaller screens: one card per project.
 * Filters narrow the list by platform; demos open in a pop-up player.
 */
export function WorkShowcase({ items }: { items: ShowcaseItem[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug);
  const [demo, setDemo] = useState<ShowcaseItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const visible = filter === "All" ? items : items.filter((p) => p.kind === filter);
  const active = visible.find((p) => p.slug === activeSlug) ?? visible[0];

  const chooseFilter = (f: Filter) => {
    setFilter(f);
    const next = f === "All" ? items : items.filter((p) => p.kind === f);
    if (!next.some((p) => p.slug === activeSlug)) setActiveSlug(next[0]?.slug);
  };

  const openDemo = (p: ShowcaseItem) => {
    setDemo(p);
    dialogRef.current?.showModal();
  };
  const closeDemo = () => dialogRef.current?.close();

  return (
    <>
      {/* Filters */}
      <div role="group" aria-label="Filter projects by platform" className="mb-8 flex flex-wrap gap-2 sm:mb-10">
        {FILTERS.map((f) => {
          const count = f.value === "All" ? items.length : items.filter((p) => p.kind === f.value).length;
          const on = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={on}
              onClick={() => chooseFilter(f.value)}
              className={`inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.92rem] transition-colors ${
                on ? "border-ink bg-ink text-bg" : "border-line text-ink-2 hover:border-ink-3 hover:text-ink"
              }`}
            >
              {f.label}
              <span className={`text-xs ${on ? "opacity-70" : "text-ink-3"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Large screens: list + live preview */}
      <div className="hidden gap-14 lg:grid lg:grid-cols-[1fr_1.2fr]">
        <ol className="m-0 list-none border-t border-line p-0">
          {visible.map((p, i) => {
            const on = p.slug === active?.slug;
            return (
              <li key={p.slug} className="border-b border-line">
                <Link
                  href={`/work/${p.slug}`}
                  onMouseEnter={() => setActiveSlug(p.slug)}
                  onFocus={() => setActiveSlug(p.slug)}
                  aria-current={on ? "true" : undefined}
                  className="group relative grid grid-cols-[40px_1fr_auto] items-baseline gap-4 py-6 no-underline"
                >
                  <span className={`text-sm tabular-nums transition-colors ${on ? "text-ink" : "text-ink-3"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span
                      className={`block font-display text-[clamp(1.8rem,2.6vw,2.4rem)] leading-none font-bold tracking-[-0.035em] transition-[color,transform] duration-300 ${
                        on ? "translate-x-1 text-ink" : "text-ink-3 group-hover:text-ink-2"
                      }`}
                    >
                      {p.name}
                    </span>
                    <span className={`mt-2 block text-[0.92rem] transition-colors ${on ? "text-ink-2" : "text-ink-3"}`}>{p.tagline}</span>
                  </span>
                  <span className="flex items-center gap-3 text-sm text-ink-3">
                    {p.kind} · {p.when.split(" ")[1]}
                    <ArrowUpRight className={`size-5 text-ink transition-[opacity,transform] duration-300 ${on ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>

        {active && (
          <div className="sticky top-6 self-start">
            {/* All covers are stacked so switching projects cross-fades instead of reloading. */}
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-soft">
              {items.map((p) => (
                <div
                  key={p.slug}
                  aria-hidden={p.slug !== active.slug}
                  className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out ${
                    p.slug === active.slug ? "scale-100 opacity-100" : "pointer-events-none scale-[1.03] opacity-0"
                  }`}
                >
                  <Cover item={p} sizes="(min-width: 1240px) 640px, 52vw" />
                </div>
              ))}
              {active.video && (
                <button
                  type="button"
                  onClick={() => openDemo(active)}
                  className="absolute bottom-4 left-4 inline-flex h-11 cursor-pointer items-center gap-2 rounded-full bg-white/95 px-5 text-[0.92rem] font-medium text-[#111] shadow-lg backdrop-blur transition-transform hover:scale-[1.03]"
                >
                  <PlayIcon className="size-4" /> Watch demo
                </button>
              )}
            </div>
            <div key={active.slug} className="animate-[fade-up_0.4s_ease-out]">
              <p className="mt-6 mb-0 leading-relaxed text-ink-2">{active.summary}</p>
              <Facts item={active} />
              <Link href={`/work/${active.slug}`} className="pill pill-dark mt-7">
                Read the {active.name} case study <ArrowRight />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Smaller screens: cards */}
      <ul className="m-0 grid list-none gap-10 p-0 lg:hidden">
        {visible.map((p) => (
          <li key={p.slug}>
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-line bg-soft">
              <Cover item={p} sizes="100vw" />
              {p.video && (
                <button
                  type="button"
                  onClick={() => openDemo(p)}
                  className="absolute bottom-3 left-3 inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-white/95 px-4 text-sm font-medium text-[#111] shadow-lg"
                >
                  <PlayIcon className="size-4" /> Watch demo
                </button>
              )}
            </div>
            <p className="mt-5 mb-0 text-sm text-ink-3">{p.kind} · {p.when}</p>
            <h3 className="mt-1 mb-0 text-[2rem]">
              <Link href={`/work/${p.slug}`} className="text-ink no-underline">{p.name}</Link>
            </h3>
            <p className="mt-2 mb-0 leading-relaxed text-ink-2">{p.summary}</p>
            <Facts item={p} />
            <Link href={`/work/${p.slug}`} className="u mt-5 inline-flex items-center gap-2 font-semibold text-ink">
              Read case study <ArrowRight className="size-4" />
            </Link>
          </li>
        ))}
      </ul>

      {/* Demo player */}
      <dialog
        ref={dialogRef}
        aria-label={demo ? `${demo.name} demo` : "Project demo"}
        onClose={() => setDemo(null)}
        onClick={(e) => e.target === e.currentTarget && closeDemo()}
        className="m-auto w-[min(1100px,calc(100vw-32px))] max-w-none bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {demo?.video && (
          <div className="grid gap-3">
            <div className="flex items-center justify-between gap-4 text-white">
              <span className="font-display text-xl font-bold">{demo.name}</span>
              <button type="button" onClick={closeDemo} aria-label="Close demo" className="grid size-10 cursor-pointer place-items-center rounded-full bg-white/10 hover:bg-white/20">
                <CloseIcon className="size-5" />
              </button>
            </div>
            <video key={demo.slug} controls autoPlay playsInline poster={demo.video.poster} className="block aspect-video w-full rounded-2xl bg-black">
              <source src={demo.video.src} type="video/mp4" />
            </video>
            {demo.video.note && <p className="m-0 text-sm text-white/70">{demo.video.note}</p>}
          </div>
        )}
      </dialog>
    </>
  );
}

function Cover({ item, sizes }: { item: ShowcaseItem; sizes: string }) {
  if (item.cover) return <Image src={item.cover.src} alt={item.cover.alt} fill sizes={sizes} className="object-cover" />;
  return (
    <div aria-hidden="true" className="grid h-full place-content-center gap-3 p-8 text-center">
      <span className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-none font-bold tracking-[-0.04em] text-ink">{item.name}</span>
      <span className="mx-auto max-w-[26ch] text-[0.95rem] text-ink-3">{item.tagline}</span>
    </div>
  );
}

function Facts({ item }: { item: ShowcaseItem }) {
  return (
    <dl className="mt-5 mb-0 grid grid-cols-[72px_1fr] gap-x-3 gap-y-1.5 text-[0.9rem]">
      <dt className="text-ink-3">Role</dt>
      <dd className="m-0 font-medium">{item.role}</dd>
      <dt className="text-ink-3">Stack</dt>
      <dd className="m-0 font-medium">{item.stack.join(", ")}</dd>
      <dt className="text-ink-3">{item.result.label}</dt>
      <dd className="m-0 font-medium">{item.result.value}</dd>
    </dl>
  );
}

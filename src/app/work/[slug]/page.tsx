import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { BlockDiagram } from "@/components/block-diagram";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHubIcon, TrophyIcon } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { ProjectVideo } from "@/components/project-video";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { monthYear } from "@/lib/dates";
import { mediaUrl } from "@/lib/media";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: `${project.name} · ${site.name}`, description: project.summary, url: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const byCode = [...projects].sort((a, b) => a.code.localeCompare(b.code));
  const i = byCode.findIndex((p) => p.slug === project.slug);
  const prev = byCode[(i - 1 + byCode.length) % byCode.length];
  const next = byCode[(i + 1) % byCode.length];
  const hasVideo = Boolean(project.video && mediaUrl(project.video.file));
  const tint = { "--tint": project.tint } as CSSProperties;

  return (
    <article style={tint}>
      {/* Header */}
      <header className="relative isolate overflow-hidden pt-32 pb-12 sm:pt-40">
        <div className="dot-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div
          className="absolute -top-40 left-1/2 -z-10 h-[560px] w-[min(1000px,140vw)] -translate-x-1/2"
          style={{ background: "radial-gradient(closest-side, color-mix(in srgb, var(--tint) 18%, transparent), transparent)" }}
          aria-hidden="true"
        />
        <div className="container-x">
          <Link href="/#work" className="rise inline-flex items-center gap-2 rounded-full text-sm text-ink-2 no-underline transition-colors hover:text-ink">
            <ArrowLeft className="size-4" /> All work
          </Link>
          <div className="rise mt-8 flex flex-wrap items-center gap-2" style={{ "--d": "60ms" } as CSSProperties}>
            <span className="chip">
              <span className="size-1.5 rounded-full" style={{ background: project.tint }} />
              {project.kind}
            </span>
            <span className="chip">{project.context}</span>
            <span className={`chip ${project.status === "In progress" ? "chip-accent" : ""}`}>{project.status} · {monthYear(project)}</span>
            {project.award && <span className="chip chip-gold"><TrophyIcon className="size-3.5" />{project.award}</span>}
          </div>
          <h1 className="rise mt-6 mb-0 text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.045em]" style={{ "--d": "120ms" } as CSSProperties}>
            {project.name}
          </h1>
          <p className="rise lead mt-5 mb-0 max-w-[48ch] text-[clamp(1.15rem,2vw,1.4rem)]" style={{ "--d": "180ms" } as CSSProperties}>
            {project.tagline}
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": "240ms" } as CSSProperties}>
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Visit site <ArrowUpRight /></a>
            )}
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className={`btn ${project.live ? "" : "btn-primary"}`}>
                <GitHubIcon /> View source
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Media */}
      <div className="container-x rise" style={{ "--d": "300ms" } as CSSProperties}>
        {hasVideo ? (
          <ProjectVideo project={project} />
        ) : (
          <div className="card overflow-hidden">
            <ProjectCover project={project} priority sizes="(min-width: 1160px) 1080px, 100vw" className="aspect-[16/10] sm:aspect-[21/9]" />
          </div>
        )}
      </div>

      {/* Overview + details */}
      <div className="container-x grid gap-12 py-[clamp(56px,8vw,96px)] lg:grid-cols-[1fr_340px] lg:gap-16">
        <div className="grid min-w-0 content-start gap-14">
          <Block eyebrow="Overview" title="About the project">
            {project.story.map((s) => (
              <p key={s.slice(0, 32)} className="mt-0 mb-4 max-w-[64ch] text-[1.075rem] text-ink-2 last:mb-0">{s}</p>
            ))}
          </Block>
          <div className="grid gap-5 md:grid-cols-2">
            <div data-reveal className="card p-7">
              <h2 className="m-0 text-lg font-semibold">My contribution</h2>
              <ul className="checks mt-5 text-[0.95rem] text-ink-2">
                {project.contribution.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div data-reveal style={{ "--d": "90ms" } as CSSProperties} className="card p-7">
              <h2 className="m-0 text-lg font-semibold">Key features</h2>
              <ul className="checks mt-5 text-[0.95rem] text-ink-2">
                {project.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <aside aria-label="Project details" className="lg:sticky lg:top-28 lg:self-start">
          <dl data-reveal className="card m-0 grid gap-0 overflow-hidden">
            <Detail term="My role">{project.role}</Detail>
            <Detail term="Team">{project.team}</Detail>
            <Detail term="Timeline">{project.status} · {monthYear(project)}</Detail>
            <Detail term="Stack">
              <span className="mt-1 flex flex-wrap gap-1.5">
                {project.stack.map((t) => <span key={t} className="chip">{t}</span>)}
              </span>
            </Detail>
            <Detail term="Source">
              {project.repo ? (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="a inline-flex items-center gap-1">
                  GitHub repository <ArrowUpRight className="size-3.5" />
                </a>
              ) : (
                "Private repository"
              )}
            </Detail>
          </dl>
        </aside>
      </div>

      {/* Architecture */}
      <section className="border-t border-line bg-surface/50 py-[clamp(56px,8vw,96px)]" aria-labelledby="system-h">
        <div className="container-x">
          <Block eyebrow="Architecture" title="How it fits together" id="system-h">
            <figure className="card m-0 mt-2 overflow-hidden">
              <div className="relative p-[clamp(20px,4vw,40px)]">
                <div className="dot-grid absolute inset-0 opacity-60 [mask-image:none]" aria-hidden="true" />
                <div className="relative">
                  <BlockDiagram stages={project.diagram} label={`${project.name} system diagram`} />
                </div>
              </div>
              <figcaption className="border-t border-line px-6 py-4 text-sm text-ink-2">
                <b className="font-semibold text-ink">{project.name}</b> at a glance, from the device to the data.
              </figcaption>
            </figure>
          </Block>
        </div>
      </section>

      {/* Prev / next */}
      <nav aria-label="More projects" className="border-t border-line py-[clamp(48px,6vw,72px)]">
        <div className="container-x grid gap-4 sm:grid-cols-2">
          <PagerLink href={`/work/${prev.slug}`} label="Previous project" name={prev.name} tagline={prev.tagline} tint={prev.tint} dir="prev" />
          <PagerLink href={`/work/${next.slug}`} label="Next project" name={next.name} tagline={next.tagline} tint={next.tint} dir="next" />
        </div>
      </nav>
    </article>
  );
}

function Block({ eyebrow, title, id, children }: { eyebrow: string; title: string; id?: string; children: ReactNode }) {
  return (
    <section data-reveal aria-labelledby={id}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="mt-4 mb-6 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Detail({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="border-b border-line px-6 py-4 last:border-b-0">
      <dt className="font-mono text-[0.7rem] tracking-[0.08em] text-ink-3 uppercase">{term}</dt>
      <dd className="m-0 mt-1 text-[0.95rem]">{children}</dd>
    </div>
  );
}

function PagerLink({ href, label, name, tagline, tint, dir }: { href: string; label: string; name: string; tagline: string; tint: string; dir: "prev" | "next" }) {
  return (
    <Link href={href} className={`card card-hover group flex flex-col gap-1 p-6 text-ink no-underline sm:p-7 ${dir === "next" ? "sm:items-end sm:text-right" : ""}`}>
      <span className="inline-flex items-center gap-2 text-sm text-ink-3">
        {dir === "prev" && <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />}
        {label}
        {dir === "next" && <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />}
      </span>
      <span className="mt-2 inline-flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
        <span className="size-2.5 rounded-full" style={{ background: tint }} />
        {name}
      </span>
      <span className="text-[0.95rem] text-ink-2">{tagline}</span>
    </Link>
  );
}

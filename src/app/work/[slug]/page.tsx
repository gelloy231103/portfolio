import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import { BlockDiagram } from "@/components/block-diagram";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckIcon, GitHubIcon } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { ProjectVideo } from "@/components/project-video";
import { coverImage, getProject, projects, projectsShowcase } from "@/content/projects";
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

  // "Next project" follows the same order as the home page showcase.
  const i = projectsShowcase.findIndex((p) => p.slug === project.slug);
  const next = projectsShowcase[(i + 1) % projectsShowcase.length];
  const hasVideo = Boolean(project.video && mediaUrl(project.video.file));
  const colors = { "--p-bg": project.panel.bg, "--p-fg": project.panel.fg } as CSSProperties;

  const facts: [string, string][] = [
    ["My role", project.role],
    ["Team", project.team],
    ["Stack", project.stack.join(", ")],
    ["Timeline", `${project.status}, ${monthYear(project)}`],
  ];
  if (project.award) facts.push(["Result", project.award]);

  return (
    <article>
      {/* Header */}
      <header className="wrap pt-2">
        <div className="panel px-6 pt-7 pb-10 sm:px-12 sm:pt-10 sm:pb-14" style={colors}>
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm font-medium no-underline opacity-75 hover:opacity-100">
            <ArrowLeft className="size-4" /> All work
          </Link>
          <p className="kicker mt-10 mb-0 opacity-70">{project.kind} · {project.context}</p>
          <h1 className="mt-3 mb-0 text-[clamp(3rem,9vw,6rem)] leading-[0.92] tracking-[-0.045em]">{project.name}</h1>
          <p className="mt-5 mb-0 max-w-[36ch] text-[clamp(1.15rem,2vw,1.45rem)] leading-snug opacity-85">{project.tagline}</p>
          <dl className="mt-10 mb-0 grid gap-x-8 gap-y-5 border-t border-current/15 pt-7 text-[0.92rem] sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(170px,1fr))]">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="opacity-60">{k}</dt>
                <dd className="m-0 mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          {(project.repo || project.live) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="pill border-current/25 bg-transparent text-current">
                  Visit site <ArrowUpRight />
                </a>
              )}
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="pill border-current/25 bg-transparent text-current">
                  <GitHubIcon /> Source code
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main media: the demo video, else the cover screenshot. Skipped until the project has one. */}
      {(hasVideo || coverImage(project)) && (
        <div className="wrap mt-6">
          {hasVideo ? <ProjectVideo project={project} /> : <ProjectCover project={project} priority sizes="(min-width: 1240px) 1160px, 100vw" className="rounded-[28px]" />}
        </div>
      )}

      <Block title="Overview">
        <div className="grid max-w-[40em] gap-5 text-[1.1rem] leading-relaxed">
          {project.story.map((s) => <p key={s.slice(0, 32)} className="m-0">{s}</p>)}
        </div>
      </Block>

      <Block title="What I did">
        <ul className="m-0 grid max-w-[40em] list-none gap-3 p-0 text-[1.05rem]">
          {project.contribution.map((c) => (
            <li key={c} className="grid grid-cols-[24px_1fr] gap-3">
              <CheckIcon className="mt-1 size-5 text-ink-3" />
              {c}
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Key features">
        <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
          {project.features.map((f, n) => (
            <li key={f} className="rounded-2xl bg-soft p-6">
              <span className="font-display text-sm font-bold text-ink-3">{String(n + 1).padStart(2, "0")}</span>
              <p className="mt-2 mb-0 text-[1.05rem] font-medium">{f}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="How it fits together">
        <figure className="m-0 rounded-2xl bg-soft p-[clamp(20px,4vw,40px)]">
          <BlockDiagram stages={project.diagram} label={`${project.name} system diagram`} />
          <figcaption className="mt-6 text-sm text-ink-3">From the device to the data. Built with {project.stack.join(", ")}.</figcaption>
        </figure>
      </Block>

      {project.gallery && project.gallery.length > 0 && (
        <Block title="Screenshots">
          <div className="grid gap-4 sm:grid-cols-2">
            {project.gallery.map((g) => (
              <figure key={g.src} className="m-0">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-soft">
                  <Image src={g.src} alt={g.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-2 text-sm text-ink-3">{g.alt}</figcaption>
              </figure>
            ))}
          </div>
        </Block>
      )}

      {/* Next project */}
      <nav aria-label="Next project" className="wrap mt-8">
        <Link
          href={`/work/${next.slug}`}
          className="panel panel-link flex flex-wrap items-end justify-between gap-6 px-6 py-10 no-underline sm:px-12 sm:py-14"
          style={{ "--p-bg": next.panel.bg, "--p-fg": next.panel.fg } as CSSProperties}
        >
          <span>
            <span className="kicker block opacity-70">Next project</span>
            <span className="mt-2 block font-display text-[clamp(2.4rem,6vw,4.2rem)] leading-none font-bold tracking-[-0.04em]">{next.name}</span>
            <span className="mt-3 block opacity-80">{next.tagline}</span>
          </span>
          <ArrowRight className="size-10 shrink-0" />
        </Link>
      </nav>
      <div className="h-16" />
    </article>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  const id = `${title.toLowerCase().replace(/\s+/g, "-")}-h`;
  return (
    <section aria-labelledby={id} className="wrap">
      <div className="grid gap-6 border-b border-line py-14 lg:grid-cols-[280px_1fr] lg:gap-16 lg:py-20">
        <h2 id={id} className="m-0 text-[clamp(1.6rem,3vw,2.1rem)]">{title}</h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

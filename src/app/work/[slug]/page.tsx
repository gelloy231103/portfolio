import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { DeviceMock } from "@/components/device-mock";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { ProjectPills, StackTags } from "@/components/project-meta";
import { ProjectVideo } from "@/components/project-video";
import { getProject, projects } from "@/content/projects";
import { mediaUrl } from "@/lib/media";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

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
    openGraph: { title: project.name, description: project.summary, url: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const hasVideo = Boolean(project.video && mediaUrl(project.video.file));

  return (
    <article className="wrap pt-8 pb-[clamp(48px,7vw,96px)]">
      <Link href="/#work" className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-muted no-underline hover:text-ink">
        <ArrowLeft className="size-4" /> All work
      </Link>

      <header className="mt-8 grid gap-4">
        <ProjectPills project={project} />
        <h1 className="text-[clamp(2.6rem,7vw,5.2rem)] leading-[0.95] font-extrabold tracking-[-0.04em]">{project.name}</h1>
        <p className="m-0 max-w-[60ch] text-[clamp(1.05rem,1.5vw,1.25rem)] text-muted">{project.summary}</p>
      </header>

      <div className="mt-10">
        {hasVideo ? (
          <ProjectVideo project={project} />
        ) : (
          <div className="stage min-h-[300px] rounded-2xl border border-line md:min-h-[420px]" style={{ "--h": project.hue } as CSSProperties}>
            <DeviceMock kind={project.mock} />
          </div>
        )}
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-[1.5fr_1fr]">
        <div className="min-w-0">
          <h2 className="label mb-3">The story</h2>
          {project.story.map((s) => (
            <p key={s.slice(0, 24)} className="mt-0 mb-4 max-w-[62ch] text-[1.05rem]">{s}</p>
          ))}
          <h2 className="label mt-9 mb-3">Highlights</h2>
          <ul className="feat m-0 grid list-none gap-2.5 p-0">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3">{f}</li>
            ))}
          </ul>
        </div>
        <aside className="grid content-start gap-5 self-start rounded-2xl border border-line bg-surface p-6" aria-label="Project facts">
          {project.award && <Fact label="Recognition">{project.award}</Fact>}
          <Fact label="My role">{project.role}</Fact>
          <Fact label="Built with"><StackTags stack={project.stack} /></Fact>
          <Fact label="Status">{project.status} · {MONTHS[project.month - 1]} {project.year}</Fact>
          <div className="flex flex-wrap gap-2.5 pt-1">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Open live site <ArrowUpRight /></a>
            )}
            {project.repo ? (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn">View code <ArrowUpRight /></a>
            ) : (
              <span className="pill">Code is private</span>
            )}
          </div>
        </aside>
      </div>

      <nav aria-label="More projects" className="mt-16 grid gap-3 border-t border-line pt-8 sm:grid-cols-2">
        <Link href={`/work/${prev.slug}`} className="rounded-2xl border border-line bg-surface p-5 no-underline transition-colors hover:border-muted">
          <span className="label">Previous</span>
          <b className="mt-1 block font-display text-xl font-semibold">{prev.name}</b>
        </Link>
        <Link href={`/work/${next.slug}`} className="rounded-2xl border border-line bg-surface p-5 text-right no-underline transition-colors hover:border-muted">
          <span className="label">Next</span>
          <b className="mt-1 block font-display text-xl font-semibold">{next.name}</b>
        </Link>
      </nav>
    </article>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1">
      <span className="label">{label}</span>
      <div className="font-medium">{children}</div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BlockDiagram } from "@/components/block-diagram";
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

  return (
    <article>
      <header className="wrap pt-12 pb-10 sm:pt-16">
        <Link href="/#work" className="a font-mono text-[0.78rem] text-ink-3">← All work</Link>
        <h1 className="mt-8 mb-0 text-[clamp(2rem,5vw,2.9rem)]">{project.name}</h1>
        <p className="mt-2 mb-0 max-w-[34em] text-[1.15rem] text-ink-2 italic">{project.tagline}</p>
        <p className="meta mt-4 mb-0">
          {project.kind} · {project.context} · {project.status}, {monthYear(project)}
          {project.award && <span className="text-accent"> · {project.award}</span>}
        </p>
      </header>

      {(hasVideo || project.video?.poster) && (
        <div className="wrap pb-12">
          {hasVideo ? (
            <ProjectVideo project={project} />
          ) : (
            <Image
              src={project.video!.poster}
              alt={`${project.name} screenshot`}
              width={1280}
              height={720}
              priority
              sizes="(min-width: 980px) 916px, 100vw"
              className="block h-auto w-full border border-rule"
            />
          )}
        </div>
      )}

      <Row label="Overview">
        <div className="grid max-w-[34em] gap-4">
          {project.story.map((s) => <p key={s.slice(0, 32)} className="m-0">{s}</p>)}
        </div>
      </Row>

      <Row label="My part">
        <p className="mt-0 mb-3 max-w-[34em]">
          {project.team === "Solo" ? "I built this one on my own:" : `${project.role}. Team: ${project.team.toLowerCase()}.`}
        </p>
        <ul className="dash max-w-[34em]">
          {project.contribution.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </Row>

      <Row label="Features">
        <ul className="dash max-w-[34em]">
          {project.features.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </Row>

      <Row label="How it fits together">
        <BlockDiagram stages={project.diagram} label={`${project.name} system diagram`} />
        <p className="meta mt-6 mb-0">
          Built with {project.stack.join(", ")}.{" "}
          {project.repo ? (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className="a">Source on GitHub</a>
          ) : (
            "The source is in a private repository."
          )}
          {project.live && (
            <> · <a href={project.live} target="_blank" rel="noopener noreferrer" className="a">Live site</a></>
          )}
        </p>
      </Row>

      <nav aria-label="More projects" className="wrap">
        <div className="flex flex-wrap justify-between gap-4 border-t border-rule pt-8">
          <Link href={`/work/${prev.slug}`} className="a">← {prev.name}</Link>
          <Link href={`/work/${next.slug}`} className="a">{next.name} →</Link>
        </div>
      </nav>
    </article>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="wrap">
      <div className="row border-t border-rule pt-8 pb-12">
        <h2 className="label m-0 pt-1.5 font-normal">{label}</h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

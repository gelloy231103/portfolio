import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlockDiagram } from "@/components/block-diagram";
import { ArrowLeft, ArrowUpRight } from "@/components/icons";
import { ProjectVideo } from "@/components/project-video";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
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
    title: `${project.name} (${project.code})`,
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
  let figure = 0;
  let section = 0;
  const nextSection = () => String(++section).padStart(2, "0");

  return (
    <article>
      <header className="pad grid-bg border-b border-hair pt-8 pb-10">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.72rem] tracking-[0.08em] text-ink-2">
          <Link href="/#projects" className="inline-flex items-center gap-2 text-ink no-underline hover:text-mark">
            <ArrowLeft className="size-3.5" /> APPLICATION NOTES
          </Link>
          <span>APPLICATION NOTE {project.code} · REV {site.revision}</span>
        </div>
        <h1 className="mt-8 mb-0 font-cond text-[clamp(2.6rem,7vw,5rem)] leading-[0.95] font-bold tracking-[-0.01em] uppercase">{project.name}</h1>
        <p className="mt-3 mb-0 max-w-[60ch] font-cond text-[clamp(1.15rem,2vw,1.4rem)] font-medium text-ink-2">{project.tagline}</p>
        <div className="mt-5 flex flex-wrap gap-2 font-mono text-[0.72rem] tracking-wide">
          <span className="border border-ink px-2 py-1">{project.kind.toUpperCase()}</span>
          <span className="border border-ink px-2 py-1">{project.context.toUpperCase()}</span>
          <span className="border border-ink px-2 py-1">{project.year}</span>
          {project.award && <span className="border border-mark bg-mark px-2 py-1 text-[var(--on-mark)]">{project.award.toUpperCase()}</span>}
        </div>
      </header>

      <section className="pad py-12" aria-labelledby="overview-h">
        <SectionHead no={nextSection()} id="overview-h" title="Overview" aside="Specifications" />
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div className="min-w-0">
            {project.story.map((s) => (
              <p key={s.slice(0, 32)} className="mt-0 mb-4 max-w-[64ch] text-[1.05rem]">{s}</p>
            ))}
          </div>
          <table className="spec self-start" aria-label="Specifications">
            <tbody>
              <tr><th scope="row">Platform</th><td>{project.kind}</td></tr>
              <tr><th scope="row">Team</th><td>{project.team}</td></tr>
              <tr><th scope="row">My role</th><td>{project.role}</td></tr>
              <tr><th scope="row">Stack</th><td>{project.stack.join(", ")}</td></tr>
              <tr><th scope="row">Status</th><td>{project.status} · {MONTHS[project.month - 1]} {project.year}</td></tr>
              {project.award && <tr><th scope="row">Recognition</th><td className="font-semibold text-mark">{project.award}</td></tr>}
              <tr>
                <th scope="row">Source</th>
                <td>
                  {project.repo ? (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="a inline-flex items-center gap-1">
                      View on GitHub <ArrowUpRight className="size-3.5" />
                    </a>
                  ) : (
                    "Private repository"
                  )}
                </td>
              </tr>
              {project.live && (
                <tr><th scope="row">Live</th><td><a href={project.live} target="_blank" rel="noopener noreferrer" className="a">Open the site</a></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {hasVideo && (
        <section className="pad pb-12" aria-labelledby="demo-h">
          <SectionHead no={nextSection()} id="demo-h" title="Demonstration" />
          <ProjectVideo project={project} figure={++figure} />
        </section>
      )}

      <section className="pad pb-12" aria-labelledby="system-h">
        <SectionHead no={nextSection()} id="system-h" title="System block diagram" />
        <figure className="figure m-0">
          <BlockDiagram stages={project.diagram} label={`${project.name} system block diagram`} />
          <figcaption><b>Figure {++figure}.</b>{project.name} at a glance, from the device to the data.</figcaption>
        </figure>
      </section>

      <section className="pad pb-14" aria-labelledby="contrib-h">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHead no={nextSection()} id="contrib-h" title="My contribution" />
            <ul className="bullets">
              {project.contribution.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
          <div>
            <SectionHead no={nextSection()} id="features-h" title="Key features" />
            <ul className="bullets">
              {project.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <nav aria-label="More application notes" className="grid border-t-2 border-ink sm:grid-cols-2">
        <Link href={`/work/${prev.slug}`} className="pad block border-b border-hair py-5 text-ink no-underline hover:bg-fill sm:border-r sm:border-b-0">
          <span className="mono-label">← Previous · {prev.code}</span>
          <b className="mt-1 block font-cond text-xl font-semibold">{prev.name}</b>
        </Link>
        <Link href={`/work/${next.slug}`} className="pad block py-5 text-right text-ink no-underline hover:bg-fill">
          <span className="mono-label">Next · {next.code} →</span>
          <b className="mt-1 block font-cond text-xl font-semibold">{next.name}</b>
        </Link>
      </nav>
    </article>
  );
}

function SectionHead({ no, id, title, aside }: { no: string; id: string; title: string; aside?: string }) {
  return (
    <div className="sec-head">
      <span className="no">{no}</span>
      <h2 id={id}>{title}</h2>
      {aside && <span className="aside max-sm:hidden">{aside}</span>}
    </div>
  );
}

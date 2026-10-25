import Image from "next/image";
import Link from "next/link";
import { BlockDiagram } from "@/components/block-diagram";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { ArrowUpRight, FileIcon, GitHubIcon } from "@/components/icons";
import { credentials } from "@/content/credentials";
import { experience } from "@/content/experience";
import { projectsNewestFirst } from "@/content/projects";
import { site } from "@/content/site";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const howIBuild = [
  { label: "Input", blocks: ["Idea or brief", "Requirements"] },
  { label: "Interface", blocks: ["React · Next.js", "Flutter · React Native", "Unity · C#"] },
  { label: "Services", blocks: ["Node.js APIs", "Supabase · Postgres", "Firebase"] },
  { label: "Output", blocks: ["Web apps on Vercel", "Mobile apps", "Games"] },
];

export default function HomePage() {
  const withVideo = projectsNewestFirst.filter((p) => p.video);
  const stack = Array.from(new Set(projectsNewestFirst.flatMap((p) => p.stack)));

  return (
    <>
      {/* Title block */}
      <section className="pad grid-bg border-b border-hair pt-10 pb-12 sm:pt-14" aria-labelledby="name">
        <div className="flex flex-wrap justify-between gap-2 font-mono text-[0.72rem] tracking-[0.08em] text-ink-2">
          <span>PERSONAL DATASHEET</span>
          <span>{site.initials}-{site.copyrightYear} · REV {site.revision}</span>
        </div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div className="min-w-0 bg-sheet/80">
            <h1 id="name" className="m-0 font-cond text-[clamp(2.9rem,8.5vw,6.4rem)] leading-[0.92] font-bold tracking-[-0.02em] uppercase">
              Louise Angello
              <br />
              Cabaña
            </h1>
            <p className="rev-mark mt-6 mb-0 font-cond text-[clamp(1.2rem,2.4vw,1.55rem)] leading-snug font-semibold">
              {site.role}
              <span className="font-medium text-ink-2"> · {site.employer}</span>
            </p>
            <p className="mt-2 mb-0 max-w-[46ch] text-[1.05rem] text-ink-2">{site.headline}</p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Link href="#projects" className="btn btn-solid">View projects</Link>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn"><GitHubIcon /> GitHub</a>
              {site.resume && (
                <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn"><FileIcon /> Résumé (PDF)</a>
              )}
              <Link href="#contact" className="btn">Contact</Link>
            </div>
          </div>
          <table className="spec bg-sheet" aria-label="At a glance">
            <thead>
              <tr><th colSpan={2}>At a glance</th></tr>
            </thead>
            <tbody>
              <tr><th scope="row">Current role</th><td>{site.role}</td></tr>
              <tr><th scope="row">Organization</th><td>{site.employer}</td></tr>
              <tr><th scope="row">Builds</th><td>Web apps · Mobile apps · Games</td></tr>
              <tr><th scope="row">Projects</th><td>{projectsNewestFirst.length} shipped or in progress</td></tr>
              <tr><th scope="row">Tools</th><td>{stack.slice(0, 7).join(", ")} + {stack.length - 7} more</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 01 Features / Description */}
      <section className="pad py-12" aria-labelledby="features-h">
        <SectionHead no="01" id="features-h" title="Features" aside="Description" />
        <div className="grid gap-10 md:grid-cols-2">
          <ul className="bullets">
            <li>Builds full-stack web apps with Next.js, Node.js and Supabase, deployed on Vercel</li>
            <li>Ships mobile apps in Flutter and React Native, backed by Firebase</li>
            <li>Makes 3D games in Unity and C#, including a Top 8 finalist at Young Creative Challenges</li>
            <li>Takes products end to end: interface, database, payments and deployment</li>
            <li>Currently a {site.role} at the {site.employer}</li>
          </ul>
          <div className="grid gap-3 text-ink-2">
            <p className="m-0">
              I like taking an idea all the way: planning it, building it, and putting it in front of the people it&apos;s for. My work ranges
              from an invitation-website business with payments and RSVPs, to a study app with encrypted profiles, to an app that teaches sign
              language, to a Unity game built for my capstone.
            </p>
            <p className="m-0">I care about the details people notice: pages that load fast, screens that are clear, and things that work on a phone first.</p>
          </div>
        </div>
      </section>

      {/* 02 Functional block diagram */}
      <section className="pad pb-12" aria-labelledby="diagram-h">
        <SectionHead no="02" id="diagram-h" title="Functional block diagram" />
        <figure className="figure m-0">
          <BlockDiagram stages={howIBuild} label="How I build, from requirements to shipped product" />
          <figcaption><b>Figure 1.</b>How I build: from an idea to a product people can use.</figcaption>
        </figure>
      </section>

      {/* 03 Application notes */}
      <section id="projects" className="pad scroll-mt-16 pb-12" aria-labelledby="projects-h">
        <SectionHead no="03" id="projects-h" title="Application notes" aside={`${projectsNewestFirst.length} projects`} />
        <ol className="m-0 list-none border-t border-ink p-0">
          {projectsNewestFirst.map((p) => (
            <li key={p.slug} className="border-b border-hair">
              <Link
                href={`/work/${p.slug}`}
                className="group grid grid-cols-[64px_1fr_auto] items-baseline gap-x-4 gap-y-1 px-1 py-4 text-ink no-underline transition-colors hover:bg-fill sm:grid-cols-[72px_minmax(0,1.6fr)_minmax(0,1fr)_70px_24px]"
              >
                <span className="font-mono text-[0.8rem] font-semibold text-mark">{p.code}</span>
                <span className="min-w-0">
                  <span className="block font-cond text-[1.35rem] leading-tight font-semibold">{p.name}</span>
                  <span className="block text-[0.92rem] text-ink-2">{p.tagline}</span>
                </span>
                <span className="col-start-2 font-mono text-[0.75rem] text-ink-2 sm:col-start-auto">{p.kind} · {p.stack.slice(0, 3).join(", ")}</span>
                <span className="col-start-3 row-start-1 font-mono text-[0.75rem] text-ink-2 sm:col-start-auto sm:row-start-auto">{MONTHS[p.month - 1]} {p.year}</span>
                <ArrowUpRight className="hidden size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:block" />
              </Link>
            </li>
          ))}
        </ol>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {withVideo.map((p, i) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="figure group block text-ink no-underline">
              <div className="relative aspect-video overflow-hidden bg-black">
                <Image src={p.video!.poster} alt={`${p.name} demo`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                <span className="absolute right-2 bottom-2 bg-ink px-2 py-1 font-mono text-[0.66rem] tracking-wide text-sheet">▶ VIDEO</span>
              </div>
              <figcaption>
                <b>Figure {i + 2}.</b>
                {p.name}, {p.code}
              </figcaption>
            </Link>
          ))}
        </div>
      </section>

      {/* 04 Revision history */}
      <section id="history" className="pad scroll-mt-16 pb-12" aria-labelledby="history-h">
        <SectionHead no="04" id="history-h" title="Revision history" />
        <div className="overflow-x-auto">
          <table className="spec min-w-[520px]">
            <thead>
              <tr><th className="w-[120px]">Date</th><th>Change</th></tr>
            </thead>
            <tbody>
              {experience.map((r) => (
                <tr key={r.title}>
                  <td className="font-mono text-[0.82rem] font-semibold text-mark">{r.period}</td>
                  <td><b className="font-semibold">{r.title}</b>, {r.organization}</td>
                </tr>
              ))}
              {projectsNewestFirst.map((p) => (
                <tr key={p.slug}>
                  <td className="font-mono text-[0.82rem] text-ink-2">{MONTHS[p.month - 1]} {p.year}</td>
                  <td>
                    <Link href={`/work/${p.slug}`} className="a">{p.name}</Link> ({p.code}): {p.status === "In progress" ? "started" : "completed"}, {p.context.toLowerCase()}
                    {p.award ? `. ${p.award}` : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 05 Qualifications */}
      {credentials.length > 0 && (
        <section id="qualifications" className="pad scroll-mt-16 pb-12" aria-labelledby="qual-h">
          <SectionHead no="05" id="qual-h" title="Qualifications" aside="Awards & certificates" />
          <div className="overflow-x-auto">
            <table className="spec min-w-[520px]">
              <thead>
                <tr><th>Title</th><th>Issuer</th><th className="w-[110px]">Date</th></tr>
              </thead>
              <tbody>
                {credentials.map((c) => (
                  <tr key={c.title}>
                    <td>
                      <b className="font-semibold">{c.title}</b>
                      {c.url && <> · <a href={c.url} target="_blank" rel="noopener noreferrer" className="a">verify</a></>}
                    </td>
                    <td className="text-ink-2">{c.issuer}</td>
                    <td className="font-mono text-[0.82rem] text-ink-2"><time dateTime={c.date}>{formatMonth(c.date)}</time></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 06 Contact */}
      <section id="contact" className="pad scroll-mt-16 pb-14" aria-labelledby="contact-h">
        <SectionHead no={credentials.length > 0 ? "06" : "05"} id="contact-h" title="Contact" aside="Ordering information" />
        <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
          <div className="grid content-start gap-5">
            <p className="m-0 font-cond text-[clamp(1.6rem,3vw,2.2rem)] leading-tight font-semibold">Have a project or a role in mind?</p>
            <p className="m-0 text-ink-2">Send a message with the form, or copy my e-mail address. I reply by e-mail.</p>
            <div className="grid gap-2.5">
              <CopyEmail email={site.email} />
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn w-full justify-between sm:w-auto">
                github.com/{site.githubHandle} <ArrowUpRight />
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
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

function formatMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

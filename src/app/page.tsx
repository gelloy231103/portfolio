import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { BlockDiagram } from "@/components/block-diagram";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { ArrowRight, ArrowUpRight, FileIcon, GamepadIcon, GitHubIcon, GlobeIcon, PhoneIcon, TrophyIcon } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { credentials } from "@/content/credentials";
import { experience } from "@/content/experience";
import { projectsNewestFirst, type Project } from "@/content/projects";
import { site } from "@/content/site";
import { formatMonth, monthYear } from "@/lib/dates";

const howIBuild = [
  { label: "Idea", blocks: ["Brief or problem", "Requirements"] },
  { label: "Interface", blocks: ["React · Next.js", "Flutter · React Native", "Unity · C#"] },
  { label: "Services", blocks: ["Node.js APIs", "Supabase · Postgres", "Firebase"] },
  { label: "Ship", blocks: ["Web apps on Vercel", "Mobile apps", "Games"] },
];

const capabilities = [
  {
    icon: GlobeIcon,
    title: "Web apps",
    body: "Full-stack products with Next.js, React, Node.js and Supabase, from database design and auth to payments and deployment on Vercel.",
    tools: ["Next.js", "React", "TypeScript", "Supabase", "Node.js"],
  },
  {
    icon: PhoneIcon,
    title: "Mobile apps",
    body: "Cross-platform apps in Flutter and React Native, backed by Firebase, designed phone-first with clear flows and fast screens.",
    tools: ["Flutter", "Dart", "React Native", "Expo", "Firebase"],
  },
  {
    icon: GamepadIcon,
    title: "Games",
    body: "3D games in Unity and C#, with story cutscenes, phase-based game logic and scoring. Our capstone placed Top 8 at Young Creative Challenges.",
    tools: ["Unity", "C#", "Timeline", "Cinemachine"],
  },
];

export default function HomePage() {
  const stack = Array.from(new Set(projectsNewestFirst.flatMap((p) => p.stack)));
  const award = credentials.find((c) => c.kind === "Award");
  const stats = [
    { value: String(projectsNewestFirst.length), label: "Projects built" },
    { value: "3", label: "Platforms" },
    { value: award ? "Top 8" : String(stack.length), label: award ? "Young Creative Challenges" : "Tools in use" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28" aria-labelledby="hero-h">
        <div className="dot-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="glow absolute -top-40 left-1/2 -z-10 h-[620px] w-[min(1100px,140vw)] -translate-x-1/2" aria-hidden="true" />
        <div className="container-x">
          <p className="rise m-0 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pr-4 pl-2 text-[0.85rem] text-ink-2 shadow-[var(--shadow)] backdrop-blur">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            {site.role}
            <span className="max-sm:hidden"> at the {site.employer}</span>
          </p>
          <h1 id="hero-h" className="rise mt-7 mb-0 max-w-[16ch] text-[clamp(2.75rem,8vw,6.25rem)] leading-[0.98] font-semibold tracking-[-0.045em]" style={{ "--d": "80ms" } as CSSProperties}>
            {site.shortName}
            <span className="text-ink-3">,</span>
            <br />
            <span className="serif text-accent-ink">building</span> for web, mobile <span className="serif">&amp;</span> games.
          </h1>
          <p className="rise lead mt-7 mb-0 max-w-[56ch]" style={{ "--d": "160ms" } as CSSProperties}>
            I&apos;m a full-stack developer who takes ideas all the way, from the database to the last pixel. I care about the details people
            notice: pages that load fast, screens that are clear, and apps that work on a phone first.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--d": "240ms" } as CSSProperties}>
            <Link href="#work" className="btn btn-primary">
              View my work <ArrowRight className="arrow" />
            </Link>
            <Link href="#contact" className="btn">Get in touch</Link>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn">
              <GitHubIcon /> GitHub
            </a>
            {site.resume && (
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn">
                <FileIcon /> Résumé
              </a>
            )}
          </div>
          <dl className="rise mt-16 grid max-w-3xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line" style={{ "--d": "320ms" } as CSSProperties}>
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse justify-end bg-surface/90 px-4 py-5 backdrop-blur sm:px-6">
                <dt className="mt-2 text-[0.8rem] leading-snug text-ink-3">{s.label}</dt>
                <dd className="m-0 text-[clamp(1.6rem,3.6vw,2.4rem)] leading-none font-semibold tracking-tight">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Toolbox marquee */}
      <section aria-label="Tools I use" className="border-y border-line bg-surface/60 py-5">
        <div className="marquee">
          <ul className="marquee-track m-0 list-none p-0">
            {[...stack, ...stack].map((t, i) => (
              <li key={`${t}-${i}`} aria-hidden={i >= stack.length || undefined} className="flex items-center gap-3 font-mono text-[0.85rem] whitespace-nowrap text-ink-2">
                {t}
                <span className="size-1 rounded-full bg-line-strong" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="section scroll-mt-20" aria-labelledby="work-h">
        <div className="container-x">
          <SectionIntro eyebrow="Selected work" id="work-h" title={<>Things I&apos;ve <span className="serif">built</span></>}>
            Five projects across web, mobile and games: solo products I took from idea to launch, and team projects where I owned a major
            piece.
          </SectionIntro>
          <ul className="m-0 grid list-none gap-5 p-0 md:grid-cols-2 lg:gap-6">
            {projectsNewestFirst.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--d": `${(i % 2) * 90}ms` } as CSSProperties} className={i === 0 ? "md:col-span-2" : ""}>
                <ProjectCard project={p} featured={i === 0} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About */}
      <section id="about" className="section scroll-mt-20 border-t border-line bg-surface/50" aria-labelledby="about-h">
        <div className="container-x">
          <SectionIntro eyebrow="What I do" id="about-h" title={<>One developer, <span className="serif">every layer</span></>}>
            I like taking an idea all the way: planning it, building it, and putting it in front of the people it&apos;s for. My work ranges from
            an invitation-website business with payments and RSVPs, to a study app with encrypted profiles, to an app that teaches sign
            language, to a Unity game built for my capstone.
          </SectionIntro>
          <div className="grid gap-5 md:grid-cols-3">
            {capabilities.map((c, i) => (
              <article key={c.title} data-reveal style={{ "--d": `${i * 90}ms` } as CSSProperties} className="card card-hover flex flex-col p-7">
                <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent-ink">
                  <c.icon className="size-[22px]" />
                </span>
                <h3 className="mt-6 mb-0 text-xl font-semibold">{c.title}</h3>
                <p className="mt-2.5 mb-6 text-[0.95rem] text-ink-2">{c.body}</p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {c.tools.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </article>
            ))}
          </div>

          <figure data-reveal className="card m-0 mt-5 overflow-hidden">
            <div className="relative p-[clamp(20px,4vw,40px)]">
              <div className="dot-grid absolute inset-0 opacity-60 [mask-image:none]" aria-hidden="true" />
              <div className="relative">
                <BlockDiagram stages={howIBuild} label="How I build, from an idea to a shipped product" />
              </div>
            </div>
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-6 py-4 text-sm text-ink-2">
              <span><b className="font-semibold text-ink">How I build.</b> From an idea to a product people can use.</span>
              <span className="font-mono text-xs text-ink-3">{stack.length} tools across {projectsNewestFirst.length} projects</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section scroll-mt-20 border-t border-line" aria-labelledby="exp-h">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionIntro eyebrow="Experience" id="exp-h" title={<>Where I&apos;ve <span className="serif">been</span></>} tight>
              My current role, and the projects I&apos;ve shipped along the way.
            </SectionIntro>
            {credentials.length > 0 && (
              <div data-reveal className="card overflow-hidden">
                <p className="m-0 flex items-center gap-2 border-b border-line px-6 py-3.5 font-mono text-xs tracking-[0.08em] text-ink-3 uppercase">
                  <TrophyIcon className="size-4 text-gold" /> Recognition
                </p>
                <ul className="m-0 grid list-none gap-0 p-0">
                  {credentials.map((c) => (
                    <li key={c.title} className="border-b border-line px-6 py-5 last:border-b-0">
                      <p className="m-0 font-semibold leading-snug">{c.title}</p>
                      <p className="mt-1 mb-0 text-sm text-ink-2">
                        {c.issuer} · <time dateTime={c.date}>{formatMonth(c.date)}</time>
                        {c.url && <> · <a href={c.url} target="_blank" rel="noopener noreferrer" className="a">Verify</a></>}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <ol className="relative m-0 list-none p-0 before:absolute before:top-3 before:bottom-3 before:left-[7px] before:w-px before:bg-line-strong">
            {experience.map((r) => (
              <li key={r.title} data-reveal className="relative pb-10 pl-10">
                <span className="absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border-2 border-accent bg-bg">
                  <span className="size-[5px] rounded-full bg-accent" />
                </span>
                <p className="m-0 font-mono text-xs tracking-[0.06em] text-accent-ink uppercase">{r.period}</p>
                <div className="card mt-3 p-6">
                  <h3 className="m-0 text-xl font-semibold">{r.title}</h3>
                  <p className="mt-1 mb-0 text-ink-2">{r.organization}</p>
                </div>
              </li>
            ))}
            {projectsNewestFirst.map((p) => (
              <li key={p.slug} data-reveal className="relative pb-8 pl-10 last:pb-0">
                <span className="absolute top-2 left-[3px] size-[9px] rounded-full bg-line-strong ring-4 ring-bg" />
                <p className="m-0 font-mono text-xs tracking-[0.06em] text-ink-3 uppercase">{monthYear(p)}</p>
                <Link href={`/work/${p.slug}`} className="group mt-1.5 flex items-start justify-between gap-4 text-ink no-underline">
                  <span>
                    <span className="font-semibold group-hover:text-accent-ink">{p.name}</span>
                    <span className="text-ink-2"> · {p.status === "In progress" ? "In progress" : "Completed"}, {p.context.toLowerCase()}</span>
                    {p.award && <span className="mt-1 block text-sm text-gold">{p.award}</span>}
                  </span>
                  <ArrowUpRight className="mt-1 size-4 shrink-0 text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-ink" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section scroll-mt-20 border-t border-line pb-[clamp(88px,12vw,140px)]" aria-labelledby="contact-h">
        <div className="container-x">
          <div data-reveal className="card relative isolate overflow-hidden p-[clamp(24px,5vw,56px)]">
            <div className="glow absolute -top-48 -right-40 -z-10 size-[560px]" aria-hidden="true" />
            <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              <div className="grid content-start gap-6">
                <span className="eyebrow">Contact</span>
                <h2 id="contact-h" className="h-section">
                  Have a project or a role <span className="serif text-accent-ink">in mind?</span>
                </h2>
                <p className="lead m-0">Send a message with the form or copy my e-mail address. I usually reply within a couple of days.</p>
                <div className="grid gap-3 sm:max-w-sm">
                  <CopyEmail email={site.email} />
                  <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn justify-between">
                    <span className="inline-flex items-center gap-2.5"><GitHubIcon /> github.com/{site.githubHandle}</span>
                    <ArrowUpRight />
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionIntro({ eyebrow, id, title, children, tight }: { eyebrow: string; id: string; title: ReactNode; children?: ReactNode; tight?: boolean }) {
  return (
    <div data-reveal className={`${tight ? "mb-10" : "mb-12 md:mb-16"} grid max-w-3xl gap-5`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="h-section">{title}</h2>
      {children && <p className="lead m-0">{children}</p>}
    </div>
  );
}

function ProjectCard({ project: p, featured }: { project: Project; featured: boolean }) {
  return (
    <Link
      href={`/work/${p.slug}`}
      className={`card card-hover group grid h-full overflow-hidden text-ink no-underline ${featured ? "lg:grid-cols-[1.25fr_1fr]" : ""}`}
    >
      <ProjectCover
        project={p}
        priority={featured}
        sizes={featured ? "(min-width: 1024px) 640px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        className={`aspect-[16/10] border-b border-line ${featured ? "lg:order-2 lg:aspect-auto lg:min-h-[400px] lg:border-b-0 lg:border-l" : ""}`}
      />
      <div className={`flex flex-col p-6 sm:p-7 ${featured ? "lg:p-10" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="chip">
            <span className="size-1.5 rounded-full" style={{ background: p.tint }} />
            {p.kind}
          </span>
          <span className="chip">{monthYear(p)}</span>
          {p.status === "In progress" && <span className="chip chip-accent">In progress</span>}
          {p.award && <span className="chip chip-gold"><TrophyIcon className="size-3.5" />{p.award.split(",")[0]}</span>}
        </div>
        <h3 className={`mt-5 mb-0 font-semibold ${featured ? "text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.05]" : "text-2xl"}`}>{p.name}</h3>
        <p className={`mt-2 mb-0 text-ink-2 ${featured ? "text-lg" : ""}`}>{featured ? p.summary : p.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {p.stack.map((t) => <span key={t} className="font-mono text-xs text-ink-3 after:ml-1.5 after:content-['/'] last:after:content-none">{t}</span>)}
        </div>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-7 text-[0.92rem] font-medium text-ink">
          Read case study
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

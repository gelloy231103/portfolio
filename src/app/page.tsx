import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { ArrowDown, FileIcon, GitHubIcon } from "@/components/icons";
import { WorkGrid } from "@/components/work-grid";
import { credentials } from "@/content/credentials";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { skillGroups } from "@/content/skills";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function HomePage() {
  const tools = new Set(projects.flatMap((p) => p.stack));
  const platforms = new Set(projects.map((p) => p.kind));
  const timeline = [...projects].sort((a, b) => b.year - a.year || b.month - a.month);

  return (
    <>
      {/* Hero */}
      <section className="wrap pt-[clamp(48px,9vw,112px)] pb-[clamp(40px,6vw,72px)]" aria-labelledby="hero-name">
        <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-3.5 pl-2.5 text-[0.86rem] text-muted">
          <span className="pulse" aria-hidden="true" />
          Now building <b className="font-semibold text-ink">{site.currentlyBuilding}</b>
        </span>
        <h1 id="hero-name" className="mt-7 text-[clamp(3rem,10.5vw,8.6rem)] leading-[0.9] font-extrabold tracking-[-0.045em]">
          <span className="rise block">Louise Angello</span>
          <span className="rise block [animation-delay:80ms]">
            <span className="font-normal text-muted">“{site.nickname}”</span> Cabaña
          </span>
        </h1>
        <div className="mt-[clamp(28px,4vw,48px)] grid items-end gap-[clamp(24px,5vw,64px)] md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="m-0 max-w-[34ch] text-[clamp(1.08rem,1.6vw,1.3rem)] leading-relaxed">
              I build{" "}
              <em className="not-italic" style={{ background: "linear-gradient(transparent 62%, var(--accent-soft) 62%)" }}>
                web apps, mobile apps and games
              </em>
              , from the database to the last pixel, and ship them for real people to use.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link href="#work" className="btn btn-primary">See my work <ArrowDown /></Link>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn"><GitHubIcon /> GitHub</a>
              {site.resume && (
                <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn"><FileIcon /> Résumé</a>
              )}
            </div>
          </div>
          <dl className="m-0 grid grid-cols-3 border-t border-line" aria-label="At a glance">
            {[
              [projects.length, "projects built"],
              [tools.size, "tools & languages"],
              [platforms.size, "platforms"],
            ].map(([n, label], i) => (
              <div key={label} className={`pt-4.5 pb-1 ${i > 0 ? "border-l border-line pl-4.5" : ""}`}>
                <dt className="sr-only">{label}</dt>
                <dd className="m-0">
                  <strong className="block font-display text-[clamp(2rem,4vw,2.8rem)] leading-none font-semibold tracking-tight tabular-nums">{n}</strong>
                  <span className="text-[0.85rem] text-muted" aria-hidden="true">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="wrap scroll-mt-20 py-[clamp(48px,7vw,96px)]" aria-labelledby="work-heading">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="work-heading" className="text-[clamp(2rem,4.4vw,3.2rem)] font-semibold tracking-[-0.035em]">Selected work</h2>
            <p className="mt-2 mb-0 max-w-[52ch] text-muted">Open any project for the full story, a demo video where there is one, and my part in it.</p>
          </div>
        </div>
        <WorkGrid />
      </section>

      {/* About */}
      <section id="about" className="wrap scroll-mt-20 py-[clamp(48px,7vw,96px)]" aria-labelledby="about-heading">
        <div className="grid gap-[clamp(28px,5vw,72px)] md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 id="about-heading" className="label mb-3">About</h2>
            <p className="m-0 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight font-normal tracking-tight">
              I like taking an idea all the way: <b className="font-semibold">planning it, building it, and putting it in front of users.</b>
            </p>
          </div>
          <div>
            <p className="mt-0 max-w-[60ch] text-muted">
              My projects range from a full invitation-website business with payments and RSVPs, to a study app with encrypted profiles, to an app
              that teaches sign language, to a 3D learning game built in Unity for my capstone. I care about the details people notice: fast pages,
              clear screens, and things that work on a phone first.
            </p>
            <dl className="mt-2 grid gap-4.5">
              {Object.entries(skillGroups).map(([group, list]) => {
                const used = list.filter((t) => tools.has(t));
                if (used.length === 0) return null;
                return (
                  <div key={group} className="grid items-baseline gap-2 border-t border-line pt-4 md:grid-cols-[120px_1fr] md:gap-4">
                    <dt className="label">{group}</dt>
                    <dd className="m-0 flex flex-wrap gap-1.5">
                      {used.map((t) => <span key={t} className="tag">{t}</span>)}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section id="journey" className="wrap scroll-mt-20 py-[clamp(48px,7vw,96px)]" aria-labelledby="journey-heading">
        <h2 id="journey-heading" className="text-[clamp(2rem,4.4vw,3.2rem)] font-semibold tracking-[-0.035em]">Journey so far</h2>
        <p className="mt-2 mb-7 text-muted">Each project, newest first.</p>
        <ol className="m-0 grid list-none p-0">
          {timeline.map((p) => (
            <li key={p.slug} className="grid grid-cols-[20px_1fr] items-start gap-x-4 sm:grid-cols-[110px_20px_1fr]">
              <span className="col-start-2 font-mono text-[0.8rem] text-muted tabular-nums sm:col-start-1 sm:pt-0.5">
                {MONTHS[p.month - 1]} {p.year}
              </span>
              <span className="tl-dot relative row-span-2 row-start-1 h-full sm:row-span-1 sm:col-start-2" aria-hidden="true" />
              <div className="col-start-2 pb-6.5 sm:col-start-3">
                <Link href={`/work/${p.slug}`} className="font-display text-lg font-semibold underline-offset-4 hover:underline">{p.name}</Link>
                <span className="block text-[0.92rem] text-muted">{p.kind} · {p.context} · {p.stack.slice(0, 3).join(", ")}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Awards & certificates */}
      {credentials.length > 0 && (
        <section id="credentials" className="wrap scroll-mt-20 py-[clamp(32px,5vw,64px)]" aria-labelledby="credentials-heading">
          <h2 id="credentials-heading" className="text-[clamp(2rem,4.4vw,3.2rem)] font-semibold tracking-[-0.035em]">Awards &amp; certificates</h2>
          <ul className="mt-7 grid list-none gap-3 p-0 sm:grid-cols-2">
            {credentials.map((c) => (
              <li key={c.title} className="flex flex-col gap-1.5 rounded-2xl border border-line bg-surface p-5">
                <span className={`pill w-fit ${c.kind === "Award" ? "pill-award" : "pill-team"}`}>{c.kind}</span>
                <b className="font-display text-lg font-semibold">{c.title}</b>
                <span className="text-sm text-muted">{c.issuer} · <time dateTime={c.date}>{formatMonth(c.date)}</time></span>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-accent underline-offset-4 hover:underline">
                    Verify credential
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="wrap scroll-mt-20 py-[clamp(48px,7vw,96px)]" aria-labelledby="contact-heading">
        <div className="grid gap-10 rounded-[28px] bg-ink p-[clamp(28px,6vw,72px)] text-bg lg:grid-cols-[1fr_1.1fr]">
          <div className="grid content-start gap-7">
            <h2 id="contact-heading" className="text-[clamp(2.2rem,6vw,4.6rem)] leading-[0.95] font-extrabold tracking-[-0.04em]">
              Have a project
              <br />
              in mind?
            </h2>
            <p className="m-0 max-w-[48ch] opacity-75">
              I&apos;m open to internships, junior roles, freelance builds and team projects. Send a message here, or copy my e-mail.
            </p>
            <div className="flex flex-wrap gap-3">
              <CopyEmail email={site.email} />
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn border-[color-mix(in_srgb,var(--bg)_30%,transparent)] bg-transparent text-bg">
                github.com/{site.githubHandle}
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function formatMonth(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

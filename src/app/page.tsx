import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { credentials } from "@/content/credentials";
import { experience } from "@/content/experience";
import { projectsNewestFirst } from "@/content/projects";
import { site } from "@/content/site";
import { formatMonth, monthYear } from "@/lib/dates";

export default function HomePage() {
  const stack = Array.from(new Set(projectsNewestFirst.flatMap((p) => p.stack)));

  return (
    <>
      <section className="wrap pt-14 pb-16 sm:pt-20" aria-labelledby="intro-h">
        <div className="max-w-[34em]">
          <h1 id="intro-h" className="m-0 text-[clamp(1.7rem,3.6vw,2.3rem)] leading-[1.25]">
            Hi, I&apos;m {site.nickname}. I build web apps, mobile apps and the occasional game.
          </h1>
          <p className="mt-6 mb-0 text-ink-2">
            I work as a {site.role} at the {site.employer}. Along the way I&apos;ve built a small business that sells wedding invitation
            websites, a flashcard app with encrypted profiles, a sign-language app with two teammates, and one kingdom of a Unity game that
            placed Top 8 at Young Creative Challenges.
          </p>
          <p className="mt-4 mb-0 text-ink-2">I usually work from the database up, and I test everything on my phone first.</p>
          <p className="mt-6 mb-0 font-mono text-[0.8rem]">
            <a href={`mailto:${site.email}`} className="a">{site.email}</a>
            <span className="text-ink-3"> · </span>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="a">GitHub</a>
            {site.resume && (
              <>
                <span className="text-ink-3"> · </span>
                <a href={site.resume} target="_blank" rel="noopener noreferrer" className="a">Résumé (PDF)</a>
              </>
            )}
          </p>
        </div>
      </section>

      <Section id="work" label="Selected work">
        <ol className="m-0 list-none p-0">
          {projectsNewestFirst.map((p) => (
            <li key={p.slug} className="border-t border-rule py-9 first:border-t-0 first:pt-0">
              <article>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="m-0 text-[1.45rem]">
                    <Link href={`/work/${p.slug}`} className="a">{p.name}</Link>
                  </h3>
                  <span className="meta">
                    {monthYear(p)}
                    {p.status === "In progress" ? " · in progress" : ""}
                  </span>
                </div>
                <p className="mt-1 mb-0 text-ink-2 italic">{p.tagline}</p>
                <p className="mt-3 mb-0">{p.summary}</p>
                <p className="meta mt-3 mb-0">
                  {p.kind} · {p.context.replace(" project", "").toLowerCase()} · {p.stack.join(", ")}
                  {p.award && <span className="text-accent"> · {p.award}</span>}
                </p>
                {p.video?.poster && (
                  <Link href={`/work/${p.slug}`} className="mt-5 block border border-rule" tabIndex={-1} aria-hidden="true">
                    <Image src={p.video.poster} alt="" width={1280} height={720} sizes="(min-width: 980px) 720px, 100vw" className="block h-auto w-full" />
                  </Link>
                )}
              </article>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="about" label="About">
        <div className="grid gap-4">
          <p className="m-0">
            I like taking an idea all the way: planning it, building it, and putting it in front of the people it&apos;s for. Most of my
            projects end up full stack, because the parts I enjoy sit between the screen and the database: who can read which row, how an
            order gets from checkout to a receipt, how a page holds up on a phone.
          </p>
          <p className="m-0 text-ink-2">Tools I&apos;ve shipped with: {stack.join(", ")}.</p>
        </div>
      </Section>

      <Section label="Experience">
        <dl className="m-0 grid gap-3">
          {experience.map((r) => (
            <div key={r.title} className="grid gap-x-6 sm:grid-cols-[110px_1fr]">
              <dt className="meta pt-1">{r.period}</dt>
              <dd className="m-0">{r.title}, {r.organization}</dd>
            </div>
          ))}
          {credentials.map((c) => (
            <div key={c.title} className="grid gap-x-6 sm:grid-cols-[110px_1fr]">
              <dt className="meta pt-1"><time dateTime={c.date}>{formatMonth(c.date)}</time></dt>
              <dd className="m-0">
                {c.title}, {c.issuer}
                {c.url && <> (<a href={c.url} target="_blank" rel="noopener noreferrer" className="a">verify</a>)</>}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="contact" label="Contact">
        <div className="grid max-w-[36em] gap-8">
          <div className="grid justify-items-start gap-3">
            <p className="m-0">
              E-mail is the quickest way to reach me. You can also leave a message with the form below and I&apos;ll reply by e-mail.
            </p>
            <CopyEmail email={site.email} />
          </div>
          <ContactForm />
        </div>
      </Section>
    </>
  );
}

function Section({ id, label, children }: { id?: string; label: string; children: ReactNode }) {
  const headingId = `${label.toLowerCase().replace(/\s+/g, "-")}-h`;
  return (
    <section id={id} aria-labelledby={headingId} className="wrap scroll-mt-6">
      <div className="row border-t border-rule pt-8 pb-14">
        <h2 id={headingId} className="label m-0 pt-1.5 font-normal">{label}</h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

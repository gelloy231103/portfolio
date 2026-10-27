import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { ArrowRight, ArrowUpRight, GitHubIcon } from "@/components/icons";
import { WorkShowcase, type ShowcaseItem } from "@/components/work-showcase";
import { awards, certifications, fullName } from "@/content/credentials";
import { experience } from "@/content/experience";
import { coverImage, projects, projectsShowcase } from "@/content/projects";
import { site } from "@/content/site";
import { formatMonth, monthYear } from "@/lib/dates";
import { mediaUrl } from "@/lib/media";

/** Where each hero screenshot rests, and where it moves when the collage fans out on hover. */
type CollagePose = CSSProperties & { "--rest": string; "--fan": string };

const toolGroups = [
  { title: "Web", tools: ["Next.js", "React", "TypeScript", "Node.js", "Supabase", "Postgres", "Tailwind", "Vercel"] },
  { title: "Mobile", tools: ["Flutter", "Dart", "React Native", "Expo", "Firebase"] },
  { title: "Games", tools: ["Unity", "C#", "Timeline", "Cinemachine"] },
];

export default function HomePage() {
  const years = projects.map((p) => p.year);
  const range = `${Math.min(...years)} to ${Math.max(...years)}`;
  const award = awards[0];
  const issuers = Array.from(new Set(certifications.map((c) => c.issuer)));
  // Up to three projects with real screenshots for the hero collage.
  const collage = projectsShowcase.filter((p) => coverImage(p)).slice(0, 3);
  const showcase: ShowcaseItem[] = projectsShowcase.map((p) => {
    const videoSrc = p.video ? mediaUrl(p.video.file) : null;
    return {
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      summary: p.summary,
      kind: p.kind,
      when: monthYear(p),
      role: p.role,
      stack: p.stack,
      result: p.award ? { label: "Result", value: p.award } : { label: "Status", value: `${p.status}, ${monthYear(p)}` },
      cover: coverImage(p) ?? null,
      video: p.video && videoSrc ? { src: videoSrc, poster: p.video.poster, note: p.video.note } : null,
    };
  });

  return (
    <>
      {/* Hero */}
      <section className="wrap grid items-center gap-12 pt-10 pb-16 sm:pt-16 lg:grid-cols-[1.45fr_1fr] lg:gap-16 lg:pb-24" aria-labelledby="hero-h">
        <div>
          <h1 id="hero-h" className="m-0 text-[clamp(3rem,8.2vw,5.6rem)] leading-[0.95] tracking-[-0.045em]">
            I build apps that people actually use.
          </h1>
          <p className="mt-7 mb-0 max-w-[32em] text-[clamp(1.05rem,1.6vw,1.25rem)] leading-relaxed text-ink-2">
            I&apos;m {site.nickname}, a full-stack developer for web, mobile and games. By day I&apos;m a {site.role} at the {site.employer};
            on the side I&apos;m building a wedding-invitation business.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#work" className="pill pill-dark">
              See my work <ArrowRight />
            </Link>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="pill">
              <GitHubIcon /> GitHub
            </a>
          </div>
          <dl className="mt-12 mb-0 grid max-w-xl grid-cols-2 gap-6 text-[0.9rem] sm:grid-cols-3">
            <div>
              <dt className="sr-only">Projects</dt>
              <dd className="m-0 font-semibold text-ink">{projects.length} products</dd>
              <dd className="m-0 text-ink-3">web, mobile, games</dd>
            </div>
            {award && (
              <div>
                <dt className="sr-only">Award</dt>
                <dd className="m-0 font-semibold text-ink">{award.name.split(",")[0].replace(" Finalist", "")}</dd>
                <dd className="m-0 text-ink-3">{award.name.split(",")[1]?.replace(/Season (\d+)/, "S$1").trim()}</dd>
              </div>
            )}
            {certifications.length > 0 ? (
              <div>
                <dt className="sr-only">Certifications</dt>
                <dd className="m-0 font-semibold text-ink">{certifications.length} certifications</dd>
                <dd className="m-0 text-ink-3">{issuers.join(" & ")}</dd>
              </div>
            ) : (
              <div>
                <dt className="sr-only">Scope</dt>
                <dd className="m-0 font-semibold text-ink">End to end</dd>
                <dd className="m-0 text-ink-3">UI, data, payments</dd>
              </div>
            )}
          </dl>
        </div>

        {collage.length > 0 && (
          <div className="collage relative mx-auto aspect-square w-full max-w-[560px] sm:aspect-[5/4] lg:aspect-[4/5]">
            {collage.map((p, i) => {
              const img = coverImage(p)!;
              const pose: CollagePose = [
                { left: "6%", top: "8%", "--rest": "rotate(-4deg)", "--fan": "translate(-7%, -5%) rotate(-9deg)" },
                { right: "5%", top: "36%", "--rest": "rotate(3deg)", "--fan": "translate(7%, 1%) rotate(7deg)" },
                { left: "9%", bottom: "7%", "--rest": "rotate(-1.5deg)", "--fan": "translate(-3%, 7%) rotate(-3deg)" },
              ][i];
              return (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  aria-label={`${p.name} case study`}
                  className="collage-card absolute block w-[78%] overflow-hidden rounded-xl shadow-[0_24px_50px_-18px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
                  style={pose}
                >
                  <Image src={img.src} alt="" width={1280} height={720} priority={i === 0} sizes="(min-width: 1024px) 420px, 78vw" className="block h-auto w-full" />
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* Work */}
      <section id="work" className="wrap scroll-mt-4 pb-8" aria-labelledby="work-h">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-16 sm:mb-10 sm:pt-20">
          <h2 id="work-h" className="m-0 text-[clamp(2.2rem,4.5vw,3rem)]">Selected work</h2>
          <span className="text-ink-3">{range}</span>
        </div>
        <WorkShowcase items={showcase} />
      </section>

      {/* Certifications */}
      {certifications.length > 0 && (
        <section id="certifications" className="wrap scroll-mt-4 pt-20 sm:pt-28" aria-labelledby="certs-h">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 sm:mb-10">
            <h2 id="certs-h" className="m-0 text-[clamp(2.2rem,4.5vw,3rem)]">Certifications</h2>
            {site.credly && (
              <a href={site.credly} target="_blank" rel="noopener noreferrer" className="a inline-flex items-center gap-1.5 text-ink-2">
                Badges on Credly <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <li key={fullName(c)} className="flex flex-col rounded-2xl border border-line p-6 transition-colors hover:border-ink-3">
                <span className="kicker text-ink-3">{c.issuer}</span>
                {c.series && <span className="mt-4 text-sm text-ink-2">{c.series}</span>}
                <h3 className={`${c.series ? "mt-1" : "mt-4"} mb-0 font-sans text-lg leading-snug font-semibold tracking-normal`}>{c.name}</h3>
                <p className="mt-auto mb-0 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pt-6 text-sm text-ink-3">
                  <span>
                    <time dateTime={c.date}>{formatMonth(c.date)}</time>
                    {c.expires && <> · valid until <time dateTime={c.expires}>{formatMonth(c.expires)}</time></>}
                  </span>
                  {c.url && (
                    <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`Verify ${fullName(c)}`} className="a inline-flex items-center gap-1 font-medium text-ink">
                      Verify <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* About */}
      <section id="about" className="wrap scroll-mt-4 py-20 sm:py-28" aria-labelledby="about-h">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <h2 id="about-h" className="m-0 text-[clamp(2.2rem,4.5vw,3rem)]">About me</h2>
          <div>
            <p className="mt-0 mb-5 text-[clamp(1.15rem,1.8vw,1.35rem)] leading-relaxed">
              I like taking an idea all the way: planning it, building it, and putting it in front of the people it&apos;s for.
            </p>
            <p className="mt-0 mb-5 leading-relaxed text-ink-2">
              My work ranges from an invitation-website business with payments and RSVPs, to a study app with encrypted profiles, to an app
              that teaches sign language, to a Unity game that placed Top 8 at Young Creative Challenges. Most of it ends up full stack:
              interface, database, payments and deployment.
            </p>
            <p className="m-0 leading-relaxed text-ink-2">I care about the details people notice: pages that load fast, screens that are clear, and apps that work on a phone first.</p>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {toolGroups.map((g) => (
                <div key={g.title}>
                  <h3 className="kicker m-0 font-sans tracking-[0.06em] text-ink-3">{g.title}</h3>
                  <ul className="mt-3 mb-0 grid list-none gap-1.5 p-0">
                    {g.tools.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="kicker mt-14 mb-0 font-sans tracking-[0.06em] text-ink-3">Experience &amp; recognition</h3>
            <ul className="mt-3 mb-0 list-none p-0">
              {experience.map((r) => (
                <li key={r.title} className="grid gap-x-6 border-b border-line py-4 sm:grid-cols-[120px_1fr]">
                  <span className="text-ink-3">{r.period}</span>
                  <span><b className="font-semibold">{r.title}</b>, {r.organization}</span>
                </li>
              ))}
              {awards.map((c) => (
                <li key={c.name} className="grid gap-x-6 border-b border-line py-4 sm:grid-cols-[120px_1fr]">
                  <time dateTime={c.date} className="text-ink-3">{formatMonth(c.date)}</time>
                  <span>
                    <b className="font-semibold">{c.name}</b>, {c.issuer}
                    {c.url && <> · <a href={c.url} target="_blank" rel="noopener noreferrer" className="a">verify</a></>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="wrap scroll-mt-4 pb-16" aria-labelledby="contact-h">
        <div className="grid gap-12 rounded-[28px] bg-invert-bg p-7 text-invert-ink sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-16">
          <div>
            <h2 id="contact-h" className="m-0 text-[clamp(2.4rem,5vw,3.6rem)]">Have a project or a role in mind?</h2>
            <p className="mt-6 mb-0 max-w-[28em] text-[1.05rem] leading-relaxed opacity-75">
              Send me a message with the form, or e-mail me directly. I reply by e-mail.
            </p>
            <div className="mt-8">
              <CopyEmail email={site.email} />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

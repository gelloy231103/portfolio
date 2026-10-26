import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { ArrowRight, GitHubIcon } from "@/components/icons";
import { ProjectPanel } from "@/components/project-panel";
import { credentials } from "@/content/credentials";
import { experience } from "@/content/experience";
import { coverImage, projects, projectsShowcase } from "@/content/projects";
import { site } from "@/content/site";
import { formatMonth } from "@/lib/dates";

const toolGroups = [
  { title: "Web", tools: ["Next.js", "React", "TypeScript", "Node.js", "Supabase", "Postgres", "Tailwind", "Vercel"] },
  { title: "Mobile", tools: ["Flutter", "Dart", "React Native", "Expo", "Firebase"] },
  { title: "Games", tools: ["Unity", "C#", "Timeline", "Cinemachine"] },
];

export default function HomePage() {
  const years = projects.map((p) => p.year);
  const range = `${Math.min(...years)} to ${Math.max(...years)}`;
  const award = credentials.find((c) => c.kind === "Award");
  // Up to three real screenshots for the hero collage.
  const collage = projectsShowcase.map((p) => coverImage(p)).filter((i): i is { src: string; alt: string } => Boolean(i)).slice(0, 3);

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
                <dd className="m-0 font-semibold text-ink">{award.title.split(",")[0].replace(" Finalist", "")}</dd>
                <dd className="m-0 text-ink-3">{award.title.split(",")[1]?.replace(/Season (\d+)/, "S$1").trim()}</dd>
              </div>
            )}
            <div>
              <dt className="sr-only">Scope</dt>
              <dd className="m-0 font-semibold text-ink">End to end</dd>
              <dd className="m-0 text-ink-3">UI, data, payments</dd>
            </div>
          </dl>
        </div>

        {collage.length > 0 && (
          <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-[560px] sm:aspect-[5/4] lg:aspect-[4/5]">
            <div className="absolute inset-0 rounded-[28px] bg-soft" />
            {collage.map((img, i) => (
              <div
                key={img.src}
                className="absolute w-[78%] overflow-hidden rounded-xl shadow-[0_24px_50px_-18px_rgba(0,0,0,0.45)] ring-1 ring-black/5"
                style={[
                  { left: "6%", top: "8%", transform: "rotate(-4deg)" },
                  { right: "5%", top: "36%", transform: "rotate(3deg)" },
                  { left: "9%", bottom: "7%", transform: "rotate(-1.5deg)" },
                ][i]}
              >
                <Image src={img.src} alt="" width={1280} height={720} priority={i === 0} sizes="(min-width: 1024px) 420px, 78vw" className="block h-auto w-full" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Work */}
      <section id="work" className="wrap scroll-mt-4 pb-8" aria-labelledby="work-h">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-16 sm:mb-10 sm:pt-20">
          <h2 id="work-h" className="m-0 text-[clamp(2.2rem,4.5vw,3rem)]">Selected work</h2>
          <span className="text-ink-3">{range}</span>
        </div>
        <ul className="m-0 grid list-none gap-6 p-0">
          {projectsShowcase.map((p, i) => (
            <li key={p.slug}>
              <ProjectPanel project={p} flip={i % 2 === 1} priority={i === 0} />
            </li>
          ))}
        </ul>
      </section>

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
              {credentials.map((c) => (
                <li key={c.title} className="grid gap-x-6 border-b border-line py-4 sm:grid-cols-[120px_1fr]">
                  <time dateTime={c.date} className="text-ink-3">{formatMonth(c.date)}</time>
                  <span>
                    <b className="font-semibold">{c.title}</b>, {c.issuer}
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

import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { monthYear } from "@/lib/dates";
import { ArrowRight } from "./icons";
import { ProjectCover } from "./project-cover";

/** One project on the home page: big image, short story and the key facts, in the project's colours. */
export function ProjectPanel({ project: p, flip, priority }: { project: Project; flip?: boolean; priority?: boolean }) {
  const kicker = [p.kind, p.context.replace(" project", ""), p.award ? p.award.split(",")[0] : p.status === "In progress" ? "In progress" : null]
    .filter(Boolean)
    .join(" · ");
  const facts: [string, string][] = [
    ["Role", p.role],
    ["Stack", p.stack.join(", ")],
    [p.award ? "Result" : "Status", p.award ?? `${p.status}, ${monthYear(p)}`],
  ];

  return (
    <Link
      href={`/work/${p.slug}`}
      className="panel panel-link grid items-center gap-2 overflow-hidden no-underline lg:grid-cols-[1.35fr_1fr]"
      style={{ "--p-bg": p.panel.bg, "--p-fg": p.panel.fg } as CSSProperties}
    >
      <div className={`p-5 sm:p-8 lg:p-10 ${flip ? "lg:order-2" : ""}`}>
        <ProjectCover project={p} priority={priority} sizes="(min-width: 1024px) 700px, 100vw" />
      </div>
      <div className={`px-6 pb-9 sm:px-10 lg:py-10 ${flip ? "lg:pr-2 lg:pl-12" : "lg:pr-12 lg:pl-2"}`}>
        <p className="kicker m-0 opacity-70">{kicker}</p>
        <h3 className="mt-3 mb-0 text-[clamp(2rem,4vw,2.75rem)]">{p.name}</h3>
        <p className="mt-4 mb-0 leading-relaxed opacity-85">{p.summary}</p>
        <dl className="mt-6 mb-0 grid grid-cols-[84px_1fr] gap-x-3 gap-y-1.5 text-[0.9rem]">
          {facts.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="opacity-60">{k}</dt>
              <dd className="m-0 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
        <span className="more u mt-7 inline-flex items-center gap-2 font-semibold">
          Read case study <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}

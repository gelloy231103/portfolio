import Link from "next/link";
import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";
import { DeviceMock } from "./device-mock";
import { ArrowUpRight } from "./icons";
import { ProjectPills, StackTags } from "./project-meta";

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`project-card group relative flex overflow-hidden rounded-[20px] border border-line bg-surface text-ink no-underline ${
        wide ? "flex-col md:col-span-2 md:flex-row" : "flex-col"
      }`}
    >
      <div
        className={`stage ${wide ? "min-h-[280px] md:min-h-[340px] md:flex-[1.35]" : "min-h-[260px]"}`}
        style={{ "--h": project.hue } as CSSProperties}
      >
        <DeviceMock kind={project.mock} />
      </div>
      <div className={`flex min-w-0 flex-1 flex-col gap-2.5 ${wide ? "justify-center p-6 md:p-10" : "px-6 pt-5.5 pb-6"}`}>
        <ProjectPills project={project} showVideo />
        <h3 className={`font-semibold tracking-tight ${wide ? "text-[clamp(1.8rem,3vw,2.4rem)]" : "text-[1.6rem]"}`}>{project.name}</h3>
        <p className="m-0 max-w-[52ch] text-muted">{project.summary}</p>
        <div className="mt-auto pt-2">
          <StackTags stack={project.stack} />
        </div>
      </div>
      <span
        aria-hidden="true"
        className="absolute top-3.5 right-3.5 grid size-9 scale-80 place-items-center rounded-full bg-raised opacity-0 shadow-[var(--shadow)] transition group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
      >
        <ArrowUpRight className="size-4" />
      </span>
    </Link>
  );
}

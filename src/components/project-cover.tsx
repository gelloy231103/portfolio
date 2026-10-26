import Image from "next/image";
import type { CSSProperties } from "react";
import type { Project } from "@/content/projects";

/**
 * Cover art for a project. Uses the demo poster when there is one; otherwise draws
 * a browser-window mock-up in the project's colour so every card has a visual.
 */
export function ProjectCover({ project, sizes, priority, className = "" }: { project: Project; sizes: string; priority?: boolean; className?: string }) {
  const style = { "--tint": project.tint } as CSSProperties;

  if (project.video?.poster) {
    return (
      <div className={`relative overflow-hidden bg-[color-mix(in_srgb,var(--tint)_14%,var(--surface-2))] ${className}`} style={style}>
        <Image
          src={project.video.poster}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`relative overflow-hidden ${className}`}
      style={{
        ...style,
        background:
          "radial-gradient(120% 90% at 0% 0%, color-mix(in srgb, var(--tint) 34%, var(--surface)) 0%, transparent 60%), radial-gradient(90% 90% at 100% 100%, color-mix(in srgb, var(--tint) 22%, var(--surface)) 0%, transparent 60%), var(--surface-2)",
      }}
    >
      <div className="dot-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-x-[9%] top-[16%] bottom-[-8%] rounded-t-2xl border border-line-strong bg-surface shadow-[var(--shadow-lg)] transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:-translate-y-2">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="ml-3 h-2 w-1/3 rounded-full bg-surface-2" />
        </div>
        <div className="grid gap-3 p-[6%]">
          <span className="h-1.5 w-12 rounded-full" style={{ background: "var(--tint)" }} />
          <span className="serif text-[clamp(1.8rem,4.2vw,3rem)] leading-none text-ink">{project.name}</span>
          <span className="max-w-[28ch] text-[clamp(0.75rem,1.2vw,0.9rem)] leading-snug text-ink-3">{project.tagline}</span>
          <div className="mt-1 flex gap-2">
            <span className="h-6 w-20 rounded-full" style={{ background: "var(--tint)" }} />
            <span className="h-6 w-16 rounded-full border border-line-strong" />
          </div>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import { coverImage, type Project } from "@/content/projects";

/**
 * A project's main image in a 16:9 frame. Falls back to a plain title card until
 * screenshots are added to `gallery` in src/content/projects.ts.
 */
export function ProjectCover({ project, sizes, priority, className = "" }: { project: Project; sizes: string; priority?: boolean; className?: string }) {
  const img = coverImage(project);
  return (
    <div className={`relative aspect-video overflow-hidden rounded-[14px] ${className}`}>
      {img ? (
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          aria-hidden="true"
          className="grid h-full place-content-center gap-3 bg-soft p-8 text-center text-ink"
        >
          <span className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-none font-bold tracking-[-0.04em]">{project.name}</span>
          <span className="mx-auto max-w-[26ch] text-[0.95rem] text-ink-3">{project.tagline}</span>
        </div>
      )}
    </div>
  );
}

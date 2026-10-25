import type { Project } from "@/content/projects";
import { PlayIcon, StarIcon } from "./icons";

export function ProjectPills({ project, showVideo = false }: { project: Project; showVideo?: boolean }) {
  const isTeam = project.context !== "Personal project";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="pill">{project.kind}</span>
      <span className={`pill ${isTeam ? "pill-team" : ""}`}>{project.context}</span>
      <span className="pill">{project.year}</span>
      {project.award && (
        <span className="pill pill-award">
          <StarIcon className="size-3" />
          {project.award}
        </span>
      )}
      {showVideo && project.video && (
        <span className="pill pill-video">
          <PlayIcon className="size-3" />
          Video
        </span>
      )}
    </div>
  );
}

export function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Built with">
      {stack.map((t) => (
        <li key={t} className="tag">{t}</li>
      ))}
    </ul>
  );
}

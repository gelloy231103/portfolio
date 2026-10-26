import type { Project } from "@/content/projects";
import { mediaUrl } from "@/lib/media";

/** Demo video in a framed player. Nothing downloads until the visitor presses play. */
export function ProjectVideo({ project }: { project: Project }) {
  if (!project.video) return null;
  const src = mediaUrl(project.video.file);
  if (!src) return null;

  return (
    <figure className="card m-0 overflow-hidden">
      <video controls playsInline preload="none" poster={project.video.poster} className="block aspect-video w-full bg-black" aria-label={`${project.name} demo video`}>
        <source src={src} type="video/mp4" />
        Your browser can&apos;t play this video. <a href={src}>Download it instead.</a>
      </video>
      <figcaption className="border-t border-line px-6 py-4 text-sm text-ink-2">
        <b className="font-semibold text-ink">Demo walkthrough.</b>
        {project.video.note ? ` ${project.video.note}` : ""}
      </figcaption>
    </figure>
  );
}

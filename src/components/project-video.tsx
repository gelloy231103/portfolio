import type { Project } from "@/content/projects";
import { mediaUrl } from "@/lib/media";

/** Native video player: nothing downloads until the visitor presses play. */
export function ProjectVideo({ project }: { project: Project }) {
  if (!project.video) return null;
  const src = mediaUrl(project.video.file);
  if (!src) return null;

  return (
    <figure className="m-0 grid gap-2">
      <video
        controls
        playsInline
        preload="none"
        poster={project.video.poster}
        className="aspect-video w-full rounded-2xl border border-line bg-black shadow-[var(--shadow)]"
        aria-label={`${project.name} demo video`}
      >
        <source src={src} type="video/mp4" />
        Your browser can&apos;t play this video. <a href={src}>Download it instead.</a>
      </video>
      {project.video.note && <figcaption className="text-sm text-muted">{project.video.note}</figcaption>}
    </figure>
  );
}

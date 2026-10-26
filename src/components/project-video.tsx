import type { Project } from "@/content/projects";
import { mediaUrl } from "@/lib/media";

/** Demo video with a caption. Nothing downloads until the visitor presses play. */
export function ProjectVideo({ project }: { project: Project }) {
  if (!project.video) return null;
  const src = mediaUrl(project.video.file);
  if (!src) return null;

  return (
    <figure className="m-0">
      <video controls playsInline preload="none" poster={project.video.poster} className="block aspect-video w-full border border-rule bg-black" aria-label={`${project.name} demo video`}>
        <source src={src} type="video/mp4" />
        Your browser can&apos;t play this video. <a href={src}>Download it instead.</a>
      </video>
      <figcaption className="meta mt-2">
        Demo walkthrough.{project.video.note ? ` ${project.video.note}` : ""}
      </figcaption>
    </figure>
  );
}

import type { Project } from "@/content/projects";
import { mediaUrl } from "@/lib/media";

/** Demo video as a captioned figure. Nothing downloads until the visitor presses play. */
export function ProjectVideo({ project, figure }: { project: Project; figure: number }) {
  if (!project.video) return null;
  const src = mediaUrl(project.video.file);
  if (!src) return null;

  return (
    <figure className="figure m-0">
      <video controls playsInline preload="none" poster={project.video.poster} className="block aspect-video w-full bg-black" aria-label={`${project.name} demo video`}>
        <source src={src} type="video/mp4" />
        Your browser can&apos;t play this video. <a href={src}>Download it instead.</a>
      </video>
      <figcaption>
        <b>Figure {figure}.</b>
        {project.name} demo walkthrough.{project.video.note ? ` ${project.video.note}` : ""}
      </figcaption>
    </figure>
  );
}

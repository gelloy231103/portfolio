import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

export const alt = "Project preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? site.shortName;
  const hue = project?.hue ?? 230;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: `hsl(${hue} 30% 12%)`, color: "#f1f3f7" }}>
        <div style={{ display: "flex", gap: 14, fontSize: 26, color: `hsl(${hue} 70% 78%)` }}>
          {project ? `${project.kind} · ${project.context} · ${project.year}` : "Portfolio"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 110, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>{name}</div>
          {project?.award && <div style={{ display: "flex", fontSize: 30, color: "#f2c14e" }}>{project.award}</div>}
          <div style={{ fontSize: 30, color: "#c3c8d2", maxWidth: 980, lineHeight: 1.35 }}>{project?.summary.slice(0, 150) ?? ""}</div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#c3c8d2" }}>{site.shortName}</div>
      </div>
    ),
    size,
  );
}

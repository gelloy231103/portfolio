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
  const p = getProject(slug);
  if (!p) return new ImageResponse(<div style={{ display: "flex" }}>{site.name}</div>, size);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f7f6f2", color: "#1c1b18", padding: 80 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1.05 }}>{p.name}</div>
          <div style={{ fontSize: 40, color: "#57544c", marginTop: 24, maxWidth: 1000 }}>{p.tagline}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#6f6b62", borderTop: "2px solid #dddad1", paddingTop: 24 }}>
          <span>{p.kind} · {p.stack.slice(0, 3).join(", ")}</span>
          <span>{site.name}</span>
        </div>
      </div>
    ),
    size,
  );
}

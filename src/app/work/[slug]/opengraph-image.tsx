import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

export const alt = "Project preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

/** Each preview uses the project's own panel colours, like its case study header. */
export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return new ImageResponse(<div style={{ display: "flex" }}>{site.name}</div>, size);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: p.panel.bg, color: p.panel.fg, padding: 80 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, opacity: 0.75 }}>
          <span>{`${p.kind} · ${p.context}`}</span>
          <span>{site.shortName}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 700, lineHeight: 0.95, letterSpacing: -6 }}>{p.name}</div>
          <div style={{ fontSize: 38, marginTop: 24, opacity: 0.85, maxWidth: 1000 }}>{p.tagline}</div>
          {p.award && <div style={{ display: "flex", fontSize: 26, marginTop: 28, fontWeight: 700 }}>{p.award}</div>}
        </div>
      </div>
    ),
    size,
  );
}

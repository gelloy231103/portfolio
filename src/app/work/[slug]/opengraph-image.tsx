import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

export const alt = "Project preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const dots = "radial-gradient(circle at 1px 1px, #303037 1px, transparent 0)";

/** Project previews use the dark palette, tinted with each project's colour. */
export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return new ImageResponse(<div style={{ display: "flex" }}>{site.name}</div>, size);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#09090b", backgroundImage: dots, backgroundSize: "22px 22px", color: "#ededf0", padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", top: -280, left: -120, width: 900, height: 700, borderRadius: 700, background: `radial-gradient(circle, ${p.tint}55 0%, ${p.tint}00 70%)`, display: "flex" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#a3a3ad" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 14, height: 14, borderRadius: 14, background: p.tint }} />
            {p.kind} · {p.context}
          </span>
          <span>{site.name}</span>
        </div>
        <div style={{ display: "flex", marginTop: 72, fontSize: 120, fontWeight: 700, lineHeight: 1, letterSpacing: -5 }}>{p.name}</div>
        <div style={{ display: "flex", marginTop: 24, fontSize: 36, color: "#a3a3ad", maxWidth: 1000 }}>{p.tagline}</div>
        <div style={{ display: "flex", marginTop: "auto", gap: 12 }}>
          {p.award && (
            <span style={{ display: "flex", background: "#fcd34d", color: "#09090b", borderRadius: 999, padding: "8px 18px", fontSize: 22, fontWeight: 600 }}>{p.award.split(",")[0]}</span>
          )}
          {p.stack.slice(0, 4).map((t) => (
            <span key={t} style={{ display: "flex", border: "1px solid #303037", background: "#111114", borderRadius: 999, padding: "8px 18px", fontSize: 22, color: "#ededf0" }}>{t}</span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

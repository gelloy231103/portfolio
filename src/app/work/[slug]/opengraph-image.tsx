import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

export const alt = "Application note preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const grid =
  "linear-gradient(#12294a 1px, transparent 1px), linear-gradient(90deg, #12294a 1px, transparent 1px)";

/** Project previews use the blueprint palette so they read as a set with the site preview. */
export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return new ImageResponse(<div style={{ display: "flex" }}>{site.name}</div>, size);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0b1d35", backgroundImage: grid, backgroundSize: "24px 24px", color: "#e3edf8", padding: 56 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#9db4cc", borderBottom: "3px solid #e3edf8", paddingBottom: 14 }}>
          <span>APPLICATION NOTE {p.code}</span>
          <span>{site.name.toUpperCase()}</span>
        </div>
        <div style={{ display: "flex", marginTop: 52, fontSize: 112, fontWeight: 700, lineHeight: 1, letterSpacing: -2 }}>{p.name.toUpperCase()}</div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 34, color: "#9db4cc", maxWidth: 1050 }}>{p.tagline}</div>
        {p.award && (
          <div style={{ display: "flex", marginTop: 24 }}>
            <span style={{ background: "#ff7a6b", color: "#071426", padding: "6px 14px", fontSize: 24, fontWeight: 600 }}>{p.award.toUpperCase()}</span>
          </div>
        )}
        <div style={{ display: "flex", marginTop: "auto", gap: 12 }}>
          {[p.kind, ...p.stack].slice(0, 5).map((t) => (
            <span key={t} style={{ border: "2px solid #8cc4ff", color: "#8cc4ff", padding: "6px 12px", fontSize: 22 }}>{t}</span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

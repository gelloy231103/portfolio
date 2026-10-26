import { ImageResponse } from "next/og";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dots = "radial-gradient(circle at 1px 1px, #d7d6d0 1px, transparent 0)";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fafaf8", backgroundImage: dots, backgroundSize: "22px 22px", color: "#0d0e12", padding: 72, position: "relative" }}>
        <div style={{ position: "absolute", top: -260, left: 200, width: 900, height: 600, borderRadius: 600, background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0) 70%)", display: "flex" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 56, borderRadius: 56, background: "#0d0e12", color: "#fafaf8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>{site.initials}</div>
          <span style={{ fontSize: 26, color: "#4f525b" }}>{site.role} · {site.employer}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 64, fontSize: 96, fontWeight: 700, lineHeight: 1, letterSpacing: -4 }}>
          <span>{site.name}</span>
          <span style={{ color: "#4338ca", marginTop: 12 }}>{site.title}</span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", gap: 12 }}>
          {projects.map((p) => (
            <span key={p.slug} style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid #d7d6d0", borderRadius: 999, padding: "10px 20px", fontSize: 24, background: "#ffffff" }}>
              <span style={{ width: 12, height: 12, borderRadius: 12, background: p.tint }} />
              {p.name}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

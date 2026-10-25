import { ImageResponse } from "next/og";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.role} at the ${site.employer}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const grid =
  "linear-gradient(#e6ebf0 1px, transparent 1px), linear-gradient(90deg, #e6ebf0 1px, transparent 1px)";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#ffffff", backgroundImage: grid, backgroundSize: "24px 24px", color: "#101a27", padding: 56 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#47566a", borderBottom: "3px solid #101a27", paddingBottom: 14 }}>
          <span>PERSONAL DATASHEET</span>
          <span>{site.initials}-{site.copyrightYear} · REV {site.revision}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 56, fontSize: 104, fontWeight: 700, lineHeight: 0.95, letterSpacing: -2 }}>
          <span>LOUISE ANGELLO</span>
          <span>CABAÑA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 36, fontSize: 36, fontWeight: 600 }}>
          <div style={{ width: 6, height: 44, background: "#c4161c", marginRight: 18 }} />
          {site.role}
          <span style={{ color: "#47566a", fontWeight: 400, marginLeft: 14 }}>· {site.employer}</span>
        </div>
        <div style={{ display: "flex", marginTop: "auto", gap: 14 }}>
          {projects.map((p) => (
            <span key={p.code} style={{ border: "2px solid #101a27", padding: "8px 14px", fontSize: 22, background: "#ffffff" }}>
              {p.code} {p.name}
            </span>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

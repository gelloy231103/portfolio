import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.shortName}: web apps, mobile apps and games`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#0d0f13", color: "#e8ebf0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: "#e8ebf0", color: "#0d0f13", display: "flex", alignItems: "center", justifyContent: "center" }}>L</div>
          {site.shortName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>Louise Angello</div>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: -3, lineHeight: 1, display: "flex", gap: 24 }}>
            <span style={{ color: "#949baa", fontWeight: 400 }}>“Loy”</span> Cabaña
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#949baa" }}>
          Web apps · mobile apps · games — <span style={{ color: "#8d9cff", marginLeft: 12 }}>from the database to the last pixel</span>
        </div>
      </div>
    ),
    size,
  );
}

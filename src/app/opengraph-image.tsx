import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#ffffff", color: "#111111", padding: 80 }}>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>{site.shortName}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 0.95, letterSpacing: -5 }}>I build apps that people actually use.</div>
          <div style={{ fontSize: 30, color: "#555555", marginTop: 32 }}>{`${site.title} · web, mobile and games`}</div>
        </div>
      </div>
    ),
    size,
  );
}

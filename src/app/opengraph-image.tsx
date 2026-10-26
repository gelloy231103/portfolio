import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}, ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f7f6f2", color: "#1c1b18", padding: 80 }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.1 }}>{site.name}</div>
          <div style={{ fontSize: 38, color: "#57544c", marginTop: 24 }}>Web apps, mobile apps and the occasional game.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#6f6b62", borderTop: "2px solid #dddad1", paddingTop: 24 }}>
          <span>{site.role}, {site.employer}</span>
          <span style={{ color: "#a8431c" }}>github.com/{site.githubHandle}</span>
        </div>
      </div>
    ),
    size,
  );
}

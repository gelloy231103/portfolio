import type { CSSProperties } from "react";
import type { DiagramStage } from "@/content/projects";

/**
 * A left-to-right system block diagram built from real HTML text, so it stays
 * readable by screen readers and search engines. Stacks vertically on phones.
 */
export function BlockDiagram({ stages, label }: { stages: DiagramStage[]; label: string }) {
  const cols = stages.map(() => "minmax(0,1fr)").join(" 40px ");
  return (
    <div role="group" aria-label={label} className="diagram grid-bg p-[clamp(16px,3vw,32px)]" style={{ "--cols": cols } as CSSProperties}>
      {stages.map((stage, i) => (
        <Stage key={stage.label} stage={stage} last={i === stages.length - 1} />
      ))}
    </div>
  );
}

function Stage({ stage, last }: { stage: DiagramStage; last: boolean }) {
  return (
    <>
      <div className="stage">
        <span className="cap">{stage.label}</span>
        {stage.blocks.map((b) => (
          <div key={b} className="d-block">{b}</div>
        ))}
      </div>
      {!last && <div className="wire" aria-hidden="true" />}
    </>
  );
}

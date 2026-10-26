import type { CSSProperties } from "react";
import type { DiagramStage } from "@/content/projects";

/**
 * A left-to-right flow diagram built from real HTML text, so it stays
 * readable by screen readers and search engines. Stacks vertically on phones.
 */
export function BlockDiagram({ stages, label }: { stages: DiagramStage[]; label: string }) {
  const cols = stages.map(() => "minmax(0,1fr)").join(" 44px ");
  return (
    <div role="group" aria-label={label} className="diagram" style={{ "--cols": cols } as CSSProperties}>
      {stages.map((stage, i) => (
        <Stage key={stage.label} stage={stage} index={i + 1} last={i === stages.length - 1} />
      ))}
    </div>
  );
}

function Stage({ stage, index, last }: { stage: DiagramStage; index: number; last: boolean }) {
  return (
    <>
      <div className="stage">
        <span className="cap"><i>{index}</i>{stage.label}</span>
        {stage.blocks.map((b) => (
          <div key={b} className="d-block">{b}</div>
        ))}
      </div>
      {!last && <div className="wire" aria-hidden="true" />}
    </>
  );
}

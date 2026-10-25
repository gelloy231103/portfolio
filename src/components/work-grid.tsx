"use client";

import { useState } from "react";
import { projects, projectKinds, type ProjectKind } from "@/content/projects";
import { ProjectCard } from "./project-card";

type Filter = "All" | ProjectKind;

export function WorkGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = projects.filter((p) => filter === "All" || p.kind === filter);
  const filters: Filter[] = ["All", ...projectKinds];

  return (
    <>
      <div role="group" aria-label="Filter projects" className="flex w-fit max-w-full flex-wrap gap-1.5 rounded-full border border-line bg-surface p-1">
        {filters.map((f) => {
          const count = f === "All" ? projects.length : projects.filter((p) => p.kind === f).length;
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-3.5 py-2 text-[0.88rem] font-medium transition-colors ${
                active ? "bg-ink text-bg" : "text-muted hover:text-ink"
              }`}
            >
              {f}
              <span className="font-mono text-[0.72rem] opacity-70">{count}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2" id="project-grid">
        {list.map((p, i) => {
          // The featured project spans the row; so does a card left alone on the last row.
          const others = list.filter((x) => !x.featured).length;
          const indexAmongOthers = list.filter((x, j) => !x.featured && j < i).length;
          const aloneOnLastRow = !p.featured && others % 2 === 1 && indexAmongOthers === others - 1;
          return <ProjectCard key={p.slug} project={p} wide={Boolean(p.featured) || aloneOnLastRow} />;
        })}
      </div>
    </>
  );
}

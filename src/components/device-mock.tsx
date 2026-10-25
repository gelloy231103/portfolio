import type { MockKind } from "@/content/projects";

/** Each project is drawn as the device it ships on: browser, phone or game screen. */
export function DeviceMock({ kind }: { kind: MockKind }) {
  switch (kind) {
    case "invite":
      return (
        <div className="m-browser" aria-hidden="true">
          <div className="bar"><i /><i /><i /><span className="url">vowandverse.app/ana-and-jun</span></div>
          <div className="screen grid justify-items-center gap-2 text-center">
            <span className="hue-text font-mono text-[0.56rem] uppercase tracking-[0.24em]">Together with their families</span>
            <span className="font-display text-[1.9rem] leading-none tracking-tight">Ana <em className="hue-text not-italic">&amp;</em> Jun</span>
            <span className="flex items-center gap-2.5 font-mono text-[0.62rem] text-muted">SAT <b className="font-display text-xl font-semibold text-ink">14</b> FEB 2027</span>
            <span className="hue-strong mt-1 rounded-full px-3.5 py-1.5 text-[0.66rem] font-semibold text-raised">RSVP by Jan 10</span>
          </div>
        </div>
      );
    case "flash":
      return (
        <div className="m-browser" aria-hidden="true">
          <div className="bar"><i /><i /><i /><span className="url">civiq.app/decks/biology</span></div>
          <div className="screen grid gap-3">
            <div className="flex flex-wrap gap-1.5">
              {["New", "Learning", "Master", "Retry"].map((m) => (
                <span key={m} className={`rounded-full border px-2 py-0.5 font-mono text-[0.58rem] ${m === "Learning" ? "hue-strong border-transparent text-raised" : "border-line text-muted"}`}>{m}</span>
              ))}
            </div>
            <div className="rounded-[10px] border border-line bg-surface p-3.5 text-[0.8rem] leading-relaxed">
              Plants make food through <span className="hue-tint inline-block min-w-16 rounded-t border-b-2 text-transparent" style={{ borderColor: "hsl(var(--h) 60% var(--td))" }}>photosynthesis</span>, using sunlight, water and carbon dioxide.
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-line"><i className="hue-strong block h-full w-[62%]" /></div>
          </div>
        </div>
      );
    case "market":
      return (
        <div className="m-phone" aria-hidden="true">
          <div className="screen">
            <div className="notch" />
            <div className="flex items-center justify-between font-display text-[0.82rem] font-semibold">Suki<i className="hue-strong block size-5 rounded-full" /></div>
            <div className="h-5 rounded-[7px] border border-line bg-bg" />
            <div className="grid flex-1 grid-cols-2 gap-1.5">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex flex-col gap-1 rounded-lg border border-line bg-bg p-1.5">
                  <span className="hue-tint flex-1 rounded" />
                  <b className="h-1 w-[70%] rounded bg-line" />
                  <u className="hue-strong h-1 w-[40%] rounded" />
                </div>
              ))}
            </div>
            <TabBar />
          </div>
        </div>
      );
    case "sign":
      return (
        <div className="m-phone" aria-hidden="true">
          <div className="screen">
            <div className="notch" />
            <div className="flex items-center justify-between font-display text-[0.82rem] font-semibold">SensAi<i className="hue-strong block size-5 rounded-full" /></div>
            <div className="hue-strong grid min-h-0 flex-1 place-items-center content-center gap-0.5 rounded-xl text-center text-raised">
              <b className="font-display text-5xl font-extrabold leading-none">A</b>
              <span className="font-mono text-[0.48rem] uppercase tracking-[0.14em] opacity-85">ASL alphabet</span>
            </div>
            <div className="flex justify-between font-mono text-[0.5rem] text-muted"><span>Letter 10 of 26</span><span>38%</span></div>
            <div className="h-1 overflow-hidden rounded-full bg-line"><i className="hue-strong block h-full w-[38%]" /></div>
            <div className="max-w-[92%] rounded-[9px_9px_9px_2px] border border-line bg-bg px-2 py-1.5 text-[0.55rem] leading-snug">
              <b className="hue-text block font-mono text-[0.46rem] uppercase tracking-[0.12em]">Handy</b>Nice! Now try signing “hello”.
            </div>
            <TabBar />
          </div>
        </div>
      );
    case "worlds":
      return (
        <div className="m-game" aria-hidden="true">
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 30%, hsl(280 40% 30%), transparent 60%), radial-gradient(circle at 80% 80%, hsl(200 50% 25%), transparent 55%), hsl(250 35% 12%)" }} />
          <div className="absolute inset-x-0 top-3 text-center font-display text-base font-extrabold tracking-wide text-white">CHOOSE A KINGDOM</div>
          <div className="absolute inset-x-3 bottom-3.5 grid grid-cols-3 gap-2">
            {[
              { name: "Kingdom 4 · Allergia", bg: "linear-gradient(160deg, hsl(340 70% 60%), hsl(20 80% 55%))", sel: true },
              { name: "Sugaria", bg: "linear-gradient(160deg, hsl(300 60% 65%), hsl(330 70% 55%))" },
              { name: "Preservia", bg: "linear-gradient(160deg, hsl(150 40% 35%), hsl(190 50% 25%))" },
            ].map((w) => (
              <div
                key={w.name}
                className="flex aspect-square items-end rounded-[10px] border-2 p-1.5 font-mono text-[0.55rem] font-semibold leading-tight text-white"
                style={{ background: w.bg, borderColor: w.sel ? "hsl(48 100% 65%)" : "hsl(0 0% 100% / 0.2)", boxShadow: w.sel ? "0 0 0 3px hsl(48 100% 65% / 0.35)" : undefined, textShadow: "0 1px 2px #0008" }}
              >
                {w.name}
              </div>
            ))}
          </div>
        </div>
      );
  }
}

function TabBar() {
  return (
    <div className="flex justify-around border-t border-line pt-1.5">
      <i className="hue-strong block size-3.5 rounded" />
      <i className="block size-3.5 rounded bg-line" />
      <i className="block size-3.5 rounded bg-line" />
      <i className="block size-3.5 rounded bg-line" />
    </div>
  );
}

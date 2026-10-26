"use client";

import { useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "./icons";

/** E-mail address as a mailto link, with a button that copies it. Used on the inverted contact block. */
export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "selected">("idle");
  const textRef = useRef<HTMLSpanElement>(null);

  const selectText = () => {
    const el = textRef.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setState("selected");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      selectText();
    }
    setTimeout(() => setState("idle"), 2200);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a href={`mailto:${email}`} className="u text-[clamp(1.05rem,2vw,1.3rem)] font-semibold break-all">
        <span ref={textRef}>{email}</span>
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-current/25 px-3 py-1.5 text-sm opacity-80 hover:opacity-100"
      >
        {state === "copied" ? <><CheckIcon className="size-4" /> Copied</> : state === "selected" ? "Press Ctrl+C" : <><CopyIcon className="size-4" /> Copy</>}
      </button>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "E-mail address copied" : state === "selected" ? "E-mail selected; press Ctrl+C to copy" : ""}
      </span>
    </div>
  );
}

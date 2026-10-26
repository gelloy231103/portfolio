"use client";

import { useRef, useState } from "react";
import { CheckIcon, CopyIcon, MailIcon } from "./icons";

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
    <button type="button" onClick={copy} className="btn h-auto min-h-11 justify-between py-2" title="Copy e-mail address">
      <span className="inline-flex min-w-0 items-center gap-2.5">
        <MailIcon />
        <span ref={textRef} className="truncate select-all">{email}</span>
      </span>
      <span className={`inline-flex shrink-0 items-center gap-1.5 text-xs ${state === "idle" ? "text-ink-3" : "text-accent-ink"}`} aria-hidden="true">
        {state === "copied" ? <><CheckIcon /> Copied</> : state === "selected" ? "Ctrl+C" : <CopyIcon />}
      </span>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "E-mail address copied" : state === "selected" ? "E-mail selected; press Ctrl+C to copy" : ""}
      </span>
    </button>
  );
}

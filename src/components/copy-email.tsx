"use client";

import { useRef, useState } from "react";
import { CopyIcon } from "./icons";

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
    <button type="button" onClick={copy} className="btn w-full justify-between sm:w-auto">
      <span ref={textRef} className="select-all">{email}</span>
      <span className="inline-flex items-center gap-1.5 text-ink-2" aria-hidden="true">
        {state === "copied" ? "Copied" : state === "selected" ? "Ctrl+C" : <CopyIcon />}
      </span>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "E-mail address copied" : state === "selected" ? "E-mail selected; press Ctrl+C to copy" : ""}
      </span>
    </button>
  );
}

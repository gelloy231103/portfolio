"use client";

import { useRef, useState } from "react";

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
    <p className="m-0 font-mono text-[0.85rem]">
      <a href={`mailto:${email}`} className="a">
        <span ref={textRef}>{email}</span>
      </a>{" "}
      <button type="button" onClick={copy} className="a cursor-pointer bg-transparent p-0 text-ink-3">
        {state === "copied" ? "copied" : state === "selected" ? "press Ctrl+C" : "copy"}
      </button>
      <span aria-live="polite" className="sr-only">
        {state === "copied" ? "E-mail address copied" : state === "selected" ? "E-mail selected; press Ctrl+C to copy" : ""}
      </span>
    </p>
  );
}

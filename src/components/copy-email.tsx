"use client";

import { useRef, useState } from "react";
import { CopyIcon } from "./icons";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState<"idle" | "copied" | "selected">("idle");
  const textRef = useRef<HTMLSpanElement>(null);

  const selectText = () => {
    const el = textRef.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
    setCopied("selected");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied("copied");
    } catch {
      selectText();
    }
    setTimeout(() => setCopied("idle"), 2000);
  };

  return (
    <button type="button" onClick={copy} className="btn cursor-pointer border-bg bg-bg text-ink">
      <span ref={textRef} className="font-mono text-[0.9rem] select-all">{email}</span>
      <CopyIcon />
      <span aria-live="polite" className="sr-only">
        {copied === "copied" ? "E-mail copied" : copied === "selected" ? "E-mail selected; press Ctrl+C to copy" : ""}
      </span>
      {copied !== "idle" && (
        <span aria-hidden="true" className="text-xs font-medium text-muted">
          {copied === "copied" ? "Copied" : "Press Ctrl+C"}
        </span>
      )}
    </button>
  );
}

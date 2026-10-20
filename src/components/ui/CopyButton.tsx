"use client";

import { useState } from "react";

interface CopyButtonProps {
  targetId: string;
  label: string;
  done: string;
  fallback: string;
}

/**
 * Copies the text of another element. When the clipboard is unavailable,
 * it selects the text so the visitor can copy it manually.
 */
export function CopyButton({ targetId, label, done, fallback }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "done" | "fallback">("idle");

  const selectText = (el: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    setState("fallback");
  };

  const copy = async () => {
    const el = document.getElementById(targetId);
    if (!el) return;
    try {
      await navigator.clipboard.writeText(el.textContent ?? "");
      setState("done");
      window.setTimeout(() => setState("idle"), 1600);
    } catch {
      selectText(el);
    }
  };

  return (
    <button type="button" className="copy-btn" onClick={copy} aria-live="polite">
      {state === "done" ? done : state === "fallback" ? fallback : label}
    </button>
  );
}

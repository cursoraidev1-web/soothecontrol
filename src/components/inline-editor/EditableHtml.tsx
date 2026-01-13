"use client";

import { useEffect, useRef, useState } from "react";
import { useInlineEditor } from "./InlineEditorContext";

type EditableHtmlProps = {
  html: string;
  sectionIndex?: number;
  field?: string; // typically "body"
  onCommit?: (nextHtml: string) => void;
  className?: string;
};

export default function EditableHtml({
  html,
  sectionIndex,
  field,
  onCommit,
  className,
}: EditableHtmlProps) {
  const editor = useInlineEditor();
  const enabled = !!editor?.enabled;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Keep DOM in sync when not focused.
  useEffect(() => {
    if (!ref.current) return;
    if (isFocused) return;
    if (ref.current.innerHTML !== (html || "")) {
      ref.current.innerHTML = html || "";
    }
  }, [html, isFocused]);

  if (!enabled) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      data-inline-edit="true"
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        setIsFocused(false);
        const next = e.currentTarget.innerHTML;
        if (onCommit) {
          onCommit(next);
          return;
        }
        if (sectionIndex == null || !field) return;
        editor?.updateSectionField(sectionIndex, field, next);
      }}
      style={{
        outline: "none",
        borderRadius: 12,
        cursor: "text",
        boxShadow: isFocused ? "0 0 0 3px rgba(17, 24, 39, 0.12)" : undefined,
        background: isFocused ? "rgba(255,255,255,0.6)" : undefined,
        padding: isFocused ? "8px 10px" : undefined,
      }}
      aria-label="Editable rich text"
    />
  );
}


"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInlineEditor } from "./InlineEditorContext";

type EditableTextProps = {
  as?: keyof JSX.IntrinsicElements;
  value: string;
  placeholder?: string;
  sectionIndex?: number;
  field?: string;
  onCommit?: (next: string) => void;
  className?: string;
  style?: React.CSSProperties;
  multiline?: boolean;
};

function cleanText(input: string, multiline: boolean) {
  // contentEditable produces weird whitespace/newlines. Keep it predictable.
  let t = input.replace(/\u00A0/g, " "); // nbsp
  if (!multiline) t = t.replace(/\r?\n/g, " ");
  return t.trim();
}

export default function EditableText({
  as,
  value,
  placeholder,
  sectionIndex,
  field,
  onCommit,
  className,
  style,
  multiline = false,
}: EditableTextProps) {
  const editor = useInlineEditor();
  const enabled = !!editor?.enabled;
  const ref = useRef<HTMLSpanElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const display = useMemo(() => value || "", [value]);

  // Keep DOM in sync if value changes externally.
  useEffect(() => {
    if (!ref.current) return;
    if (isFocused) return;
    const next = display || "";
    if (ref.current.innerText !== next) ref.current.innerText = next;
  }, [display, isFocused]);

  const Tag = (as ?? "span") as any;

  if (!enabled) {
    return <Tag className={className}>{display}</Tag>;
  }

  return (
    <Tag
      ref={ref as any}
      className={className}
      contentEditable
      suppressContentEditableWarning
      spellCheck
      data-inline-edit="true"
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        setIsFocused(false);
        const next = cleanText(e.currentTarget.innerText, multiline);
        if (onCommit) {
          onCommit(next);
          return;
        }
        if (sectionIndex == null || !field) return;
        editor?.updateSectionField(sectionIndex, field as any, next as any);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !multiline) {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
      style={{
        ...(style ?? {}),
        outline: "none",
        cursor: "text",
        borderRadius: 6,
        boxShadow: isFocused ? "0 0 0 3px rgba(17, 24, 39, 0.12)" : undefined,
        background: isFocused ? "rgba(255,255,255,0.6)" : undefined,
        padding: isFocused ? "2px 4px" : undefined,
      }}
      aria-label="Editable text"
    >
      {display || placeholder || ""}
    </Tag>
  );
}


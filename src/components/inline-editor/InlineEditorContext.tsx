"use client";

import { createContext, useContext } from "react";
import type { PageData, PageKey, Section } from "@/lib/pageSchema";

export type InlineEditorState = {
  enabled: boolean;
  pageKey: PageKey;
  pageData: PageData;
  updateSection: (sectionIndex: number, next: Section) => void;
  updateSectionField: (sectionIndex: number, field: string, value: unknown) => void;
};

const InlineEditorContext = createContext<InlineEditorState | null>(null);

export function InlineEditorProvider({
  value,
  children,
}: {
  value: InlineEditorState;
  children: React.ReactNode;
}) {
  return (
    <InlineEditorContext.Provider value={value}>
      {children}
    </InlineEditorContext.Provider>
  );
}

export function useInlineEditor() {
  return useContext(InlineEditorContext);
}


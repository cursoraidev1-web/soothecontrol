"use client";

import type { UseCasesSection as UseCasesSectionType } from "@/lib/pageSchema";
import {
  getLoremHeadline,
  getLoremParagraph,
  getLoremShortText,
} from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface UseCasesSectionProps {
  section: UseCasesSectionType;
  sectionIndex?: number;
}

export default function UseCasesSection({ section, sectionIndex }: UseCasesSectionProps) {
  const editor = useInlineEditor();
  const title = section.title || "Use cases";
  const description = section.description || getLoremParagraph();
  
  // Ensure at least 1 use case item
  const items = section.items && section.items.length > 0
    ? section.items
    : [
        {
          title: "",
          description: "",
          linkText: "Learn more",
          linkHref: "#",
        },
      ];

  // Fill empty items with placeholder content
  const filledItems = items.map((item) => ({
    title: item.title || getLoremHeadline(),
    description: item.description || getLoremShortText(),
    linkText: item.linkText || "Learn more",
    linkHref: item.linkHref || "#",
  }));

  return (
    <section className="t1-section t1-bg-light">
      <div className="t1-container">
        {filledItems.map((item, index) => (
          <div key={index} className="t1-use-cases-grid" style={{ 
            marginBottom: index < filledItems.length - 1 ? "var(--spacing-6xl)" : 0 
          }}>
            <div className="t1-use-cases-text">
              <span className="t1-label">Use Cases</span>
              <EditableText
                as="h2"
                className="t1-section-heading"
                value={title}
                placeholder="Use cases title"
                style={{ textAlign: "left", marginBottom: "var(--spacing-md)" }}
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  editor.updateSection(sectionIndex, { ...section, title: next });
                }}
              />
              <EditableText
                as="p"
                value={description}
                placeholder="Use cases description"
                multiline
                style={{ 
                  fontSize: "var(--font-size-lg)", 
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.7,
                  marginBottom: "var(--spacing-lg)"
                }}
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  editor.updateSection(sectionIndex, { ...section, description: next });
                }}
              />
            </div>
            <div className="t1-use-case-card">
              <EditableText
                as="h3"
                value={item.title}
                placeholder="Use case title"
                style={{ 
                  fontSize: "var(--font-size-2xl)", 
                  fontWeight: "bold",
                  color: "var(--color-text-primary)",
                  marginBottom: "var(--spacing-md)"
                }}
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = filledItems.map((x) => ({ ...x }));
                  nextItems[index] = { ...nextItems[index], title: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
              />
              <EditableText
                as="p"
                value={item.description}
                placeholder="Use case description"
                multiline
                style={{ 
                  fontSize: "var(--font-size-base)", 
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "var(--spacing-md)"
                }}
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = filledItems.map((x) => ({ ...x }));
                  nextItems[index] = { ...nextItems[index], description: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
              />
              {item.linkText && item.linkHref && (
                <a 
                  href={item.linkHref} 
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "var(--spacing-xs)",
                    color: "var(--color-primary)",
                    fontSize: "var(--font-size-base)",
                    fontWeight: "600",
                    textDecoration: "none",
                    marginTop: "var(--spacing-md)"
                  }}
                >
                  <EditableText
                    as="span"
                    value={item.linkText}
                    placeholder="Link text"
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextItems = filledItems.map((x) => ({ ...x }));
                      nextItems[index] = { ...nextItems[index], linkText: next };
                      editor.updateSection(sectionIndex, { ...section, items: nextItems });
                    }}
                  />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              )}
              {/* Illustration placeholder */}
              <div style={{
                marginTop: "var(--spacing-xl)",
                width: "100%",
                height: "200px",
                background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                borderRadius: "var(--radius-lg)",
                opacity: 0.1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ opacity: 0.3, color: "var(--color-primary)" }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

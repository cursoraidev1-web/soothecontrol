"use client";

import type { TeamSection as TeamSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface TeamSectionProps {
  section: TeamSectionType;
  sectionIndex?: number;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "A";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${last}`.toUpperCase();
}

export default function TeamSection({ section, sectionIndex }: TeamSectionProps) {
  const editor = useInlineEditor();
  const title = section.title || "Meet the team";
  const subtitle =
    section.subtitle ||
    "A small team obsessed with details, responsiveness, and a premium experience.";

  const members =
    section.members && section.members.length > 0
      ? section.members
      : [
          { name: "Alex Morgan", role: "Founder", bio: getLoremParagraph(), photoUrl: "", linkedinUrl: "" },
          { name: "Sam Lee", role: "Operations", bio: getLoremParagraph(), photoUrl: "", linkedinUrl: "" },
          { name: "Jordan Patel", role: "Customer Success", bio: getLoremParagraph(), photoUrl: "", linkedinUrl: "" },
        ];

  const filled = members.map((m) => ({
    name: m.name || "Team Member",
    role: m.role || "Role",
    bio: m.bio || getLoremParagraph(),
    photoUrl: m.photoUrl || "",
    linkedinUrl: m.linkedinUrl || "",
  }));

  return (
    <section className="t1-section t1-bg-light">
      <div className="t1-container">
        <span className="t1-label" style={{ display: "block", textAlign: "center", marginBottom: "var(--spacing-sm)" }}>
          Team
        </span>
        <EditableText
          as="h2"
          className="t1-section-title"
          value={title}
          placeholder="Team title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
          style={{ textAlign: "center", marginBottom: "var(--spacing-md)" }}
        />
        <EditableText
          as="p"
          value={subtitle}
          placeholder="Team subtitle"
          multiline
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, subtitle: next });
          }}
          className=""
          style={{
            maxWidth: 760,
            margin: "0 auto",
            textAlign: "center",
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-lg)",
            lineHeight: 1.7,
            marginBottom: "var(--spacing-3xl)",
          }}
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--spacing-2xl)" }}>
          {filled.map((m, idx) => (
            <div
              key={`${m.name}-${idx}`}
              style={{
                background: "var(--color-white)",
                borderRadius: "var(--radius-2xl)",
                border: "1px solid var(--color-border-light)",
                boxShadow: "var(--shadow-lg)",
                padding: "var(--spacing-3xl)",
                transition: "transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-lg)" }}>
                {m.photoUrl ? (
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "var(--radius-full)",
                      objectFit: "cover",
                      border: "2px solid var(--color-border)",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: "var(--radius-full)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      color: "var(--color-primary)",
                      background: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(139,92,246,0.12) 100%)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {initials(m.name)}
                  </div>
                )}
                <div>
                  <EditableText
                    as="div"
                    value={m.name}
                    placeholder="Name"
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextMembers = filled.map((x) => ({ ...x }));
                      nextMembers[idx] = { ...nextMembers[idx], name: next };
                      editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                    }}
                    className=""
                    style={{ fontWeight: 800, color: "var(--color-text-primary)", fontSize: "var(--font-size-lg)" }}
                  />
                  <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                    <EditableText
                      as="span"
                      value={m.role}
                      placeholder="Role"
                      onCommit={(next) => {
                        if (!editor || sectionIndex == null) return;
                        const nextMembers = filled.map((x) => ({ ...x }));
                        nextMembers[idx] = { ...nextMembers[idx], role: next };
                        editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                      }}
                    />
                    {m.linkedinUrl ? (
                      <>
                        {" · "}
                        <a
                          href={m.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: "var(--color-primary)", textDecoration: "none", fontWeight: 600 }}
                        >
                          LinkedIn
                        </a>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <EditableText
                as="p"
                value={m.bio}
                placeholder="Bio"
                multiline
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextMembers = filled.map((x) => ({ ...x }));
                  nextMembers[idx] = { ...nextMembers[idx], bio: next };
                  editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                }}
                className=""
                style={{ marginTop: "var(--spacing-lg)", color: "var(--color-text-secondary)", lineHeight: 1.7 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


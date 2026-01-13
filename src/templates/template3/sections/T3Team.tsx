"use client";

import type { TeamSection as TeamSectionType } from "@/lib/pageSchema";
import { getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "A";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${last}`.toUpperCase();
}

export default function T3Team({
  section,
  sectionIndex,
}: {
  section: TeamSectionType;
  sectionIndex?: number;
}) {
  const editor = useInlineEditor();
  const title = section.title || "Meet the team";
  const subtitle =
    section.subtitle ||
    "A small, senior team—hands-on, fast-moving, and meticulous.";

  const members =
    section.members && section.members.length > 0
      ? section.members
      : [
          { name: "Alex Morgan", role: "Founder", bio: getLoremParagraph(), photoUrl: "", linkedinUrl: "" },
          { name: "Sam Lee", role: "Operations", bio: getLoremParagraph(), photoUrl: "", linkedinUrl: "" },
          { name: "Jordan Patel", role: "Client Success", bio: getLoremParagraph(), photoUrl: "", linkedinUrl: "" },
        ];

  return (
    <section className="t3-section">
      <div className="t3-container">
        <span className="t3-eyebrow">Team</span>
        <EditableText
          as="h2"
          className="t3-section-title"
          value={title}
          placeholder="Team title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />
        <EditableText
          as="p"
          className="t3-section-sub"
          value={subtitle}
          placeholder="Team subtitle"
          multiline
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, subtitle: next });
          }}
        />

        <div className="t3-grid-3" style={{ marginTop: 18 }}>
          {members.map((m, idx) => (
            <div key={`${m.name}-${idx}`} className="t3-card t3-item">
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {m.photoUrl ? (
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 18,
                      objectFit: "cover",
                      border: "1px solid rgba(18,18,18,0.12)",
                    }}
                  />
                ) : (
                  <div
                    className="t3-badge"
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 18,
                      background: "rgba(15,118,110,0.10)",
                    }}
                  >
                    <span style={{ fontWeight: 900 }}>{initials(m.name || "Team")}</span>
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <EditableText
                    as="div"
                    value={m.name || "Team member"}
                    placeholder="Name"
                    style={{ fontWeight: 900 }}
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextMembers = members.map((x) => ({ ...x }));
                      nextMembers[idx] = { ...nextMembers[idx], name: next };
                      editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                    }}
                  />
                  <div className="t3-muted" style={{ fontSize: 13, fontWeight: 700 }}>
                    <EditableText
                      as="span"
                      value={m.role || "Role"}
                      placeholder="Role"
                      onCommit={(next) => {
                        if (!editor || sectionIndex == null) return;
                        const nextMembers = members.map((x) => ({ ...x }));
                        nextMembers[idx] = { ...nextMembers[idx], role: next };
                        editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                      }}
                    />
                    {m.linkedinUrl ? (
                      <>
                        {" · "}
                        <a href={m.linkedinUrl} target="_blank" rel="noreferrer" style={{ color: "var(--t3-accent)", textDecoration: "none", fontWeight: 900 }}>
                          LinkedIn
                        </a>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <EditableText
                as="p"
                value={m.bio || getLoremParagraph()}
                placeholder="Bio"
                multiline
                style={{ marginTop: 12 }}
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextMembers = members.map((x) => ({ ...x }));
                  nextMembers[idx] = { ...nextMembers[idx], bio: next };
                  editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


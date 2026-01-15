"use client";

import type { TeamSection as TeamSectionType } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "T";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${last}`.toUpperCase();
}

export default function T5Team({
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
    "A small, focused team committed to elegant craftsmanship and fast delivery.";

  const members =
    section.members && section.members.length > 0
      ? section.members
      : [
          { name: "Taylor Quinn", role: "Founder", bio: "Leads strategy, quality, and delivery.", photoUrl: "", linkedinUrl: "" },
          { name: "Casey Park", role: "Design", bio: "Design systems, UI polish, and brand consistency.", photoUrl: "", linkedinUrl: "" },
          { name: "Riley Chen", role: "Operations", bio: "Client onboarding and project coordination.", photoUrl: "", linkedinUrl: "" },
        ];

  const filled = members.map((m) => ({
    name: m.name || "Name",
    role: m.role || "Role",
    bio: m.bio || "Short bio.",
    photoUrl: m.photoUrl || "",
    linkedinUrl: m.linkedinUrl || "",
  }));

  return (
    <section className="t5-section">
      <div className="t5-container">
        <span className="t5-eyebrow">Team</span>
        <EditableText
          as="h2"
          className="t5-title"
          value={title}
          placeholder="Team title"
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, title: next });
          }}
        />
        <EditableText
          as="p"
          className="t5-sub"
          value={subtitle}
          placeholder="Team subtitle"
          multiline
          onCommit={(next) => {
            if (!editor || sectionIndex == null) return;
            editor.updateSection(sectionIndex, { ...section, subtitle: next });
          }}
        />

        <div className="t5-bento" style={{ marginTop: 18 }}>
          {filled.map((m, idx) => (
            <div key={`${m.name}-${idx}`} className="t5-card" style={{ gridColumn: "span 4", padding: 18 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                {m.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    style={{ width: 54, height: 54, borderRadius: 18, objectFit: "cover", border: "1px solid rgba(11,18,32,0.12)" }}
                  />
                ) : (
                  <div className="t5-chip" style={{ width: 54, height: 54, borderRadius: 18 }}>
                    <span style={{ fontWeight: 900 }}>{initials(m.name)}</span>
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <EditableText
                    as="div"
                    value={m.name}
                    placeholder="Name"
                    style={{ fontWeight: 900 }}
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextMembers = filled.map((x) => ({ ...x }));
                      nextMembers[idx] = { ...nextMembers[idx], name: next };
                      editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                    }}
                  />
                  <EditableText
                    as="div"
                    value={m.role}
                    placeholder="Role"
                    style={{ color: "var(--t5-muted)", fontWeight: 800, fontSize: 13, marginTop: 2 }}
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextMembers = filled.map((x) => ({ ...x }));
                      nextMembers[idx] = { ...nextMembers[idx], role: next };
                      editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                    }}
                  />
                </div>
                {m.linkedinUrl ? (
                  <a
                    href={m.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginLeft: "auto",
                      color: "var(--t5-muted)",
                      textDecoration: "none",
                      fontWeight: 900,
                      border: "1px solid rgba(11,18,32,0.14)",
                      borderRadius: 999,
                      padding: "8px 10px",
                      background: "rgba(255,255,255,0.70)",
                      fontSize: 12,
                    }}
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>

              <EditableText
                as="p"
                value={m.bio}
                placeholder="Bio"
                multiline
                style={{ marginTop: 12, color: "var(--t5-muted)", lineHeight: 1.75 }}
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextMembers = filled.map((x) => ({ ...x }));
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


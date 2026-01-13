"use client";

import type { TeamSection as TeamSectionType } from "@/lib/pageSchema";
import { getLoremHeadline, getLoremParagraph } from "@/lib/loremIpsum";

interface TeamSectionProps {
  section: TeamSectionType;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "A";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${last}`.toUpperCase();
}

export default function TeamSection({ section }: TeamSectionProps) {
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
        <h2 className="t1-section-title" style={{ textAlign: "center", marginBottom: "var(--spacing-md)" }}>
          {title}
        </h2>
        <p
          style={{
            maxWidth: 760,
            margin: "0 auto",
            textAlign: "center",
            color: "var(--color-text-secondary)",
            fontSize: "var(--font-size-lg)",
            lineHeight: 1.7,
            marginBottom: "var(--spacing-3xl)",
          }}
        >
          {subtitle}
        </p>

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
                  <div style={{ fontWeight: 800, color: "var(--color-text-primary)", fontSize: "var(--font-size-lg)" }}>
                    {m.name}
                  </div>
                  <div style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                    {m.role}
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
              <p style={{ marginTop: "var(--spacing-lg)", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


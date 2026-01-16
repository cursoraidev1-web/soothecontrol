"use client";

import type { ContactCardSection as ContactCardSectionType } from "@/lib/pageSchema";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";

export default function T4ContactCard({
  section,
  sectionIndex,
  profile,
}: {
  section: ContactCardSectionType;
  sectionIndex?: number;
  profile: {
    business_name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
  };
}) {
  const editor = useInlineEditor();

  const mapEmbedUrl = (() => {
    const link = section.mapLink?.trim();
    if (link && link.includes("output=embed")) return link;
    const query = encodeURIComponent(profile.address || profile.business_name || "Location");
    return `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  })();

  return (
    <section id="contact" className="t4-section">
      <div className="t4-container">
        <span className="t4-eyebrow">Contact</span>
        <div className="t4-bento" style={{ marginTop: 16 }}>
          <div className="t4-card" style={{ gridColumn: "span 6", padding: 18 }}>
            <h2 className="t4-title" style={{ marginTop: 12 }}>
              Let’s talk
            </h2>

            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              {profile.address ? (
                <div style={{ color: "var(--t4-muted)", fontWeight: 800 }}>{profile.address}</div>
              ) : null}
              {profile.phone ? (
                <div style={{ color: "var(--t4-muted)", fontWeight: 800 }}>{profile.phone}</div>
              ) : null}
              {profile.email ? (
                <div style={{ color: "var(--t4-muted)", fontWeight: 800 }}>{profile.email}</div>
              ) : null}
              {profile.whatsapp ? (
                <div style={{ color: "var(--t4-muted)", fontWeight: 800 }}>{profile.whatsapp}</div>
              ) : null}
            </div>

            <div style={{ marginTop: 16 }}>
              <a className="t4-cta" href={profile.email ? `mailto:${profile.email}` : "#"}>
                Request a quote
              </a>
            </div>
          </div>

          <div className="t4-card" style={{ gridColumn: "span 6", overflow: "hidden" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 12" }}>
              <iframe
                title="Map"
                src={mapEmbedUrl}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            {editor?.enabled && sectionIndex != null ? (
              <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.10)" }}>
                <div style={{ color: "var(--t4-muted)", fontWeight: 900, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Map embed (optional)
                </div>
                <input
                  className="t4-input"
                  value={section.mapLink || ""}
                  onChange={(e) => {
                    if (!editor || sectionIndex == null) return;
                    editor.updateSection(sectionIndex, { ...section, mapLink: e.target.value });
                  }}
                  placeholder="Paste a Google Maps embed URL (output=embed)"
                  style={{ marginTop: 10 }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}


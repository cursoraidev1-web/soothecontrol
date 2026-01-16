"use client";

import Link from "next/link";
import { buildEmailLink, buildTelLink } from "@/templates/template2/utils";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

export default function T3Footer({
  businessName,
  tagline,
  address,
  phone,
  email,
  socials,
  baseUrl,
}: {
  businessName: string;
  tagline: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  socials: Record<string, string>;
  baseUrl: string;
}) {
  const editor = useInlineEditor();
  
  // Get footer labels from socials (or use defaults)
  const footerLabels = (() => {
    const raw = (socials as Record<string, unknown>).footer_labels;
    if (raw && typeof raw === "object") return raw as Record<string, string>;
    return {} as Record<string, string>;
  })();
  const pagesLabel = footerLabels.pages || "Pages";
  const contactLabel = footerLabels.contact || "Contact";
  return (
    <footer className="t3-footer">
      <div className="t3-container">
        <div className="t3-footer-grid">
          <div>
            <h4>{businessName}</h4>
            {tagline ? (
              <p className="t3-muted" style={{ marginTop: 10, lineHeight: 1.7 }}>
                <EditableText
                  value={tagline}
                  placeholder="Tagline (optional)"
                  multiline
                  onCommit={(next) => editor?.updateProfileField?.("tagline", next)}
                />
              </p>
            ) : editor?.enabled ? (
              <p className="t3-muted" style={{ marginTop: 10, lineHeight: 1.7 }}>
                <EditableText
                  value=""
                  placeholder="Tagline (optional)"
                  multiline
                  onCommit={(next) => editor?.updateProfileField?.("tagline", next)}
                />
              </p>
            ) : null}
          </div>
          <div>
            <h4>Pages</h4>
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <Link href={`${baseUrl}/`}>Home</Link>
              <Link href={`${baseUrl}/about`}>About</Link>
              <Link href={`${baseUrl}/contact`}>Contact</Link>
            </div>
          </div>
          <div>
            <h4>
              <EditableText
                value={contactLabel}
                onCommit={(next) => {
                  const updatedSocials = {
                    ...socials,
                    footer_labels: {
                      ...footerLabels,
                      contact: next,
                    },
                  };
                  editor?.updateProfileField?.("socials", updatedSocials);
                }}
              />
            </h4>
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              {address ? (
                <span className="t3-muted">
                  <EditableText
                    value={address}
                    onCommit={(next) => editor?.updateProfileField?.("address", next)}
                    multiline
                  />
                </span>
              ) : null}
              {phone ? (
                <a href={buildTelLink(phone)}>
                  <EditableText
                    value={phone}
                    onCommit={(next) => editor?.updateProfileField?.("phone", next)}
                    style={{ display: "inline" }}
                  />
                </a>
              ) : null}
              {email ? (
                <a href={buildEmailLink(email)}>
                  <EditableText
                    value={email}
                    onCommit={(next) => editor?.updateProfileField?.("email", next)}
                    style={{ display: "inline" }}
                  />
                </a>
              ) : null}
              {(socials.instagram || socials.facebook || socials.twitter || socials.tiktok) ? (
                <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
                  {socials.instagram ? <a href={socials.instagram} target="_blank" rel="noreferrer">Instagram</a> : null}
                  {socials.facebook ? <a href={socials.facebook} target="_blank" rel="noreferrer">Facebook</a> : null}
                  {socials.twitter ? <a href={socials.twitter} target="_blank" rel="noreferrer">Twitter</a> : null}
                  {socials.tiktok ? <a href={socials.tiktok} target="_blank" rel="noreferrer">TikTok</a> : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, borderTop: "1px solid rgba(18,18,18,0.12)", paddingTop: 16 }}>
          <div className="t3-muted" style={{ fontSize: 12 }}>
            © {new Date().getFullYear()}{" "}
            <EditableText
              value={businessName}
              onCommit={(next) => editor?.updateProfileField?.("business_name", next)}
              style={{ display: "inline" }}
            />
            . All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}


"use client";

import type { ContactCardSection as ContactCardSectionType } from "@/lib/pageSchema";
import { buildEmailLink, buildTelLink, buildWhatsAppLink } from "@/templates/template2/utils";

export default function T3ContactCard({
  section,
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
  const mapEmbedUrl = (() => {
    const link = section.mapLink?.trim();
    if (link && link.includes("output=embed")) return link;
    const query = encodeURIComponent(profile.address || profile.business_name || "Location");
    return `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  })();

  return (
    <section id="contact" className="t3-section">
      <div className="t3-container">
        <span className="t3-eyebrow">Contact</span>
        <h2 className="t3-section-title">Get in touch</h2>

        <div className="t3-two-col" style={{ marginTop: 18 }}>
          <div className="t3-card" style={{ padding: 18, background: "rgba(255,255,255,0.78)" }}>
            <div style={{ display: "grid", gap: 12 }}>
              {profile.address ? (
                <div>
                  <div style={{ fontWeight: 900 }}>Address</div>
                  <div className="t3-muted" style={{ marginTop: 6 }}>{profile.address}</div>
                </div>
              ) : null}
              {profile.phone ? (
                <div>
                  <div style={{ fontWeight: 900 }}>Phone</div>
                  <a href={buildTelLink(profile.phone)}>{profile.phone}</a>
                </div>
              ) : null}
              {profile.email ? (
                <div>
                  <div style={{ fontWeight: 900 }}>Email</div>
                  <a href={buildEmailLink(profile.email)}>{profile.email}</a>
                </div>
              ) : null}
              {profile.whatsapp ? (
                <div>
                  <div style={{ fontWeight: 900 }}>WhatsApp</div>
                  <a href={buildWhatsAppLink(profile.whatsapp)} target="_blank" rel="noreferrer">
                    {profile.whatsapp}
                  </a>
                </div>
              ) : null}

              {section.mapLink ? (
                <div style={{ marginTop: 4 }}>
                  <a className="t3-cta" href={section.mapLink} target="_blank" rel="noreferrer">
                    Open in Maps
                  </a>
                </div>
              ) : null}
            </div>

            <div style={{ marginTop: 16 }} className="t3-map">
              <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10" }}>
                <iframe
                  title="Map"
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ position: "absolute", inset: 0 }}
                />
              </div>
            </div>
          </div>

          {section.showForm ? (
            <div className="t3-card" style={{ padding: 18, background: "rgba(255,255,255,0.78)" }}>
              <div style={{ fontWeight: 900, fontFamily: "var(--t3-serif)", fontSize: 20 }}>
                Send a message
              </div>
              <div className="t3-muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
                Tell us what you need. We’ll reply with next steps.
              </div>
              <form
                style={{ marginTop: 14, display: "grid", gap: 10 }}
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Form submission is not configured yet. Please contact directly via email/phone.");
                }}
              >
                <input className="t3-input" name="name" placeholder="Your name" required />
                <input className="t3-input" name="email" placeholder="Email address" type="email" required />
                <textarea className="t3-input" name="message" placeholder="Message" rows={6} required />
                <button type="submit" className="t3-cta" style={{ width: "100%", padding: "12px 14px" }}>
                  Send
                </button>
              </form>
              <div className="t3-muted" style={{ marginTop: 10, fontSize: 12 }}>
                By submitting, you agree to be contacted about your request.
              </div>
            </div>
          ) : (
            <div className="t3-card" style={{ padding: 18, background: "rgba(255,255,255,0.78)" }}>
              <div style={{ fontWeight: 900, fontFamily: "var(--t3-serif)", fontSize: 20 }}>
                Prefer direct contact?
              </div>
              <div className="t3-muted" style={{ marginTop: 8, lineHeight: 1.6 }}>
                Use the contact details—happy to help.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


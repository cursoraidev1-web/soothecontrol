"use client";

import Link from "next/link";
import { buildEmailLink, buildTelLink } from "@/templates/template2/utils";

export default function T4Footer({
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
  return (
    <footer className="t4-footer">
      <div className="t4-container">
        <div className="t4-footer-grid">
          <div>
            <div style={{ fontFamily: "var(--t4-serif)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              {businessName}
            </div>
            <div style={{ marginTop: 10, color: "var(--t4-muted)", lineHeight: 1.7 }}>
              {tagline || "Modern, elegant, and built to convert."}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--t4-serif)", fontWeight: 800 }}>Pages</div>
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              <Link href={`${baseUrl}/`}>Home</Link>
              <Link href={`${baseUrl}/about`}>About</Link>
              <Link href={`${baseUrl}/contact`}>Contact</Link>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--t4-serif)", fontWeight: 800 }}>Contact</div>
            <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
              {address ? <span style={{ color: "var(--t4-muted)", fontWeight: 700 }}>{address}</span> : null}
              {phone ? <a href={buildTelLink(phone)}>{phone}</a> : null}
              {email ? <a href={buildEmailLink(email)}>{email}</a> : null}
              {(socials.instagram || socials.facebook || socials.twitter || socials.tiktok) ? (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
                  {socials.instagram ? <a href={socials.instagram} target="_blank" rel="noreferrer">Instagram</a> : null}
                  {socials.facebook ? <a href={socials.facebook} target="_blank" rel="noreferrer">Facebook</a> : null}
                  {socials.twitter ? <a href={socials.twitter} target="_blank" rel="noreferrer">Twitter</a> : null}
                  {socials.tiktok ? <a href={socials.tiktok} target="_blank" rel="noreferrer">TikTok</a> : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 28, borderTop: "1px solid rgba(255,255,255,0.10)", paddingTop: 16 }}>
          <div style={{ color: "var(--t4-muted)", fontSize: 12 }}>
            © {new Date().getFullYear()} {businessName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}


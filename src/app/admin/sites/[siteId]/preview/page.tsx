"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";

import Template1 from "@/templates/template1/Template1";
import Template2 from "@/templates/template2/Template2";
import Template3 from "@/templates/template3/Template3";
import Template4 from "@/templates/template4/Template4";
import Template5 from "@/templates/template5/Template5";
import ColorPaletteSidebar from "@/components/admin/ColorPaletteSidebar";
import { InlineEditorProvider } from "@/components/inline-editor/InlineEditorContext";
import { resolveSiteById } from "@/lib/siteResolver";
import type { SiteData } from "@/lib/siteResolver";
import { validatePageData, type PageKey, type Section } from "@/lib/pageSchema";
import { formatSupabaseError } from "@/lib/supabase/formatError";
import { supabaseBrowser, getAuthenticatedClient } from "@/lib/supabase/browser";
import { getPublicAssetUrl } from "@/lib/assets";
import { extractLogoColors, type ExtractedLogoColors } from "@/lib/logoColors";

function hexToRgba(hex: string, alpha: number) {
  const m = hex.trim().replace("#", "");
  if (m.length !== 6) return `rgba(0,0,0,${alpha})`;
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function SitePreviewPage() {
  const params = useParams();
  const siteId = params?.siteId as string;

  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [colorPaletteOpen, setColorPaletteOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [isApplyingBrand, setIsApplyingBrand] = useState(false);
  const [brandError, setBrandError] = useState<string | null>(null);
  const [brandColors, setBrandColors] = useState<ExtractedLogoColors | null>(null);
  const previewWrapRef = useRef<HTMLDivElement | null>(null);

  const logoUrl = useMemo(() => {
    const path = siteData?.profile?.logo_path;
    return path ? getPublicAssetUrl(path) : null;
  }, [siteData?.profile?.logo_path]);

  useEffect(() => {
    if (!siteId) {
      setError("Invalid site ID");
      setIsLoading(false);
      return;
    }

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await resolveSiteById(siteId);
        if (!data) {
          setError("Site not found");
          return;
        }
        setSiteData(data);
      } catch (err) {
        setError(formatSupabaseError(err));
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [siteId]);

  if (isLoading) {
    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "14px", color: "#6B7280" }}>Loading preview...</div>
      </div>
    );
  }

  if (error || !siteData) {
    return (
      <div style={{ width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ 
          borderRadius: "8px", 
          border: "1px solid #FCA5A5", 
          backgroundColor: "#FEF2F2", 
          padding: "12px 16px", 
          fontSize: "14px", 
          color: "#B91C1C" 
        }}>
          {error || "Site not found"}
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "auto", position: "relative" }}>
      {/* Floating Page Selector */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 999,
          display: "flex",
          gap: "8px",
          background: "rgba(255, 255, 255, 0.95)",
          padding: "8px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setCurrentPage("home")}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            background: currentPage === "home" ? "#6B46C1" : "transparent",
            color: currentPage === "home" ? "#FFFFFF" : "#1F2937",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s",
          }}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentPage("about")}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            background: currentPage === "about" ? "#6B46C1" : "transparent",
            color: currentPage === "about" ? "#FFFFFF" : "#1F2937",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s",
          }}
        >
          About
        </button>
        <button
          onClick={() => setCurrentPage("contact")}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            background: currentPage === "contact" ? "#6B46C1" : "transparent",
            color: currentPage === "contact" ? "#FFFFFF" : "#1F2937",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "all 0.2s",
          }}
        >
          Contact
        </button>
        <Link
          href={`/admin/sites/${siteId}`}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid #E5E7EB",
            background: "transparent",
            color: "#1F2937",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            marginLeft: "8px",
          }}
        >
          Back
        </Link>

        <div style={{ width: 1, height: 24, background: "#E5E7EB", marginLeft: 8 }} />

        <button
          onClick={() => {
            setSaveError(null);
            setSaveSuccess(false);
            setEditMode((v) => !v);
          }}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #E5E7EB",
            background: editMode ? "#111827" : "transparent",
            color: editMode ? "#FFFFFF" : "#111827",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          {editMode ? "Editing" : "Edit"}
        </button>

        <button
          onClick={async () => {
            if (!siteData) return;
            setBrandError(null);

            if (!logoUrl) {
              setBrandError("Upload a logo first to extract brand colors.");
              return;
            }

            setIsApplyingBrand(true);
            try {
              const colors = await extractLogoColors(logoUrl);
              setBrandColors(colors);

              const wrap = previewWrapRef.current;
              const tk = siteData.site.template_key;
              const root = (
                (tk === "t1"
                  ? wrap?.querySelector(".template1-container")
                  : tk === "t3"
                    ? wrap?.querySelector(".template3")
                    : tk === "t4"
                      ? wrap?.querySelector(".template4")
                      : null) ?? wrap
              ) as HTMLElement | null;

              if (!root) throw new Error("Preview not ready.");

              if (tk === "t1") {
                root.style.setProperty("--color-primary", colors.dominant);
                root.style.setProperty("--color-accent", colors.accent);
                root.style.setProperty("--shadow-glow", `0 0 20px ${hexToRgba(colors.dominant, 0.30)}`);
                root.style.setProperty("--shadow-glow-lg", `0 0 40px ${hexToRgba(colors.dominant, 0.40)}`);
              }
              if (tk === "t3") {
                root.style.setProperty("--t3-accent", colors.dominant);
                root.style.setProperty("--t3-accent2", colors.accent);
                root.style.setProperty("--t3-ring", hexToRgba(colors.dominant, 0.18));
              }
              if (tk === "t4") {
                root.style.setProperty("--t4-accent", colors.dominant);
                root.style.setProperty("--t4-accent2", colors.accent);
                root.style.setProperty("--t4-ring", hexToRgba(colors.dominant, 0.22));
              }
            } catch (err) {
              setBrandError(formatSupabaseError(err));
            } finally {
              setIsApplyingBrand(false);
            }
          }}
          disabled={isApplyingBrand}
          style={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #E5E7EB",
            background: "#FFFFFF",
            color: "#111827",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 700,
            opacity: isApplyingBrand ? 0.7 : 1,
          }}
          title={logoUrl ? "Extract dominant + accent colors from the uploaded logo" : "Upload a logo first"}
        >
          {isApplyingBrand ? "Applying…" : "Apply logo colors"}
        </button>

        {brandColors ? (
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 2 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: brandColors.dominant, border: "1px solid rgba(0,0,0,0.10)" }} />
            <div style={{ width: 12, height: 12, borderRadius: 3, background: brandColors.accent, border: "1px solid rgba(0,0,0,0.10)" }} />
            <button
              onClick={() => {
                if (!siteData) return;
                setBrandError(null);
                setBrandColors(null);

                const wrap = previewWrapRef.current;
                const tk = siteData.site.template_key;
                const root = (
                  (tk === "t1"
                    ? wrap?.querySelector(".template1-container")
                    : tk === "t3"
                      ? wrap?.querySelector(".template3")
                      : tk === "t4"
                        ? wrap?.querySelector(".template4")
                        : null) ?? wrap
                ) as HTMLElement | null;

                if (!root) return;

                if (tk === "t1") {
                  root.style.removeProperty("--color-primary");
                  root.style.removeProperty("--color-accent");
                  root.style.removeProperty("--shadow-glow");
                  root.style.removeProperty("--shadow-glow-lg");
                }
                if (tk === "t3") {
                  root.style.removeProperty("--t3-accent");
                  root.style.removeProperty("--t3-accent2");
                  root.style.removeProperty("--t3-ring");
                }
                if (tk === "t4") {
                  root.style.removeProperty("--t4-accent");
                  root.style.removeProperty("--t4-accent2");
                  root.style.removeProperty("--t4-ring");
                }
              }}
              style={{
                padding: "6px 8px",
                borderRadius: "6px",
                border: "1px solid #E5E7EB",
                background: "transparent",
                color: "#6B7280",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Reset
            </button>
          </div>
        ) : null}

        {editMode && (
          <>
            <button
              onClick={async () => {
                if (!siteData) return;
                setIsSaving(true);
                setSaveError(null);
                setSaveSuccess(false);
                try {
                  const draft = siteData.pages[currentPage];
                  const valid = validatePageData(draft);
                  if (!valid.ok) {
                    setSaveError(valid.error ?? "Invalid page data.");
                    return;
                  }

                  // Ensure client is fully authenticated before making database call
                  const supabase = await getAuthenticatedClient();
                  const { error: err } = await supabase
                    .from("pages")
                    .update({ data: draft, status: "draft" })
                    .eq("site_id", siteId)
                    .eq("key", currentPage);

                  if (err) throw err;
                  setSaveSuccess(true);
                } catch (err) {
                  setSaveError(formatSupabaseError(err));
                } finally {
                  setIsSaving(false);
                }
              }}
              disabled={isSaving}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                background: "#6B46C1",
                color: "#FFFFFF",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 700,
                opacity: isSaving ? 0.7 : 1,
              }}
            >
              {isSaving ? "Saving…" : "Save Draft"}
            </button>

            <div style={{ fontSize: 12, color: "#6B7280", marginLeft: 6 }}>
              Click text to edit
            </div>
          </>
        )}
      </div>

      {/* Save toast */}
      {saveError ? (
        <div
          style={{
            position: "fixed",
            top: 88,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
            borderRadius: 10,
            border: "1px solid #FCA5A5",
            backgroundColor: "#FEF2F2",
            padding: "10px 12px",
            fontSize: 13,
            color: "#B91C1C",
            maxWidth: 720,
          }}
        >
          {saveError}
        </div>
      ) : null}
      {saveSuccess ? (
        <div
          style={{
            position: "fixed",
            top: 88,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
            borderRadius: 10,
            border: "1px solid #86EFAC",
            backgroundColor: "#ECFDF5",
            padding: "10px 12px",
            fontSize: 13,
            color: "#065F46",
          }}
        >
          Draft saved.
        </div>
      ) : null}
      {brandError ? (
        <div
          style={{
            position: "fixed",
            top: 88,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 999,
            borderRadius: 10,
            border: "1px solid #FCA5A5",
            backgroundColor: "#FEF2F2",
            padding: "10px 12px",
            fontSize: 13,
            color: "#B91C1C",
            maxWidth: 720,
          }}
        >
          {brandError}
        </div>
      ) : null}

      {/* Template Preview - Full Screen */}
      <div ref={previewWrapRef}>
        <InlineEditorProvider
          value={{
            enabled: editMode,
            pageKey: currentPage,
            pageData: siteData.pages[currentPage],
            updateSection: (sectionIndex: number, next: Section) => {
              setSiteData((prev) => {
                if (!prev) return prev;
                const page = prev.pages[currentPage];
                const sections = page.sections.map((s, i) => (i === sectionIndex ? next : s));
                return {
                  ...prev,
                  pages: {
                    ...prev.pages,
                    [currentPage]: { ...page, sections },
                  },
                };
              });
            },
            updateSectionField: (sectionIndex: number, field: string, value: unknown) => {
              setSiteData((prev) => {
                if (!prev) return prev;
                const page = prev.pages[currentPage];
                const section = page.sections[sectionIndex] as Record<string, unknown>;
                const nextSection = { ...(section as object), [field]: value } as unknown as Section;
                const sections = page.sections.map((s, i) => (i === sectionIndex ? nextSection : s));
                return {
                  ...prev,
                  pages: {
                    ...prev.pages,
                    [currentPage]: { ...page, sections },
                  },
                };
              });
            },
          }}
        >
          {siteData.site.template_key === "t1" && (
            <>
              <Template1
                site={siteData.site}
                profile={siteData.profile}
                pages={siteData.pages}
                currentPage={currentPage}
                baseUrl=""
              />
              <ColorPaletteSidebar
                isOpen={colorPaletteOpen}
                onClose={() => setColorPaletteOpen(!colorPaletteOpen)}
                templateKey="t1"
              />
            </>
          )}
          {siteData.site.template_key === "t2" && (
            <>
              <Template2
                site={siteData.site}
                profile={siteData.profile}
                pages={siteData.pages}
                currentPage={currentPage}
                baseUrl=""
              />
              {/* Template2 uses Tailwind CSS, color palette not applicable */}
            </>
          )}
          {siteData.site.template_key === "t3" && (
            <>
              <Template3
                site={siteData.site}
                profile={siteData.profile}
                pages={siteData.pages}
                currentPage={currentPage}
                baseUrl=""
              />
              <ColorPaletteSidebar
                isOpen={colorPaletteOpen}
                onClose={() => setColorPaletteOpen(!colorPaletteOpen)}
                templateKey="t3"
              />
            </>
          )}
          {siteData.site.template_key === "t4" && (
            <>
              <Template4
                site={siteData.site}
                profile={siteData.profile}
                pages={siteData.pages}
                currentPage={currentPage}
                baseUrl=""
              />
              <ColorPaletteSidebar
                isOpen={colorPaletteOpen}
                onClose={() => setColorPaletteOpen(!colorPaletteOpen)}
                templateKey="t4"
              />
            </>
          )}
          {siteData.site.template_key === "t5" && (
            <>
              <Template5
                site={siteData.site}
                profile={siteData.profile}
                pages={siteData.pages}
                currentPage={currentPage}
                baseUrl=""
              />
              <ColorPaletteSidebar
                isOpen={colorPaletteOpen}
                onClose={() => setColorPaletteOpen(!colorPaletteOpen)}
                templateKey="t5"
              />
            </>
          )}
        </InlineEditorProvider>
      </div>
      {!["t1", "t2", "t3", "t4", "t5"].includes(siteData.site.template_key) && (
        <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "18px", fontWeight: "600", color: "#1F2937" }}>
              Template {siteData.site.template_key.toUpperCase()} not yet implemented
            </p>
            <p style={{ marginTop: "8px", fontSize: "14px", color: "#6B7280" }}>
              Only Template1 (t1), Template2 (t2), Template3 (t3), Template4 (t4), and Template5 (t5) are currently available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

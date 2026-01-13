"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Template1 from "@/templates/template1/Template1";
import Template2 from "@/templates/template2/Template2";
import ColorPaletteSidebar from "@/components/admin/ColorPaletteSidebar";
import { InlineEditorProvider } from "@/components/inline-editor/InlineEditorContext";
import { resolveSiteById } from "@/lib/siteResolver";
import type { SiteData } from "@/lib/siteResolver";
import { validatePageData, type PageKey, type Section } from "@/lib/pageSchema";
import { formatSupabaseError } from "@/lib/supabase/formatError";
import { supabaseBrowser } from "@/lib/supabase/browser";

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

                  const supabase = supabaseBrowser();
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

      {/* Template Preview - Full Screen */}
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
          updateSectionField: (sectionIndex: number, field: any, value: any) => {
            setSiteData((prev) => {
              if (!prev) return prev;
              const page = prev.pages[currentPage];
              const section = page.sections[sectionIndex] as any;
              const nextSection = { ...section, [field]: value } as Section;
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
            />
          </>
        )}
        {siteData.site.template_key === "t2" && (
          <Template2
            site={siteData.site}
            profile={siteData.profile}
            pages={siteData.pages}
            currentPage={currentPage}
            baseUrl=""
          />
        )}
      </InlineEditorProvider>
      {!["t1", "t2"].includes(siteData.site.template_key) && (
        <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "18px", fontWeight: "600", color: "#1F2937" }}>
              Template {siteData.site.template_key.toUpperCase()} not yet implemented
            </p>
            <p style={{ marginTop: "8px", fontSize: "14px", color: "#6B7280" }}>
              Only Template1 (t1) and Template2 (t2) are currently available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

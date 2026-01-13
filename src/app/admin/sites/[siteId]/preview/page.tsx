"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Template1 from "@/templates/template1/Template1";
import Template2 from "@/templates/template2/Template2";
import ColorPaletteSidebar from "@/components/admin/ColorPaletteSidebar";
import { resolveSiteById } from "@/lib/siteResolver";
import type { SiteData } from "@/lib/siteResolver";
import type { PageKey } from "@/lib/pageSchema";
import { formatSupabaseError } from "@/lib/supabase/formatError";

export default function SitePreviewPage() {
  const params = useParams();
  const siteId = params?.siteId as string;

  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<PageKey>("home");
  const [colorPaletteOpen, setColorPaletteOpen] = useState(false);

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
      </div>

      {/* Template Preview - Full Screen */}
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

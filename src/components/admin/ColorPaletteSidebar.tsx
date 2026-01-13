"use client";

import { useState, useEffect } from "react";

interface ColorPaletteSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_COLORS = {
  primary: "#6B46C1",
  accent: "#8B5CF6",
  dark: "#4C1D95",
  textPrimary: "#1F2937",
  textSecondary: "#6B7280",
  bgMain: "#FFFFFF",
  bgLight: "#F9FAFB",
};

export default function ColorPaletteSidebar({
  isOpen,
  onClose,
}: ColorPaletteSidebarProps) {
  const [colors, setColors] = useState(DEFAULT_COLORS);

  useEffect(() => {
    // Load saved colors from localStorage
    const saved = localStorage.getItem("template1-colors");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setColors({ ...DEFAULT_COLORS, ...parsed });
        applyColors({ ...DEFAULT_COLORS, ...parsed });
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  const applyColors = (newColors: typeof DEFAULT_COLORS) => {
    const root = document.documentElement;
    root.style.setProperty("--color-primary", newColors.primary);
    root.style.setProperty("--color-accent", newColors.accent);
    root.style.setProperty("--color-dark", newColors.dark);
    root.style.setProperty("--color-text-primary", newColors.textPrimary);
    root.style.setProperty("--color-text-secondary", newColors.textSecondary);
    root.style.setProperty("--color-bg-main", newColors.bgMain);
    root.style.setProperty("--color-bg-light", newColors.bgLight);
  };

  const handleColorChange = (key: keyof typeof DEFAULT_COLORS, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    applyColors(newColors);
    localStorage.setItem("template1-colors", JSON.stringify(newColors));
  };

  const handleReset = () => {
    setColors(DEFAULT_COLORS);
    applyColors(DEFAULT_COLORS);
    localStorage.removeItem("template1-colors");
  };

  return (
    <>
      {/* Sidebar Overlay */}
      <div
        style={{
          position: "fixed",
          right: isOpen ? 0 : "-320px",
          top: 0,
          height: "100vh",
          width: "320px",
          backgroundColor: "#FFFFFF",
          boxShadow: "-4px 0 12px rgba(0, 0, 0, 0.15)",
          zIndex: 1001,
          transition: "right 0.3s ease",
          overflowY: "auto",
          padding: "24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#1F2937" }}>
            Color Customization
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: "#6B7280",
              padding: "4px",
            }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Primary Color */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1F2937" }}>
              Primary Color
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="color"
                value={colors.primary}
                onChange={(e) => handleColorChange("primary", e.target.value)}
                style={{ width: "60px", height: "40px", border: "1px solid #E5E7EB", borderRadius: "8px", cursor: "pointer" }}
              />
              <input
                type="text"
                value={colors.primary}
                onChange={(e) => handleColorChange("primary", e.target.value)}
                style={{ flex: 1, padding: "8px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px" }}
              />
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1F2937" }}>
              Accent Color
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="color"
                value={colors.accent}
                onChange={(e) => handleColorChange("accent", e.target.value)}
                style={{ width: "60px", height: "40px", border: "1px solid #E5E7EB", borderRadius: "8px", cursor: "pointer" }}
              />
              <input
                type="text"
                value={colors.accent}
                onChange={(e) => handleColorChange("accent", e.target.value)}
                style={{ flex: 1, padding: "8px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px" }}
              />
            </div>
          </div>

          {/* Dark Accent */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1F2937" }}>
              Dark Accent
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="color"
                value={colors.dark}
                onChange={(e) => handleColorChange("dark", e.target.value)}
                style={{ width: "60px", height: "40px", border: "1px solid #E5E7EB", borderRadius: "8px", cursor: "pointer" }}
              />
              <input
                type="text"
                value={colors.dark}
                onChange={(e) => handleColorChange("dark", e.target.value)}
                style={{ flex: 1, padding: "8px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px" }}
              />
            </div>
          </div>

          {/* Text Primary */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1F2937" }}>
              Primary Text
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="color"
                value={colors.textPrimary}
                onChange={(e) => handleColorChange("textPrimary", e.target.value)}
                style={{ width: "60px", height: "40px", border: "1px solid #E5E7EB", borderRadius: "8px", cursor: "pointer" }}
              />
              <input
                type="text"
                value={colors.textPrimary}
                onChange={(e) => handleColorChange("textPrimary", e.target.value)}
                style={{ flex: 1, padding: "8px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px" }}
              />
            </div>
          </div>

          {/* Text Secondary */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1F2937" }}>
              Secondary Text
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="color"
                value={colors.textSecondary}
                onChange={(e) => handleColorChange("textSecondary", e.target.value)}
                style={{ width: "60px", height: "40px", border: "1px solid #E5E7EB", borderRadius: "8px", cursor: "pointer" }}
              />
              <input
                type="text"
                value={colors.textSecondary}
                onChange={(e) => handleColorChange("textSecondary", e.target.value)}
                style={{ flex: 1, padding: "8px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px" }}
              />
            </div>
          </div>

          {/* Background Main */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1F2937" }}>
              Main Background
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="color"
                value={colors.bgMain}
                onChange={(e) => handleColorChange("bgMain", e.target.value)}
                style={{ width: "60px", height: "40px", border: "1px solid #E5E7EB", borderRadius: "8px", cursor: "pointer" }}
              />
              <input
                type="text"
                value={colors.bgMain}
                onChange={(e) => handleColorChange("bgMain", e.target.value)}
                style={{ flex: 1, padding: "8px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px" }}
              />
            </div>
          </div>

          {/* Background Light */}
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1F2937" }}>
              Light Background
            </label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="color"
                value={colors.bgLight}
                onChange={(e) => handleColorChange("bgLight", e.target.value)}
                style={{ width: "60px", height: "40px", border: "1px solid #E5E7EB", borderRadius: "8px", cursor: "pointer" }}
              />
              <input
                type="text"
                value={colors.bgLight}
                onChange={(e) => handleColorChange("bgLight", e.target.value)}
                style={{ flex: 1, padding: "8px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px" }}
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            style={{
              marginTop: "16px",
              padding: "12px 24px",
              background: "linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Reset to Defaults
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => onClose()}
        style={{
          position: "fixed",
          right: isOpen ? "340px" : "20px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--color-primary, #6B46C1) 0%, var(--color-accent, #8B5CF6) 100%)",
          border: "none",
          color: "#FFFFFF",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(107, 70, 193, 0.3)",
          zIndex: 1000,
          transition: "right 0.3s ease",
        }}
        aria-label={isOpen ? "Close color palette" : "Open color palette"}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          )}
        </svg>
      </button>
    </>
  );
}

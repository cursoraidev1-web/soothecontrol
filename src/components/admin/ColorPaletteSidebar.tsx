"use client";

import { useState, useEffect } from "react";

interface ColorPaletteSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  templateKey?: string;
}

// Template-specific color configurations
const TEMPLATE_CONFIGS: Record<string, {
  defaults: Record<string, string>;
  variables: Record<string, string>;
  labels: Record<string, string>;
}> = {
  t1: {
    defaults: {
      primary: "#6B46C1",
      accent: "#8B5CF6",
      dark: "#4C1D95",
      textPrimary: "#1F2937",
      textSecondary: "#6B7280",
      bgMain: "#FFFFFF",
      bgLight: "#F9FAFB",
    },
    variables: {
      primary: "--color-primary",
      accent: "--color-accent",
      dark: "--color-dark",
      textPrimary: "--color-text-primary",
      textSecondary: "--color-text-secondary",
      bgMain: "--color-bg-main",
      bgLight: "--color-bg-light",
    },
    labels: {
      primary: "Primary Color",
      accent: "Accent Color",
      dark: "Dark Accent",
      textPrimary: "Primary Text",
      textSecondary: "Secondary Text",
      bgMain: "Main Background",
      bgLight: "Light Background",
    },
  },
  t3: {
    defaults: {
      accent: "#0f766e",
      accent2: "#b45309",
      ink: "#121212",
      muted: "#5a615b",
      bg: "#fbfaf7",
      surface: "#ffffff",
    },
    variables: {
      accent: "--t3-accent",
      accent2: "--t3-accent2",
      ink: "--t3-ink",
      muted: "--t3-muted",
      bg: "--t3-bg",
      surface: "--t3-surface",
    },
    labels: {
      accent: "Primary Accent",
      accent2: "Secondary Accent",
      ink: "Text Color",
      muted: "Muted Text",
      bg: "Background",
      surface: "Surface",
    },
  },
  t4: {
    defaults: {
      accent: "#7c3aed",
      accent2: "#06b6d4",
      ink: "rgba(255, 255, 255, 0.92)",
      muted: "rgba(255, 255, 255, 0.66)",
      bg: "#0b0f19",
      surface: "rgba(255, 255, 255, 0.06)",
    },
    variables: {
      accent: "--t4-accent",
      accent2: "--t4-accent2",
      ink: "--t4-ink",
      muted: "--t4-muted",
      bg: "--t4-bg",
      surface: "--t4-surface",
    },
    labels: {
      accent: "Primary Accent",
      accent2: "Secondary Accent",
      ink: "Text Color",
      muted: "Muted Text",
      bg: "Background",
      surface: "Surface",
    },
  },
  t5: {
    defaults: {
      accent: "#2563eb",
      accent2: "#db2777",
      ink: "#0b1220",
      muted: "rgba(11, 18, 32, 0.62)",
      bg: "#f7f8fb",
      surface: "#ffffff",
    },
    variables: {
      accent: "--t5-accent",
      accent2: "--t5-accent2",
      ink: "--t5-ink",
      muted: "--t5-muted",
      bg: "--t5-bg",
      surface: "--t5-surface",
    },
    labels: {
      accent: "Primary Accent",
      accent2: "Secondary Accent",
      ink: "Text Color",
      muted: "Muted Text",
      bg: "Background",
      surface: "Surface",
    },
  },
  t6: {
    defaults: {
      accent: "#22c55e",
      accent2: "#60a5fa",
      ink: "rgba(255, 255, 255, 0.92)",
      muted: "rgba(255, 255, 255, 0.66)",
      bg: "#070a12",
      surface: "rgba(255, 255, 255, 0.06)",
    },
    variables: {
      accent: "--t6-accent",
      accent2: "--t6-accent2",
      ink: "--t6-ink",
      muted: "--t6-muted",
      bg: "--t6-bg",
      surface: "--t6-surface",
    },
    labels: {
      accent: "Primary Accent",
      accent2: "Secondary Accent",
      ink: "Text Color",
      muted: "Muted Text",
      bg: "Background",
      surface: "Surface",
    },
  },
};

export default function ColorPaletteSidebar({
  isOpen,
  onClose,
  templateKey = "t1",
}: ColorPaletteSidebarProps) {
  const config = TEMPLATE_CONFIGS[templateKey] || TEMPLATE_CONFIGS.t1;
  const storageKey = `template-${templateKey}-colors`;

  const [colors, setColors] = useState(() => {
    // Load once on first render (client-only component).
    const saved = localStorage.getItem(storageKey);
    if (!saved) return config.defaults;
    try {
      const parsed = JSON.parse(saved) as Partial<typeof config.defaults>;
      // Prevent undefined values from widening the state type.
      const next: Record<string, string> = { ...config.defaults };
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === "string") next[k] = v;
      }
      return next;
    } catch {
      return config.defaults;
    }
  });

  const applyColors = (newColors: typeof config.defaults) => {
    // Apply CSS variables to :root (document.documentElement) since all templates define variables there
    const root = document.documentElement;

    Object.entries(newColors).forEach(([key, value]) => {
      const cssVar = config.variables[key];
      if (cssVar) {
        root.style.setProperty(cssVar, value);
      }
    });
  };

  useEffect(() => {
    // Apply once on mount for initial state.
    applyColors(colors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColorChange = (key: string, value: string) => {
    const newColors = { ...colors, [key]: value };
    setColors(newColors);
    applyColors(newColors);
    localStorage.setItem(storageKey, JSON.stringify(newColors));
  };

  const handleReset = () => {
    setColors(config.defaults);
    applyColors(config.defaults);
    localStorage.removeItem(storageKey);
  };

  // Get button gradient color based on template
  const getButtonGradient = () => {
    if (templateKey === "t1") {
      return "linear-gradient(135deg, var(--color-primary, #6B46C1) 0%, var(--color-accent, #8B5CF6) 100%)";
    }
    if (templateKey === "t3") {
      return "linear-gradient(135deg, var(--t3-accent, #0f766e) 0%, var(--t3-accent2, #b45309) 100%)";
    }
    if (templateKey === "t4") {
      return "linear-gradient(135deg, var(--t4-accent, #7c3aed) 0%, var(--t4-accent2, #06b6d4) 100%)";
    }
    if (templateKey === "t5") {
      return "linear-gradient(135deg, var(--t5-accent, #2563eb) 0%, var(--t5-accent2, #db2777) 100%)";
    }
    if (templateKey === "t6") {
      return "linear-gradient(135deg, var(--t6-accent, #22c55e) 0%, var(--t6-accent2, #60a5fa) 100%)";
    }
    return "linear-gradient(135deg, #6B46C1 0%, #8B5CF6 100%)";
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
          {Object.entries(config.defaults).map(([key]) => (
            <div key={key}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1F2937" }}>
                {config.labels[key] || key}
              </label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input
                  type="color"
                  value={colors[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  style={{ width: "60px", height: "40px", border: "1px solid #E5E7EB", borderRadius: "8px", cursor: "pointer" }}
                />
                <input
                  type="text"
                  value={colors[key]}
                  onChange={(e) => handleColorChange(key, e.target.value)}
                  style={{ flex: 1, padding: "8px", border: "1px solid #E5E7EB", borderRadius: "8px", fontSize: "14px" }}
                />
              </div>
            </div>
          ))}

          {/* Reset Button */}
          <button
            onClick={handleReset}
            style={{
              marginTop: "16px",
              padding: "12px 24px",
              background: getButtonGradient(),
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
          background: getButtonGradient(),
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

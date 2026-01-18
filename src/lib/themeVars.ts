import type { CSSProperties } from "react";
import { toCssVarMap } from "@/lib/templateTheme";

type BrandColors = {
  dominant: string;
  accent: string;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

function normalizeCssColor(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const s = input.trim();
  if (!s) return null;
  return s;
}

function normalizeHexColor(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const s = input.trim();
  if (!/^#[0-9a-fA-F]{6}$/.test(s)) return null;
  return s.toUpperCase();
}

function hexToRgbTriplet(hex: string): string {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

function getBrandColors(raw: unknown): BrandColors | null {
  if (!isRecord(raw)) return null;
  const dominant = normalizeHexColor(raw.dominant);
  const accent = normalizeHexColor(raw.accent);
  if (!dominant || !accent) return null;
  return { dominant, accent };
}

function getThemeOverride(rawThemeColors: unknown, templateKey: string): Record<string, string> | null {
  if (!isRecord(rawThemeColors)) return null;
  const perTemplate = rawThemeColors[templateKey];
  if (!isRecord(perTemplate)) return null;

  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(perTemplate)) {
    // Allow any CSS color strings (hex/rgb/rgba/hsl/var(...)).
    const c = normalizeCssColor(v);
    if (c) out[k] = c;
  }
  return Object.keys(out).length > 0 ? out : null;
}

/**
 * Returns inline CSS variables for a template root element.
 * - Uses `brand_colors` (from "Apply logo colors") as base.
 * - Allows `theme_colors[templateKey]` to override specific variables (if present).
 */
export function buildTemplateThemeStyle(
  templateKey: string,
  profile: { brand_colors?: unknown; theme_colors?: unknown },
): CSSProperties | undefined {
  const brand = getBrandColors(profile.brand_colors);
  const overrides = getThemeOverride(profile.theme_colors, templateKey);

  // Nothing to apply.
  if (!brand && !overrides) return undefined;

  const style: Record<string, string> = {};

  // Base from brand colors.
  if (brand) {
    if (templateKey === "t1") {
      style["--color-primary"] = brand.dominant;
      style["--color-accent"] = brand.accent;
      style["--color-bg-gradient"] = `linear-gradient(135deg, ${brand.dominant} 0%, ${brand.accent} 100%)`;
    }

    if (templateKey === "t3") {
      style["--t3-accent"] = brand.dominant;
      style["--t3-accent2"] = brand.accent;
      style["--t3-accent-rgb"] = hexToRgbTriplet(brand.dominant);
      style["--t3-accent2-rgb"] = hexToRgbTriplet(brand.accent);
    }

    if (templateKey === "t4") {
      style["--t4-accent"] = brand.dominant;
      style["--t4-accent2"] = brand.accent;
      style["--t4-accent-rgb"] = hexToRgbTriplet(brand.dominant);
      style["--t4-accent2-rgb"] = hexToRgbTriplet(brand.accent);
    }

    if (templateKey === "t5") {
      style["--t5-accent"] = brand.dominant;
      style["--t5-accent2"] = brand.accent;
      style["--t5-accent-rgb"] = hexToRgbTriplet(brand.dominant);
      style["--t5-accent2-rgb"] = hexToRgbTriplet(brand.accent);
    }

    if (templateKey === "t6") {
      style["--t6-accent"] = brand.dominant;
      style["--t6-accent2"] = brand.accent;
      style["--t6-accent-rgb"] = hexToRgbTriplet(brand.dominant);
      style["--t6-accent2-rgb"] = hexToRgbTriplet(brand.accent);
    }
  }

  // Apply overrides (if any).
  // Apply via the template variable map so we can support full palettes.
  if (overrides) {
    const cssVars = toCssVarMap(templateKey, overrides);
    for (const [k, v] of Object.entries(cssVars)) style[k] = v;

    // Keep derived rgb vars in sync when accents are hex.
    if (templateKey === "t3") {
      const a = normalizeHexColor(overrides.accent);
      const b = normalizeHexColor(overrides.accent2);
      if (a) style["--t3-accent-rgb"] = hexToRgbTriplet(a);
      if (b) style["--t3-accent2-rgb"] = hexToRgbTriplet(b);
    }
    if (templateKey === "t4") {
      const a = normalizeHexColor(overrides.accent);
      const b = normalizeHexColor(overrides.accent2);
      if (a) style["--t4-accent-rgb"] = hexToRgbTriplet(a);
      if (b) style["--t4-accent2-rgb"] = hexToRgbTriplet(b);
    }
    if (templateKey === "t5") {
      const a = normalizeHexColor(overrides.accent);
      const b = normalizeHexColor(overrides.accent2);
      if (a) style["--t5-accent-rgb"] = hexToRgbTriplet(a);
      if (b) style["--t5-accent2-rgb"] = hexToRgbTriplet(b);
    }
    if (templateKey === "t6") {
      const a = normalizeHexColor(overrides.accent);
      const b = normalizeHexColor(overrides.accent2);
      if (a) style["--t6-accent-rgb"] = hexToRgbTriplet(a);
      if (b) style["--t6-accent2-rgb"] = hexToRgbTriplet(b);
    }

    // Template1 gradient needs to stay in sync if palette overrides are applied.
    if (templateKey === "t1") {
      const primary = style["--color-primary"];
      const accent = style["--color-accent"];
      if (primary && accent) {
        style["--color-bg-gradient"] = `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`;
      }
    }
  }

  return style as unknown as CSSProperties;
}


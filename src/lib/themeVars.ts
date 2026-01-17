import type { CSSProperties } from "react";

type BrandColors = {
  dominant: string;
  accent: string;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
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
    const c = normalizeHexColor(v);
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
  // We only support overriding known template vars; ignore unknown keys.
  if (overrides) {
    if (templateKey === "t1") {
      if (overrides.primary) style["--color-primary"] = overrides.primary;
      if (overrides.accent) style["--color-accent"] = overrides.accent;
      if (style["--color-primary"] && style["--color-accent"]) {
        style["--color-bg-gradient"] = `linear-gradient(135deg, ${style["--color-primary"]} 0%, ${style["--color-accent"]} 100%)`;
      }
    }

    if (templateKey === "t3") {
      if (overrides.accent) {
        style["--t3-accent"] = overrides.accent;
        style["--t3-accent-rgb"] = hexToRgbTriplet(overrides.accent);
      }
      if (overrides.accent2) {
        style["--t3-accent2"] = overrides.accent2;
        style["--t3-accent2-rgb"] = hexToRgbTriplet(overrides.accent2);
      }
    }

    if (templateKey === "t4") {
      if (overrides.accent) {
        style["--t4-accent"] = overrides.accent;
        style["--t4-accent-rgb"] = hexToRgbTriplet(overrides.accent);
      }
      if (overrides.accent2) {
        style["--t4-accent2"] = overrides.accent2;
        style["--t4-accent2-rgb"] = hexToRgbTriplet(overrides.accent2);
      }
    }

    if (templateKey === "t5") {
      if (overrides.accent) {
        style["--t5-accent"] = overrides.accent;
        style["--t5-accent-rgb"] = hexToRgbTriplet(overrides.accent);
      }
      if (overrides.accent2) {
        style["--t5-accent2"] = overrides.accent2;
        style["--t5-accent2-rgb"] = hexToRgbTriplet(overrides.accent2);
      }
    }

    if (templateKey === "t6") {
      if (overrides.accent) {
        style["--t6-accent"] = overrides.accent;
        style["--t6-accent-rgb"] = hexToRgbTriplet(overrides.accent);
      }
      if (overrides.accent2) {
        style["--t6-accent2"] = overrides.accent2;
        style["--t6-accent2-rgb"] = hexToRgbTriplet(overrides.accent2);
      }
    }
  }

  return style as unknown as CSSProperties;
}


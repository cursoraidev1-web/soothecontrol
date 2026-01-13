export type ExtractedLogoColors = {
  dominant: string; // hex
  accent: string; // hex
  palette: string[]; // hex list (best first)
};

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function rgbToHex({ r, g, b }: RGB): string {
  const to = (x: number) => x.toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`.toUpperCase();
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const d = max - min;
  const l = (max + min) / 2;

  if (d === 0) return { h: 0, s: 0, l };

  const s = d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (max === rn) h = ((gn - bn) / d) % 6;
  else if (max === gn) h = (bn - rn) / d + 2;
  else h = (rn - gn) / d + 4;
  h *= 60;
  if (h < 0) h += 360;

  return { h, s: clamp01(s), l: clamp01(l) };
}

function luma({ r, g, b }: RGB) {
  // perceived luminance (0..255)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hslDistance(a: HSL, b: HSL) {
  const dh = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h)) / 180; // 0..1
  const ds = Math.abs(a.s - b.s);
  const dl = Math.abs(a.l - b.l);
  return dh * 0.7 + ds * 0.2 + dl * 0.1;
}

async function loadImageBitmap(url: string): Promise<ImageBitmap> {
  if (typeof window === "undefined") {
    throw new Error("extractLogoColors can only run in the browser.");
  }
  const res = await fetch(url, { mode: "cors" });
  if (!res.ok) {
    throw new Error(`Failed to fetch image (${res.status})`);
  }
  const blob = await res.blob();
  // createImageBitmap is widely supported; it also avoids CORS tainting issues via blob URLs.
  return await createImageBitmap(blob);
}

export async function extractLogoColors(
  url: string,
  opts?: {
    maxSize?: number; // pixels (square canvas)
    sampleStride?: number; // >= 1 (higher = faster)
    maxPalette?: number;
  },
): Promise<ExtractedLogoColors> {
  const maxSize = opts?.maxSize ?? 128;
  const stride = Math.max(1, opts?.sampleStride ?? 2);
  const maxPalette = Math.max(2, opts?.maxPalette ?? 6);

  const bmp = await loadImageBitmap(url);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas context not available");

  const scale = Math.min(1, maxSize / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale));
  const h = Math.max(1, Math.round(bmp.height * scale));
  canvas.width = w;
  canvas.height = h;
  ctx.drawImage(bmp, 0, 0, w, h);

  const { data } = ctx.getImageData(0, 0, w, h);

  const countBuckets = (ignoreExtremes: boolean) => {
    const counts = new Map<number, number>();
    for (let y = 0; y < h; y += stride) {
      for (let x = 0; x < w; x += stride) {
        const i = (y * w + x) * 4;
        const r = data[i] ?? 0;
        const g = data[i + 1] ?? 0;
        const b = data[i + 2] ?? 0;
        const a = data[i + 3] ?? 0;
        if (a < 24) continue;

        if (ignoreExtremes) {
          const lum = luma({ r, g, b });
          // common logo backgrounds: pure white or near-white; also pure black.
          if (lum > 250 || lum < 10) continue;
        }

        // quantize to 32 levels/channel (0..31)
        const rq = r >> 3;
        const gq = g >> 3;
        const bq = b >> 3;
        const key = (rq << 10) | (gq << 5) | bq;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
    return counts;
  };

  let buckets = countBuckets(true);
  if (buckets.size < 2) buckets = countBuckets(false);

  const sorted = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, 48);
  if (sorted.length === 0) {
    return {
      dominant: "#7C3AED",
      accent: "#06B6D4",
      palette: ["#7C3AED", "#06B6D4"],
    };
  }

  const toRgb = (key: number): RGB => {
    const rq = (key >> 10) & 31;
    const gq = (key >> 5) & 31;
    const bq = key & 31;
    // center of bucket
    return { r: rq * 8 + 4, g: gq * 8 + 4, b: bq * 8 + 4 };
  };

  const candidates = sorted.map(([key, c]) => ({ rgb: toRgb(key), count: c }));
  const dominantRgb = candidates[0]!.rgb;
  const dominantHsl = rgbToHsl(dominantRgb);

  // Accent: prefer saturated + far from dominant hue.
  let bestAccent = candidates.length > 1 ? candidates[1]!.rgb : dominantRgb;
  let bestScore = -Infinity;
  for (let i = 0; i < candidates.length; i++) {
    const rgb = candidates[i]!.rgb;
    const hsl = rgbToHsl(rgb);
    const dist = hslDistance(dominantHsl, hsl);
    const sat = hsl.s;
    const weight = Math.log(1 + candidates[i]!.count);

    // Encourage saturation + distinct hue, but keep some weighting for frequency.
    const score = (sat * 0.75 + dist * 0.75) * weight;
    if (score > bestScore && dist > 0.12) {
      bestScore = score;
      bestAccent = rgb;
    }
  }

  const palette = candidates
    .slice(0, maxPalette)
    .map((c) => rgbToHex(c.rgb))
    .filter((v, idx, arr) => arr.indexOf(v) === idx);

  const dominant = rgbToHex(dominantRgb);
  const accent = rgbToHex(bestAccent);

  // Ensure palette includes dominant + accent at the front.
  const finalPalette = [dominant, accent, ...palette.filter((c) => c !== dominant && c !== accent)].slice(0, maxPalette);

  return { dominant, accent, palette: finalPalette };
}


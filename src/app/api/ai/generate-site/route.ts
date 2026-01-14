import { NextResponse } from "next/server";

import { validatePageData } from "@/lib/pageSchema";

function parseRetryAfterSeconds(detail: string): number | null {
  const m = detail.match(/retry in\s+([0-9.]+)s/i);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

function extractJson(text: string) {
  const cleaned = text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```$/i, "")
    .trim();

  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first) {
    throw new Error("Model did not return JSON.");
  }
  const slice = cleaned.slice(first, last + 1);
  return JSON.parse(slice) as unknown;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { brief?: string };
    const brief = (body.brief ?? "").trim();
    if (!brief) {
      return NextResponse.json({ error: "Missing 'brief'." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Gemini is not configured. Set GEMINI_API_KEY in server environment variables.",
        },
        { status: 500 },
      );
    }

    // NOTE: gemini-2.5-pro frequently has 0 free-tier quota on new projects.
    // Default to a Flash model to avoid immediate 429s unless explicitly overridden.
    const primaryModel = (process.env.GEMINI_MODEL || "gemini-2.0-flash").trim();
    const fallbackModels = (process.env.GEMINI_MODEL_FALLBACKS || "gemini-2.0-flash,gemini-1.5-flash")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const modelsToTry = [primaryModel, ...fallbackModels.filter((m) => m !== primaryModel)];

    const prompt = `
You are generating content for a small business website builder.

Task:
- Given the user's brief, produce JSON that fills:
  1) business profile fields
  2) PageData for home/about/contact pages with rich, professional content
- Output MUST be valid JSON and MUST match the schema below exactly.
- Output JSON ONLY (no markdown, no commentary).

Schema:
{
  "profile": {
    "business_name": string,
    "tagline": string | null,
    "description": string | null,
    "address": string | null,
    "phone": string | null,
    "email": string | null,
    "whatsapp": string | null,
    "socials": {
      "instagram": string | null,
      "facebook": string | null,
      "twitter": string | null,
      "tiktok": string | null
    }
  },
  "pages": {
    "home": PageData,
    "about": PageData,
    "contact": PageData
  }
}

PageData schema:
{
  "seo": { "title": string, "description": string },
  "sections": Section[]
}

Section union types (use these exact "type" values):
- { "type":"hero", "headline": string, "subtext": string, "ctaText": string, "ctaHref": string }
- { "type":"services", "items": [ { "title": string, "desc": string }, ... ] }
- { "type":"richtext", "title": string, "body": string }  (body MUST be HTML, e.g. "<p>..</p><ul><li>..</li></ul>")
- { "type":"values", "items": [ { "title": string, "desc": string }, ... ] }
- { "type":"backed_by", "title": string, "logos": [ { "name": string, "url": string|null }, ... ] }
- { "type":"use_cases", "title": string, "description": string, "items": [ { "title": string, "description": string, "linkText": string, "linkHref": string }, ... ] }
- { "type":"testimonials", "title": string, "items": [ { "name": string, "role": string, "quote": string, "company": string }, ... ] }
- { "type":"gallery", "title": string, "images": [ { "url": string, "alt": string }, ... ] } (use empty "" url if unknown)
- { "type":"faq", "title": string, "items": [ { "question": string, "answer": string }, ... ] }
- { "type":"team", "title": string, "subtitle": string, "members": [ { "name": string, "role": string, "bio": string, "photoUrl": string, "linkedinUrl": string }, ... ] } (photoUrl/linkedinUrl can be "")
- { "type":"contact_card", "showForm": true, "mapLink": string } (mapLink may be "")

Requirements:
- Produce rich content, but avoid hallucinating facts. If not provided, keep specifics generic.
- Make copy crisp and credible. No lorem ipsum.
- Home sections (recommended order):
  hero, services, values, backed_by, use_cases, testimonials, gallery, faq, contact_card
- About sections (recommended order):
  hero, richtext, team, values, testimonials, gallery, faq, contact_card
- Contact sections (recommended order):
  hero, contact_card, faq, richtext
- Include 4-6 services, 4-6 values, 3-5 use cases, 3 testimonials (can be "Client" if no names), 6 FAQs, 3 team members (generic if unknown).
- Use CTA href values that work across templates: "#contact" and "#services".

User brief:
${brief}
`.trim();

    let lastErrStatus: number | null = null;
    let lastErrDetail: string | null = null;
    let data: any = null;

    for (const model of modelsToTry) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
        model,
      )}:generateContent?key=${encodeURIComponent(apiKey)}`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.65,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        lastErrStatus = res.status;
        lastErrDetail = txt.slice(0, 2000);

        // If rate-limited, optionally honor suggested retry delay once.
        if (res.status === 429) {
          const retry = parseRetryAfterSeconds(txt);
          if (retry && retry <= 35) {
            await new Promise((r) => setTimeout(r, Math.ceil(retry * 1000)));
            continue;
          }
        }

        // Try next model if available.
        continue;
      }

      data = (await res.json()) as any;
      break;
    }

    if (!data) {
      const status = lastErrStatus ?? 502;
      const detail = lastErrDetail ?? "Unknown error";
      const isQuota = status === 429;
      return NextResponse.json(
        {
          error: isQuota
            ? "AI quota/rate limit exceeded. Try again later or switch to a Flash model / enable billing."
            : `Gemini request failed (${status}).`,
          detail,
        },
        { status: 502 },
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.map((p: any) => p?.text).filter(Boolean).join("\n") ??
      "";

    const parsed = extractJson(text) as any;

    const pages = parsed?.pages;
    if (!pages?.home || !pages?.about || !pages?.contact) {
      return NextResponse.json({ error: "Invalid AI output: missing pages." }, { status: 422 });
    }

    for (const k of ["home", "about", "contact"] as const) {
      const v = validatePageData(pages[k]);
      if (!v.ok) {
        return NextResponse.json(
          { error: `Invalid AI output for page '${k}': ${v.error ?? "Invalid."}` },
          { status: 422 },
        );
      }
    }

    return NextResponse.json(
      {
        profile: parsed.profile ?? null,
        pages: {
          home: pages.home,
          about: pages.about,
          contact: pages.contact,
        },
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}


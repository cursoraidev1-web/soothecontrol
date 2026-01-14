import { NextResponse } from "next/server";

import { validatePageData } from "@/lib/pageSchema";

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

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Groq is not configured. Set GROQ_API_KEY in server environment variables. Get a free key at https://console.groq.com/",
        },
        { status: 500 },
      );
    }

    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

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

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.65,
          max_tokens: 8192,
          response_format: { type: "json_object" },
        }),
      });

      if (!res.ok) {
        const txt = await res.text();
        const status = res.status;
        const detail = txt.slice(0, 2000);

        let errorMessage = `Groq request failed (${status}).`;
        if (status === 429) {
          errorMessage = "Groq rate limit exceeded. Free tier has generous limits - try again in a moment.";
        } else if (status === 401) {
          errorMessage = "Invalid Groq API key. Get a free key at https://console.groq.com/";
        }

        return NextResponse.json(
          {
            error: errorMessage,
            detail,
          },
          { status: 502 },
        );
      }

      const data = (await res.json()) as any;
      const text = data?.choices?.[0]?.message?.content ?? "";

      if (!text) {
        return NextResponse.json({ error: "Empty response from Groq." }, { status: 422 });
      }

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
    } catch (fetchErr) {
      return NextResponse.json(
        {
          error: fetchErr instanceof Error ? fetchErr.message : "Network error",
        },
        { status: 500 },
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}

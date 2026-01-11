export type PageKey = "home" | "about" | "contact";

export type SeoData = {
  title: string;
  description: string;
};

export type HeroSection = {
  type: "hero";
  headline: string;
  subtext: string;
  ctaText: string;
  ctaHref: string;
};

export type ServicesSection = {
  type: "services";
  items: Array<{ title: string; desc: string }>;
};

export type RichTextSection = {
  type: "richtext";
  title: string;
  body: string;
};

export type ValuesSection = {
  type: "values";
  items: Array<{ title: string; desc: string }>;
};

export type ContactCardSection = {
  type: "contact_card";
  showForm: boolean;
  mapLink: string;
};

export type Section =
  | HeroSection
  | ServicesSection
  | RichTextSection
  | ValuesSection
  | ContactCardSection;

export type PageData = {
  seo: SeoData;
  sections: Section[];
};

export function isPageKey(key: string): key is PageKey {
  return key === "home" || key === "about" || key === "contact";
}

export function validatePageData(value: unknown): {
  ok: boolean;
  error?: string;
} {
  if (!value || typeof value !== "object") {
    return { ok: false, error: "JSON must be an object." };
  }

  const v = value as { seo?: unknown; sections?: unknown };

  if (!v.seo || typeof v.seo !== "object") {
    return { ok: false, error: "JSON must contain { seo: object }." };
  }
  if (!Array.isArray(v.sections)) {
    return { ok: false, error: "JSON must contain { sections: array }." };
  }

  return { ok: true };
}

export function defaultSection(type: Section["type"]): Section {
  switch (type) {
    case "hero":
      return {
        type: "hero",
        headline: "",
        subtext: "",
        ctaText: "",
        ctaHref: "",
      };
    case "services":
      return {
        type: "services",
        items: [{ title: "", desc: "" }],
      };
    case "richtext":
      return {
        type: "richtext",
        title: "",
        body: "",
      };
    case "values":
      return {
        type: "values",
        items: [{ title: "", desc: "" }],
      };
    case "contact_card":
      return {
        type: "contact_card",
        showForm: true,
        mapLink: "",
      };
  }
}

export function defaultPageData(key: PageKey): PageData {
  const seo: SeoData = { title: "", description: "" };

  if (key === "home") {
    return {
      seo,
      sections: [
        defaultSection("hero"),
        defaultSection("services"),
        defaultSection("contact_card"),
      ],
    };
  }

  if (key === "about") {
    return {
      seo,
      sections: [
        defaultSection("hero"),
        defaultSection("richtext"),
        defaultSection("values"),
      ],
    };
  }

  return {
    seo,
    sections: [defaultSection("contact_card"), defaultSection("richtext")],
  };
}


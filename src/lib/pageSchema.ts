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

export type BackedBySection = {
  type: "backed_by";
  title: string;
  logos: Array<{ name: string; url: string | null }>;
};

export type UseCasesSection = {
  type: "use_cases";
  title: string;
  description: string;
  items: Array<{
    title: string;
    description: string;
    linkText?: string;
    linkHref?: string;
  }>;
};

export type GallerySection = {
  type: "gallery";
  title: string;
  images: Array<{ url: string; alt: string }>;
};

export type TestimonialsSection = {
  type: "testimonials";
  title: string;
  items: Array<{
    name: string;
    role: string;
    quote: string;
    company?: string;
  }>;
};

export type FAQSection = {
  type: "faq";
  title: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export type Section =
  | HeroSection
  | ServicesSection
  | RichTextSection
  | ValuesSection
  | ContactCardSection
  | BackedBySection
  | UseCasesSection
  | GallerySection
  | TestimonialsSection
  | FAQSection;

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

  // Validate that all sections have a type property
  for (const section of v.sections) {
    if (!section || typeof section !== "object" || !("type" in section)) {
      return { ok: false, error: "All sections must have a 'type' property." };
    }
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
    case "backed_by":
      return {
        type: "backed_by",
        title: "",
        logos: [{ name: "", url: null }],
      };
    case "use_cases":
      return {
        type: "use_cases",
        title: "",
        description: "",
        items: [
          {
            title: "",
            description: "",
            linkText: "",
            linkHref: "",
          },
        ],
      };
    case "gallery":
      return {
        type: "gallery",
        title: "",
        images: [{ url: "", alt: "" }],
      };
    case "testimonials":
      return {
        type: "testimonials",
        title: "",
        items: [
          {
            name: "",
            role: "",
            quote: "",
            company: "",
          },
        ],
      };
    case "faq":
      return {
        type: "faq",
        title: "",
        items: [
          {
            question: "",
            answer: "",
          },
        ],
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
        defaultSection("richtext"),
        defaultSection("services"),
        defaultSection("backed_by"),
        defaultSection("use_cases"),
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


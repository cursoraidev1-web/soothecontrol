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
  backgroundImage?: string;
  showTrustBadges?: boolean;
};

export type ServicesSection = {
  type: "services";
  title?: string;
  subtitle?: string;
  items: Array<{ 
    title: string; 
    desc: string;
    icon?: string;  // Icon identifier
  }>;
};

export type RichTextSection = {
  type: "richtext";
  title: string;
  body: string;
  image?: string;
  imagePosition?: "left" | "right";
};

export type ValuesSection = {
  type: "values";
  title?: string;
  subtitle?: string;
  items: Array<{ 
    title: string; 
    desc: string;
    icon?: string;
  }>;
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
  subtitle?: string;
  images: Array<{ url: string; alt: string; caption?: string }>;
};

export type TestimonialsSection = {
  type: "testimonials";
  title: string;
  subtitle?: string;
  items: Array<{
    name: string;
    role: string;
    quote: string;
    company?: string;
    avatar?: string;
    rating?: number;  // 1-5 stars
  }>;
};

export type FAQSection = {
  type: "faq";
  title: string;
  subtitle?: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

// ============ NEW SECTION TYPES ============

// Stats/Numbers Section - for displaying key metrics
export type StatsSection = {
  type: "stats";
  title?: string;
  subtitle?: string;
  items: Array<{
    value: string;      // "500+" or "99%"
    label: string;      // "Happy Clients"
    icon?: string;
  }>;
  style?: "default" | "cards" | "minimal";
};

// Team Members Section - for About page
export type TeamSection = {
  type: "team";
  title: string;
  subtitle?: string;
  members: Array<{
    name: string;
    role: string;
    image?: string;
    bio?: string;
    socials?: {
      linkedin?: string;
      twitter?: string;
      email?: string;
    };
  }>;
};

// Timeline/History Section - company milestones
export type TimelineSection = {
  type: "timeline";
  title: string;
  subtitle?: string;
  items: Array<{
    year: string;
    title: string;
    description: string;
  }>;
};

// Process/How It Works Section - step by step
export type ProcessSection = {
  type: "process";
  title: string;
  subtitle?: string;
  steps: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
};

// Map Section - embedded Google Maps
export type MapSection = {
  type: "map";
  title?: string;
  embedUrl?: string;
  address?: string;
  showDirectionsButton?: boolean;
};

// Contact Banner - hero-style CTA for contact
export type ContactBannerSection = {
  type: "contact_banner";
  headline: string;
  subtext?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  ctaText?: string;
  ctaHref?: string;
};

// Business Hours Section
export type HoursSection = {
  type: "hours";
  title: string;
  schedule: Array<{
    day: string;
    hours: string;
  }>;
  note?: string;
};

// Pricing Section
export type PricingSection = {
  type: "pricing";
  title: string;
  subtitle?: string;
  plans: Array<{
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: string[];
    ctaText: string;
    ctaHref: string;
    highlighted?: boolean;
  }>;
};

// Features Grid Section - icon + title + description
export type FeaturesSection = {
  type: "features";
  title: string;
  subtitle?: string;
  items: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  columns?: 2 | 3 | 4;
};

// CTA Banner Section - call to action
export type CTABannerSection = {
  type: "cta_banner";
  headline: string;
  subtext?: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  style?: "gradient" | "dark" | "light";
};

// Logo Cloud Section - improved trusted by
export type LogoCloudSection = {
  type: "logo_cloud";
  title?: string;
  logos: Array<{
    name: string;
    image?: string;
    url?: string;
  }>;
};

// Video Section - embedded video
export type VideoSection = {
  type: "video";
  title?: string;
  subtitle?: string;
  videoUrl: string;
  thumbnail?: string;
  caption?: string;
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
  | FAQSection
  | StatsSection
  | TeamSection
  | TimelineSection
  | ProcessSection
  | MapSection
  | ContactBannerSection
  | HoursSection
  | PricingSection
  | FeaturesSection
  | CTABannerSection
  | LogoCloudSection
  | VideoSection;

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
        title: "Our Services",
        subtitle: "What we offer",
        items: [{ title: "", desc: "", icon: "star" }],
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
        title: "Our Values",
        subtitle: "What drives us",
        items: [{ title: "", desc: "", icon: "heart" }],
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
            rating: 5,
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
    // ============ NEW SECTION DEFAULTS ============
    case "stats":
      return {
        type: "stats",
        title: "By the Numbers",
        items: [
          { value: "500+", label: "Happy Clients", icon: "users" },
          { value: "10+", label: "Years Experience", icon: "calendar" },
          { value: "99%", label: "Satisfaction Rate", icon: "thumbsup" },
          { value: "24/7", label: "Support Available", icon: "headphones" },
        ],
        style: "default",
      };
    case "team":
      return {
        type: "team",
        title: "Meet Our Team",
        subtitle: "The people behind our success",
        members: [
          {
            name: "",
            role: "",
            image: "",
            bio: "",
          },
        ],
      };
    case "timeline":
      return {
        type: "timeline",
        title: "Our Journey",
        subtitle: "How we got here",
        items: [
          { year: "2020", title: "", description: "" },
        ],
      };
    case "process":
      return {
        type: "process",
        title: "How It Works",
        subtitle: "Simple steps to get started",
        steps: [
          { title: "Step 1", description: "", icon: "clipboard" },
          { title: "Step 2", description: "", icon: "settings" },
          { title: "Step 3", description: "", icon: "check" },
        ],
      };
    case "map":
      return {
        type: "map",
        title: "Find Us",
        embedUrl: "",
        address: "",
        showDirectionsButton: true,
      };
    case "contact_banner":
      return {
        type: "contact_banner",
        headline: "Ready to Get Started?",
        subtext: "Contact us today and let's discuss your project",
        ctaText: "Contact Us",
        ctaHref: "/contact",
      };
    case "hours":
      return {
        type: "hours",
        title: "Business Hours",
        schedule: [
          { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
          { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
          { day: "Sunday", hours: "Closed" },
        ],
        note: "Closed on public holidays",
      };
    case "pricing":
      return {
        type: "pricing",
        title: "Pricing Plans",
        subtitle: "Choose the plan that fits your needs",
        plans: [
          {
            name: "Basic",
            price: "$99",
            period: "month",
            features: ["Feature 1", "Feature 2"],
            ctaText: "Get Started",
            ctaHref: "#",
          },
        ],
      };
    case "features":
      return {
        type: "features",
        title: "Why Choose Us",
        subtitle: "What makes us different",
        items: [
          { icon: "star", title: "", description: "" },
        ],
        columns: 3,
      };
    case "cta_banner":
      return {
        type: "cta_banner",
        headline: "Ready to Transform Your Business?",
        subtext: "Join thousands of satisfied customers",
        primaryCTA: { text: "Get Started", href: "#" },
        secondaryCTA: { text: "Learn More", href: "#" },
        style: "gradient",
      };
    case "logo_cloud":
      return {
        type: "logo_cloud",
        title: "Trusted by Industry Leaders",
        logos: [{ name: "", image: "" }],
      };
    case "video":
      return {
        type: "video",
        title: "See Us in Action",
        subtitle: "Watch our story",
        videoUrl: "",
        caption: "",
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
        defaultSection("logo_cloud"),
        defaultSection("stats"),
        defaultSection("services"),
        defaultSection("process"),
        defaultSection("features"),
        defaultSection("gallery"),
        defaultSection("testimonials"),
        defaultSection("faq"),
        defaultSection("cta_banner"),
      ],
    };
  }

  if (key === "about") {
    return {
      seo,
      sections: [
        defaultSection("hero"),
        defaultSection("richtext"),
        defaultSection("stats"),
        defaultSection("values"),
        defaultSection("team"),
        defaultSection("timeline"),
        defaultSection("gallery"),
        defaultSection("cta_banner"),
      ],
    };
  }

  // Contact page
  return {
    seo,
    sections: [
      defaultSection("contact_banner"),
      defaultSection("contact_card"),
      defaultSection("map"),
      defaultSection("hours"),
      defaultSection("faq"),
    ],
  };
}


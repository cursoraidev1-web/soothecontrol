import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Template1 from "@/templates/template1/Template1";
import Template2 from "@/templates/template2/Template2";
import { resolveSiteBySlug } from "@/lib/siteResolver";
import { isPageKey } from "@/lib/pageSchema";
import type { PageKey } from "@/lib/pageSchema";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; pageKey: string };
}): Promise<Metadata> {
  if (!isPageKey(params.pageKey)) {
    return {
      title: "Page Not Found",
    };
  }

  const pageKey = params.pageKey as PageKey;
  const siteData = await resolveSiteBySlug(params.slug);

  if (!siteData) {
    return {
      title: "Site Not Found",
    };
  }

  const pageData = siteData.pages[pageKey];
  const businessName = siteData.profile.business_name;
  const domain = siteData.site.slug; // In production, this would be the actual domain
  const logoUrl = siteData.profile.logo_path
    ? `https://${domain}${siteData.profile.logo_path}`
    : undefined;
  const pageTitle = pageData.seo.title || `${businessName} | ${pageKey === "about" ? "About Us" : pageKey === "contact" ? "Contact Us" : "Home"}`;

  return {
    title: pageTitle,
    description: pageData.seo.description || `Learn about ${businessName}${pageKey === "about" ? " and our story" : pageKey === "contact" ? " and get in touch" : ""}.`,
    keywords: `${businessName}, ${pageKey}, services, business`,
    authors: [{ name: businessName }],
    openGraph: {
      title: pageTitle,
      description: pageData.seo.description || `Learn about ${businessName}${pageKey === "about" ? " and our story" : pageKey === "contact" ? " and get in touch" : ""}.`,
      url: `https://${domain}/${pageKey === "home" ? "" : pageKey}`,
      siteName: businessName,
      images: logoUrl
        ? [
            {
              url: logoUrl,
              width: 1200,
              height: 630,
              alt: businessName,
            },
          ]
        : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageData.seo.description || `Learn about ${businessName}${pageKey === "about" ? " and our story" : pageKey === "contact" ? " and get in touch" : ""}.`,
      images: logoUrl ? [logoUrl] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://${domain}/${pageKey === "home" ? "" : pageKey}`,
    },
  };
}

export default async function PublicSitePagePage({
  params,
}: {
  params: { slug: string; pageKey: string };
}) {
  if (!isPageKey(params.pageKey)) {
    notFound();
  }

  const pageKey = params.pageKey as PageKey;
  const siteData = await resolveSiteBySlug(params.slug);

  if (!siteData) {
    notFound();
  }

  const pageData = siteData.pages[pageKey];
  const domain = siteData.site.slug; // In production, this would be the actual domain
  const logoUrl = siteData.profile.logo_path
    ? `https://${domain}${siteData.profile.logo_path}`
    : undefined;

  // JSON-LD Structured Data based on page type
  let structuredData;
  if (pageKey === "contact") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      mainEntity: {
        "@type": "Organization",
        name: siteData.profile.business_name,
        ...(siteData.profile.phone && {
          contactPoint: {
            "@type": "ContactPoint",
            telephone: siteData.profile.phone,
            ...(siteData.profile.email && { email: siteData.profile.email }),
            contactType: "customer service",
          },
        }),
      },
    };
  } else {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: pageData.seo.title || `${siteData.profile.business_name} - ${pageKey}`,
      description: pageData.seo.description,
      url: `https://${domain}/${pageKey === "home" ? "" : pageKey}`,
      ...(logoUrl && { image: logoUrl }),
    };
  }

  // Render based on template_key
  if (siteData.site.template_key === "t1") {
    return (
      <>
        <Script
          id={`${pageKey}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Template1
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl={`/${params.slug}`}
        />
      </>
    );
  }

  if (siteData.site.template_key === "t2") {
    return (
      <>
        <Script
          id={`${pageKey}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Template2
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl={`/${params.slug}`}
        />
      </>
    );
  }

  // Template not implemented
  notFound();
}

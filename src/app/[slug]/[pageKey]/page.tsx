import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Template1 from "@/templates/template1/Template1";
import Template2 from "@/templates/template2/Template2";
import Template3 from "@/templates/template3/Template3";
import Template4 from "@/templates/template4/Template4";
import Template5 from "@/templates/template5/Template5";
import Template6 from "@/templates/template6/Template6";
import { resolveSiteBySlug } from "@/lib/siteResolver.server";
import { isPageKey } from "@/lib/pageSchema";
import type { PageKey } from "@/lib/pageSchema";
import Script from "next/script";
import { headers } from "next/headers";
import { getPublicAssetUrl } from "@/lib/assets";
import { normalizeHostname } from "@/lib/domains";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; pageKey: string }>;
}): Promise<Metadata> {
  const { slug, pageKey: rawPageKey } = await params;
  const h = await headers();
  const hostHeader = h.get("x-forwarded-host") || h.get("host") || "";
  const proto = (h.get("x-forwarded-proto") || "https").split(",")[0]!.trim() || "https";
  const reqHost = normalizeHostname(hostHeader);
  const platformDomain =
    (process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "soothecontrols.site").toLowerCase();
  const isSubdomain = reqHost === `${slug}.${platformDomain}`;

  if (!isPageKey(rawPageKey)) {
    return {
      title: "Page Not Found",
    };
  }

  const pageKey = rawPageKey as PageKey;
  const siteData = await resolveSiteBySlug(slug);

  if (!siteData) {
    return {
      title: "Site Not Found",
    };
  }

  const pageData = siteData.pages[pageKey];
  const businessName = siteData.profile.business_name;
  const logoUrl = siteData.profile.logo_path
    ? getPublicAssetUrl(siteData.profile.logo_path)
    : undefined;
  const pageTitle = pageData.seo.title || `${businessName} | ${pageKey === "about" ? "About Us" : pageKey === "contact" ? "Contact Us" : "Home"}`;
  const canonicalHost = isSubdomain
    ? reqHost
    : reqHost && reqHost !== platformDomain
      ? reqHost
      : `${slug}.${platformDomain}`;
  const canonical = canonicalHost
    ? `https://${canonicalHost}/${pageKey === "home" ? "" : pageKey}`.replace(/\/$/, "")
    : undefined;
  const origin = canonicalHost ? `${proto}://${canonicalHost}` : undefined;
  const ogImageUrl = origin
    ? `${origin}/api/og/site?slug=${encodeURIComponent(slug)}&page=${encodeURIComponent(pageKey)}`
    : undefined;
  const iconUrl = origin ? `${origin}/api/icon/site?slug=${encodeURIComponent(slug)}` : undefined;

  return {
    metadataBase: origin ? new URL(origin) : undefined,
    title: pageTitle,
    description: pageData.seo.description || `Learn about ${businessName}${pageKey === "about" ? " and our story" : pageKey === "contact" ? " and get in touch" : ""}.`,
    keywords: `${businessName}, ${pageKey}, services, business`,
    authors: [{ name: businessName }],
    openGraph: {
      title: pageTitle,
      description: pageData.seo.description || `Learn about ${businessName}${pageKey === "about" ? " and our story" : pageKey === "contact" ? " and get in touch" : ""}.`,
      url: canonical,
      siteName: businessName,
      images: [
        ...(ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630, alt: businessName }] : []),
        ...(logoUrl ? [{ url: logoUrl, alt: businessName }] : []),
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageData.seo.description || `Learn about ${businessName}${pageKey === "about" ? " and our story" : pageKey === "contact" ? " and get in touch" : ""}.`,
      images: ogImageUrl ? [ogImageUrl] : (logoUrl ? [logoUrl] : []),
    },
    icons: iconUrl ? { icon: iconUrl, apple: iconUrl } : (logoUrl ? { icon: logoUrl } : undefined),
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
      canonical,
    },
  };
}

export default async function PublicSitePagePage({
  params,
}: {
  params: Promise<{ slug: string; pageKey: string }>;
}) {
  const { slug, pageKey: rawPageKey } = await params;
  const hostHeader = (await headers()).get("host") || "";
  const reqHost = normalizeHostname(hostHeader);
  const platformDomain =
    (process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "soothecontrols.site").toLowerCase();
  const isSubdomain = reqHost === `${slug}.${platformDomain}`;

  if (!isPageKey(rawPageKey)) {
    notFound();
  }

  const pageKey = rawPageKey as PageKey;
  const siteData = await resolveSiteBySlug(slug);

  if (!siteData) {
    notFound();
  }

  const logoUrl = siteData.profile.logo_path
    ? getPublicAssetUrl(siteData.profile.logo_path)
    : undefined;
  const pageData = siteData.pages[pageKey];

  // JSON-LD Structured Data based on page type
  let structuredData;
  if (pageKey === "contact") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      ...(isSubdomain ? { url: `https://${reqHost}/contact` } : {}),
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
      ...(isSubdomain
        ? { url: `https://${reqHost}/${pageKey === "home" ? "" : pageKey}`.replace(/\/$/, "") }
        : {}),
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
          baseUrl={isSubdomain ? "" : `/${slug}`}
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
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  if (siteData.site.template_key === "t3") {
    return (
      <>
        <Script
          id={`${pageKey}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Template3
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  if (siteData.site.template_key === "t4") {
    return (
      <>
        <Script
          id={`${pageKey}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Template4
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  if (siteData.site.template_key === "t5") {
    return (
      <>
        <Script
          id={`${pageKey}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Template5
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  if (siteData.site.template_key === "t6") {
    return (
      <>
        <Script
          id={`${pageKey}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <Template6
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  // Template not implemented
  notFound();
}

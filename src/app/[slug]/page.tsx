import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Template1 from "@/templates/template1/Template1";
import Template2 from "@/templates/template2/Template2";
import Template3 from "@/templates/template3/Template3";
import Template4 from "@/templates/template4/Template4";
import Template5 from "@/templates/template5/Template5";
import Template6 from "@/templates/template6/Template6";
import { resolveSiteBySlug } from "@/lib/siteResolver.server";
import Script from "next/script";
import { headers } from "next/headers";
import { getPublicAssetUrl } from "@/lib/assets";
import { normalizeHostname } from "@/lib/domains";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const h = await headers();
  const hostHeader = h.get("x-forwarded-host") || h.get("host") || "";
  const proto = (h.get("x-forwarded-proto") || "https").split(",")[0]!.trim() || "https";
  const reqHost = normalizeHostname(hostHeader);
  const platformDomain =
    (process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "soothecontrols.site").toLowerCase();
  const isSubdomain = reqHost === `${slug}.${platformDomain}`;

  const siteData = await resolveSiteBySlug(slug);

  if (!siteData) {
    return {
      title: "Site Not Found",
    };
  }

  const pageData = siteData.pages.home;
  const businessName = siteData.profile.business_name;
  const logoUrl = siteData.profile.logo_path
    ? getPublicAssetUrl(siteData.profile.logo_path)
    : undefined;
  const canonicalHost = isSubdomain
    ? reqHost
    : reqHost && reqHost !== platformDomain
      ? reqHost
      : `${slug}.${platformDomain}`;
  const canonical = canonicalHost ? `https://${canonicalHost}` : undefined;
  const origin = canonicalHost ? `${proto}://${canonicalHost}` : undefined;
  const ogImageUrl = origin ? `${origin}/api/og/site?slug=${encodeURIComponent(slug)}&page=home` : undefined;
  const iconUrl = origin ? `${origin}/api/icon/site?slug=${encodeURIComponent(slug)}` : undefined;

  return {
    metadataBase: origin ? new URL(origin) : undefined,
    title: pageData.seo.title || `${businessName} | Professional Services`,
    description: pageData.seo.description || `Learn about ${businessName} and our professional services.`,
    keywords: `${businessName}, services, business`,
    authors: [{ name: businessName }],
    openGraph: {
      title: pageData.seo.title || `${businessName} | Professional Services`,
      description: pageData.seo.description || `Learn about ${businessName} and our professional services.`,
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
      title: pageData.seo.title || `${businessName} | Professional Services`,
      description: pageData.seo.description || `Learn about ${businessName} and our professional services.`,
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
      canonical: canonical,
    },
  };
}

export default async function PublicSitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hostHeader = (await headers()).get("host") || "";
  const reqHost = normalizeHostname(hostHeader);
  const platformDomain =
    (process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "soothecontrols.site").toLowerCase();
  const isSubdomain = reqHost === `${slug}.${platformDomain}`;
  
  // Log for debugging
  console.log(`[PublicSitePage] Resolving site with slug: "${slug}"`);
  
  const siteData = await resolveSiteBySlug(slug);

  if (!siteData) {
    console.error(`[PublicSitePage] Failed to resolve site with slug: "${slug}"`);
    notFound();
  }

  const logoUrl = siteData.profile.logo_path
    ? getPublicAssetUrl(siteData.profile.logo_path)
    : undefined;

  // JSON-LD Structured Data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteData.profile.business_name,
    url: isSubdomain
      ? `https://${reqHost}`
      : `https://${slug}.${platformDomain}`,
    ...(logoUrl && { logo: logoUrl }),
    ...(siteData.profile.description && {
      description: siteData.profile.description,
    }),
    ...(siteData.profile.address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: siteData.profile.address,
      },
    }),
    ...(siteData.profile.phone && {
      contactPoint: {
        "@type": "ContactPoint",
        telephone: siteData.profile.phone,
        contactType: "customer service",
        ...(siteData.profile.email && { email: siteData.profile.email }),
      },
    }),
  };

  // Render based on template_key
  if (siteData.site.template_key === "t1") {
    return (
      <>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Template1
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage="home"
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  if (siteData.site.template_key === "t2") {
    return (
      <>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Template2
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage="home"
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  if (siteData.site.template_key === "t3") {
    return (
      <>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Template3
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage="home"
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  if (siteData.site.template_key === "t4") {
    return (
      <>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Template4
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage="home"
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  if (siteData.site.template_key === "t5") {
    return (
      <>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Template5
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage="home"
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  if (siteData.site.template_key === "t6") {
    return (
      <>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <Template6
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage="home"
          baseUrl={isSubdomain ? "" : `/${slug}`}
        />
      </>
    );
  }

  // Template not implemented
  notFound();
}

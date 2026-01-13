import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Template1 from "@/templates/template1/Template1";
import Template2 from "@/templates/template2/Template2";
import Template3 from "@/templates/template3/Template3";
import { resolveSiteBySlug } from "@/lib/siteResolver";
import Script from "next/script";
import { headers } from "next/headers";
import { getPublicAssetUrl } from "@/lib/assets";
import { normalizeHostname } from "@/lib/domains";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const hostHeader = (await headers()).get("host") || "";
  const reqHost = normalizeHostname(hostHeader);
  const platformDomain =
    (process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "soothecontrols.site").toLowerCase();
  const isSubdomain = reqHost === `${params.slug}.${platformDomain}`;

  const siteData = await resolveSiteBySlug(params.slug);

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
      : `${params.slug}.${platformDomain}`;
  const canonical = canonicalHost ? `https://${canonicalHost}` : undefined;

  return {
    title: pageData.seo.title || `${businessName} | Professional Services`,
    description: pageData.seo.description || `Learn about ${businessName} and our professional services.`,
    keywords: `${businessName}, services, business`,
    authors: [{ name: businessName }],
    openGraph: {
      title: pageData.seo.title || `${businessName} | Professional Services`,
      description: pageData.seo.description || `Learn about ${businessName} and our professional services.`,
      url: canonical,
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
      title: pageData.seo.title || `${businessName} | Professional Services`,
      description: pageData.seo.description || `Learn about ${businessName} and our professional services.`,
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
      canonical: canonical,
    },
  };
}

export default async function PublicSitePage({
  params,
}: {
  params: { slug: string };
}) {
  const hostHeader = (await headers()).get("host") || "";
  const reqHost = normalizeHostname(hostHeader);
  const platformDomain =
    (process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "soothecontrols.site").toLowerCase();
  const isSubdomain = reqHost === `${params.slug}.${platformDomain}`;

  const siteData = await resolveSiteBySlug(params.slug);

  if (!siteData) {
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
      : `https://${params.slug}.${platformDomain}`,
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
          baseUrl={isSubdomain ? "" : `/${params.slug}`}
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
          baseUrl={isSubdomain ? "" : `/${params.slug}`}
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
          baseUrl={isSubdomain ? "" : `/${params.slug}`}
        />
      </>
    );
  }

  // Template not implemented
  notFound();
}

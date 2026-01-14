import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";

import Template1 from "@/templates/template1/Template1";
import Template2 from "@/templates/template2/Template2";
import Template3 from "@/templates/template3/Template3";
import Template4 from "@/templates/template4/Template4";
import Template5 from "@/templates/template5/Template5";
import { resolveSiteBySlug } from "@/lib/siteResolver.server";
import { getPublicAssetUrl } from "@/lib/assets";
import { normalizeHostname } from "@/lib/domains";
import { getPublishedExtraPageBySiteSlug } from "@/lib/extraPages";

export async function generateMetadata({
  params,
}: {
  params: { slug: string; key: string };
}): Promise<Metadata> {
  const hostHeader = (await headers()).get("host") || "";
  const reqHost = normalizeHostname(hostHeader);
  const platformDomain =
    (process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "soothecontrols.site").toLowerCase();
  const isSubdomain = reqHost === `${params.slug}.${platformDomain}`;

  const siteData = await resolveSiteBySlug(params.slug);
  if (!siteData) return { title: "Site Not Found" };

  const pageData = await getPublishedExtraPageBySiteSlug(siteData.site.id, params.key);
  if (!pageData) return { title: "Page Not Found" };

  const businessName = siteData.profile.business_name;
  const logoUrl = siteData.profile.logo_path
    ? getPublicAssetUrl(siteData.profile.logo_path)
    : undefined;

  const canonicalHost = isSubdomain
    ? reqHost
    : reqHost && reqHost !== platformDomain
      ? reqHost
      : `${params.slug}.${platformDomain}`;
  const canonical = canonicalHost
    ? `https://${canonicalHost}/p/${params.key}`.replace(/\/$/, "")
    : undefined;

  return {
    title: pageData.seo.title || `${businessName} | ${params.key}`,
    description: pageData.seo.description || `Learn more about ${businessName}.`,
    openGraph: {
      title: pageData.seo.title || `${businessName} | ${params.key}`,
      description: pageData.seo.description || `Learn more about ${businessName}.`,
      url: canonical,
      siteName: businessName,
      images: logoUrl
        ? [{ url: logoUrl, width: 1200, height: 630, alt: businessName }]
        : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.seo.title || `${businessName} | ${params.key}`,
      description: pageData.seo.description || `Learn more about ${businessName}.`,
      images: logoUrl ? [logoUrl] : [],
    },
    alternates: canonical ? { canonical } : undefined,
  };
}

export default async function ExtraPublicPage({
  params,
}: {
  params: { slug: string; key: string };
}) {
  const hostHeader = (await headers()).get("host") || "";
  const reqHost = normalizeHostname(hostHeader);
  const platformDomain =
    (process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "soothecontrols.site").toLowerCase();
  const isSubdomain = reqHost === `${params.slug}.${platformDomain}`;

  const siteData = await resolveSiteBySlug(params.slug);
  if (!siteData) notFound();

  const pageData = await getPublishedExtraPageBySiteSlug(siteData.site.id, params.key);
  if (!pageData) notFound();

  const logoUrl = siteData.profile.logo_path
    ? getPublicAssetUrl(siteData.profile.logo_path)
    : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageData.seo.title || `${siteData.profile.business_name} - ${params.key}`,
    description: pageData.seo.description,
    ...(isSubdomain ? { url: `https://${reqHost}/p/${params.key}` } : {}),
    ...(logoUrl && { image: logoUrl }),
  };

  const baseUrl = isSubdomain ? "" : `/${params.slug}`;

  if (siteData.site.template_key === "t1") {
    return (
      <>
        <Script
          id={`p-${params.key}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Template1
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={null}
          baseUrl={baseUrl}
          pageOverride={pageData}
        />
      </>
    );
  }
  if (siteData.site.template_key === "t2") {
    return (
      <>
        <Script
          id={`p-${params.key}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Template2
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={null}
          baseUrl={baseUrl}
          pageOverride={pageData}
        />
      </>
    );
  }
  if (siteData.site.template_key === "t3") {
    return (
      <>
        <Script
          id={`p-${params.key}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Template3
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={null}
          baseUrl={baseUrl}
          pageOverride={pageData}
        />
      </>
    );
  }
  if (siteData.site.template_key === "t4") {
    return (
      <>
        <Script
          id={`p-${params.key}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Template4
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={null}
          baseUrl={baseUrl}
          pageOverride={pageData}
        />
      </>
    );
  }
  if (siteData.site.template_key === "t5") {
    return (
      <>
        <Script
          id={`p-${params.key}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Template5
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={null}
          baseUrl={baseUrl}
          pageOverride={pageData}
        />
      </>
    );
  }

  notFound();
}


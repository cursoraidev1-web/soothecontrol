import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";

import Template1 from "@/templates/template1/Template1";
import Template2 from "@/templates/template2/Template2";
import Template3 from "@/templates/template3/Template3";
import { resolveSiteByHostname } from "@/lib/siteResolver";
import { getPublicAssetUrl } from "@/lib/assets";
import { normalizeHostname } from "@/lib/domains";

export async function generateMetadata({
  params,
}: {
  params: { hostname: string };
}): Promise<Metadata> {
  const hostHeader = (await headers()).get("host") || "";
  const reqHost = normalizeHostname(hostHeader) || normalizeHostname(params.hostname);

  const siteData = await resolveSiteByHostname(params.hostname);
  if (!siteData) return { title: "Site Not Found" };

  const pageData = siteData.pages.home;
  const businessName = siteData.profile.business_name;
  const logoUrl = siteData.profile.logo_path
    ? getPublicAssetUrl(siteData.profile.logo_path)
    : undefined;

  const canonical = reqHost ? `https://${reqHost}` : undefined;

  return {
    title: pageData.seo.title || `${businessName} | Professional Services`,
    description:
      pageData.seo.description ||
      `Learn about ${businessName} and our professional services.`,
    openGraph: {
      title: pageData.seo.title || `${businessName} | Professional Services`,
      description:
        pageData.seo.description ||
        `Learn about ${businessName} and our professional services.`,
      url: canonical,
      siteName: businessName,
      images: logoUrl
        ? [{ url: logoUrl, width: 1200, height: 630, alt: businessName }]
        : [],
      locale: "en_US",
      type: "website",
    },
    alternates: canonical ? { canonical } : undefined,
  };
}

export default async function CustomDomainHome({
  params,
}: {
  params: { hostname: string };
}) {
  const hostHeader = (await headers()).get("host") || "";
  const reqHost = normalizeHostname(hostHeader) || normalizeHostname(params.hostname);

  const siteData = await resolveSiteByHostname(params.hostname);
  if (!siteData) notFound();

  const logoUrl = siteData.profile.logo_path
    ? getPublicAssetUrl(siteData.profile.logo_path)
    : undefined;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteData.profile.business_name,
    ...(reqHost ? { url: `https://${reqHost}` } : {}),
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

  if (siteData.site.template_key === "t1") {
    return (
      <>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Template1
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage="home"
          baseUrl=""
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Template2
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage="home"
          baseUrl=""
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Template3
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage="home"
          baseUrl=""
        />
      </>
    );
  }

  notFound();
}


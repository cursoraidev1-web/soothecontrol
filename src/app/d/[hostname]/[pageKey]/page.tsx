import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";

import Template1 from "@/templates/template1/Template1";
import Template2 from "@/templates/template2/Template2";
import Template3 from "@/templates/template3/Template3";
import Template4 from "@/templates/template4/Template4";
import Template5 from "@/templates/template5/Template5";
import { resolveSiteByHostname } from "@/lib/siteResolver";
import { isPageKey, type PageKey } from "@/lib/pageSchema";
import { getPublicAssetUrl } from "@/lib/assets";
import { normalizeHostname } from "@/lib/domains";

export async function generateMetadata({
  params,
}: {
  params: { hostname: string; pageKey: string };
}): Promise<Metadata> {
  if (!isPageKey(params.pageKey)) return { title: "Page Not Found" };

  const hostHeader = (await headers()).get("host") || "";
  const reqHost = normalizeHostname(hostHeader) || normalizeHostname(params.hostname);

  const pageKey = params.pageKey as PageKey;
  const siteData = await resolveSiteByHostname(params.hostname);
  if (!siteData) return { title: "Site Not Found" };

  const pageData = siteData.pages[pageKey];
  const businessName = siteData.profile.business_name;
  const logoUrl = siteData.profile.logo_path
    ? getPublicAssetUrl(siteData.profile.logo_path)
    : undefined;

  const canonical = reqHost
    ? `https://${reqHost}${pageKey === "home" ? "" : `/${pageKey}`}`
    : undefined;

  const pageTitle =
    pageData.seo.title ||
    `${businessName} | ${
      pageKey === "about" ? "About Us" : pageKey === "contact" ? "Contact Us" : "Home"
    }`;

  return {
    title: pageTitle,
    description:
      pageData.seo.description ||
      `Learn about ${businessName}${
        pageKey === "about"
          ? " and our story"
          : pageKey === "contact"
            ? " and get in touch"
            : ""
      }.`,
    openGraph: {
      title: pageTitle,
      description:
        pageData.seo.description ||
        `Learn about ${businessName}${
          pageKey === "about"
            ? " and our story"
            : pageKey === "contact"
              ? " and get in touch"
              : ""
        }.`,
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

export default async function CustomDomainPage({
  params,
}: {
  params: { hostname: string; pageKey: string };
}) {
  if (!isPageKey(params.pageKey)) notFound();
  const pageKey = params.pageKey as PageKey;

  const hostHeader = (await headers()).get("host") || "";
  const reqHost = normalizeHostname(hostHeader) || normalizeHostname(params.hostname);

  const siteData = await resolveSiteByHostname(params.hostname);
  if (!siteData) notFound();

  const logoUrl = siteData.profile.logo_path
    ? getPublicAssetUrl(siteData.profile.logo_path)
    : undefined;

  const pageData = siteData.pages[pageKey];
  let structuredData;
  if (pageKey === "contact") {
    structuredData = {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      ...(reqHost ? { url: `https://${reqHost}/contact` } : {}),
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
      ...(reqHost
        ? { url: `https://${reqHost}${pageKey === "home" ? "" : `/${pageKey}`}` }
        : {}),
      ...(logoUrl && { image: logoUrl }),
    };
  }

  if (siteData.site.template_key === "t1") {
    return (
      <>
        <Script
          id={`${pageKey}-schema`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Template1
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl=""
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Template2
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl=""
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Template3
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl=""
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Template4
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl=""
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Template5
          site={siteData.site}
          profile={siteData.profile}
          pages={siteData.pages}
          currentPage={pageKey}
          baseUrl=""
        />
      </>
    );
  }

  notFound();
}


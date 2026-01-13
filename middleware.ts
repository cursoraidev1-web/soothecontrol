import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function stripPort(host: string) {
  return host.split(":")[0] ?? host;
}

function normalizeHost(host: string) {
  const h = stripPort(host.trim().toLowerCase());
  if (!h) return "";
  return h.startsWith("www.") ? h.slice(4) : h;
}

function isBypassPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/d/") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  );
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (isBypassPath(pathname)) return NextResponse.next();

  const platformDomain = (
    process.env.NEXT_PUBLIC_PLATFORM_DOMAIN || "yourfree.site"
  )
    .trim()
    .toLowerCase();

  const host = normalizeHost(req.headers.get("host") || "");
  if (!host) return NextResponse.next();

  // Don't interfere with local / preview deployments (path-based routing works there).
  if (host.includes("localhost") || host.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  // Base platform domain should keep the admin entry at /
  if (host === platformDomain) {
    return NextResponse.next();
  }

  // Subdomains: <slug>.<platformDomain> -> rewrite to /<slug>/...
  if (host.endsWith(`.${platformDomain}`)) {
    const sub = host.slice(0, -1 * (`.${platformDomain}`.length));
    const slug = sub.split(".")[0] || "";
    if (!slug) return NextResponse.next();

    const url = req.nextUrl.clone();
    url.pathname = `/${slug}${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Custom domains: rewrite to /d/<hostname>/...
  const url = req.nextUrl.clone();
  url.pathname = `/d/${host}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};


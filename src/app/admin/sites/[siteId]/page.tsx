"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { formatSupabaseError } from "@/lib/supabase/formatError";
import { supabaseBrowser } from "@/lib/supabase/browser";

type SiteRow = {
  id: string;
  slug: string;
  template_key: string;
  status: string;
};

type ProfileRow = {
  site_id: string;
  business_name: string;
  tagline: string | null;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  socials: Record<string, unknown> | null;
};

type PageRow = {
  id: string;
  key: "home" | "about" | "contact";
  status: string;
};

type SocialInputs = {
  instagram: string;
  facebook: string;
  twitter: string;
  tiktok: string;
};

const pageOrder: Record<PageRow["key"], number> = {
  home: 0,
  about: 1,
  contact: 2,
};

export default function SiteOverviewPage({
  params,
}: {
  params: { siteId: string };
}) {
  const siteId = params.siteId;

  const [site, setSite] = useState<SiteRow | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [pages, setPages] = useState<PageRow[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [form, setForm] = useState({
    business_name: "",
    tagline: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    whatsapp: "",
  });

  const [socials, setSocials] = useState<SocialInputs>({
    instagram: "",
    facebook: "",
    twitter: "",
    tiktok: "",
  });

  useEffect(() => {
    let isMounted = true;
    const supabase = supabaseBrowser();

    async function load() {
      setIsLoading(true);
      setLoadError(null);

      const [siteRes, profileRes, pagesRes] = await Promise.all([
        supabase
          .from("sites")
          .select("id, slug, template_key, status")
          .eq("id", siteId)
          .single(),
        supabase
          .from("business_profiles")
          .select(
            "site_id, business_name, tagline, description, address, phone, email, whatsapp, socials",
          )
          .eq("site_id", siteId)
          .single(),
        supabase
          .from("pages")
          .select("id, key, status")
          .eq("site_id", siteId),
      ]);

      if (!isMounted) return;
      setIsLoading(false);

      const err = siteRes.error || profileRes.error || pagesRes.error;
      if (err) {
        setLoadError(formatSupabaseError(err));
        return;
      }

      const loadedSite = siteRes.data as SiteRow;
      const loadedProfile = profileRes.data as ProfileRow;
      const loadedPages = (pagesRes.data ?? []) as PageRow[];

      setSite(loadedSite);
      setProfile(loadedProfile);
      setPages(loadedPages);

      setForm({
        business_name: loadedProfile.business_name ?? "",
        tagline: loadedProfile.tagline ?? "",
        description: loadedProfile.description ?? "",
        address: loadedProfile.address ?? "",
        phone: loadedProfile.phone ?? "",
        email: loadedProfile.email ?? "",
        whatsapp: loadedProfile.whatsapp ?? "",
      });

      const s = (loadedProfile.socials ?? {}) as Record<string, unknown>;
      setSocials({
        instagram: typeof s.instagram === "string" ? s.instagram : "",
        facebook: typeof s.facebook === "string" ? s.facebook : "",
        twitter: typeof s.twitter === "string" ? s.twitter : "",
        tiktok: typeof s.tiktok === "string" ? s.tiktok : "",
      });
    }

    load();

    return () => {
      isMounted = false;
    };
  }, [siteId]);

  const sortedPages = useMemo(() => {
    return [...pages].sort((a, b) => pageOrder[a.key] - pageOrder[b.key]);
  }, [pages]);

  async function onSaveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaveSuccess(false);
    setSaveError(null);
    setIsSaving(true);

    const supabase = supabaseBrowser();
    const payload = {
      business_name: form.business_name.trim(),
      tagline: form.tagline.trim() || null,
      description: form.description.trim() || null,
      address: form.address.trim() || null,
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      whatsapp: form.whatsapp.trim() || null,
      socials: {
        instagram: socials.instagram.trim() || null,
        facebook: socials.facebook.trim() || null,
        twitter: socials.twitter.trim() || null,
        tiktok: socials.tiktok.trim() || null,
      },
    };

    const { error } = await supabase
      .from("business_profiles")
      .update(payload)
      .eq("site_id", siteId);

    setIsSaving(false);

    if (error) {
      setSaveError(formatSupabaseError(error));
      return;
    }

    setSaveSuccess(true);
  }

  if (isLoading) {
    return <div className="text-sm text-gray-600">Loading…</div>;
  }

  if (loadError) {
    return (
      <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {loadError}
      </div>
    );
  }

  if (!site || !profile) {
    return (
      <div className="text-sm text-gray-700">
        Site not found (or you don’t have access).
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* A) Site Summary */}
      <section className="rounded-lg bg-white p-6 ring-1 ring-gray-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold">Site overview</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage profile and page content for this site.
            </p>
          </div>
          <Link
            href="/admin/sites"
            className="rounded bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
          >
            Back to sites
          </Link>
        </div>

        <dl className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium text-gray-600">Slug</dt>
            <dd className="mt-1 font-mono text-sm">{site.slug}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-600">Preview URL</dt>
            <dd className="mt-1 font-mono text-sm">
              https://{site.slug}.yourfree.site
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-600">Template</dt>
            <dd className="mt-1 text-sm text-gray-900">{site.template_key}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-gray-600">Status</dt>
            <dd className="mt-1 text-sm text-gray-900">{site.status}</dd>
          </div>
        </dl>
      </section>

      {/* B) Business Profile Editor */}
      <section className="rounded-lg bg-white p-6 ring-1 ring-gray-200">
        <h2 className="text-lg font-semibold">Business profile</h2>
        <p className="mt-1 text-sm text-gray-600">
          These fields power the public website template.
        </p>

        <form onSubmit={onSaveProfile} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-800">
                Business name
              </span>
              <input
                value={form.business_name}
                onChange={(e) =>
                  setForm((v) => ({ ...v, business_name: e.target.value }))
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-800">Tagline</span>
              <input
                value={form.tagline}
                onChange={(e) =>
                  setForm((v) => ({ ...v, tagline: e.target.value }))
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-medium text-gray-800">
              Description
            </span>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((v) => ({ ...v, description: e.target.value }))
              }
              rows={5}
              className="mt-1 w-full resize-y rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-800">Address</span>
              <input
                value={form.address}
                onChange={(e) =>
                  setForm((v) => ({ ...v, address: e.target.value }))
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-800">Phone</span>
              <input
                value={form.phone}
                onChange={(e) =>
                  setForm((v) => ({ ...v, phone: e.target.value }))
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-800">Email</span>
              <input
                value={form.email}
                onChange={(e) =>
                  setForm((v) => ({ ...v, email: e.target.value }))
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-gray-800">WhatsApp</span>
              <input
                value={form.whatsapp}
                onChange={(e) =>
                  setForm((v) => ({ ...v, whatsapp: e.target.value }))
                }
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </label>
          </div>

          <div className="pt-2">
            <h3 className="text-sm font-semibold text-gray-900">Socials</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-gray-800">
                  Instagram
                </span>
                <input
                  value={socials.instagram}
                  onChange={(e) =>
                    setSocials((v) => ({ ...v, instagram: e.target.value }))
                  }
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="https://instagram.com/..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-800">
                  Facebook
                </span>
                <input
                  value={socials.facebook}
                  onChange={(e) =>
                    setSocials((v) => ({ ...v, facebook: e.target.value }))
                  }
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="https://facebook.com/..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-800">Twitter</span>
                <input
                  value={socials.twitter}
                  onChange={(e) =>
                    setSocials((v) => ({ ...v, twitter: e.target.value }))
                  }
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="https://x.com/..."
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium text-gray-800">TikTok</span>
                <input
                  value={socials.tiktok}
                  onChange={(e) =>
                    setSocials((v) => ({ ...v, tiktok: e.target.value }))
                  }
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="https://tiktok.com/@..."
                />
              </label>
            </div>
          </div>

          {saveError ? (
            <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {saveError}
            </div>
          ) : null}
          {saveSuccess ? (
            <div className="rounded border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
              Saved.
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isSaving}
            className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {isSaving ? "Saving…" : "Save profile"}
          </button>
        </form>
      </section>

      {/* C) Pages quick links */}
      <section className="rounded-lg bg-white p-6 ring-1 ring-gray-200">
        <h2 className="text-lg font-semibold">Pages</h2>
        <p className="mt-1 text-sm text-gray-600">
          Jump into Home/About/Contact editing.
        </p>

        <div className="mt-4 overflow-hidden rounded-lg ring-1 ring-gray-200">
          <table className="w-full table-auto">
            <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3">Page</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {sortedPages.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-gray-600" colSpan={3}>
                    No pages found (the DB trigger may not have run).
                  </td>
                </tr>
              ) : (
                sortedPages.map((p) => (
                  <tr key={p.id}>
                    <td className="px-4 py-3 font-medium">{p.key}</td>
                    <td className="px-4 py-3 text-gray-700">{p.status}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/sites/${siteId}/pages/${p.key}`}
                        className="text-sm font-medium text-black underline underline-offset-2"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}


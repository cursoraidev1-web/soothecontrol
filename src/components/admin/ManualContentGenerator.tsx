"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { formatSupabaseError } from "@/lib/supabase/formatError";
import { validatePageData, type PageData, defaultPageData } from "@/lib/pageSchema";

export default function ManualContentGenerator({ siteId }: { siteId: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "home" | "about" | "contact">("profile");
  
  // Profile state
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [tiktok, setTiktok] = useState("");

  // Page states
  const [homeData, setHomeData] = useState<PageData>(defaultPageData("home"));
  const [aboutData, setAboutData] = useState<PageData>(defaultPageData("about"));
  const [contactData, setContactData] = useState<PageData>(defaultPageData("contact"));

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load existing data
  useEffect(() => {
    async function load() {
      try {
        const supabase = supabaseBrowser();
        
        // Load profile
        const { data: profile } = await supabase
          .from("business_profiles")
          .select("*")
          .eq("site_id", siteId)
          .single();
        
        if (profile) {
          setBusinessName(profile.business_name || "");
          setTagline(profile.tagline || "");
          setDescription(profile.description || "");
          setAddress(profile.address || "");
          setPhone(profile.phone || "");
          setEmail(profile.email || "");
          setWhatsapp(profile.whatsapp || "");
          const socialsRaw = profile.socials;
          const socials =
            socialsRaw && typeof socialsRaw === "object" && !Array.isArray(socialsRaw)
              ? (socialsRaw as Record<string, unknown>)
              : {};
          setInstagram(typeof socials.instagram === "string" ? socials.instagram : "");
          setFacebook(typeof socials.facebook === "string" ? socials.facebook : "");
          setTwitter(typeof socials.twitter === "string" ? socials.twitter : "");
          setTiktok(typeof socials.tiktok === "string" ? socials.tiktok : "");
        }

        // Load pages
        const { data: pages } = await supabase
          .from("pages")
          .select("*")
          .eq("site_id", siteId)
          .in("key", ["home", "about", "contact"]);

        if (pages) {
          for (const page of pages) {
            const valid = validatePageData(page.data);
            if (valid.ok) {
              if (page.key === "home") setHomeData(page.data as PageData);
              else if (page.key === "about") setAboutData(page.data as PageData);
              else if (page.key === "contact") setContactData(page.data as PageData);
            }
          }
        }
      } catch (e) {
        console.error("Failed to load existing data:", e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [siteId]);

  async function onSaveProfile() {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      const supabase = supabaseBrowser();
      const payload = {
        business_name: businessName.trim() || null,
        tagline: tagline.trim() || null,
        description: description.trim() || null,
        address: address.trim() || null,
        phone: phone.trim() || null,
        email: email.trim() || null,
        whatsapp: whatsapp.trim() || null,
        socials: {
          instagram: instagram.trim() || null,
          facebook: facebook.trim() || null,
          twitter: twitter.trim() || null,
          tiktok: tiktok.trim() || null,
        },
      };

      const { error: profileErr } = await supabase
        .from("business_profiles")
        .update(payload)
        .eq("site_id", siteId);
      
      if (profileErr) throw profileErr;
      setSuccess("Business profile saved!");
    } catch (e) {
      setError(formatSupabaseError(e));
    } finally {
      setIsSaving(false);
    }
  }

  async function onSavePage(pageKey: "home" | "about" | "contact") {
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      const pageData = pageKey === "home" ? homeData : pageKey === "about" ? aboutData : contactData;
      const valid = validatePageData(pageData);
      if (!valid.ok) {
        throw new Error(valid.error || "Invalid page data");
      }

      const supabase = supabaseBrowser();
      const { error } = await supabase
        .from("pages")
        .update({ data: pageData, status: "draft" })
        .eq("site_id", siteId)
        .eq("key", pageKey);
      
      if (error) throw error;
      setSuccess(`${pageKey.charAt(0).toUpperCase() + pageKey.slice(1)} page saved as draft!`);
    } catch (e) {
      setError(formatSupabaseError(e));
    } finally {
      setIsSaving(false);
    }
  }

  function updateHomeSection(index: number, updates: Partial<typeof homeData.sections[0]>) {
    const newSections = [...homeData.sections];
    newSections[index] = { ...newSections[index], ...updates } as typeof homeData.sections[0];
    setHomeData({ ...homeData, sections: newSections });
  }

  function updateAboutSection(index: number, updates: Partial<typeof aboutData.sections[0]>) {
    const newSections = [...aboutData.sections];
    newSections[index] = { ...newSections[index], ...updates } as typeof aboutData.sections[0];
    setAboutData({ ...aboutData, sections: newSections });
  }

  function updateContactSection(index: number, updates: Partial<typeof contactData.sections[0]>) {
    const newSections = [...contactData.sections];
    newSections[index] = { ...newSections[index], ...updates } as typeof contactData.sections[0];
    setContactData({ ...contactData, sections: newSections });
  }

  return (
    <section className="rounded-lg bg-white p-6 ring-1 ring-gray-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Manual Content Setup</h2>
          <p className="mt-1 text-sm text-gray-600">
            Fill in your business details and page content manually. No AI required.
          </p>
        </div>
        <Link
          href={`/admin/sites/${siteId}/preview`}
          className="rounded bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-gray-200 hover:bg-gray-50"
        >
          Preview
        </Link>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex gap-2 border-b border-gray-200">
        {(["profile", "home", "about", "contact"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab
                ? "border-b-2 border-black text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-800">Business Name *</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                placeholder="Your Company Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                placeholder="Your business tagline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-1 w-full resize-y rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                placeholder="Brief description of your business"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-800">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="Business address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="contact@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800">WhatsApp</label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">Social Media</label>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="Instagram handle"
                />
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="Facebook page"
                />
                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="Twitter handle"
                />
                <input
                  type="text"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  className="rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
                  placeholder="TikTok handle"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={onSaveProfile}
              disabled={isSaving || !businessName.trim()}
              className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {isSaving ? "Saving…" : "Save Profile"}
            </button>
          </div>
        )}

        {/* Home Page Tab */}
        {activeTab === "home" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">SEO Title</label>
              <input
                type="text"
                value={homeData.seo.title}
                onChange={(e) => setHomeData({ ...homeData, seo: { ...homeData.seo, title: e.target.value } })}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">SEO Description</label>
              <textarea
                value={homeData.seo.description}
                onChange={(e) => setHomeData({ ...homeData, seo: { ...homeData.seo, description: e.target.value } })}
                rows={2}
                className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-black"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-800">Page Sections</label>
              {homeData.sections.map((section, idx) => (
                <div key={idx} className="rounded border border-gray-200 p-4">
                  <div className="mb-2 text-xs font-medium text-gray-500">{section.type}</div>
                  {section.type === "hero" && (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={section.headline}
                        onChange={(e) => updateHomeSection(idx, { headline: e.target.value })}
                        placeholder="Headline"
                        className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-sm"
                      />
                      <input
                        type="text"
                        value={section.subtext}
                        onChange={(e) => updateHomeSection(idx, { subtext: e.target.value })}
                        placeholder="Subtext"
                        className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-sm"
                      />
                    </div>
                  )}
                  {section.type === "services" && (
                    <div className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex gap-2">
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const newItems = [...section.items];
                              newItems[itemIdx] = { ...item, title: e.target.value };
                              updateHomeSection(idx, { items: newItems });
                            }}
                            placeholder="Service title"
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-sm"
                          />
                          <input
                            type="text"
                            value={item.desc}
                            onChange={(e) => {
                              const newItems = [...section.items];
                              newItems[itemIdx] = { ...item, desc: e.target.value };
                              updateHomeSection(idx, { items: newItems });
                            }}
                            placeholder="Description"
                            className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onSavePage("home")}
              disabled={isSaving}
              className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {isSaving ? "Saving…" : "Save Home Page"}
            </button>
          </div>
        )}

        {/* About & Contact tabs - simplified for now */}
        {(activeTab === "about" || activeTab === "contact") && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              For detailed editing of {activeTab} page, use the{" "}
              <Link href={`/admin/sites/${siteId}/pages/${activeTab}`} className="text-black underline">
                page editor
              </Link>
              .
            </p>
            <button
              type="button"
              onClick={() => onSavePage(activeTab)}
              disabled={isSaving}
              className="rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              {isSaving ? "Saving…" : `Save ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Page`}
            </button>
          </div>
        )}

        {error && (
          <div className="whitespace-pre-line rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            {success}
          </div>
        )}
      </div>
    </section>
  );
}

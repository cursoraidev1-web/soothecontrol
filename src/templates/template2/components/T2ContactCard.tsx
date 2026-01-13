"use client";

import type { ContactCardSection as ContactCardSectionType } from "@/lib/pageSchema";
import { buildEmailLink, buildTelLink, buildWhatsAppLink } from "../utils";

interface T2ContactCardProps {
  section: ContactCardSectionType;
  sectionIndex?: number;
  profile: {
    business_name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
  };
}

function mapEmbedUrl(opts: {
  address: string | null;
  businessName: string;
  mapLink: string | null;
}): string {
  if (opts.mapLink && opts.mapLink.includes("output=embed")) return opts.mapLink;
  const query = encodeURIComponent(opts.address || opts.businessName || "Location");
  // No API key required.
  return `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}

export default function T2ContactCard({ section, profile }: T2ContactCardProps) {
  const embed = mapEmbedUrl({
    address: profile.address,
    businessName: profile.business_name,
    mapLink: section.mapLink || null,
  });

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold tracking-wider text-gray-600 uppercase">
            Contact
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Let’s talk
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Send a message or reach out directly — we respond quickly.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: info + map */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Contact info</h3>
              <div className="mt-5 space-y-4 text-sm">
                {profile.address ? (
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-gray-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7.5-4.5 7.5-10.5S15.75 3 12 3 4.5 6.75 4.5 10.5 12 21 12 21z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900">Address</div>
                      <div className="text-gray-600">{profile.address}</div>
                    </div>
                  </div>
                ) : null}

                {profile.phone ? (
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-gray-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-.621.504-1.125 1.125-1.125H6a1.125 1.125 0 011.07.774l.9 2.7a1.125 1.125 0 01-.546 1.34l-1.1.55a11.45 11.45 0 005.06 5.06l.55-1.1a1.125 1.125 0 011.34-.546l2.7.9A1.125 1.125 0 0118.75 18v2.625c0 .621-.504 1.125-1.125 1.125H16.5c-7.455 0-13.5-6.045-13.5-13.5V6.75z" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900">Phone</div>
                      <a className="text-gray-600 hover:text-gray-900 transition-colors" href={buildTelLink(profile.phone)}>
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                ) : null}

                {profile.email ? (
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-gray-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5v9a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 16.5v-9A2.25 2.25 0 014.5 5.25h15a2.25 2.25 0 012.25 2.25z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 7.5l-8.802 6.168a1.5 1.5 0 01-1.696 0L2.25 7.5" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900">Email</div>
                      <a className="text-gray-600 hover:text-gray-900 transition-colors" href={buildEmailLink(profile.email)}>
                        {profile.email}
                      </a>
                    </div>
                  </div>
                ) : null}

                {profile.whatsapp ? (
                  <div className="flex gap-3">
                    <span className="mt-0.5 text-gray-400">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.52 3.49A11.86 11.86 0 0012.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42ZM12.06 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.45-4.44 9.88-9.88 9.88Zm5.42-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900">WhatsApp</div>
                      <a
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        href={buildWhatsAppLink(profile.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {profile.whatsapp}
                      </a>
                    </div>
                  </div>
                ) : null}
              </div>

              {section.mapLink ? (
                <div className="mt-6">
                  <a
                    href={section.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg"
                  >
                    Open in Maps
                  </a>
                </div>
              ) : null}
            </div>

            <div className="overflow-hidden rounded-2xl ring-1 ring-gray-200 bg-gray-50">
              <div className="relative aspect-[16/10] w-full">
                <iframe
                  title="Map"
                  src={embed}
                  className="absolute inset-0 h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right: form */}
          {section.showForm ? (
            <div className="rounded-2xl bg-white p-8 ring-1 ring-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Send a message</h3>
              <p className="mt-2 text-sm text-gray-600">
                We’ll get back to you as soon as possible.
              </p>
              <form
                className="mt-8 space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(
                    "Form submission is not yet configured. Please contact directly via email or phone."
                  );
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-xl"
                >
                  Send Message
                </button>
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to be contacted about your request.
                </p>
              </form>
            </div>
          ) : (
            <div className="rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Prefer to reach out directly?
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Use the contact details on the left — we’re happy to help.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}


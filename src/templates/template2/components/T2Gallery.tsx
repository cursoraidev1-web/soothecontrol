"use client";

import type { GallerySection as GallerySectionType } from "@/lib/pageSchema";

interface T2GalleryProps {
  section: GallerySectionType;
}

export default function T2Gallery({ section }: T2GalleryProps) {
  const title = section.title || "Our Gallery";
  const images = section.images && section.images.length > 0
    ? section.images
    : [];

  // Generate placeholder images if none provided
  const displayImages =
    images.length > 0
      ? images
      : Array.from({ length: 6 }, (_, i) => ({
          url: "",
          alt: `Gallery image ${i + 1}`,
        }));

  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {displayImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 transition-transform hover:scale-105"
            >
              {image.url ? (
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6.75v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h2.25a2.25 2.25 0 012.25 2.25v2.25a2.25 2.25 0 01-2.25 2.25h-2.25a2.25 2.25 0 01-2.25-2.25V8.25a2.25 2.25 0 012.25-2.25z"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

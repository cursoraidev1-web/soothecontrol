"use client";

import type { ServicesSection as ServicesSectionType } from "@/lib/pageSchema";
import {
  getLoremServiceTitle,
  getLoremServiceDesc,
} from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface T2ServicesProps {
  section: ServicesSectionType;
  sectionIndex?: number;
}

export default function T2Services({ section, sectionIndex }: T2ServicesProps) {
  const editor = useInlineEditor();
  const services = section.items && section.items.length > 0
    ? section.items
    : [
        { title: "", desc: "" },
        { title: "", desc: "" },
        { title: "", desc: "" },
      ];

  const filledServices = services.map((service) => ({
    title: service.title || getLoremServiceTitle(),
    desc: service.desc || getLoremServiceDesc(),
  }));

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive solutions tailored to your needs
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filledServices.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-lg hover:ring-gray-300"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-gray-200 group-hover:to-gray-300 transition-colors">
                <svg
                  className="h-7 w-7 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <EditableText
                as="h3"
                className="text-xl font-semibold text-gray-900 mb-3"
                value={service.title}
                placeholder="Service title"
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = [...services].map((it) => ({ ...it }));
                  nextItems[index] = { ...nextItems[index], title: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
              />
              <EditableText
                as="p"
                className="text-gray-600 leading-relaxed"
                value={service.desc}
                placeholder="Service description"
                multiline
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextItems = [...services].map((it) => ({ ...it }));
                  nextItems[index] = { ...nextItems[index], desc: next };
                  editor.updateSection(sectionIndex, { ...section, items: nextItems });
                }}
              />
              <a
                href="#"
                className="mt-6 inline-flex items-center text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
              >
                View details
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

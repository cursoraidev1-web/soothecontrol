"use client";

import type { TeamSection as TeamSectionType } from "@/lib/pageSchema";
import { getLoremParagraph } from "@/lib/loremIpsum";
import { useInlineEditor } from "@/components/inline-editor/InlineEditorContext";
import EditableText from "@/components/inline-editor/EditableText";

interface T2TeamProps {
  section: TeamSectionType;
  sectionIndex?: number;
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "A";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] : "";
  return `${first}${last}`.toUpperCase();
}

export default function T2Team({ section, sectionIndex }: T2TeamProps) {
  const editor = useInlineEditor();
  const title = section.title || "Meet the team";
  const subtitle =
    section.subtitle ||
    "The people behind the work — experienced, responsive, and detail-oriented.";

  const members =
    section.members && section.members.length > 0
      ? section.members
      : [
          {
            name: "Alex Morgan",
            role: "Founder",
            bio: getLoremParagraph(),
            photoUrl: "",
            linkedinUrl: "",
          },
          {
            name: "Sam Lee",
            role: "Operations",
            bio: getLoremParagraph(),
            photoUrl: "",
            linkedinUrl: "",
          },
          {
            name: "Jordan Patel",
            role: "Customer Success",
            bio: getLoremParagraph(),
            photoUrl: "",
            linkedinUrl: "",
          },
        ];

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold tracking-wider text-gray-600 uppercase">
            Team
          </span>
          <EditableText
            as="h2"
            className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            value={title}
            placeholder="Team title"
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, title: next });
            }}
          />
          <EditableText
            as="p"
            className="mt-4 text-lg text-gray-600"
            value={subtitle}
            placeholder="Team subtitle"
            multiline
            onCommit={(next) => {
              if (!editor || sectionIndex == null) return;
              editor.updateSection(sectionIndex, { ...section, subtitle: next });
            }}
          />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, idx) => (
            <div
              key={`${m.name}-${idx}`}
              className="rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200"
            >
              <div className="flex items-center gap-4">
                {m.photoUrl ? (
                  <img
                    src={m.photoUrl}
                    alt={m.name}
                    className="h-14 w-14 rounded-full object-cover ring-1 ring-gray-200 bg-white"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-sm font-bold text-gray-900 ring-1 ring-gray-200">
                    {initials(m.name || "Team Member")}
                  </div>
                )}
                <div className="min-w-0">
                  <EditableText
                    as="div"
                    className="font-semibold text-gray-900"
                    value={m.name || "Team Member"}
                    placeholder="Name"
                    onCommit={(next) => {
                      if (!editor || sectionIndex == null) return;
                      const nextMembers = members.map((x) => ({ ...x }));
                      nextMembers[idx] = { ...nextMembers[idx], name: next };
                      editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                    }}
                  />
                  <div className="text-sm text-gray-600">
                    <EditableText
                      as="span"
                      value={m.role || "Role"}
                      placeholder="Role"
                      onCommit={(next) => {
                        if (!editor || sectionIndex == null) return;
                        const nextMembers = members.map((x) => ({ ...x }));
                        nextMembers[idx] = { ...nextMembers[idx], role: next };
                        editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                      }}
                    />
                    {m.linkedinUrl ? (
                      <>
                        {" · "}
                        <a
                          href={m.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                        >
                          LinkedIn
                        </a>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <EditableText
                as="p"
                className="mt-6 text-gray-600 leading-relaxed"
                value={m.bio || getLoremParagraph()}
                placeholder="Bio"
                multiline
                onCommit={(next) => {
                  if (!editor || sectionIndex == null) return;
                  const nextMembers = members.map((x) => ({ ...x }));
                  nextMembers[idx] = { ...nextMembers[idx], bio: next };
                  editor.updateSection(sectionIndex, { ...section, members: nextMembers });
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


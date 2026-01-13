"use client";

import { getLoremName, getLoremRole } from "@/lib/loremIpsum";

export default function T2Team() {
  const teamMembers = [
    { name: getLoremName(), role: getLoremRole() },
    { name: getLoremName(), role: getLoremRole() },
    { name: getLoremName(), role: getLoremRole() },
    { name: getLoremName(), role: getLoremRole() },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Leadership Team
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Visionaries building the future of our industry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl bg-slate-100">
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-200 text-slate-400 group-hover:scale-105 transition-transform duration-500">
                   <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                {/* Overlay with socials */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 cursor-pointer hover:bg-teal-500 hover:text-white transition-colors">
                       <span className="font-bold text-xs">LN</span>
                   </div>
                   <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 cursor-pointer hover:bg-teal-500 hover:text-white transition-colors">
                       <span className="font-bold text-xs">TW</span>
                   </div>
                </div>
              </div>
              <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                  <p className="text-sm font-medium text-teal-600 uppercase tracking-wider mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

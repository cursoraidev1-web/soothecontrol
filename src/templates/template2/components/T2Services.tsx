"use client";

import type { ServicesSection as ServicesSectionType } from "@/lib/pageSchema";
import {
  getLoremServiceTitle,
  getLoremServiceDesc,
} from "@/lib/loremIpsum";

interface T2ServicesProps {
  section: ServicesSectionType;
}

export default function T2Services({ section }: T2ServicesProps) {
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
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <span className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-6">
            Services designed for growth
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            We provide comprehensive solutions tailored to your specific needs, helping you achieve your business goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filledServices.map((service, index) => (
            <div
              key={index}
              className="group relative rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-slate-100 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-gradient-to-br from-teal-50 to-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className={`mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${
                  index % 3 === 0 ? 'bg-blue-50 text-blue-600' :
                  index % 3 === 1 ? 'bg-teal-50 text-teal-600' :
                  'bg-indigo-50 text-indigo-600'
                } group-hover:scale-110 transition-transform duration-300`}>
                  <svg
                    className="h-8 w-8"
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
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-teal-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-500 leading-relaxed mb-8">
                  {service.desc}
                </p>
                
                <div className="flex items-center text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                  Learn more 
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

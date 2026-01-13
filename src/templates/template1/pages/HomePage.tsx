"use client";

import type { PageData } from "@/lib/pageSchema";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import RichTextSection from "../components/RichTextSection";
import ValuesSection from "../components/ValuesSection";
import ContactCardSection from "../components/ContactCardSection";
import BackedBySection from "../components/BackedBySection";
import UseCasesSection from "../components/UseCasesSection";
import GallerySection from "../components/GallerySection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";

interface HomePageProps {
  pageData: PageData;
  profile: {
    business_name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
  };
}

export default function HomePage({ pageData, profile }: HomePageProps) {
  // Filter out any undefined/null sections
  const validSections = (pageData.sections || []).filter(
    (section): section is NonNullable<typeof section> => section != null
  );

  return (
    <main>
      {validSections.map((section, index) => {
        if (!section || !section.type) {
          return null;
        }
        switch (section.type) {
          case "hero":
            return (
                <div key={`${section.type}-${index}`}>
                    <HeroSection section={section} />
                    {/* Add Stats Section immediately after Hero */}
                    <div className="bg-white py-12 border-b border-slate-100">
                        <div className="t1-container">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                                {[
                                    { label: "Active Users", value: "10k+" },
                                    { label: "Countries", value: "25+" },
                                    { label: "Satisfaction", value: "99%" },
                                    { label: "Support", value: "24/7" },
                                ].map((stat, i) => (
                                    <div key={i} className="p-4">
                                        <div className="text-3xl font-bold text-indigo-600 mb-1">{stat.value}</div>
                                        <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            );
          case "services":
            return <ServicesSection key={`${section.type}-${index}`} section={section} />;
          case "richtext":
            return <RichTextSection key={`${section.type}-${index}`} section={section} />;
          case "values":
            return <ValuesSection key={`${section.type}-${index}`} section={section} />;
          case "contact_card":
            return (
              <ContactCardSection
                key={`${section.type}-${index}`}
                section={section}
                profile={profile}
              />
            );
          case "backed_by":
            return <BackedBySection key={`${section.type}-${index}`} section={section} />;
          case "use_cases":
            return <UseCasesSection key={`${section.type}-${index}`} section={section} />;
          case "gallery":
            return <GallerySection key={`${section.type}-${index}`} section={section} />;
          case "testimonials":
            return <TestimonialsSection key={`${section.type}-${index}`} section={section} />;
          case "faq":
            return <FAQSection key={`${section.type}-${index}`} section={section} />;
          default:
            return null;
        }
      })}
      
      {/* Final CTA Section */}
      <section className="t1-cta-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90 z-0"></div>
        {/* Animated rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

        <div className="t1-container relative z-10 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight">Ready to Transform Your Business?</h2>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of satisfied customers who have taken their operations to the next level with our solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200">
                Get Started Now
            </a>
            <a href="/about" className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-colors">
                Learn More
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

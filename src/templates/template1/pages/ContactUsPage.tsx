"use client";

import type { PageData } from "@/lib/pageSchema";
import HeroSection from "../components/HeroSection";
import ContactCardSection from "../components/ContactCardSection";
import RichTextSection from "../components/RichTextSection";
import GallerySection from "../components/GallerySection";
import TestimonialsSection from "../components/TestimonialsSection";
import FAQSection from "../components/FAQSection";

interface ContactUsPageProps {
  pageData: PageData;
  profile: {
    business_name: string;
    address: string | null;
    phone: string | null;
    email: string | null;
    whatsapp: string | null;
  };
}

export default function ContactUsPage({ pageData, profile }: ContactUsPageProps) {
  // Filter out any undefined/null sections
  const validSections = (pageData.sections || []).filter(
    (section): section is NonNullable<typeof section> => section != null && section.type != null
  );

  return (
    <main>
        {/* Contact Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-purple-900"></div>
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Get in Touch</h1>
                <p className="text-lg text-indigo-100 max-w-2xl">We'd love to hear from you. Our team is always here to help.</p>
            </div>
        </div>

      {validSections.map((section, index) => {
        // Skip Hero section for contact page as we have a custom banner
        if (section.type === 'hero') return null;

        switch (section.type) {
          case "contact_card":
            return (
                <div key={`${section.type}-${index}`}>
                    <ContactCardSection
                        section={section}
                        profile={profile}
                    />
                    
                    {/* Map Section */}
                    {profile.address && (
                         <section className="py-0">
                            <div className="w-full h-[400px] bg-slate-100 relative">
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    frameBorder="0" 
                                    scrolling="no" 
                                    marginHeight={0} 
                                    marginWidth={0} 
                                    src={`https://maps.google.com/maps?q=${encodeURIComponent(profile.address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                    className="filter grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                ></iframe>
                            </div>
                        </section>
                    )}
                </div>
            );
          case "richtext":
            return <RichTextSection key={`${section.type}-${index}`} section={section} />;
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
    </main>
  );
}

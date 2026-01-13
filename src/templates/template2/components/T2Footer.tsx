"use client";

import Link from "next/link";
import { buildEmailLink, buildTelLink } from "../utils";

interface T2FooterProps {
  businessName: string;
  tagline: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  socials: Record<string, string>;
  logoUrl: string | null;
  baseUrl: string;
}

export default function T2Footer({
  businessName,
  tagline,
  address,
  phone,
  email,
  socials,
  logoUrl,
  baseUrl,
}: T2FooterProps) {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 pr-8">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={businessName}
                className="h-10 w-auto mb-6 brightness-0 invert"
              />
            ) : (
              <h3 className="text-2xl font-extrabold text-white mb-6 tracking-tight">
                {businessName}
              </h3>
            )}
            
            <p className="text-slate-400 text-lg mb-8 max-w-md leading-relaxed">
              {tagline || "Building the future with premium design and cutting-edge technology solutions."}
            </p>
            
            <div className="flex gap-4">
              {['instagram', 'facebook', 'twitter', 'tiktok'].map((social) => {
                if (!socials[social]) return null;
                return (
                  <a
                    key={social}
                    href={socials[social]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition-all transform hover:-translate-y-1"
                    aria-label={social}
                  >
                    <span className="capitalize text-xs">{social[0]}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-4">
              {[
                { label: 'Home', href: `${baseUrl}/` },
                { label: 'About Us', href: `${baseUrl}/about` },
                { label: 'Services', href: `${baseUrl}/#services` },
                { label: 'Contact', href: `${baseUrl}/contact` },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-teal-400 transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Get in Touch</h3>
            <ul className="space-y-4">
              {address && (
                <li className="flex items-start text-slate-400">
                  <svg className="w-6 h-6 mr-3 text-teal-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{address}</span>
                </li>
              )}
              {phone && (
                <li>
                  <a href={buildTelLink(phone)} className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6 mr-3 text-teal-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li>
                  <a href={buildEmailLink(email)} className="flex items-center text-slate-400 hover:text-white transition-colors">
                    <svg className="w-6 h-6 mr-3 text-teal-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

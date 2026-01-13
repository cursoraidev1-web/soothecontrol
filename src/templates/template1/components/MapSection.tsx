"use client";

import type { MapSection as MapSectionType } from "@/lib/pageSchema";
import Icon from "@/lib/icons";

interface MapSectionProps {
  section: MapSectionType;
  address?: string | null;
}

export default function MapSection({ section, address }: MapSectionProps) {
  const displayAddress = section.address || address || "123 Business Street, City, Country";
  const embedUrl = section.embedUrl;
  const showDirections = section.showDirectionsButton !== false;

  // Generate Google Maps directions URL
  const getDirectionsUrl = () => {
    const encoded = encodeURIComponent(displayAddress);
    return `https://www.google.com/maps/dir/?api=1&destination=${encoded}`;
  };

  return (
    <section className="t1-section t1-map-section">
      <div className="t1-container">
        {section.title && (
          <div className="t1-map-header">
            <h2 className="t1-section-title">{section.title}</h2>
          </div>
        )}

        <div className="t1-map-container">
          {/* Map or Placeholder */}
          <div className="t1-map-frame">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            ) : (
              <div className="t1-map-placeholder">
                <div className="t1-map-placeholder-content">
                  <div className="t1-map-placeholder-icon">
                    <Icon name="location" size={48} />
                  </div>
                  <h3 className="t1-map-placeholder-title">Find Us Here</h3>
                  <p className="t1-map-placeholder-address">{displayAddress}</p>
                  {showDirections && (
                    <a
                      href={getDirectionsUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t1-map-directions-btn"
                    >
                      <Icon name="arrowRight" size={18} />
                      Get Directions
                    </a>
                  )}
                </div>
                
                {/* Decorative map-like background */}
                <div className="t1-map-placeholder-bg">
                  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 50L400 80" stroke="currentColor" strokeOpacity="0.1" />
                    <path d="M0 100L400 130" stroke="currentColor" strokeOpacity="0.1" />
                    <path d="M0 150L400 180" stroke="currentColor" strokeOpacity="0.1" />
                    <path d="M0 200L400 230" stroke="currentColor" strokeOpacity="0.1" />
                    <path d="M0 250L400 280" stroke="currentColor" strokeOpacity="0.1" />
                    <path d="M50 0L80 300" stroke="currentColor" strokeOpacity="0.1" />
                    <path d="M150 0L180 300" stroke="currentColor" strokeOpacity="0.1" />
                    <path d="M250 0L280 300" stroke="currentColor" strokeOpacity="0.1" />
                    <path d="M350 0L380 300" stroke="currentColor" strokeOpacity="0.1" />
                    <circle cx="200" cy="150" r="40" stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" />
                    <circle cx="200" cy="150" r="80" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" />
                    <circle cx="200" cy="150" r="120" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Address Card */}
          <div className="t1-map-info-card">
            <div className="t1-map-info-icon">
              <Icon name="building" size={24} />
            </div>
            <div className="t1-map-info-content">
              <h4 className="t1-map-info-label">Our Location</h4>
              <p className="t1-map-info-address">{displayAddress}</p>
            </div>
            {showDirections && (
              <a
                href={getDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="t1-map-info-link"
              >
                <Icon name="arrowRight" size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

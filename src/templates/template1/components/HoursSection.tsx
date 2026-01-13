"use client";

import type { HoursSection as HoursSectionType } from "@/lib/pageSchema";
import Icon from "@/lib/icons";

interface HoursSectionProps {
  section: HoursSectionType;
}

// Default schedule
const defaultSchedule = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

// Check if currently open (simplified)
function isCurrentlyOpen(schedule: typeof defaultSchedule): boolean {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  
  // Weekday
  if (day >= 1 && day <= 5) {
    return hour >= 9 && hour < 18;
  }
  // Saturday
  if (day === 6) {
    return hour >= 10 && hour < 16;
  }
  // Sunday
  return false;
}

export default function HoursSection({ section }: HoursSectionProps) {
  const schedule = section.schedule && section.schedule.length > 0 
    ? section.schedule 
    : defaultSchedule;
  
  const isOpen = isCurrentlyOpen(schedule);

  return (
    <section className="t1-section t1-hours-section">
      <div className="t1-container">
        <div className="t1-hours-card">
          {/* Header */}
          <div className="t1-hours-header">
            <div className="t1-hours-icon">
              <Icon name="clock" size={28} />
            </div>
            <div className="t1-hours-title-wrap">
              <h3 className="t1-hours-title">{section.title || "Business Hours"}</h3>
              <div className={`t1-hours-status ${isOpen ? "t1-hours-open" : "t1-hours-closed"}`}>
                <span className="t1-hours-status-dot" />
                {isOpen ? "Open Now" : "Closed"}
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="t1-hours-schedule">
            {schedule.map((item, index) => (
              <div key={index} className="t1-hours-row">
                <span className="t1-hours-day">{item.day}</span>
                <span className="t1-hours-time">{item.hours}</span>
              </div>
            ))}
          </div>

          {/* Note */}
          {section.note && (
            <div className="t1-hours-note">
              <Icon name="sparkles" size={16} />
              <span>{section.note}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

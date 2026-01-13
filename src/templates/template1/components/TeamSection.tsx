"use client";

import { useEffect, useState, useRef } from "react";
import type { TeamSection as TeamSectionType } from "@/lib/pageSchema";
import Icon from "@/lib/icons";

interface TeamSectionProps {
  section: TeamSectionType;
}

// Default team members for placeholder
const defaultTeamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "",
    bio: "Visionary leader with 15+ years of industry experience.",
    socials: { linkedin: "#", twitter: "#", email: "sarah@example.com" },
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "",
    bio: "Operations expert ensuring seamless service delivery.",
    socials: { linkedin: "#", email: "michael@example.com" },
  },
  {
    name: "Emily Rodriguez",
    role: "Creative Director",
    image: "",
    bio: "Award-winning designer with a passion for innovation.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "David Kim",
    role: "Lead Developer",
    image: "",
    bio: "Technical guru building scalable solutions.",
    socials: { linkedin: "#", email: "david@example.com" },
  },
];

// Generate initials for avatar placeholder
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Generate consistent color based on name
function getAvatarColor(name: string): string {
  const colors = [
    "linear-gradient(135deg, #667EEA 0%, #764BA2 100%)",
    "linear-gradient(135deg, #F093FB 0%, #F5576C 100%)",
    "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)",
    "linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)",
    "linear-gradient(135deg, #FA709A 0%, #FEE140 100%)",
    "linear-gradient(135deg, #A8EDEA 0%, #FED6E3 100%)",
  ];
  const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
}

function TeamMemberCard({
  member,
  index,
  isVisible,
}: {
  member: typeof defaultTeamMembers[0];
  index: number;
  isVisible: boolean;
}) {
  return (
    <div
      className="t1-team-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`,
      }}
    >
      {/* Avatar */}
      <div className="t1-team-avatar-wrapper">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="t1-team-avatar"
          />
        ) : (
          <div
            className="t1-team-avatar t1-team-avatar-placeholder"
            style={{ background: getAvatarColor(member.name) }}
          >
            <span className="t1-team-initials">{getInitials(member.name)}</span>
          </div>
        )}
        {/* Online indicator / decoration */}
        <div className="t1-team-avatar-ring" />
      </div>

      {/* Info */}
      <div className="t1-team-info">
        <h3 className="t1-team-name">{member.name}</h3>
        <p className="t1-team-role">{member.role}</p>
        {member.bio && <p className="t1-team-bio">{member.bio}</p>}
      </div>

      {/* Social Links */}
      {member.socials && (
        <div className="t1-team-socials">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="t1-team-social-link"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Icon name="linkedin" size={18} />
            </a>
          )}
          {member.socials.twitter && (
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="t1-team-social-link"
              aria-label={`${member.name}'s Twitter`}
            >
              <Icon name="twitter" size={18} />
            </a>
          )}
          {member.socials.email && (
            <a
              href={`mailto:${member.socials.email}`}
              className="t1-team-social-link"
              aria-label={`Email ${member.name}`}
            >
              <Icon name="email" size={18} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function TeamSection({ section }: TeamSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const members =
    section.members && section.members.length > 0 && section.members[0].name
      ? section.members
      : defaultTeamMembers;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="t1-section t1-team-section">
      <div className="t1-container">
        {/* Section Header */}
        <div className="t1-team-header">
          {section.subtitle && (
            <span className="t1-label">{section.subtitle}</span>
          )}
          <h2 className="t1-section-title">
            {section.title || "Meet Our Team"}
          </h2>
        </div>

        {/* Team Grid */}
        <div className="t1-team-grid">
          {members.map((member, index) => (
            <TeamMemberCard
              key={index}
              member={member}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

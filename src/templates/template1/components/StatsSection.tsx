"use client";

import { useEffect, useState, useRef } from "react";
import type { StatsSection as StatsSectionType } from "@/lib/pageSchema";
import { getIcon } from "@/lib/icons";

interface StatsSectionProps {
  section: StatsSectionType;
}

// Default stats if none provided
const defaultStats = [
  { value: "500+", label: "Happy Clients", icon: "users" },
  { value: "10+", label: "Years Experience", icon: "calendar" },
  { value: "99%", label: "Satisfaction Rate", icon: "thumbsup" },
  { value: "24/7", label: "Support Available", icon: "headphones" },
];

// Animated counter hook
function useCountUp(end: string, duration: number = 2000, shouldStart: boolean) {
  const [count, setCount] = useState("0");
  
  useEffect(() => {
    if (!shouldStart) return;
    
    // Extract numeric part and suffix
    const numericMatch = end.match(/^([\d.]+)/);
    const suffix = end.replace(/^[\d.]+/, "");
    
    if (!numericMatch) {
      setCount(end);
      return;
    }
    
    const targetNum = parseFloat(numericMatch[1]);
    const startTime = Date.now();
    const isDecimal = end.includes(".");
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentNum = targetNum * easeOut;
      
      if (isDecimal) {
        setCount(currentNum.toFixed(1) + suffix);
      } else {
        setCount(Math.floor(currentNum) + suffix);
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animate();
  }, [end, duration, shouldStart]);
  
  return count;
}

function StatCard({ 
  value, 
  label, 
  icon, 
  index, 
  isVisible 
}: { 
  value: string; 
  label: string; 
  icon?: string; 
  index: number;
  isVisible: boolean;
}) {
  const animatedValue = useCountUp(value, 2000, isVisible);
  
  return (
    <div 
      className="t1-stat-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
      }}
    >
      <div className="t1-stat-icon">
        {getIcon(icon, 28)}
      </div>
      <div className="t1-stat-value">{animatedValue}</div>
      <div className="t1-stat-label">{label}</div>
    </div>
  );
}

export default function StatsSection({ section }: StatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const stats = section.items && section.items.length > 0 ? section.items : defaultStats;
  const style = section.style || "default";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`t1-section t1-stats-section t1-stats-${style}`}
    >
      {/* Decorative background elements */}
      <div className="t1-stats-bg-decoration">
        <div className="t1-stats-orb t1-stats-orb-1" />
        <div className="t1-stats-orb t1-stats-orb-2" />
      </div>
      
      <div className="t1-container">
        {section.title && (
          <div className="t1-stats-header">
            {section.subtitle && (
              <span className="t1-label">{section.subtitle}</span>
            )}
            <h2 className="t1-section-title">{section.title}</h2>
          </div>
        )}
        
        <div className="t1-stats-grid">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Helper functions for placeholder content
 */

export function getLoremHeadline(): string {
  const headlines = [
    "Transform Your Business Today",
    "Innovative Solutions for Your Success",
    "Excellence in Every Service",
    "Your Trusted Partner",
    "Building Tomorrow Together",
  ];
  return headlines[Math.floor(Math.random() * headlines.length)];
}

export function getLoremParagraph(): string {
  return "Write a clear, benefit-focused description of what you do, who you help, and what outcomes people can expect.";
}

export function getLoremSentence(): string {
  return "Add a short, specific line that reinforces the main benefit.";
}

export function getLoremShortText(): string {
  return "Keep this short and concrete—one sentence that explains the value.";
}

export function getLoremServiceTitle(): string {
  const titles = [
    "Professional Services",
    "Expert Consultation",
    "Quality Solutions",
    "Innovative Approach",
    "Dedicated Support",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

export function getLoremServiceDesc(): string {
  return "We provide exceptional service tailored to your needs, ensuring the highest quality and customer satisfaction.";
}

export function getLoremValueTitle(): string {
  const titles = [
    "Excellence",
    "Integrity",
    "Innovation",
    "Commitment",
    "Quality",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

export function getLoremValueDesc(): string {
  return "We are committed to delivering the highest standards in everything we do, ensuring excellence and reliability.";
}

/**
 * Lorem Ipsum helper functions for placeholder content
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
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";
}

export function getLoremSentence(): string {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
}

export function getLoremShortText(): string {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
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

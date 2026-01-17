/**
 * Template 2 Utility Functions
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function safeHref(href: string | null | undefined): string {
  return href || "#";
}

export function buildTelLink(phone: string | null | undefined): string {
  if (!phone) return "#";
  return `tel:${phone.replace(/\s/g, "")}`;
}

export function buildEmailLink(email: string | null | undefined): string {
  if (!email) return "#";
  return `mailto:${email}`;
}

export function buildWhatsAppLink(whatsapp: string | null | undefined): string {
  if (!whatsapp) return "#";
  const cleaned = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${cleaned}`;
}

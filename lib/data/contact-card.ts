/**
 * Single source of truth for the personal contact card at /connect.
 * Edit here — the page, the QR poster and the downloadable .vcf all follow.
 */
export const contactCard = {
  firstName: 'Manan',
  lastName: 'Jindal',
  fullName: 'Manan Jindal',
  title: 'Principal Trainer & Solution Architect',
  organization: 'pTeachTech · Pernicia',
  email: 'manan.jindal@gmail.com',
  /** E.164 for tel: links and the vCard. */
  phone: '+919501565955',
  /** Human-readable rendering of the same number. */
  phoneDisplay: '+91 95015 65955',
  linkedin: 'https://www.linkedin.com/in/mananjindal/',
  medium: 'https://medium.com/@manan_jindal',
  website: 'https://pteachtech.in',
} as const

/**
 * vCard 3.0 — the format iOS and Android both import cleanly.
 * CRLF line endings are required by RFC 6350; some parsers reject LF-only.
 */
export function buildVCard(): string {
  const c = contactCard
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${c.lastName};${c.firstName};;;`,
    `FN:${c.fullName}`,
    `ORG:${c.organization}`,
    `TITLE:${c.title}`,
    `EMAIL;TYPE=INTERNET:${c.email}`,
    `TEL;TYPE=CELL,VOICE:${c.phone}`,
    `URL:${c.website}`,
    `item1.URL:${c.linkedin}`,
    'item1.X-ABLabel:LinkedIn',
    `item2.URL:${c.medium}`,
    'item2.X-ABLabel:Medium',
    'END:VCARD',
  ].join('\r\n')
}

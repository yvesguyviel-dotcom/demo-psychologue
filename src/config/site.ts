export const SITE = {
  name: 'Léa Marchand',
  practitioner: 'Léa Marchand',
  title: 'Léa Marchand — Psychologue à Toulon | Cabinet individuel',
  description: 'Accompagnement psychologique individuel, et confidentiel à Toulon. Espace d\'écoute neutre et cadre de consultation structuré pour adultes.',
  lang: 'fr',
  url:
    (typeof process !== 'undefined' && process.env.SITE_URL) ||
    'https://example.com',
  twitterHandle: '@leamarchand',
  phone: '04 94 00 00 00',
  phoneFormatted: '+33494000000',
  email: 'contact@exemple.fr',
  bookingUrl: 'https://www.doctolib.fr',
  rpps: '[À compléter]',
  diploma: 'Université [À compléter]',
  address: {
    street: '12 rue Exemple',
    city: 'Toulon',
    postalCode: '83000',
    country: 'FR',
  },
  socials: {
    linkedin: 'https://www.linkedin.com',
  },
} as const;

export type SiteConfig = typeof SITE;

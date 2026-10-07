import { SITE } from '@/config/site';
import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const content = `# ${SITE.name} — Psychologue à Toulon

> ${SITE.description}

## Pages

- [Accueil](${SITE.url}): Présentation du cabinet de psychologie libérale à Toulon
- [Mon approche](${SITE.url}/approche): Cadre déontologique, secret professionnel et déroulement des séances
- [Tarifs et modalités](${SITE.url}/tarifs): Durée des séances (45 min), tarif (60 €) et remboursements mutuelles
- [FAQ](${SITE.url}/faq): Questions fréquentes sur la consultation psychologique
- [Contact et accès](${SITE.url}/contact): Coordonnées, adresse et plan d'accès au cabinet à Toulon
- [Mentions légales](${SITE.url}/mentions-legales): Informations réglementaires, statut EI et mentions obligatoires
- [Confidentialité](${SITE.url}/confidentialite): Protection des données et secret professionnel
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};

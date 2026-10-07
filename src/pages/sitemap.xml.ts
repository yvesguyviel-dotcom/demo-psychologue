import { SITE } from '@/config/site';
import type { APIRoute } from 'astro';

// @astrojs/sitemap writes /sitemap-index.xml and /sitemap-0.xml, but crawlers
// and people still request /sitemap.xml by convention. This cannot be a
// redirect: the site is static, so Astro would prerender a 301 into an HTML
// meta-refresh page served as application/xml (issue #411). Opting the route
// out of prerendering is not an option either: the builder treats any
// prerender opt-out under src/pages as a signal to deploy the whole site as
// SSR. Serve a real sitemap index instead, pointing at the file the
// integration emits.
export const GET: APIRoute = () => {
  const content = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${new URL('/sitemap-0.xml', SITE.url)}</loc>
  </sitemap>
</sitemapindex>
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

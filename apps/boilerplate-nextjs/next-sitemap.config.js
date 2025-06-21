// ex) https://example.com
const APP_URL = 'https://example.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: APP_URL,
  generateIndexSitemap: false, // This is useful for small/hobby sites which does not require an index sitemap
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/admin'],
      },
    ],
    // additionalSitemaps: [`${FRONT_URL}/server-sitemap.xml`],
  },
  exclude: ['/admin*'],
};

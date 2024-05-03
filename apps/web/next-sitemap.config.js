const isStaging = process.env.NEXT_PUBLIC_DOMAIN.includes('staging')

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_DOMAIN,
  exclude: '/account/*',
  robotsTxtOptions: {
    policies: [{ userAgent: '*', [isStaging ? 'disallow' : 'allow']: '/' }],
  },
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}

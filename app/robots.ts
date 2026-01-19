export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://lakeviewhomes.co.in/sitemap.xml",
  };
}

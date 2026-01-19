export default function sitemap() {
  const baseUrl = "https://lakeviewhomes.co.in"; // Replace with actual domain

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add other routes here if they exist, e.g., /about, /contact
  ];
}

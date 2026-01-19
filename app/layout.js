import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://lakeviewhomes.co.in"), // Replace with actual domain if different
  title: {
    default: "Lakeview Homes | Luxury Villas in Rajahmundry",
    template: "%s | Lakeview Homes",
  },
  description:
    "Discover Lakeview Homes, a premium luxury villa community in Rajahmundry offering triplex villas with world-class amenities and serene lake views.",
  keywords: [
    "Lakeview Homes",
    "Luxury Villas Rajahmundry",
    "Real Estate Rajahmundry",
    "Gated Community Rajahmundry",
    "Triplex Villas",
    "Premium Villas",
    "Lakeview Home Rajahmundry",
    "MVR Lakeview",
    "Sithara Constructions",
    "MVR Constructions",
    "Villas in Rajahmundry",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Lakeview Homes | Luxury Villas in Rajahmundry",
    description:
      "Experience luxury living at Lakeview Homes. Premium triplex villas with modern amenities in a serene location.",
    url: "https://lakeviewhomes.co.in",
    siteName: "Lakeview Homes",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/Master_Layout_triplex.jpg", // Using a high-quality image from public assets
        width: 1200,
        height: 630,
        alt: "Lakeview Homes Master Layout",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lakeview Homes | Luxury Villas in Rajahmundry",
    description:
      "Discover Lakeview Homes, a premium luxury villa community in Rajahmundry.",
    images: ["/Master_Layout_triplex.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Lakeview Homes",
    parentOrganization: {
      "@type": "ConstructionCompany",
      name: "Sri Sithara Constructions",
    },
    image: "https://lakeviewhomes.co.in/Master_Layout_triplex.jpg",
    "@id": "https://lakeviewhomes.co.in",
    url: "https://lakeviewhomes.co.in",
    telephone: "+919441363666",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Beside Sri Venkateswara Swamy Temple, Kolamuru Diwancheruvu Rd, Rayudu Pakalu",
      addressLocality: "Rajahmundry",
      postalCode: "533102",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 17.064056,
      longitude: 81.835167,
    },
    description:
      "Premium luxury triplex villas in Rajahmundry with world-class amenities and sunset views.",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: ["https://instagram.com/mvr.lakeview.homes"],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

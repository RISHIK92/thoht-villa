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
  ],
  openGraph: {
    title: "Lakeview Homes | Luxury Villas in Rajahmundry",
    description:
      "Experience luxury living at Lakeview Homes. Premium triplex villas with modern amenities in a serene location.",
    url: "https://lakeviewhomes.co.in",
    siteName: "Lakeview Homes",
    locale: "en_US",
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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

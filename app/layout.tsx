import type { Metadata, Viewport } from "next";
import { DM_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const monoFont = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.team1515.com"),
  title: {
    default: "MorTorq — FRC Team 1515",
    template: "%s | MorTorq",
  },
  description:
    "Beverly Hills High School's student-led FIRST Robotics Competition team. Celebrating our 2026 finalist season and building toward BIOCORE 2027.",
  applicationName: "MorTorq",
  keywords: [
    "MorTorq",
    "Team 1515",
    "FRC Team 1515",
    "FIRST Robotics",
    "Beverly Hills High School",
    "BIOCORE",
    "student robotics",
  ],
  authors: [{ name: "MorTorq FRC Team 1515" }],
  creator: "MorTorq FRC Team 1515",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "MorTorq — FRC Team 1515",
    description:
      "Student-led. Mentor-powered. Building what’s next in Beverly Hills.",
    url: "/",
    siteName: "MorTorq",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MorTorq FRC Team 1515 and its 2026 robot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MorTorq — FRC Team 1515",
    description:
      "Student-led. Mentor-powered. Building what’s next in Beverly Hills.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0d0f",
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "MorTorq — FRC Team 1515",
  alternateName: "Team 1515",
  url: "https://www.team1515.com",
  logo: "https://www.team1515.com/icon.png",
  foundingDate: "2005",
  email: "1515mortorq@gmail.com",
  parentOrganization: {
    "@type": "HighSchool",
    name: "Beverly Hills High School",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "241 S Moreno Dr",
    addressLocality: "Beverly Hills",
    addressRegion: "CA",
    postalCode: "90212",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.instagram.com/frc1515/",
    "https://www.facebook.com/268540163324556",
    "https://www.thebluealliance.com/team/1515",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
}

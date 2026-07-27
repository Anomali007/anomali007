import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { siteConfig, personId, orgSites } from "@/lib/constants";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  keywords: [
    "Mali Franzese",
    "Anomali007",
    "software engineer",
    "AI-native development",
    "Next.js",
    "TypeScript",
    "React",
    "AWS",
    "full-stack developer",
    "Central Texas",
  ],
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "profile",
    firstName: siteConfig.firstName,
    lastName: siteConfig.lastName,
    username: siteConfig.handle,
    images: [
      {
        url: siteConfig.ogImage,
        width: 460,
        height: 460,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    // Was `@${siteConfig.handle}` = @Anomali007, verified 2026-07-27 as display
    // name "Anomali07" with 0 followers. @themasslabdev carries his actual name.
    creator: siteConfig.xHandle,
  },
  alternates: {
    canonical: siteConfig.url,
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Entity home. This block is the canonical Person node for the whole site;
  // it renders from the root layout so `/` and `/about` stay identical by
  // construction rather than by copy-paste.
  //
  // Deliberate honesty + privacy choices, do not "improve" without reading the
  // 2026-07-27 name SEO/AEO audit first:
  //   - WGU is `affiliation`, NOT `alumniOf`. The B.S. is in progress.
  //   - ASU is omitted entirely. One year, no degree, so no schema claim.
  //   - jobTitle is "Founder-Engineer". No self-assigned "Principal".
  //   - No address, homeLocation, telephone or email. workLocation is
  //     region-only, on purpose.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteConfig.name,
    // All three names he actually goes by. Each is a distinct query.
    alternateName: [siteConfig.handle, "anomali", siteConfig.legalName],
    // Not vanity. The 2026-07-27 AEO measurement recorded ChatGPT using "she"/"her"
    // four times in one answer because nothing in the public record resolves it.
    gender: "Male",
    url: siteConfig.url,
    mainEntityOfPage: `${siteConfig.url}/about`,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    jobTitle: "Founder-Engineer",
    description:
      "Founder-Engineer at The MASS Lab, an independent software practice. Builds and ships production multi-tenant SaaS platforms end to end, with AI-assisted development as a core method. Currently pursuing a B.S. in Cybersecurity at Western Governors University.",
    worksFor: {
      "@type": "Organization",
      "@id": `${orgSites.theMassLab}/#organization`,
      name: "The MASS Lab",
      url: orgSites.theMassLab,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Hack Reactor",
      url: "https://www.hackreactor.com",
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Western Governors University",
      url: "https://www.wgu.edu",
    },
    knowsAbout: [
      "AI-assisted software development",
      "multi-tenant SaaS architecture",
      "TypeScript",
      "Rust",
      "Next.js",
      "Amazon Web Services",
      "CI/CD and deployment automation",
      "cybersecurity",
    ],
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    sameAs: [
      siteConfig.github,
      // TODO(owner): verify LinkedIn slug resolves before shipping.
      siteConfig.linkedin,
      siteConfig.huggingface,
      siteConfig.x,
      orgSites.theMassLab,
      orgSites.massLabConnect,
      orgSites.tokenHolder,
      orgSites.f6s,
    ],
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <main className="min-h-[calc(100vh-8rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

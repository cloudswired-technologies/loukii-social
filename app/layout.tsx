import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    default: "Loukii - The Social Trust Network for Advisors",
    template: "%s | Loukii"
  },
  description: "Discover trusted financial advisors, insurance specialists, and takaful consultants in Malaysia. Read authentic reviews, explore expert content, and connect with verified professionals.",
  keywords: [
    "financial advisor Malaysia",
    "takaful consultant",
    "insurance specialist",
    "investment advisor",
    "retirement planning",
    "financial planning Malaysia",
    "advisor reviews",
    "trusted advisors",
    "Prudential BSN",
    "AIA Malaysia",
    "Great Eastern"
  ],
  authors: [{ name: "Loukii" }],
  creator: "Cloudswired Technologies",
  publisher: "Loukii",
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
    type: "website",
    locale: "en_MY",
    url: defaultUrl,
    title: "Loukii - The Social Trust Network for Advisors",
    description: "Discover trusted advisors across all industries. Read authentic reviews, explore expert content, and connect with verified professionals.",
    siteName: "Loukii",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Loukii - The Social Trust Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loukii - The Social Trust Network for Advisors",
    description: "Discover trusted advisors across all industries. Read authentic reviews, explore expert content, and connect with verified professionals.",
    images: ["/og-image.png"],
    creator: "@loukii",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-MY" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

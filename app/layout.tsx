import type { Metadata } from "next";

import "@/styles/globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const siteName = "Vietnam Career Orientation Map";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: "%s | Vietnam Career Orientation Map"
  },
  description:
    "Tra cuu nhom nganh, chuyen nganh dao tao dai hoc va huong nghe nghiep sau tot nghiep tai Viet Nam.",
  keywords: [
    "tra cuu nhom nganh",
    "tra cuu chuyen nganh",
    "nganh hoc dai hoc",
    "huong nghiep",
    "co hoi viec lam",
    "vietnam career orientation map"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName,
    title: siteName,
    description:
      "Tra cuu nhom nganh, chuyen nganh dao tao dai hoc va huong nghe nghiep sau tot nghiep tai Viet Nam."
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description:
      "Tra cuu nhom nganh, chuyen nganh dao tao dai hoc va huong nghe nghiep sau tot nghiep tai Viet Nam."
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

import GroupCatalogExplorer from "@/components/GroupCatalogExplorer";
import careerMap from "@/data/vietnam-career-map.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
const pagePath = "/tra-cuu-nhom-nganh";

export const metadata: Metadata = {
  title: "Tra Cuu Nhom Nganh",
  description:
    "Tra cuu thong tin nhom nganh dao tao, chuyen nganh va huong nghe nghiep sau tot nghiep de doi chieu thong tin tuyen sinh.",
  alternates: {
    canonical: pagePath
  },
  openGraph: {
    url: pagePath,
    title: "Tra Cuu Nhom Nganh",
    description:
      "Tra cuu thong tin nhom nganh dao tao, chuyen nganh va huong nghe nghiep sau tot nghiep de doi chieu thong tin tuyen sinh."
  }
};

export default function GroupCatalogPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Lam sao de tra cuu nhom nganh va chuyen nganh?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ban chon nhom nganh o cot ben trai, sau do chon chuyen nganh de xem thong tin tong quan va huong nghe nghiep."
        }
      },
      {
        "@type": "Question",
        name: "Trang co ho tro tim viec lam sau tot nghiep khong?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Moi chuyen nganh deu co phan cong viec sau tot nghiep va mo ta co hoi nghe nghiep de ban tham khao."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chu",
        item: siteUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tra cuu nhom nganh",
        item: `${siteUrl}${pagePath}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GroupCatalogExplorer roadmap={careerMap} />
    </>
  );
}

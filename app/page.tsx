import type { Metadata } from "next";

import GroupCatalogExplorer from "@/components/GroupCatalogExplorer";
import careerMap from "@/data/vietnam-career-map.json";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const metadata: Metadata = {
  title: "Tra Cuu Nhom Nganh Dai Hoc",
  description:
    "Tra cuu thong tin nhom nganh, chuyen nganh dao tao dai hoc va cong viec sau tot nghiep dua tren du lieu Vietnam Career Orientation Map.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    url: "/",
    title: "Tra Cuu Nhom Nganh Dai Hoc",
    description:
      "Tra cuu thong tin nhom nganh, chuyen nganh dao tao dai hoc va cong viec sau tot nghiep dua tren du lieu Vietnam Career Orientation Map."
  }
};

export default function HomePage() {
  const majorCount = (careerMap.groupCatalog ?? []).reduce(
    (sum, group) => sum + (group.majors?.length ?? 0),
    0
  );

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vietnam Career Orientation Map",
    url: siteUrl,
    description:
      "Tra cuu thong tin nhom nganh, chuyen nganh dao tao dai hoc va cong viec sau tot nghiep dua tren du lieu Vietnam Career Orientation Map.",
    inLanguage: ["vi", "en"]
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tra cuu nhom nganh dao tao",
    description:
      "Tong hop nhom nganh dao tao va danh sach chuyen nganh de tra cuu thong tin huong nghiep.",
    isPartOf: {
      "@type": "WebSite",
      name: "Vietnam Career Orientation Map",
      url: siteUrl
    },
    about: {
      "@type": "Thing",
      name: "Nhom nganh va chuyen nganh dao tao dai hoc"
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: majorCount,
      itemListElement: (careerMap.groupCatalog ?? []).map((group, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: group.titleI18n?.vi ?? group.title
      }))
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Toi co the tra cuu chuyen nganh theo nhom nhu the nao?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ban chon nhom nganh, sau do chon chuyen nganh de xem mo ta, danh sach cong viec va thong tin huong nghiep."
        }
      },
      {
        "@type": "Question",
        name: "Project nay co cung cap roadmap graph khong?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Co. Ban co the mo route /roadmap-graph de xem do thi roadmap tuong tac cho du lieu chuyen nganh."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GroupCatalogExplorer roadmap={careerMap} />
    </>
  );
}

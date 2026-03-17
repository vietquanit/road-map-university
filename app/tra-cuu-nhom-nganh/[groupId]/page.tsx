import type { Metadata } from "next";
import { notFound } from "next/navigation";

import GroupCatalogExplorer from "@/components/GroupCatalogExplorer";
import careerMap from "@/data/vietnam-career-map.json";
import { getCatalogGroups, getGroupBySlug, getGroupSlug } from "@/lib/catalogSeo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

type GroupPageProps = {
  params: {
    groupId: string;
  };
};

export function generateStaticParams() {
  return getCatalogGroups().map((group) => ({ groupId: getGroupSlug(group) }));
}

export function generateMetadata({ params }: GroupPageProps): Metadata {
  const group = getGroupBySlug(params.groupId);

  if (!group) {
    return {
      title: "Nhom nganh khong ton tai"
    };
  }

  const groupTitle = group.titleI18n?.vi ?? group.title;
  const groupSlug = getGroupSlug(group);
  const path = `/tra-cuu-nhom-nganh/${groupSlug}`;

  return {
    title: `Nhom nganh ${groupTitle}`,
    description: `Tra cuu danh sach chuyen nganh thuoc nhom ${groupTitle} va huong nghe nghiep sau tot nghiep.`,
    alternates: {
      canonical: path
    },
    openGraph: {
      url: path,
      title: `Nhom nganh ${groupTitle}`,
      description: `Tra cuu danh sach chuyen nganh thuoc nhom ${groupTitle} va huong nghe nghiep sau tot nghiep.`
    }
  };
}

export default function GroupDetailPage({ params }: GroupPageProps) {
  const group = getGroupBySlug(params.groupId);

  if (!group) {
    notFound();
  }

  const groupSlug = getGroupSlug(group);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Nhom nganh ${group.titleI18n?.vi ?? group.title} gom nhung chuyen nganh nao?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Trang nay tong hop danh sach chuyen nganh thuoc nhom ${group.titleI18n?.vi ?? group.title} de tra cuu nhanh.`
        }
      },
      {
        "@type": "Question",
        name: "Toi co the xem huong nghe nghiep sau tot nghiep o dau?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Chon tung chuyen nganh de xem danh sach cong viec va mo ta co hoi nghe nghiep sau tot nghiep."
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
        item: `${siteUrl}/tra-cuu-nhom-nganh`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: group.titleI18n?.vi ?? group.title,
        item: `${siteUrl}/tra-cuu-nhom-nganh/${groupSlug}`
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GroupCatalogExplorer roadmap={careerMap} initialGroupId={group.id} />
    </>
  );
}

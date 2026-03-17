import type { Metadata } from "next";
import { notFound } from "next/navigation";

import GroupCatalogExplorer from "@/components/GroupCatalogExplorer";
import careerMap from "@/data/vietnam-career-map.json";
import {
  getCatalogGroups,
  getGroupBySlug,
  getGroupSlug,
  getMajorBySlug,
  getMajorDisplayName,
  getMajorSlug
} from "@/lib/catalogSeo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

type MajorPageProps = {
  params: {
    groupId: string;
    majorId: string;
  };
};

export function generateStaticParams() {
  return getCatalogGroups().flatMap((group) =>
    (group.majors ?? []).map((major) => ({
      groupId: getGroupSlug(group),
      majorId: getMajorSlug(major)
    }))
  );
}

export function generateMetadata({ params }: MajorPageProps): Metadata {
  const group = getGroupBySlug(params.groupId);

  if (!group) {
    return {
      title: "Chuyen nganh khong ton tai"
    };
  }

  const major = getMajorBySlug(group, params.majorId);
  if (!major) {
    return {
      title: "Chuyen nganh khong ton tai"
    };
  }

  const groupSlug = getGroupSlug(group);
  const majorSlug = getMajorSlug(major);
  const majorName = getMajorDisplayName(major, "vi");
  const path = `/tra-cuu-nhom-nganh/${groupSlug}/${majorSlug}`;

  return {
    title: `Chuyen nganh ${majorName}`,
    description: `Tra cuu thong tin chuyen nganh ${majorName}, nhom nganh dao tao va co hoi nghe nghiep sau tot nghiep.`,
    alternates: {
      canonical: path
    },
    openGraph: {
      url: path,
      title: `Chuyen nganh ${majorName}`,
      description: `Tra cuu thong tin chuyen nganh ${majorName}, nhom nganh dao tao va co hoi nghe nghiep sau tot nghiep.`
    }
  };
}

export default function MajorDetailPage({ params }: MajorPageProps) {
  const group = getGroupBySlug(params.groupId);

  if (!group) {
    notFound();
  }

  const major = getMajorBySlug(group, params.majorId);

  if (!major) {
    notFound();
  }

  const groupSlug = getGroupSlug(group);
  const majorSlug = getMajorSlug(major);

  const majorName = getMajorDisplayName(major, "vi");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Chuyen nganh ${majorName} hoc gi?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Trang nay tong hop mo ta va thong tin tong quan ve chuyen nganh ${majorName} de ban tham khao.`
        }
      },
      {
        "@type": "Question",
        name: `Hoc ${majorName} ra truong lam gi?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Khu vuc thong tin nghe nghiep hien thi danh sach cong viec va huong nghe nghiep sau tot nghiep theo chuyen nganh da chon."
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
      },
      {
        "@type": "ListItem",
        position: 4,
        name: majorName,
        item: `${siteUrl}/tra-cuu-nhom-nganh/${groupSlug}/${majorSlug}`
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
      <GroupCatalogExplorer
        roadmap={careerMap}
        initialGroupId={group.id}
        initialMajorId={major.id}
      />
    </>
  );
}

import careerMap from "@/data/vietnam-career-map.json";

import { GroupCatalogItem, GroupCatalogMajorItem } from "@/types/roadmap";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function getCatalogGroups(): GroupCatalogItem[] {
  return [...(careerMap.groupCatalog ?? [])].sort((a, b) => a.order - b.order);
}

export function getGroupSlug(group: GroupCatalogItem): string {
  const englishTitle = (group.titleI18n?.en ?? "").trim();
  return slugify(englishTitle || group.title || group.id);
}

export function getMajorSlug(major: GroupCatalogMajorItem): string {
  const englishName = (major.nameI18n?.en ?? "").trim();
  const vietnameseName = (major.nameI18n?.vi ?? "").trim();
  return slugify(englishName || vietnameseName || major.id);
}

export function getGroupById(groupId: string): GroupCatalogItem | null {
  return getCatalogGroups().find((group) => group.id === groupId) ?? null;
}

export function getGroupBySlug(groupSlug: string): GroupCatalogItem | null {
  return (
    getCatalogGroups().find(
      (group) => getGroupSlug(group) === groupSlug || group.id === groupSlug
    ) ?? null
  );
}

export function getMajorById(group: GroupCatalogItem, majorId: string): GroupCatalogMajorItem | null {
  return (group.majors ?? []).find((major) => major.id === majorId) ?? null;
}

export function getMajorBySlug(
  group: GroupCatalogItem,
  majorSlug: string
): GroupCatalogMajorItem | null {
  return (
    (group.majors ?? []).find(
      (major) => getMajorSlug(major) === majorSlug || major.id === majorSlug
    ) ?? null
  );
}

export function getMajorDisplayName(major: GroupCatalogMajorItem, language: "vi" | "en" = "vi"): string {
  return major.nameI18n?.[language] ?? major.nameI18n?.vi ?? major.id;
}

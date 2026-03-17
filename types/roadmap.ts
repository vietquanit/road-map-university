export interface ResourceLink {
  title: string;
  url: string;
}

export type SupportedLanguage = "en" | "vi";

export type LocalizedStringMap = Partial<Record<SupportedLanguage, string>>;
export type LocalizedStringArrayMap = Partial<Record<SupportedLanguage, string[]>>;

export interface Section {
  id: string;
  title: string;
  titleI18n?: LocalizedStringMap;
  order?: number;
  academicFocus?: string;
  academicFocusI18n?: LocalizedStringMap;
  workTypes?: string[];
  workTypesI18n?: LocalizedStringArrayMap;
  outcomeJobs?: string[];
  outcomeJobsI18n?: LocalizedStringArrayMap;
}

export interface DataSourceReference {
  id: string;
  name: string;
  url: string;
  description?: string;
  descriptionI18n?: LocalizedStringMap;
}

export interface GroupCatalogItem {
  id: string;
  order: number;
  title: string;
  titleI18n?: LocalizedStringMap;
  academicFocusI18n?: LocalizedStringMap;
  workTypesI18n?: LocalizedStringArrayMap;
  outcomeJobsI18n?: LocalizedStringArrayMap;
  portalMajorsI18n?: LocalizedStringArrayMap;
  majorIds?: string[];
  majors?: GroupCatalogMajorItem[];
}

export interface GroupCatalogMajorItem {
  id: string;
  nameI18n: LocalizedStringMap;
  sourceUrl?: string;
  jobsI18n?: LocalizedStringArrayMap;
  careerSectionI18n?: LocalizedStringMap;
}

export interface RoadmapNode {
  id: string;
  label: string;
  labelI18n?: LocalizedStringMap;
  description: string;
  descriptionI18n?: LocalizedStringMap;
  section?: string;
  resources?: ResourceLink[];
  careers?: string[];
  careersI18n?: LocalizedStringArrayMap;
}

export interface RoadmapEdge {
  source: string;
  target: string;
}

export interface Roadmap {
  title: string;
  titleI18n?: LocalizedStringMap;
  description?: string;
  descriptionI18n?: LocalizedStringMap;
  sections?: Section[];
  nodes: RoadmapNode[];
  edges: RoadmapEdge[];
  academicOrder?: string[];
  groupCatalog?: GroupCatalogItem[];
  sourceReferences?: DataSourceReference[];
}

export type RoadmapKey =
  | "frontend"
  | "backend"
  | "devops"
  | "fullstack"
  | "vietnam-career-map";

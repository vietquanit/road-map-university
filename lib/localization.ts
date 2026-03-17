import {
  LocalizedStringArrayMap,
  LocalizedStringMap,
  Roadmap,
  SupportedLanguage
} from "@/types/roadmap";

type UiDictionary = Record<
  | "dark"
  | "light"
  | "roadmap"
  | "language"
  | "sections"
  | "datasetWithoutSections"
  | "selectMajorPrompt"
  | "close"
  | "careerCount"
  | "careers"
  | "noCareers"
  | "viewMode"
  | "viewByCategory"
  | "learningFlow"
  | "clusters"
  | "expandAll"
  | "collapseAll"
  | "expand"
  | "collapse"
  | "categoryLegend"
  | "groupFocus"
  | "workTypes"
  | "outcomeJobs"
  | "chooseSectionHint"
  | "groupCatalogPage"
  | "backToRoadmap"
  | "openGroupCatalog"
  | "sourceReferences"
  | "majorList"
  | "selectMajorHint"
  | "majorCareers"
  | "portalSampleMajors"
  | "sourceMajorJobsHint"
  | "selectedMajorFromSource"
  | "majorSourceLink"
  | "jobsFromGroupFallback"
  | "careerSection"
  | "careerSectionUnavailable",
  string
>;

const uiText: Record<SupportedLanguage, UiDictionary> = {
  en: {
    dark: "Dark",
    light: "Light",
    roadmap: "Roadmap",
    language: "Language",
    sections: "Sections",
    datasetWithoutSections: "This dataset does not define sections.",
    selectMajorPrompt: "Select a major node to view description and career paths.",
    close: "Close",
    careerCount: "Career Count",
    careers: "Careers",
    noCareers: "No careers available for this major yet.",
    viewMode: "View Mode",
    viewByCategory: "View by Category",
    learningFlow: "Learning Flow",
    clusters: "Clusters",
    expandAll: "Expand all",
    collapseAll: "Collapse all",
    expand: "Expand",
    collapse: "Collapse",
    categoryLegend: "Category Legend",
    groupFocus: "Training Focus",
    workTypes: "Work Types",
    outcomeJobs: "Typical Jobs After Graduation",
    chooseSectionHint: "Choose a section to see work types and outcomes.",
    groupCatalogPage: "Group Lookup",
    backToRoadmap: "Back to Roadmap",
    openGroupCatalog: "Open Group Lookup",
    sourceReferences: "Source References",
    majorList: "Majors in this Group",
    selectMajorHint: "Select a major to view related jobs.",
    majorCareers: "Jobs After Graduation",
    portalSampleMajors: "Majors from Admission Portal",
    sourceMajorJobsHint: "For portal-only majors, jobs are suggested from this group outcomes.",
    selectedMajorFromSource: "Selected Source Major",
    majorSourceLink: "Major Detail Source",
    jobsFromGroupFallback: "No direct jobs extracted from source page yet, showing group-based job suggestions.",
    careerSection: "Career Opportunity Section",
    careerSectionUnavailable: "The source page does not provide a clear career opportunity section yet."
  },
  vi: {
    dark: "Tối",
    light: "Sáng",
    roadmap: "Lộ trình",
    language: "Ngôn ngữ",
    sections: "Nhóm ngành",
    datasetWithoutSections: "Bộ dữ liệu này không định nghĩa section.",
    selectMajorPrompt: "Chọn một ngành để xem mô tả và hướng nghề nghiệp.",
    close: "Đóng",
    careerCount: "Số lượng nghề nghiệp",
    careers: "Danh sách nghề nghiệp",
    noCareers: "Chưa có danh sách nghề nghiệp cho ngành này.",
    viewMode: "Chế độ hiển thị",
    viewByCategory: "Xem theo nhóm ngành",
    learningFlow: "Luồng học tập",
    clusters: "Cụm ngành",
    expandAll: "Mở rộng tất cả",
    collapseAll: "Thu gọn tất cả",
    expand: "Mở rộng",
    collapse: "Thu gọn",
    categoryLegend: "Chú giải nhóm ngành",
    groupFocus: "Trọng tâm đào tạo",
    workTypes: "Loại hình công việc",
    outcomeJobs: "Nhóm công việc sau tốt nghiệp",
    chooseSectionHint: "Chọn một nhóm ngành để xem loại hình công việc và đầu ra nghề nghiệp.",
    groupCatalogPage: "Tra cứu nhóm ngành",
    backToRoadmap: "Quay lại lộ trình",
    openGroupCatalog: "Mở trang tra cứu nhóm ngành",
    sourceReferences: "Nguồn tham chiếu",
    majorList: "Danh sách ngành trong nhóm",
    selectMajorHint: "Chọn một ngành để xem công việc sau tốt nghiệp.",
    majorCareers: "Công việc sau khi tốt nghiệp",
    portalSampleMajors: "Ngành từ cổng tuyển sinh",
    sourceMajorJobsHint: "Với ngành chỉ có trong cổng tuyển sinh, công việc được gợi ý theo đầu ra của nhóm ngành.",
    selectedMajorFromSource: "Ngành đã chọn từ nguồn tuyển sinh",
    majorSourceLink: "Nguồn chi tiết ngành",
    jobsFromGroupFallback: "Chưa trích được danh sách công việc trực tiếp từ trang ngành, đang hiển thị gợi ý theo nhóm ngành.",
    careerSection: "Mục Cơ hội việc làm",
    careerSectionUnavailable: "Trang nguồn chưa có mục Cơ hội việc làm rõ ràng để trích xuất."
  }
};

export function getUiText(key: keyof UiDictionary, language: SupportedLanguage): string {
  return uiText[language][key] ?? uiText.en[key];
}

export function pickLocalizedText(
  fallback: string,
  i18n: LocalizedStringMap | undefined,
  language: SupportedLanguage
): string {
  return i18n?.[language] ?? i18n?.en ?? fallback;
}

export function pickLocalizedArray(
  fallback: string[],
  i18n: LocalizedStringArrayMap | undefined,
  language: SupportedLanguage
): string[] {
  return i18n?.[language] ?? i18n?.en ?? fallback;
}

export function localizeRoadmap(roadmap: Roadmap, language: SupportedLanguage): Roadmap {
  return {
    ...roadmap,
    title: pickLocalizedText(roadmap.title, roadmap.titleI18n, language),
    description: pickLocalizedText(roadmap.description ?? "", roadmap.descriptionI18n, language),
    sections: roadmap.sections?.map((section) => ({
      ...section,
      title: pickLocalizedText(section.title, section.titleI18n, language),
      academicFocus: pickLocalizedText(
        section.academicFocus ?? "",
        section.academicFocusI18n,
        language
      ),
      workTypes: pickLocalizedArray(section.workTypes ?? [], section.workTypesI18n, language),
      outcomeJobs: pickLocalizedArray(section.outcomeJobs ?? [], section.outcomeJobsI18n, language)
    })),
    nodes: roadmap.nodes.map((node) => ({
      ...node,
      label: pickLocalizedText(node.label, node.labelI18n, language),
      description: pickLocalizedText(node.description, node.descriptionI18n, language),
      careers: pickLocalizedArray(node.careers ?? [], node.careersI18n, language)
    }))
  };
}

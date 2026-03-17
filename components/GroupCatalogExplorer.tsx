"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getUiText, pickLocalizedArray, pickLocalizedText } from "@/lib/localization";
import { Roadmap, SupportedLanguage } from "@/types/roadmap";

type GroupCatalogExplorerProps = {
  roadmap: Roadmap;
  initialGroupId?: string;
  initialMajorId?: string;
};

function titleCase(value: string): string {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function hasVietnameseDiacritics(value: string): boolean {
  return /[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(value);
}

function normalizeVietnamese(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function looksLikeVietnameseRomanized(value: string): boolean {
  const normalized = normalizeVietnamese(value);
  return /\b(nganh|ky thuat|khoa hoc|cong nghe|quan ly|tai nguyen|moi truong|kinh te|du lich|thuong mai|xay dung|y hoc|duoc|su pham|nong nghiep|lam nghiep|thuy san|ngon ngu|luat|kien truc)\b/.test(
    normalized
  );
}

const EXACT_MAJOR_TRANSLATIONS: Record<string, string> = {
  "an toan thong tin": "Information Security",
  "cong nghe thong tin": "Information Technology",
  "khoa hoc du lieu": "Data Science",
  "khoa hoc may tinh": "Computer Science",
  "ky thuat phan mem": "Software Engineering",
  "tri tue nhan tao": "Artificial Intelligence",
  "mang may tinh va truyen thong du lieu": "Computer Networks and Data Communications",
  "toan tin": "Mathematics and Computer Science",
  "quan tri kinh doanh": "Business Administration",
  "kinh doanh quoc te": "International Business",
  "thuong mai dien tu": "E-Commerce",
  "tai chinh ngan hang": "Finance and Banking",
  "ke toan": "Accounting",
  "kiem toan": "Auditing",
  "kinh te": "Economics",
  "marketing": "Marketing",
  "quan tri nhan luc": "Human Resource Management",
  "logistics va quan ly chuoi cung ung": "Logistics and Supply Chain Management"
};

const PHRASE_TRANSLATIONS: Array<[string, string]> = [
  ["tri tue nhan tao", "artificial intelligence"],
  ["khoa hoc du lieu", "data science"],
  ["khoa hoc may tinh", "computer science"],
  ["an toan thong tin", "information security"],
  ["cong nghe thong tin", "information technology"],
  ["thuong mai dien tu", "e-commerce"],
  ["quan tri kinh doanh", "business administration"],
  ["kinh doanh quoc te", "international business"],
  ["tai chinh ngan hang", "finance and banking"],
  ["quan tri nhan luc", "human resource management"],
  ["quan ly", "management"],
  ["ky thuat", "engineering"],
  ["cong nghe", "technology"],
  ["khoa hoc", "science"],
  ["he thong", "systems"],
  ["du lieu", "data"],
  ["may tinh", "computer"],
  ["phan mem", "software"],
  ["mang", "network"],
  ["truyen thong", "communications"],
  ["kinh te", "economics"],
  ["ngan hang", "banking"],
  ["ke toan", "accounting"],
  ["kiem toan", "auditing"],
  ["dau tu", "investment"],
  ["tai chinh", "finance"],
  ["du lich", "tourism"],
  ["khach san", "hospitality"],
  ["nha hang", "restaurant"],
  ["xay dung", "construction"],
  ["kien truc", "architecture"],
  ["moi truong", "environment"],
  ["tai nguyen", "resources"],
  ["dia chat", "geology"],
  ["dia ly", "geography"],
  ["nong nghiep", "agriculture"],
  ["lam nghiep", "forestry"],
  ["thuy san", "fisheries"],
  ["y hoc", "medicine"],
  ["duoc", "pharmacy"],
  ["dieu duong", "nursing"],
  ["tam ly", "psychology"],
  ["ngon ngu anh", "english language"],
  ["ngon ngu trung", "chinese language"],
  ["ngon ngu", "language"],
  ["luat", "law"],
  ["su pham", "education"]
];

function translateVietnameseMajorName(source: string): string {
  const normalized = normalizeVietnamese(source).replace(/^nganh\s+/, "");

  if (!normalized) {
    return "";
  }

  const exact = EXACT_MAJOR_TRANSLATIONS[normalized];
  if (exact) {
    return exact;
  }

  let translated = ` ${normalized} `;

  for (const [vi, en] of PHRASE_TRANSLATIONS) {
    const pattern = new RegExp(`\\b${vi.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}\\b`, "g");
    translated = translated.replace(pattern, en);
  }

  translated = translated
    .replace(/\b(nganh|va|cua|cho|theo|he|dao tao)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return titleCase(translated);
}

export default function GroupCatalogExplorer({
  roadmap,
  initialGroupId,
  initialMajorId
}: GroupCatalogExplorerProps) {
  const [language, setLanguage] = useState<SupportedLanguage>("vi");

  const groups = useMemo(
    () => [...(roadmap.groupCatalog ?? [])].sort((a, b) => a.order - b.order),
    [roadmap.groupCatalog]
  );

  const [selectedGroupId, setSelectedGroupId] = useState<string>(initialGroupId ?? groups[0]?.id ?? "");
  const [selectedMajorId, setSelectedMajorId] = useState<string>(initialMajorId ?? "");

  useEffect(() => {
    if (initialGroupId && groups.some((group) => group.id === initialGroupId)) {
      setSelectedGroupId(initialGroupId);
    }
  }, [groups, initialGroupId]);

  useEffect(() => {
    if (initialMajorId) {
      setSelectedMajorId(initialMajorId);
    }
  }, [initialMajorId]);

  const selectedGroup = groups.find((group) => group.id === selectedGroupId) ?? null;

  const catalogMajors = useMemo(() => selectedGroup?.majors ?? [], [selectedGroup]);
  const selectedCatalogMajor = catalogMajors.find((major) => major.id === selectedMajorId) ?? null;

  useEffect(() => {
    if (catalogMajors.length === 0) {
      setSelectedMajorId("");
      return;
    }

    if (!catalogMajors.some((major) => major.id === selectedMajorId)) {
      setSelectedMajorId(catalogMajors[0].id);
    }
  }, [catalogMajors, selectedMajorId]);

  const localizedRoadmapTitle = pickLocalizedText(roadmap.title, roadmap.titleI18n, language);
  const localizedRoadmapDescription = pickLocalizedText(
    roadmap.description ?? "",
    roadmap.descriptionI18n,
    language
  );

  const localizedGroupTitle = selectedGroup
    ? pickLocalizedText(selectedGroup.title, selectedGroup.titleI18n, language)
    : "";

  const localizedFocus = selectedGroup
    ? pickLocalizedText("", selectedGroup.academicFocusI18n, language)
    : "";

  const localizedWorkTypes = selectedGroup
    ? pickLocalizedArray([], selectedGroup.workTypesI18n, language)
    : [];

  const localizedOutcomeJobs = selectedGroup
    ? pickLocalizedArray([], selectedGroup.outcomeJobsI18n, language)
    : [];

  const localizedPortalMajors = selectedGroup
    ? pickLocalizedArray([], selectedGroup.portalMajorsI18n, language)
    : [];

  const localizedMajorCareers = selectedCatalogMajor
    ? pickLocalizedArray([], selectedCatalogMajor.jobsI18n, language)
    : [];

  const localizedMajorCareerSection = selectedCatalogMajor
    ? pickLocalizedText("", selectedCatalogMajor.careerSectionI18n, language).trim()
    : "";

  const getMajorLabel = (
    major: NonNullable<NonNullable<Roadmap["groupCatalog"]>[number]["majors"]>[number]
  ): string => {
    const localizedLabel = pickLocalizedText("", major.nameI18n, language).trim();

    if (language !== "en") {
      return localizedLabel || major.id;
    }

    if (localizedLabel && !hasVietnameseDiacritics(localizedLabel) && !looksLikeVietnameseRomanized(localizedLabel)) {
      return localizedLabel;
    }

    const vietnameseLabel = pickLocalizedText("", major.nameI18n, "vi").trim();
    const translatedFromVi = translateVietnameseMajorName(vietnameseLabel);

    if (translatedFromVi) {
      return translatedFromVi;
    }

    const slugFromSource = major.sourceUrl?.match(/\/nganh-[^/]+\.html$/)?.[0] ?? "";
    const normalizedSlug = slugFromSource.replace(/^\//, "").replace(/\.html$/, "");

    if (normalizedSlug) {
      return translateVietnameseMajorName(normalizedSlug);
    }

    return translateVietnameseMajorName(major.id) || major.id;
  };

  return (
    <main className="min-h-screen bg-canvas text-text">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <header className="mb-6 rounded-lg border border-line bg-panel p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">{getUiText("groupCatalogPage", language)}</h1>
              <p className="mt-1 text-sm text-muted">{localizedRoadmapTitle}</p>
              <p className="mt-1 text-sm text-muted">{localizedRoadmapDescription}</p>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="group-language" className="text-sm text-muted">
                {getUiText("language", language)}
              </label>
              <select
                id="group-language"
                value={language}
                onChange={(event) => setLanguage(event.target.value as SupportedLanguage)}
                className="rounded-md border border-line bg-canvas px-3 py-1.5 text-sm"
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </select>
              {/* <Link
                href="/roadmap-graph"
                className="rounded-md border border-line px-3 py-1.5 text-sm transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {language === "vi" ? "Xem Roadmap Graph" : "Open Roadmap Graph"}
              </Link> */}
            </div>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-lg border border-line bg-panel p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              {getUiText("sections", language)}
            </p>
            <ul className="space-y-1.5">
              {groups.map((group) => {
                const title = pickLocalizedText(group.title, group.titleI18n, language);
                return (
                  <li key={group.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedGroupId(group.id);
                        setSelectedMajorId("");
                      }}
                      className={`w-full rounded-md border px-3 py-2 text-left text-sm transition ${
                        selectedGroupId === group.id
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-line hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {group.order}. {title}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 rounded-md border border-line bg-canvas/50 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                {getUiText("sourceReferences", language)}
              </p>
              <ul className="space-y-2 text-sm">
                {(roadmap.sourceReferences ?? []).map((source) => (
                  <li key={source.id}>
                    <p className="font-medium text-text">{source.name}</p>
                    <p className="text-muted">
                      {pickLocalizedText(source.description ?? "", source.descriptionI18n, language)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="space-y-4">
            <article className="rounded-lg border border-line bg-panel p-4">
              <h2 className="text-xl font-semibold">{localizedGroupTitle}</h2>
              <p className="mt-2 text-sm text-muted">{localizedFocus}</p>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    {getUiText("workTypes", language)}
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-sm">
                    {localizedWorkTypes.map((item) => (
                      <li key={`work-${item}`}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    {getUiText("outcomeJobs", language)}
                  </p>
                  <ul className="list-disc space-y-1 pl-5 text-sm">
                    {localizedOutcomeJobs.map((item) => (
                      <li key={`outcome-${item}`}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                  {getUiText("portalSampleMajors", language)}
                </p>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  {localizedPortalMajors.map((item) => (
                    <li key={`portal-${item}`}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="rounded-lg border border-line bg-panel p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                {getUiText("majorList", language)}
              </p>
              <div className="grid gap-4 md:grid-cols-[260px_minmax(0,1fr)]">
                <ul className="max-h-[360px] space-y-1 overflow-y-auto pr-1">
                  {catalogMajors.map((major) => {
                    const majorLabel = getMajorLabel(major);
                    return (
                      <li key={major.id}>
                        <button
                          type="button"
                          onClick={() => setSelectedMajorId(major.id)}
                          className={`w-full rounded-md border px-2.5 py-2 text-left text-sm transition ${
                            selectedMajorId === major.id
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-line hover:bg-slate-100 dark:hover:bg-slate-800"
                          }`}
                        >
                          {majorLabel}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="rounded-md border border-line bg-canvas/40 p-3">
                  {selectedCatalogMajor ? (
                    <>
                      <h3 className="text-lg font-semibold">
                        {getMajorLabel(selectedCatalogMajor)}
                      </h3>

                      <p className="mt-4 mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                        {getUiText("majorCareers", language)}
                      </p>
                      <ul className="list-disc space-y-1 pl-5 text-sm">
                        {(localizedMajorCareers.length > 0 ? localizedMajorCareers : localizedOutcomeJobs).map((career) => (
                          <li key={`career-${career}`}>{career}</li>
                        ))}
                      </ul>

                      {localizedMajorCareers.length === 0 ? (
                        <p className="mt-2 text-sm text-muted">{getUiText("jobsFromGroupFallback", language)}</p>
                      ) : null}

                      <p className="mt-4 mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                        {getUiText("careerSection", language)}
                      </p>
                      {localizedMajorCareerSection ? (
                        <p className="whitespace-pre-line text-sm text-muted">
                          {localizedMajorCareerSection}
                        </p>
                      ) : (
                        <p className="text-sm text-muted">{getUiText("careerSectionUnavailable", language)}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-muted">{getUiText("selectMajorHint", language)}</p>
                  )}
                </div>
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useMemo } from "react";

import { getUiText } from "@/lib/localization";
import { useRoadmapContext } from "@/lib/roadmapContext";
import { SupportedLanguage } from "@/types/roadmap";

export default function Sidebar() {
  const {
    roadmapData,
    selectedLanguage,
    setSelectedLanguage,
    activeSectionId,
    setActiveSectionId,
    setSelectedNodeId,
    isDarkMode,
    setIsDarkMode,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen
  } = useRoadmapContext();

  const languageOptions: { id: SupportedLanguage; label: string }[] = [
    { id: "en", label: "English" },
    { id: "vi", label: "Tiếng Việt" }
  ];

  const sectionItems = useMemo(() => roadmapData?.sections ?? [], [roadmapData]);
  const activeSection = useMemo(
    () => sectionItems.find((section) => section.id === activeSectionId) ?? null,
    [activeSectionId, sectionItems]
  );

  const goToSection = (sectionId: string) => {
    setActiveSectionId(sectionId);

    const firstNodeInSection = roadmapData?.nodes.find((node) => node.section === sectionId);
    setSelectedNodeId(firstNodeInSection?.id ?? null);
    setIsMobileSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-30 h-full w-[260px] border-r border-line bg-panel px-4 py-5 transition-transform duration-300 lg:static lg:translate-x-0 ${
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Roadmap sidebar"
    >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-text">{roadmapData?.title ?? "Roadmap"}</h1>
        <button
          type="button"
          onClick={() => setIsDarkMode((prev) => !prev)}
          className="rounded-md border border-line px-3 py-1.5 text-xs font-medium text-text transition hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? getUiText("light", selectedLanguage) : getUiText("dark", selectedLanguage)}
        </button>
      </div>

      <label htmlFor="language-select" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted">
        {getUiText("language", selectedLanguage)}
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={(event) => setSelectedLanguage(event.target.value as SupportedLanguage)}
        className="mb-4 w-full rounded-md border border-line bg-canvas px-3 py-2 text-sm text-text outline-none transition focus:border-accent"
      >
        {languageOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>

      <Link
        href="/tra-cuu-nhom-nganh"
        className="mb-4 block rounded-md border border-line px-3 py-2 text-center text-sm font-medium text-text transition hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        {getUiText("openGroupCatalog", selectedLanguage)}
      </Link>

      <p className="mb-4 text-sm text-muted">{roadmapData?.description ?? "Select a major to explore career paths."}</p>

      <nav aria-label="Roadmap sections">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{getUiText("sections", selectedLanguage)}</p>
        {sectionItems.length > 0 ? (
          <ul className="space-y-1">
            {sectionItems.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => goToSection(section.id)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                    activeSectionId === section.id
                      ? "bg-accent/15 text-accent"
                      : "text-text hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">{getUiText("datasetWithoutSections", selectedLanguage)}</p>
        )}
      </nav>

      <section className="mt-4 rounded-md border border-line bg-canvas/50 p-3">
        {activeSection ? (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{getUiText("groupFocus", selectedLanguage)}</p>
              <p className="mt-1 text-sm text-text">{activeSection.academicFocus}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{getUiText("workTypes", selectedLanguage)}</p>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-text">
                {(activeSection.workTypes ?? []).map((item) => (
                  <li key={`work-type-${item}`}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{getUiText("outcomeJobs", selectedLanguage)}</p>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-sm text-text">
                {(activeSection.outcomeJobs ?? []).map((item) => (
                  <li key={`outcome-job-${item}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted">{getUiText("chooseSectionHint", selectedLanguage)}</p>
        )}
      </section>
    </aside>
  );
}

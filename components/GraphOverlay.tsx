"use client";

import { getSectionColor } from "@/lib/graphUtils";
import { getUiText } from "@/lib/localization";
import { GraphLayoutMode } from "@/lib/layout";
import { SupportedLanguage } from "@/types/roadmap";

type SectionItem = {
  id: string;
  title: string;
};

type GraphOverlayProps = {
  viewMode: GraphLayoutMode;
  onChangeViewMode: (mode: GraphLayoutMode) => void;
  sections: SectionItem[];
  collapsedSectionIds: string[];
  onToggleSectionCollapse: (sectionId: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  language: SupportedLanguage;
};

export default function GraphOverlay({
  viewMode,
  onChangeViewMode,
  sections,
  collapsedSectionIds,
  onToggleSectionCollapse,
  onExpandAll,
  onCollapseAll,
  language
}: GraphOverlayProps) {
  return (
    <>
      <aside className="absolute right-4 top-4 z-20 w-72 rounded-lg border border-line bg-panel/95 p-3 shadow-sm backdrop-blur">
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{getUiText("viewMode", language)}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChangeViewMode("category")}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                viewMode === "category"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-line text-text hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {getUiText("viewByCategory", language)}
            </button>
            <button
              type="button"
              onClick={() => onChangeViewMode("learning-flow")}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                viewMode === "learning-flow"
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-line text-text hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {getUiText("learningFlow", language)}
            </button>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">{getUiText("clusters", language)}</p>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={onExpandAll}
                className="rounded border border-line px-2 py-1 text-[11px] text-text transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {getUiText("expandAll", language)}
              </button>
              <button
                type="button"
                onClick={onCollapseAll}
                className="rounded border border-line px-2 py-1 text-[11px] text-text transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {getUiText("collapseAll", language)}
              </button>
            </div>
          </div>
          <ul className="max-h-48 space-y-1 overflow-y-auto pr-1">
            {sections.map((section) => {
              const collapsed = collapsedSectionIds.includes(section.id);

              return (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => onToggleSectionCollapse(section.id)}
                    className="flex w-full items-center justify-between rounded-md border border-line px-2.5 py-1.5 text-left text-xs text-text transition hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: getSectionColor(section.id) }}
                      />
                      {section.title}
                    </span>
                    <span className="text-muted">{collapsed ? getUiText("expand", language) : getUiText("collapse", language)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <aside className="absolute bottom-4 left-4 z-20 w-64 rounded-lg border border-line bg-panel/95 p-3 shadow-sm backdrop-blur">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{getUiText("categoryLegend", language)}</p>
        <ul className="space-y-1.5 text-xs text-text">
          {sections.map((section) => (
            <li key={`legend-${section.id}`} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: getSectionColor(section.id) }} />
              <span>{section.title}</span>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}

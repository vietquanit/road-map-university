"use client";

import { getUiText } from "@/lib/localization";
import { useRoadmapContext } from "@/lib/roadmapContext";

export default function NodeDetailsPanel() {
  const { roadmapData, selectedNodeId, setSelectedNodeId, selectedLanguage } = useRoadmapContext();

  const selectedNode = roadmapData?.nodes.find((node) => node.id === selectedNodeId) ?? null;
  const careers = selectedNode
    ? selectedNode.careers ?? selectedNode.resources?.map((resource) => resource.title) ?? []
    : [];

  const panelBody = selectedNode ? (
    <div className="space-y-4">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-text">{selectedNode.label}</h2>
        <p className="text-sm leading-6 text-muted">{selectedNode.description}</p>
      </header>

      <section>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">{getUiText("careerCount", selectedLanguage)}</h3>
        <p className="text-sm text-text">{careers.length}</p>
      </section>

      <section>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">{getUiText("careers", selectedLanguage)}</h3>
        {careers.length > 0 ? (
          <ul className="list-disc space-y-1 pl-5 text-sm text-text">
            {careers.map((career) => (
              <li key={career}>{career}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted">{getUiText("noCareers", selectedLanguage)}</p>
        )}
      </section>
    </div>
  ) : (
    <div className="rounded-md border border-dashed border-line p-4 text-sm text-muted">
      {getUiText("selectMajorPrompt", selectedLanguage)}
    </div>
  );

  return (
    <>
      <aside className="hidden h-full w-[320px] border-l border-line bg-panel p-4 lg:block">{panelBody}</aside>
      {selectedNode ? (
        <div className="fixed inset-0 z-40 flex items-end bg-black/40 p-4 lg:hidden">
          <div className="max-h-[80vh] w-full rounded-t-xl border border-line bg-panel p-4 shadow-xl animate-[slide-up_240ms_ease-out]">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedNodeId(null)}
                className="rounded-md border border-line px-3 py-1 text-sm text-text transition hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {getUiText("close", selectedLanguage)}
              </button>
            </div>
            <div className="overflow-y-auto">{panelBody}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

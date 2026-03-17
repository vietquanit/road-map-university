"use client";

import NodeDetailsPanel from "@/components/NodeDetailsPanel";
import RoadmapGraph from "@/components/RoadmapGraph";
import Sidebar from "@/components/Sidebar";
import { useRoadmapContext } from "@/lib/roadmapContext";

export default function RoadmapShell() {
  const { isMobileSidebarOpen, setIsMobileSidebarOpen, isDarkMode } = useRoadmapContext();

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="relative h-screen w-full overflow-hidden bg-canvas text-text">
        <button
          type="button"
          onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
          className="absolute left-4 top-4 z-40 rounded-md border border-line bg-panel px-3 py-2 text-sm font-medium text-text shadow-sm transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          aria-expanded={isMobileSidebarOpen}
          aria-controls="mobile-sidebar"
        >
          Menu
        </button>

        {isMobileSidebarOpen ? (
          <button
            type="button"
            aria-label="Close sidebar overlay"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          />
        ) : null}

        <div className="flex h-full">
          <div id="mobile-sidebar">
            <Sidebar />
          </div>
          <main className="relative h-full flex-1 border-x border-line">
            <RoadmapGraph />
          </main>
          <NodeDetailsPanel />
        </div>
      </div>
    </div>
  );
}

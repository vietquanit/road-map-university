"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState
} from "react";

import { Roadmap, RoadmapKey, SupportedLanguage } from "@/types/roadmap";

type RoadmapContextValue = {
  selectedRoadmap: RoadmapKey;
  setSelectedRoadmap: Dispatch<SetStateAction<RoadmapKey>>;
  roadmapData: Roadmap | null;
  setRoadmapData: Dispatch<SetStateAction<Roadmap | null>>;
  selectedLanguage: SupportedLanguage;
  setSelectedLanguage: Dispatch<SetStateAction<SupportedLanguage>>;
  selectedNodeId: string | null;
  setSelectedNodeId: Dispatch<SetStateAction<string | null>>;
  activeSectionId: string | null;
  setActiveSectionId: Dispatch<SetStateAction<string | null>>;
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const RoadmapContext = createContext<RoadmapContextValue | null>(null);

export function RoadmapProvider({ children }: { children: ReactNode }) {
  const [selectedRoadmap, setSelectedRoadmap] = useState<RoadmapKey>("vietnam-career-map");
  const [roadmapData, setRoadmapData] = useState<Roadmap | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>("en");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const value = useMemo(
    () => ({
      selectedRoadmap,
      setSelectedRoadmap,
      roadmapData,
      setRoadmapData,
      selectedLanguage,
      setSelectedLanguage,
      selectedNodeId,
      setSelectedNodeId,
      activeSectionId,
      setActiveSectionId,
      isDarkMode,
      setIsDarkMode,
      isMobileSidebarOpen,
      setIsMobileSidebarOpen
    }),
    [
      activeSectionId,
      isDarkMode,
      isMobileSidebarOpen,
      roadmapData,
      selectedLanguage,
      selectedNodeId,
      selectedRoadmap
    ]
  );

  return <RoadmapContext.Provider value={value}>{children}</RoadmapContext.Provider>;
}

export function useRoadmapContext(): RoadmapContextValue {
  const context = useContext(RoadmapContext);

  if (!context) {
    throw new Error("useRoadmapContext must be used inside a RoadmapProvider");
  }

  return context;
}

import { Roadmap, RoadmapKey } from "@/types/roadmap";

const roadmapImporters: Record<RoadmapKey, () => Promise<Roadmap>> = {
  frontend: async () => (await import("@/data/frontend.json")).default,
  backend: async () => (await import("@/data/backend.json")).default,
  devops: async () => (await import("@/data/devops.json")).default,
  fullstack: async () => (await import("@/data/fullstack.json")).default,
  "vietnam-career-map": async () => (await import("@/data/vietnam-career-map.json")).default
};

export async function loadRoadmap(roadmapKey: RoadmapKey): Promise<Roadmap> {
  const importer = roadmapImporters[roadmapKey];
  return importer();
}

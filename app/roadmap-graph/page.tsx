import type { Metadata } from "next";

import RoadmapShell from "@/components/RoadmapShell";
import { RoadmapProvider } from "@/lib/roadmapContext";

export const metadata: Metadata = {
  title: "Roadmap Graph",
  description:
    "Do thi roadmap tuong tac cho tra cuu nhom nganh, chuyen nganh va huong nghe nghiep theo du lieu Vietnam Career Orientation Map.",
  alternates: {
    canonical: "/roadmap-graph"
  },
  openGraph: {
    url: "/roadmap-graph",
    title: "Roadmap Graph",
    description:
      "Do thi roadmap tuong tac cho tra cuu nhom nganh, chuyen nganh va huong nghe nghiep theo du lieu Vietnam Career Orientation Map."
  }
};

export default function RoadmapGraphPage() {
  return (
    <RoadmapProvider>
      <RoadmapShell />
    </RoadmapProvider>
  );
}

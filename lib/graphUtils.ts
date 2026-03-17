import { Edge, MarkerType, Node } from "reactflow";

import { Roadmap, RoadmapEdge, RoadmapNode } from "@/types/roadmap";

export type FlowNodeData = {
  label: string;
  description: string;
  resources: { title: string; url: string }[];
  careers: string[];
  section: string;
  sectionTitle: string;
};

const sectionPalette: Record<string, string> = {
  technology: "rgb(37 99 235)",
  business: "rgb(6 95 70)",
  finance: "rgb(124 58 237)",
  design: "rgb(190 24 93)",
  engineering: "rgb(217 119 6)",
  healthcare: "rgb(220 38 38)",
  professional: "rgb(79 70 229)",
  "education-language": "rgb(8 145 178)",
  general: "rgb(100 116 139)"
};

export function getSectionColor(sectionId: string): string {
  return sectionPalette[sectionId] ?? sectionPalette.general;
}

export function formatSectionLabel(sectionId: string): string {
  return sectionId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function validateRoadmap(roadmap: Roadmap): void {
  const nodeIds = new Set<string>();

  roadmap.nodes.forEach((node) => {
    if (nodeIds.has(node.id)) {
      throw new Error(`Duplicate node id found: ${node.id}`);
    }
    nodeIds.add(node.id);
  });

  roadmap.edges.forEach((edge) => {
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
      throw new Error(`Invalid edge from ${edge.source} to ${edge.target}`);
    }
  });

  if (hasCircularDependency(roadmap.nodes, roadmap.edges)) {
    throw new Error("Circular dependency detected in roadmap");
  }
}

function hasCircularDependency(nodes: RoadmapNode[], edges: RoadmapEdge[]): boolean {
  const adjacencyList = new Map<string, string[]>();
  const visited = new Set<string>();
  const inProgress = new Set<string>();

  nodes.forEach((node) => adjacencyList.set(node.id, []));
  edges.forEach((edge) => adjacencyList.get(edge.source)?.push(edge.target));

  const dfs = (nodeId: string): boolean => {
    if (inProgress.has(nodeId)) {
      return true;
    }
    if (visited.has(nodeId)) {
      return false;
    }

    visited.add(nodeId);
    inProgress.add(nodeId);

    for (const neighbor of adjacencyList.get(nodeId) ?? []) {
      if (dfs(neighbor)) {
        return true;
      }
    }

    inProgress.delete(nodeId);
    return false;
  };

  return nodes.some((node) => dfs(node.id));
}

export function toFlowNodes(
  nodes: RoadmapNode[],
  sectionTitlesById?: Record<string, string>
): Node<FlowNodeData>[] {
  return nodes.map((node) => ({
    id: node.id,
    type: "custom",
    data: {
      label: node.label,
      description: node.description,
      resources: node.resources ?? [],
      careers: node.careers ?? [],
      section: node.section ?? "general",
      sectionTitle: sectionTitlesById?.[node.section ?? "general"] ?? formatSectionLabel(node.section ?? "general")
    },
    position: { x: 0, y: 0 }
  }));
}

export function toFlowEdges(edges: RoadmapEdge[]): Edge[] {
  return edges.map((edge, index) => ({
    id: `${edge.source}-${edge.target}-${index}`,
    source: edge.source,
    target: edge.target,
    type: "smoothstep",
    pathOptions: { borderRadius: 10 },
    animated: false,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 16,
      height: 16,
      color: "rgb(121 130 144)"
    },
    style: {
      stroke: "rgb(121 130 144)",
      strokeWidth: 1.6
    }
  }));
}

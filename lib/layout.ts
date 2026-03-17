import ELK, { ElkNode } from "elkjs/lib/elk.bundled.js";
import { Node } from "reactflow";

import { FlowNodeData } from "@/lib/graphUtils";
import { RoadmapEdge } from "@/types/roadmap";

const elk = new ELK();

const layoutOptions = {
  "elk.algorithm": "layered",
  "elk.direction": "DOWN",
  "elk.layered.spacing.nodeNodeBetweenLayers": "110",
  "elk.spacing.nodeNode": "72",
  "elk.layered.crossingMinimization.strategy": "LAYER_SWEEP",
  "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
  "elk.edgeRouting": "SPLINES"
};

const NODE_WIDTH = 210;
const NODE_HEIGHT = 72;
const SECTION_GAP_X = 220;

export type GraphLayoutMode = "category" | "learning-flow";

async function runElkLayout(
  nodes: Node<FlowNodeData>[],
  edges: RoadmapEdge[]
): Promise<Map<string, { x: number; y: number }>> {
  const graph: ElkNode = {
    id: "root",
    layoutOptions,
    children: nodes.map((node) => ({
      id: node.id,
      width: NODE_WIDTH,
      height: NODE_HEIGHT
    })),
    edges: edges.map((edge, index) => ({
      id: `${edge.source}-${edge.target}-${index}`,
      sources: [edge.source],
      targets: [edge.target]
    }))
  };

  const layoutResult = await elk.layout(graph);
  const positions = new Map<string, { x: number; y: number }>();

  (layoutResult.children ?? []).forEach((child) => {
    positions.set(child.id, {
      x: child.x ?? 0,
      y: child.y ?? 0
    });
  });

  return positions;
}

export async function generateLayout(
  nodes: Node<FlowNodeData>[],
  edges: RoadmapEdge[],
  mode: GraphLayoutMode
): Promise<Node<FlowNodeData>[]> {
  if (mode === "learning-flow") {
    const singleLayout = await runElkLayout(nodes, edges);

    return nodes.map((node) => ({
      ...node,
      position: singleLayout.get(node.id) ?? { x: 0, y: 0 },
      width: NODE_WIDTH,
      height: NODE_HEIGHT
    }));
  }

  const hasSections = nodes.some((node) => node.data.section && node.data.section !== "general");

  if (!hasSections) {
    const singleLayout = await runElkLayout(nodes, edges);

    return nodes.map((node) => ({
      ...node,
      position: singleLayout.get(node.id) ?? { x: 0, y: 0 },
      width: NODE_WIDTH,
      height: NODE_HEIGHT
    }));
  }

  const sectionOrder = Array.from(new Set(nodes.map((node) => node.data.section)));
  const positionedNodes = new Map<string, { x: number; y: number }>();
  let sectionOffsetX = 0;

  for (const sectionId of sectionOrder) {
    const sectionNodes = nodes.filter((node) => node.data.section === sectionId);
    const sectionNodeIds = new Set(sectionNodes.map((node) => node.id));
    const sectionEdges = edges.filter(
      (edge) => sectionNodeIds.has(edge.source) && sectionNodeIds.has(edge.target)
    );

    const sectionLayout = await runElkLayout(sectionNodes, sectionEdges);
    const sectionPositions = sectionNodes.map((node) => sectionLayout.get(node.id) ?? { x: 0, y: 0 });
    const minX = Math.min(...sectionPositions.map((position) => position.x));
    const maxX = Math.max(...sectionPositions.map((position) => position.x));

    sectionNodes.forEach((node) => {
      const laidOutNode = sectionLayout.get(node.id) ?? { x: 0, y: 0 };
      positionedNodes.set(node.id, {
        x: laidOutNode.x - minX + sectionOffsetX,
        y: laidOutNode.y
      });
    });

    sectionOffsetX += maxX - minX + NODE_WIDTH + SECTION_GAP_X;
  }

  return nodes.map((node) => {
    const laidOutNode = positionedNodes.get(node.id);

    return {
      ...node,
      position: {
        x: laidOutNode?.x ?? 0,
        y: laidOutNode?.y ?? 0
      },
      width: NODE_WIDTH,
      height: NODE_HEIGHT
    };
  });
}

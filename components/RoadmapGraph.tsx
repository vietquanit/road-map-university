"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeTypes,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow
} from "reactflow";

import {
  FlowNodeData,
  formatSectionLabel,
  getSectionColor,
  toFlowEdges,
  toFlowNodes,
  validateRoadmap
} from "@/lib/graphUtils";
import { localizeRoadmap } from "@/lib/localization";
import { GraphLayoutMode, generateLayout } from "@/lib/layout";
import { useRoadmapContext } from "@/lib/roadmapContext";
import { loadRoadmap } from "@/lib/roadmapLoader";
import CustomNode from "@/components/CustomNode";
import GraphOverlay from "@/components/GraphOverlay";

import "reactflow/dist/style.css";

function GraphContent() {
  const {
    selectedRoadmap,
    selectedLanguage,
    roadmapData,
    setRoadmapData,
    selectedNodeId,
    setSelectedNodeId,
    activeSectionId,
    setActiveSectionId
  } = useRoadmapContext();
  const reactFlow = useReactFlow();

  const [flowNodes, setFlowNodes] = useState<Node<FlowNodeData>[]>([]);
  const [flowEdges, setFlowEdges] = useState<Edge[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<GraphLayoutMode>("category");
  const [collapsedSectionIds, setCollapsedSectionIds] = useState<string[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const loadedRoadmap = await loadRoadmap(selectedRoadmap);
        validateRoadmap(loadedRoadmap);
        const localizedRoadmap = localizeRoadmap(loadedRoadmap, selectedLanguage);
        setErrorMessage(null);
        setRoadmapData(localizedRoadmap);
        setCollapsedSectionIds([]);
        setSelectedNodeId(null);
        setActiveSectionId(null);
      } catch (error) {
        const typedError = error instanceof Error ? error.message : "Unknown roadmap error";
        setErrorMessage(typedError);
      }
    };

    run();
  }, [selectedLanguage, selectedRoadmap, setActiveSectionId, setRoadmapData, setSelectedNodeId]);

  const sections = useMemo(() => {
    const datasetSections = roadmapData?.sections ?? [];

    if (datasetSections.length > 0) {
      return datasetSections;
    }

    const sectionIds = Array.from(new Set((roadmapData?.nodes ?? []).map((node) => node.section ?? "general")));
    return sectionIds.map((sectionId) => ({
      id: sectionId,
      title: formatSectionLabel(sectionId)
    }));
  }, [roadmapData]);

  useEffect(() => {
    if (!roadmapData) {
      return;
    }

    const run = async () => {
      const sectionTitlesById = Object.fromEntries(
        (roadmapData.sections ?? []).map((section) => [section.id, section.title])
      );
      const nodes = toFlowNodes(roadmapData.nodes, sectionTitlesById);
      const visibleNodes = nodes.filter((node) => !collapsedSectionIds.includes(node.data.section));
      const visibleNodeIds = new Set(visibleNodes.map((node) => node.id));
      const visibleRoadmapEdges = roadmapData.edges.filter(
        (edge) => visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
      );

      if (selectedNodeId && !visibleNodeIds.has(selectedNodeId)) {
        setSelectedNodeId(null);
      }

      if (visibleNodes.length === 0) {
        setFlowNodes([]);
        setFlowEdges([]);
        return;
      }

      const edges = toFlowEdges(visibleRoadmapEdges);
      const laidOutNodes = await generateLayout(visibleNodes, visibleRoadmapEdges, viewMode);

      setFlowNodes(laidOutNodes);
      setFlowEdges(edges);

      requestAnimationFrame(() => {
        reactFlow.fitView({ padding: 0.25, duration: 420 });
      });
    };

    run();
  }, [collapsedSectionIds, reactFlow, roadmapData, selectedNodeId, setSelectedNodeId, viewMode]);

  const selectNode = useCallback(
    (nodeId: string) => {
      setSelectedNodeId(nodeId);

      const sectionId = roadmapData?.nodes.find((node) => node.id === nodeId)?.section ?? null;
      setActiveSectionId(sectionId);
    },
    [roadmapData, setActiveSectionId, setSelectedNodeId]
  );

  const nodeTypes = useMemo<NodeTypes>(
    () => ({
      custom: (props) => (
        <CustomNode
          {...props}
          isSelected={selectedNodeId === props.id}
          onSelect={selectNode}
        />
      )
    }),
    [selectNode, selectedNodeId]
  );

  const toggleSectionCollapse = useCallback((sectionId: string) => {
    setCollapsedSectionIds((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  }, []);

  const collapseAll = useCallback(() => {
    setCollapsedSectionIds(sections.map((section) => section.id));
  }, [sections]);

  const expandAll = useCallback(() => {
    setCollapsedSectionIds([]);
  }, []);

  useEffect(() => {
    if (!activeSectionId) {
      return;
    }

    const sectionNodeIds = roadmapData?.nodes
      .filter((node) => node.section === activeSectionId)
      .map((node) => node.id);

    const visibleNodes = flowNodes.filter((node) => sectionNodeIds?.includes(node.id));

    if (visibleNodes.length > 0) {
      reactFlow.fitView({
        nodes: visibleNodes,
        padding: 0.35,
        duration: 360
      });
    }
  }, [activeSectionId, flowNodes, reactFlow, roadmapData]);

  if (errorMessage) {
    return <div className="p-6 text-sm text-red-600 dark:text-red-400">{errorMessage}</div>;
  }

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.35}
        maxZoom={1.75}
        panOnDrag
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick
        className="bg-canvas"
        proOptions={{ hideAttribution: true }}
        aria-label="Roadmap graph"
      >
        <MiniMap
          pannable
          zoomable
          className="!bg-panel"
          nodeStrokeWidth={3}
          nodeColor={(node) => {
            const sectionId = (node.data as FlowNodeData | undefined)?.section ?? "general";
            return node.id === selectedNodeId ? "rgb(37 99 235)" : getSectionColor(sectionId);
          }}
        />
        <Controls showInteractive={false} />
        <Background
          variant={BackgroundVariant.Lines}
          gap={28}
          size={0.9}
          color="rgb(186 194 204)"
        />
      </ReactFlow>

      <GraphOverlay
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        sections={sections}
        collapsedSectionIds={collapsedSectionIds}
        onToggleSectionCollapse={toggleSectionCollapse}
        onExpandAll={expandAll}
        onCollapseAll={collapseAll}
        language={selectedLanguage}
      />
    </div>
  );
}

export default function RoadmapGraph() {
  return (
    <ReactFlowProvider>
      <div className="h-full w-full">
        <GraphContent />
      </div>
    </ReactFlowProvider>
  );
}

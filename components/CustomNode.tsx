"use client";

import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

import { FlowNodeData, getSectionColor } from "@/lib/graphUtils";

type CustomNodeProps = NodeProps<FlowNodeData> & {
  isSelected: boolean;
  onSelect: (nodeId: string) => void;
};

function CustomNodeComponent({ id, data, isSelected, onSelect }: CustomNodeProps) {
  const sectionColor = getSectionColor(data.section);

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`min-w-[180px] rounded-lg border-2 bg-panel px-4 py-3 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${
        isSelected ? "ring-2 ring-accent/30" : ""
      }`}
      style={{ borderColor: isSelected ? "rgb(var(--accent))" : sectionColor }}
      aria-label={`Open ${data.label} details`}
    >
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !border-0 !bg-line" />
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide" style={{ color: sectionColor }}>
        {data.sectionTitle}
      </p>
      <p className="text-sm font-semibold text-text">{data.label}</p>
      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !border-0 !bg-line" />
    </button>
  );
}

const CustomNode = memo(CustomNodeComponent);

export default CustomNode;

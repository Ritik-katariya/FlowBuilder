
import { Node, Edge } from '@xyflow/react';

export interface TextNodeData extends Record<string, unknown> {
  label: string;
  message: string;
}

export interface FlowNode extends Node<TextNodeData> {
  type: string;
}

export interface FlowEdge extends Edge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface FlowState {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedNode: FlowNode | null;
  setNodes: (nodes: FlowNode[]) => void;
  setEdges: (edges: FlowEdge[]) => void;
  setSelectedNode: (node: FlowNode | null) => void;
  updateNode: (nodeId: string, data: Partial<TextNodeData>) => void;
  addNode: (node: FlowNode) => void;
}

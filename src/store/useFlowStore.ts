
import { create } from 'zustand';
import { FlowState, FlowNode, FlowEdge } from '../types';

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNode: (node) => set({ selectedNode: node }),
  
  updateNode: (nodeId, data) => {
    const { nodes } = get();
    const updatedNodes = nodes.map(node =>
      node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
    );
    set({ nodes: updatedNodes });
  },
  
  addNode: (node) => {
    const { nodes } = get();
    set({ nodes: [...nodes, node] });
  },
}));


import React, { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Node,
  Edge,
  useReactFlow,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import TextNode from './TextNode';
import { useFlowStore } from '../store/useFlowStore';
import { FlowNode, TextNodeData } from '../types';

const nodeTypes = {
  textNode: TextNode,
};

let nodeId = 0;
const getId = () => `node_${nodeId++}`;

const FlowCanvasInner: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  const { nodes, edges, setNodes, setEdges, addNode, setSelectedNode } = useFlowStore();
  
  // Convert FlowNode[] to Node[] for React Flow
  const reactFlowNodes = nodes as Node[];
  const reactFlowEdges = edges as Edge[];
  
  const [localNodes, setLocalNodes, onNodesChange] = useNodesState(reactFlowNodes);
  const [localEdges, setLocalEdges, onEdgesChange] = useEdgesState(reactFlowEdges);

  // Sync store with React Flow state
  React.useEffect(() => {
    setLocalNodes(reactFlowNodes);
  }, [nodes, setLocalNodes]);

  React.useEffect(() => {
    setLocalEdges(reactFlowEdges);
  }, [edges, setLocalEdges]);

  React.useEffect(() => {
    setNodes(localNodes as FlowNode[]);
  }, [localNodes, setNodes]);

  React.useEffect(() => {
    setEdges(localEdges);
  }, [localEdges, setEdges]);

  const onConnect = useCallback((params: Connection) => {
    // Enforce rule: only one edge from a source handle
    const existingEdge = localEdges.find(edge => 
      edge.source === params.source && edge.sourceHandle === params.sourceHandle
    );
    
    if (existingEdge) {
      // Remove existing edge first
      setLocalEdges(edges => edges.filter(edge => edge.id !== existingEdge.id));
    }
    
    setLocalEdges(edges => addEdge(params, edges));
  }, [localEdges, setLocalEdges]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();

    const type = event.dataTransfer.getData('application/reactflow');
    if (!type || !reactFlowWrapper.current) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode: FlowNode = {
      id: getId(),
      type: 'textNode',
      position,
      data: {
        label: 'Text Message',
        message: 'Hello! This is a text message.',
      },
    };

    addNode(newNode);
  }, [addNode, screenToFlowPosition]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const flowNode = nodes.find(n => n.id === node.id);
    if (flowNode) {
      setSelectedNode(flowNode);
    }
  }, [nodes, setSelectedNode]);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  return (
    <div className="flex-1 h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={localNodes}
        edges={localEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
      >
        <Background
          gap={20}
          size={1}
          color="#e2e8f0"
        />
        <Controls className="bg-white border border-gray-200 rounded-lg shadow-lg" />
        <MiniMap
          className="bg-white border border-gray-200 rounded-lg shadow-lg"
          nodeColor="#3b82f6"
          maskColor="rgba(0, 0, 0, 0.1)"
        />
      </ReactFlow>
    </div>
  );
};

const FlowCanvas: React.FC = () => (
  <ReactFlowProvider>
    <FlowCanvasInner />
  </ReactFlowProvider>
);

export default FlowCanvas;

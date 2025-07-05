
import { FlowNode, FlowEdge } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export const validateFlow = (nodes: FlowNode[], edges: FlowEdge[]): ValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (nodes.length === 0) {
    errors.push('Flow must contain at least one node');
    return { isValid: false, errors, warnings };
  }

  // Find nodes that have no incoming edges (start nodes)
  const nodeIds = nodes.map(n => n.id);
  const targetNodes = edges.map(e => e.target);
  const startNodes = nodeIds.filter(id => !targetNodes.includes(id));

  // Find nodes that have no outgoing edges (end nodes)
  const sourceNodes = edges.map(e => e.source);
  const endNodes = nodeIds.filter(id => !sourceNodes.includes(id));

  if (startNodes.length === 0) {
    errors.push('Flow must have at least one starting node (node with no incoming connections)');
  }

  if (startNodes.length > 1) {
    warnings.push('Multiple starting nodes detected. Consider having a single entry point.');
  }

  if (endNodes.length === 0) {
    errors.push('Flow must have at least one ending node (node with no outgoing connections)');
  }

  if (endNodes.length > 1) {
    errors.push('Flow must have exactly one ending node. Multiple ending nodes detected.');
  }

  // Check for empty messages
  const emptyNodes = nodes.filter(node => !node.data.message.trim());
  if (emptyNodes.length > 0) {
    warnings.push(`${emptyNodes.length} node(s) have empty messages`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

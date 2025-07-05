
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { useFlowStore } from '../store/useFlowStore';
import { TextNodeData } from '../types';

const TextNode: React.FC<NodeProps<TextNodeData>> = ({ id, data, selected }) => {
  const { setSelectedNode, nodes } = useFlowStore();
  
  const handleClick = () => {
    const node = nodes.find(n => n.id === id);
    if (node) {
      setSelectedNode(node);
    }
  };

  return (
    <div 
      className={`
        bg-white rounded-lg border-2 p-4 min-w-[200px] max-w-[300px] shadow-lg
        transition-all duration-200 cursor-pointer hover:shadow-xl
        ${selected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}
      `}
      onClick={handleClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      
      <div className="text-sm font-medium text-gray-800 mb-2">
        Text Message
      </div>
      
      <div className="text-sm text-gray-600 break-words">
        {data.message || 'Click to edit message...'}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500 border-2 border-white"
      />
    </div>
  );
};

export default TextNode;

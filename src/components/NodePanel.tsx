
import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';

const NodePanel: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Nodes
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Drag nodes to the canvas
        </p>
      </div>
      
      <div className="p-4 space-y-3">
        <div
          className="
            flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-gray-300
            hover:border-blue-400 hover:bg-blue-50 cursor-grab active:cursor-grabbing
            transition-all duration-200
          "
          draggable
          onDragStart={(e) => onDragStart(e, 'textNode')}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-800">Text Node</div>
            <div className="text-xs text-gray-600">Send a text message</div>
          </div>
        </div>
      </div>
      
      <div className="p-4 mt-8">
        <div className="text-xs text-gray-500 space-y-1">
          <p>💡 <strong>Tip:</strong> Drag nodes from here to the canvas</p>
          <p>🔗 Connect nodes by dragging from the green dot to the blue dot</p>
          <p>⚙️ Click a node to edit its settings</p>
        </div>
      </div>
    </div>
  );
};

export default NodePanel;

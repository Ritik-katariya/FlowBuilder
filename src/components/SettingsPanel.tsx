
import React, { useState, useEffect } from 'react';
import { X, MessageSquare, Save } from 'lucide-react';
import { useFlowStore } from '../store/useFlowStore';

const SettingsPanel: React.FC = () => {
  const { selectedNode, setSelectedNode, updateNode } = useFlowStore();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedNode) {
      setMessage(selectedNode.data.message || '');
    }
  }, [selectedNode]);

  const handleSave = () => {
    if (selectedNode) {
      updateNode(selectedNode.id, { message });
    }
  };

  const handleClose = () => {
    setSelectedNode(null);
  };

  if (!selectedNode) return null;

  return (
    <div className="w-64 bg-white border-l border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Node Settings
          </h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Configure your text message
        </p>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message Content
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            className="
              w-full h-32 p-3 border border-gray-300 rounded-lg resize-none
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              transition-all duration-200
            "
          />
        </div>
        
        <button
          onClick={handleSave}
          className="
            w-full flex items-center justify-center gap-2 py-2 px-4
            bg-gradient-to-r from-blue-500 to-purple-600 text-white
            rounded-lg hover:from-blue-600 hover:to-purple-700
            transition-all duration-200 font-medium
          "
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
        
        <div className="text-xs text-gray-500 space-y-1 pt-4 border-t border-gray-200">
          <p><strong>Node ID:</strong> {selectedNode.id}</p>
          <p><strong>Position:</strong> ({Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)})</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;

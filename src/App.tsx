
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Bot, Workflow } from 'lucide-react';
import FlowCanvas from './components/FlowCanvas';
import NodePanel from './components/NodePanel';
import SettingsPanel from './components/SettingsPanel';
import SaveButton from './components/SaveButton';
import { useFlowStore } from './store/useFlowStore';

const App: React.FC = () => {
  const { selectedNode } = useFlowStore();

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Toaster />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Chatbot Flow Builder</h1>
              <p className="text-sm text-gray-600">Design your conversational flows</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Workflow className="w-4 h-4" />
              Professional Flow Builder
            </div>
            <SaveButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Nodes Panel (shown when no node is selected) */}
        {!selectedNode && <NodePanel />}
        
        {/* Flow Canvas */}
        <FlowCanvas />
        
        {/* Right Sidebar - Settings Panel (shown when a node is selected) */}
        {selectedNode && <SettingsPanel />}
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>🎯 Drag nodes from the left panel</span>
            <span>🔗 Connect nodes with edges</span>
            <span>⚙️ Click nodes to edit</span>
          </div>
          <div>
            Built with React Flow & ❤️
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

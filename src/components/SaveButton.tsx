
import React from 'react';
import { Save, AlertCircle, CheckCircle } from 'lucide-react';
import { useFlowStore } from '../store/useFlowStore';
import { validateFlow } from '../utils/validateFlow';
import { toast } from '@/hooks/use-toast';

const SaveButton: React.FC = () => {
  const { nodes, edges } = useFlowStore();

  const handleSave = () => {
    console.log('Validating flow...', { nodes, edges });
    
    const validation = validateFlow(nodes, edges);
    
    if (validation.isValid) {
      // Show success message
      toast({
        title: "Flow Saved Successfully!",
        description: `Saved ${nodes.length} nodes and ${edges.length} connections.`,
      });
      
      if (validation.warnings.length > 0) {
        toast({
          title: "Warnings",
          description: validation.warnings.join(', '),
          variant: "default",
        });
      }
      
      console.log('Flow saved successfully:', { nodes, edges });
    } else {
      // Show error messages
      toast({
        title: "Cannot Save Flow",
        description: validation.errors.join(', '),
        variant: "destructive",
      });
      
      console.log('Validation failed:', validation.errors);
    }
  };

  const isDisabled = nodes.length === 0;

  return (
    <button
      onClick={handleSave}
      disabled={isDisabled}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
        ${isDisabled
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
          : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
        }
      `}
    >
      <Save className="w-4 h-4" />
      Save Flow
    </button>
  );
};

export default SaveButton;

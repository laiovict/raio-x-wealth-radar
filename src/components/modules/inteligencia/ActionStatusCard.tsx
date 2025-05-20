
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface ActionStatusCardProps {
  status: {
    id: string;
    label: string;
    status: string;
  };
}

const ActionStatusCard: React.FC<ActionStatusCardProps> = ({ status }) => {
  const getActionStatus = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800 ml-auto">Completo</Badge>;
      case 'partial':
        return <Badge className="bg-amber-100 text-amber-800 ml-auto">Parcial</Badge>;
      case 'pending':
        return <Badge className="bg-red-100 text-red-800 ml-auto">Pendente</Badge>;
      default:
        return null;
    }
  };
  
  const getActionProgress = (status: string) => {
    switch (status) {
      case 'complete':
        return <div className="w-full h-2 bg-green-500 rounded-full"></div>;
      case 'partial':
        return (
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
          </div>
        );
      case 'pending':
        return <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>;
      default:
        return null;
    }
  };

  const getBackgroundForAction = (id: string) => {
    switch (id) {
      case 'liquidity':
        return 'border-blue-200 dark:border-blue-800/50';
      case 'risk':
        return 'border-amber-200 dark:border-amber-800/50';
      case 'diversification':
        return 'border-green-200 dark:border-green-800/50';
      default:
        return 'border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <div className={`p-3 border rounded-lg ${getBackgroundForAction(status.id)}`}>
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium">{status.label}</span>
        {getActionStatus(status.status)}
      </div>
      {getActionProgress(status.status)}
    </div>
  );
};

export default ActionStatusCard;

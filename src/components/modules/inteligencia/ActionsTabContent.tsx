
import React from 'react';
import { PieChart, ArrowUp, BadgeCheck } from 'lucide-react';
import ActionCard from './ActionCard';
import ActionStatusCard from './ActionStatusCard';

interface ActionsTabContentProps {
  getRecommendedActions: () => any[];
  actionStatuses: {
    id: string;
    label: string;
    status: string;
  }[];
}

const ActionsTabContent: React.FC<ActionsTabContentProps> = ({ 
  getRecommendedActions, 
  actionStatuses 
}) => {
  return (
    <div className="p-4 space-y-3">
      <div className="space-y-4">
        {getRecommendedActions().map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
      
      <div className="pt-4">
        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">Status do plano</h3>
        <div className="space-y-3">
          {actionStatuses.map((status) => (
            <ActionStatusCard key={status.id} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionsTabContent;

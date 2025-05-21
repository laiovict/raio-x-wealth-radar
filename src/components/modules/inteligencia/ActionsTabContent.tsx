
import React from 'react';
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
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        {getRecommendedActions().map((action) => (
          <ActionCard key={action.id} action={action} />
        ))}
      </div>
      
      <div className="pt-4 mt-4 border-t border-white/5">
        <h3 className="text-lg font-light text-white mb-4">Status do plano</h3>
        <div className="space-y-4">
          {actionStatuses.map((status) => (
            <ActionStatusCard key={status.id} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionsTabContent;

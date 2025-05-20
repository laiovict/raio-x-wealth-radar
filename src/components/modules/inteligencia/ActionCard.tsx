
import React from 'react';
import { PieChart, ArrowUp, BadgeCheck, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ActionCardProps {
  action: {
    id: string;
    title: string;
    description: string;
    potentialImpact: string;
    urgency: string;
    icon: React.ReactNode;
  };
}

const ActionCard: React.FC<ActionCardProps> = ({ action }) => {
  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/5 hover:bg-white/10 dark:hover:bg-gray-700/30 transition-colors cursor-pointer">
      <div className="flex items-start gap-4">
        {action.icon}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{action.title}</h3>
            <div className="flex items-center">
              <Badge className={action.urgency === 'Alto' ? 'bg-red-100 text-red-800' : action.urgency === 'Médio' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}>
                {action.urgency}
              </Badge>
              <Badge className="bg-blue-100 text-blue-800 ml-2">
                {action.potentialImpact}
              </Badge>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default ActionCard;

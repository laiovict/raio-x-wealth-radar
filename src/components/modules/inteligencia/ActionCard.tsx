
import React from 'react';
import { 
  PieChart, ArrowUp, BadgeCheck, ArrowRight, 
  TrendingUp, Shield, AlertTriangle, Leaf 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

interface ActionCardProps {
  action: {
    id: string;
    title: string;
    description: string;
    potentialImpact: string;
    urgency: string;
    iconType: string;
    iconColor: string;
    dataSource?: string;
  };
}

const ActionCard: React.FC<ActionCardProps> = ({ action }) => {
  // Define icon based on action type
  const getIcon = () => {
    switch(action.iconType) {
      case 'PieChart':
        return <PieChart className={`h-5 w-5 text-${action.iconColor}-400`} />;
      case 'ArrowUp':
        return <TrendingUp className={`h-5 w-5 text-${action.iconColor}-400`} />;
      case 'BadgeCheck':
        return <BadgeCheck className={`h-5 w-5 text-${action.iconColor}-400`} />;
      case 'Shield':
        return <Shield className={`h-5 w-5 text-${action.iconColor}-400`} />;
      case 'AlertTriangle':
        return <AlertTriangle className={`h-5 w-5 text-${action.iconColor}-400`} />;
      case 'Leaf':
        return <Leaf className={`h-5 w-5 text-${action.iconColor}-400`} />;
      default:
        return <ArrowRight className={`h-5 w-5 text-${action.iconColor}-400`} />;
    }
  };

  // Define card style based on urgency - Adding null check
  const getCardStyle = () => {
    const urgency = action.urgency?.toLowerCase() || 'default';
    switch(urgency) {
      case 'alto':
        return 'bg-gradient-to-br from-amber-900/10 to-amber-700/5 border-amber-800/30';
      case 'médio':
        return 'bg-gradient-to-br from-blue-900/10 to-blue-700/5 border-blue-800/30';
      case 'baixo':
        return 'bg-gradient-to-br from-emerald-900/10 to-emerald-700/5 border-emerald-800/30';
      default:
        return 'bg-gradient-to-br from-indigo-900/10 to-indigo-900/5 border-indigo-800/30';
    }
  };

  // Define impact badge color - Adding null check
  const getImpactBadgeClass = () => {
    const impact = action.potentialImpact?.toLowerCase() || 'default';
    switch(impact) {
      case 'alto':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'médio':
        return 'bg-indigo-500 hover:bg-indigo-600';
      case 'baixo':
        return 'bg-violet-500 hover:bg-violet-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  // Define urgency badge color - Adding null check
  const getUrgencyBadgeClass = () => {
    const urgency = action.urgency?.toLowerCase() || 'default';
    switch(urgency) {
      case 'alto':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'médio':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'baixo':
        return 'bg-emerald-500 hover:bg-emerald-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className={`overflow-hidden border rounded-lg ${getCardStyle()} transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${
            action.iconColor === 'emerald' ? 'bg-emerald-900/50' :
            action.iconColor === 'amber' ? 'bg-amber-900/50' :
            action.iconColor === 'red' ? 'bg-red-900/50' :
            'bg-blue-900/50'
          }`}>
            {getIcon()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className={`font-medium text-${action.iconColor}-400`}>
                  {action.title}
                </h3>
                {action.dataSource && (
                  <TypeSafeDataSourceTag source={action.dataSource as any} />
                )}
              </div>
              
              <div className="flex gap-2">
                <Badge className={getUrgencyBadgeClass()}>
                  Urgência: {action.urgency || 'N/A'}
                </Badge>
                <Badge className={getImpactBadgeClass()}>
                  Impacto: {action.potentialImpact || 'N/A'}
                </Badge>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 mb-3">{action.description}</p>
            
            <div className="flex justify-end">
              <button className="text-sm flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors">
                Ver detalhes <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;

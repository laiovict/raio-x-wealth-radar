
import React from 'react';
import { ArrowUp, ArrowRight, BadgeCheck, AlertTriangle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';

interface RecommendationCardProps {
  recommendation: {
    action?: string;
    description?: string;
    urgency?: string;
    impact?: string;
    id?: string;
    title?: string;
    potentialImpact?: string;
    dataSource?: DataSourceType;
  };
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  // Handle both API response format and mock data format
  const title = recommendation.action || recommendation.title || '';
  const description = recommendation.description || '';
  const urgency = recommendation.urgency || '';
  const impact = recommendation.impact || recommendation.potentialImpact || '';

  // Define icon based on urgency
  const getIconForRecommendation = (urgency: string | undefined) => {
    if (!urgency) return null;
    
    switch (urgency.toLowerCase()) {
      case 'alto':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'médio':
        return <Clock className="h-5 w-5 text-amber-400" />;
      case 'baixo':
        return <BadgeCheck className="h-5 w-5 text-green-400" />;
      default:
        return <ArrowRight className="h-5 w-5 text-blue-400" />;
    }
  };
  
  // Define card style based on urgency
  const getCardStyle = () => {
    switch(urgency.toLowerCase()) {
      case 'alto':
        return 'bg-gradient-to-br from-red-900/10 to-red-700/5 border-red-800/30';
      case 'médio':
        return 'bg-gradient-to-br from-amber-900/10 to-amber-700/5 border-amber-800/30';
      case 'baixo':
        return 'bg-gradient-to-br from-green-900/10 to-green-700/5 border-green-800/30';
      default:
        return 'bg-gradient-to-br from-blue-900/10 to-blue-700/5 border-blue-800/30';
    }
  };

  // Define urgency badge color
  const getUrgencyBadgeClass = () => {
    switch(urgency.toLowerCase()) {
      case 'alto':
        return 'bg-red-500 hover:bg-red-600';
      case 'médio':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'baixo':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  // Define impact badge color
  const getImpactBadgeClass = () => {
    switch(impact.toLowerCase()) {
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

  return (
    <div className={`overflow-hidden border rounded-lg ${getCardStyle()} transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]`}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${
            urgency.toLowerCase() === 'alto' ? 'bg-red-900/50' :
            urgency.toLowerCase() === 'médio' ? 'bg-amber-900/50' :
            urgency.toLowerCase() === 'baixo' ? 'bg-green-900/50' :
            'bg-blue-900/50'
          }`}>
            {getIconForRecommendation(urgency)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className={`font-medium ${
                  urgency.toLowerCase() === 'alto' ? 'text-red-400' :
                  urgency.toLowerCase() === 'médio' ? 'text-amber-400' :
                  urgency.toLowerCase() === 'baixo' ? 'text-green-400' :
                  'text-blue-400'
                }`}>
                  {title}
                </h3>
                {recommendation.dataSource && (
                  <TypeSafeDataSourceTag source={recommendation.dataSource} />
                )}
              </div>
              
              <div className="flex gap-2">
                <Badge className={getUrgencyBadgeClass()}>
                  Urgência: {urgency}
                </Badge>
                <Badge className={getImpactBadgeClass()}>
                  Impacto: {impact}
                </Badge>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 mb-3">{description}</p>
            
            <div className="flex justify-end">
              <button className="text-sm flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors">
                Executar <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;

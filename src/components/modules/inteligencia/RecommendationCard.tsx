
import React from 'react';
import { ArrowUp, ArrowRight, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RecommendationCardProps {
  recommendation: {
    action?: string;
    description?: string;
    urgency?: string;
    impact?: string;
    id?: string;
    title?: string;
    potentialImpact?: string;
  };
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ recommendation }) => {
  const getIconForRecommendation = (urgency: string | undefined) => {
    if (!urgency) return null;
    
    switch (urgency.toLowerCase()) {
      case 'alto':
        return <ArrowUp className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'médio':
        return <ArrowRight className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case 'baixo':
        return <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400" />;
      default:
        return null;
    }
  };

  // Handle both API response format and mock data format
  const title = recommendation.action || recommendation.title || '';
  const description = recommendation.description || '';
  const urgency = recommendation.urgency || '';
  const impact = recommendation.impact || recommendation.potentialImpact || '';

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
      <div className="flex items-center mb-2">
        {getIconForRecommendation(urgency)}
        <span className="text-lg font-medium ml-2">{title}</span>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{description}</p>
      <div className="flex flex-wrap gap-2">
        <Badge className={`${urgency === 'Alto' ? 'bg-red-100 text-red-800' : urgency === 'Médio' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
          Urgência: {urgency}
        </Badge>
        <Badge className="bg-blue-100 text-blue-800">
          Impacto: {impact}
        </Badge>
      </div>
    </div>
  );
};

export default RecommendationCard;

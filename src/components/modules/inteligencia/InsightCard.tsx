
import React from 'react';
import { 
  Card, 
  CardContent 
} from '@/components/ui/card';
import { 
  ArrowUp, 
  AlertTriangle, 
  Lightbulb, 
  Info, 
  CheckCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

export interface InsightCardProps {
  insight: {
    id?: string;
    title: string;
    description: string;
    type?: string;
    category?: string;
    impact?: string;
    actions?: string[];
    dataSource?: 'synthetic' | 'supabase' | 'xp' | 'openfinance';
    agent?: string;
    priority?: string;
    isNew?: boolean;
  }
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  // Define icon based on insight type
  const getIcon = () => {
    switch(insight.type) {
      case 'opportunity':
        return <ArrowUp className="h-5 w-5 text-emerald-400" />;
      case 'risk':
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default:
        return <Lightbulb className="h-5 w-5 text-blue-400" />;
    }
  };

  // Define badge color based on impact
  const getBadgeClass = () => {
    switch(insight.impact) {
      case 'high':
        return 'bg-red-500 hover:bg-red-600';
      case 'medium':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'low':
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };
  
  // Define background gradient and styling based on insight type
  const getCardStyle = () => {
    switch(insight.type) {
      case 'opportunity':
        return 'bg-gradient-to-br from-emerald-900/10 to-emerald-700/5 border-emerald-800/30';
      case 'risk':
        return 'bg-gradient-to-br from-amber-900/10 to-amber-700/5 border-amber-800/30';
      case 'alert':
        return 'bg-gradient-to-br from-red-900/10 to-red-700/5 border-red-800/30';
      default:
        return 'bg-gradient-to-br from-indigo-900/10 to-blue-900/5 border-blue-800/30';
    }
  };

  return (
    <Card className={`overflow-hidden border ${getCardStyle()}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-full ${
            insight.type === 'opportunity' ? 'bg-emerald-900/50' :
            insight.type === 'risk' ? 'bg-amber-900/50' :
            insight.type === 'alert' ? 'bg-red-900/50' :
            'bg-blue-900/50'
          }`}>
            {getIcon()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className={`font-medium ${
                  insight.type === 'opportunity' ? 'text-emerald-400' :
                  insight.type === 'risk' ? 'text-amber-400' :
                  insight.type === 'alert' ? 'text-red-400' :
                  'text-blue-400'
                }`}>
                  {insight.title}
                </h3>
                {insight.isNew && (
                  <Badge className="bg-purple-500 hover:bg-purple-600 text-xs">Novo</Badge>
                )}
                <TypeSafeDataSourceTag source={insight.dataSource} />
              </div>
              
              {insight.impact && (
                <Badge className={getBadgeClass()}>
                  {insight.impact === 'high' ? 'Alto Impacto' :
                   insight.impact === 'medium' ? 'Médio Impacto' :
                   'Baixo Impacto'}
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-gray-300 mb-3">{insight.description}</p>
            
            {insight.actions && insight.actions.length > 0 && (
              <div className="space-y-1.5 mt-3">
                <h4 className="text-xs font-medium text-gray-400">AÇÕES RECOMENDADAS</h4>
                {insight.actions.map((action, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    <span className="text-xs text-gray-300">{action}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;


import React from 'react';
import { PieChart, BarChart3, LineChart, ArrowDown, BadgeCheck, ArrowUp, Lightbulb } from 'lucide-react';

interface InsightCardProps {
  insight: {
    id?: string;
    title: string;
    description: string;
    category: string;
    priority?: string;
  };
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getIconForInsight = (category: string) => {
    switch (category.toLowerCase()) {
      case 'allocation':
        return <PieChart className="h-10 w-10 text-blue-600 dark:text-blue-400 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md" />;
      case 'risk':
        return <BarChart3 className="h-10 w-10 text-red-600 dark:text-red-400 p-2 bg-red-100 dark:bg-red-900/30 rounded-md" />;
      case 'opportunity':
        return <LineChart className="h-10 w-10 text-green-600 dark:text-green-400 p-2 bg-green-100 dark:bg-green-900/30 rounded-md" />;
      case 'budget':
        return <ArrowDown className="h-10 w-10 text-amber-600 dark:text-amber-400 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-md" />;
      case 'tax':
        return <BadgeCheck className="h-10 w-10 text-purple-600 dark:text-purple-400 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md" />;
      case 'savings':
        return <ArrowUp className="h-10 w-10 text-emerald-600 dark:text-emerald-400 p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-md" />;
      default:
        return <Lightbulb className="h-10 w-10 text-indigo-600 dark:text-indigo-400 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-md" />;
    }
  };
  
  const getBackgroundForInsight = (category: string) => {
    switch (category.toLowerCase()) {
      case 'allocation':
        return 'border-blue-200 dark:border-blue-800/50';
      case 'risk':
        return 'border-red-200 dark:border-red-800/50';
      case 'opportunity':
        return 'border-green-200 dark:border-green-800/50';
      case 'budget':
        return 'border-amber-200 dark:border-amber-800/50';
      case 'tax':
        return 'border-purple-200 dark:border-purple-800/50';
      case 'savings':
        return 'border-emerald-200 dark:border-emerald-800/50';
      default:
        return 'border-indigo-200 dark:border-indigo-800/50';
    }
  };

  return (
    <div className={`p-4 border ${getBackgroundForInsight(insight.category)} rounded-lg bg-white/5`}>
      <div className="flex items-start gap-4">
        {getIconForInsight(insight.category)}
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">{insight.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{insight.description}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;


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
        return <PieChart className="h-10 w-10 text-blue-500 dark:text-blue-300 p-2 bg-blue-100 dark:bg-blue-900/50 rounded-md" />;
      case 'risk':
        return <BarChart3 className="h-10 w-10 text-red-500 dark:text-red-300 p-2 bg-red-100 dark:bg-red-900/50 rounded-md" />;
      case 'opportunity':
        return <LineChart className="h-10 w-10 text-green-500 dark:text-green-300 p-2 bg-green-100 dark:bg-green-900/50 rounded-md" />;
      case 'budget':
        return <ArrowDown className="h-10 w-10 text-amber-500 dark:text-amber-300 p-2 bg-amber-100 dark:bg-amber-900/50 rounded-md" />;
      case 'tax':
        return <BadgeCheck className="h-10 w-10 text-purple-500 dark:text-purple-300 p-2 bg-purple-100 dark:bg-purple-900/50 rounded-md" />;
      case 'savings':
        return <ArrowUp className="h-10 w-10 text-emerald-500 dark:text-emerald-300 p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-md" />;
      default:
        return <Lightbulb className="h-10 w-10 text-indigo-500 dark:text-indigo-300 p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-md" />;
    }
  };
  
  const getBackgroundForInsight = (category: string) => {
    switch (category.toLowerCase()) {
      case 'allocation':
        return 'border-blue-300 dark:border-blue-700 bg-white/80 dark:bg-slate-800/80';
      case 'risk':
        return 'border-red-300 dark:border-red-700 bg-white/80 dark:bg-slate-800/80';
      case 'opportunity':
        return 'border-green-300 dark:border-green-700 bg-white/80 dark:bg-slate-800/80';
      case 'budget':
        return 'border-amber-300 dark:border-amber-700 bg-white/80 dark:bg-slate-800/80';
      case 'tax':
        return 'border-purple-300 dark:border-purple-700 bg-white/80 dark:bg-slate-800/80';
      case 'savings':
        return 'border-emerald-300 dark:border-emerald-700 bg-white/80 dark:bg-slate-800/80';
      default:
        return 'border-indigo-300 dark:border-indigo-700 bg-white/80 dark:bg-slate-800/80';
    }
  };

  return (
    <div className={`p-4 border ${getBackgroundForInsight(insight.category)} rounded-lg shadow-sm`}>
      <div className="flex items-start gap-4">
        {getIconForInsight(insight.category)}
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">{insight.title}</h3>
          <p className="text-sm text-gray-700 dark:text-gray-300">{insight.description}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;

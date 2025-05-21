
import React from 'react';
import InsightCard from './InsightCard';
import { AIInsight } from '@/types/raioXTypes';
import { InsightCardProps } from './InsightCard';

interface InsightsTabContentProps {
  insights: AIInsight[];
  loadingStates: {
    insights: boolean;
  };
  financialInsightData?: any;
}

const InsightsTabContent: React.FC<InsightsTabContentProps> = ({ 
  insights, 
  loadingStates, 
  financialInsightData 
}) => {
  // Helper function to adapt AIInsight to the format expected by InsightCard
  const adaptInsightForCard = (insight: AIInsight): InsightCardProps['insight'] => {
    return {
      id: insight.id || '',
      title: insight.title,
      description: insight.description,
      type: insight.type || 'insight',
      category: insight.category || '',
      impact: insight.impact || 'medium',
      actions: insight.actions || [],
      dataSource: insight.dataSource || 'synthetic',
      agent: insight.agent || '',
      priority: insight.priority || 'medium',
      isNew: insight.isNew || false
    };
  };
  
  return (
    <div className="p-4 space-y-4">
      {financialInsightData && financialInsightData.insights ? (
        <div className="space-y-4">
          {(financialInsightData.insights || []).map((insight: any, index: number) => (
            <InsightCard key={index} insight={adaptInsightForCard(insight)} />
          ))}
        </div>
      ) : (
        <>
          {loadingStates.insights ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <InsightCard key={index} insight={adaptInsightForCard(insight)} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InsightsTabContent;

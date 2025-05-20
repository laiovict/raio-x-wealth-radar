
import React from 'react';
import RecommendationCard from './RecommendationCard';
import EmptyRecommendations from './EmptyRecommendations';

interface RecommendationsTabContentProps {
  recommendations: any[];
}

const RecommendationsTabContent: React.FC<RecommendationsTabContentProps> = ({ recommendations }) => {
  return (
    <div className="p-4 space-y-4">
      {recommendations && recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <RecommendationCard key={index} recommendation={recommendation} />
          ))}
        </div>
      ) : (
        <EmptyRecommendations />
      )}
    </div>
  );
};

export default RecommendationsTabContent;

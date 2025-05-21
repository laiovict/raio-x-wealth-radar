
import { useState } from 'react';
import { generateMockInsights, generateMockActions, generateMockRecommendations } from '@/services/mockDataService';

interface UseTabContentOptions {
  clientSeed: number;
}

/**
 * Custom hook for managing tab content in modules with multiple tabs
 */
export const useTabContent = ({ clientSeed }: UseTabContentOptions) => {
  const [activeContent, setActiveContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for content data
  const [mockInsights, setMockInsights] = useState([]);
  const [mockActions, setMockActions] = useState([]);
  const [mockRecommendations, setMockRecommendations] = useState([]);
  
  // Define the content loading status
  const [contentLoaded, setContentLoaded] = useState({
    insights: false,
    actions: false,
    recommendations: false
  });
  
  // Handle content button click
  const handleContentClick = (contentType: string) => {
    if (activeContent === contentType) {
      setActiveContent(null); // Toggle off if already active
      return;
    }
    
    setActiveContent(contentType);
    
    // Generate appropriate mock data based on content type
    if (contentType === "insights" && !contentLoaded.insights) {
      setIsLoading(true);
      generateMockInsights(clientSeed)
        .then((insights: any) => {
          setMockInsights(insights);
          setContentLoaded(prev => ({ ...prev, insights: true }));
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (contentType === "actions" && !contentLoaded.actions) {
      setIsLoading(true);
      generateMockActions(clientSeed)
        .then((actions: any) => {
          setMockActions(actions);
          setContentLoaded(prev => ({ ...prev, actions: true }));
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (contentType === "recommendations" && !contentLoaded.recommendations) {
      setIsLoading(true);
      generateMockRecommendations(clientSeed)
        .then((recommendations: any) => {
          setMockRecommendations(recommendations);
          setContentLoaded(prev => ({ ...prev, recommendations: true }));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return {
    activeContent,
    isLoading,
    mockInsights,
    mockActions,
    mockRecommendations,
    contentLoaded,
    handleContentClick
  };
};

export default useTabContent;

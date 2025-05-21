
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Lightbulb
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import InsightsTabContent from "./inteligencia/InsightsTabContent";
import ActionsTabContent from "./inteligencia/ActionsTabContent";
import RecommendationsTabContent from "./inteligencia/RecommendationsTabContent";
import { getRecommendedActions } from "./inteligencia/helpers";
import { generatePortfolioInsights } from '@/services/insightGeneratorService';
import { DataSourceType } from '@/types/raioXTypes';

interface InteligenciaModuleProps {
  fullWidth?: boolean;
}

const InteligenciaModule = ({ fullWidth = false }: InteligenciaModuleProps) => {
  const { data, isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();
  const [activeTab, setActiveTab] = useState<string>("insights");
  
  // Simulate loading time for enhanced UX
  const [loadingStates, setLoadingStates] = useState({
    insights: false,
    actions: false,
    recommendations: false
  });
  
  useEffect(() => {
    if (activeTab) {
      setLoadingStates(prev => ({ ...prev, [activeTab]: true }));
      
      const timer = setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [activeTab]: false }));
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab]);
  
  const actionStatuses = [
    { id: 'liquidity', label: 'Reserva de emergência', status: 'pending' },
    { id: 'risk', label: 'Perfil de risco', status: 'complete' },
    { id: 'diversification', label: 'Diversificação', status: 'partial' }
  ];

  // Define a safe way to access recommendations
  const recommendations = data?.recommendations || [];
  
  // Generate insights based on real data when available
  const insights = useMemo(() => {
    // If we have AI insights from context, use them
    if (data.financialInsightData?.insights && data.financialInsightData.insights.length > 0) {
      return data.financialInsightData.insights;
    }
    
    // Generate insights based on available portfolio data
    return generatePortfolioInsights(
      data.portfolioSummary,
      data.stocks,
      data.fixedIncome,
      data.investmentFunds,
      data.realEstate,
      data.profitability,
      data.dividendHistory
    );
  }, [
    data.financialInsightData, 
    data.portfolioSummary,
    data.stocks,
    data.fixedIncome,
    data.investmentFunds,
    data.realEstate,
    data.profitability,
    data.dividendHistory
  ]);

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-indigo-800 dark:text-indigo-300 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Inteligência Financeira
          </CardTitle>
          
          <button
            onClick={refreshAIAnalysis}
            disabled={isAIAnalysisLoading}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            {isAIAnalysisLoading ? "Atualizando..." : "Atualizar análise"}
          </button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="insights" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 border-b border-gray-200 dark:border-gray-700">
          <TabsList className="bg-transparent -mb-px py-0">
            <TabsTrigger value="insights" className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 rounded-none">
              Insights
            </TabsTrigger>
            <TabsTrigger value="actions" className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 rounded-none">
              Ações
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 rounded-none">
              Recomendações
            </TabsTrigger>
          </TabsList>
        </div>
      
        <CardContent className="p-0">
          <TabsContent value="actions" className="m-0">
            <ActionsTabContent 
              getRecommendedActions={getRecommendedActions}
              actionStatuses={actionStatuses}
            />
          </TabsContent>
          
          <TabsContent value="insights" className="m-0">
            <InsightsTabContent 
              insights={insights}
              loadingStates={loadingStates}
              financialInsightData={data.financialInsightData}
            />
          </TabsContent>
          
          <TabsContent value="recommendations" className="m-0">
            <RecommendationsTabContent recommendations={recommendations} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default InteligenciaModule;

import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Info, RefreshCw } from "lucide-react";

// Import sub-components
import DataSourceInfoPanel from "./financialOverview/DataSourceInfoPanel";
import NetWorthSection from "./financialOverview/NetWorthSection";
import OpenFinanceBanner from "./financialOverview/OpenFinanceBanner";
import InvestmentStatsGrid from "./financialOverview/InvestmentStatsGrid";
import LoadingView from "./financialOverview/LoadingView";
import MainFinancialOverview from "./financialOverview/MainFinancialOverview";
import AssetsLiabilitiesGrid from "./financialOverview/AssetsLiabilitiesGrid";
import FinancialHealthIndicators from "./financialOverview/FinancialHealthIndicators";
import FinancialBehaviorSection from "./financialOverview/FinancialBehaviorSection";
import CrossInstitutionalAnalysis from "./financialOverview/CrossInstitutionalAnalysis";
import FinancialHistoryHighlights from "./financialOverview/FinancialHistoryHighlights";
import RecommendedSteps from "./financialOverview/RecommendedSteps";
import TopRisks from "./financialOverview/TopRisks";

// Import utility functions
import { 
  generateNetWorthHistory, 
  getSyntheticData, 
  getPortfolioSummaryHelper 
} from "./financialOverview/utils";

interface FinancialOverviewModuleProps {
  fullWidth?: boolean;
}

const FinancialOverviewModule = ({ fullWidth = false }: FinancialOverviewModuleProps) => {
  const { data, hasOpenFinance, financialSummary, isAIAnalysisLoading, refreshAIAnalysis, selectedClient } = useRaioX();
  const [showBehavioralInsights, setShowBehavioralInsights] = useState(false);
  const [showDataSourceInfo, setShowDataSourceInfo] = useState(false);

  // Default trend values when not available
  const defaultTrend = "+3.5%";
  
  // Helper function to get client portfolio summary from real data if available
  const getPortfolioSummary = () => getPortfolioSummaryHelper(data);

  // Use real data when financial summary is available, otherwise use synthetic data
  const finData = hasOpenFinance 
    ? financialSummary || getSyntheticData(selectedClient, getPortfolioSummary()) 
    : getSyntheticData(selectedClient, getPortfolioSummary());
    
  // Get historical net worth data
  const netWorthHistory = generateNetWorthHistory(finData.netWorth);

  // Display loading view if loading OpenFinance data
  if (isAIAnalysisLoading) {
    return <LoadingView fullWidth={fullWidth} />;
  }

  // Display limited view if OpenFinance is not activated
  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              Meu Panorama Financeiro
            </CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDataSourceInfo(!showDataSourceInfo)}
              className="flex items-center gap-1"
            >
              <Info className="h-4 w-4" />
              <span className="text-xs">Legenda</span>
            </Button>
          </div>
          <DataSourceInfoPanel showDataSourceInfo={showDataSourceInfo} />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Limited Net Worth Section */}
            <NetWorthSection 
              finData={finData} 
              netWorthHistory={netWorthHistory} 
              getPortfolioSummary={getPortfolioSummary}
              defaultTrend={defaultTrend}
            />
            
            {/* OpenFinance needed banner */}
            <OpenFinanceBanner />

            {/* Investment Stats */}
            <InvestmentStatsGrid 
              finData={finData} 
              getPortfolioSummary={getPortfolioSummary}
              data={data} 
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Full OpenFinance-powered view
  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Meu Panorama Financeiro
          </CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDataSourceInfo(!showDataSourceInfo)}
              className="flex items-center gap-1"
            >
              <Info className="h-4 w-4" />
              <span className="text-xs">Legenda</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={refreshAIAnalysis} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden md:inline">Atualizar</span>
            </Button>
          </div>
        </div>
        <DataSourceInfoPanel showDataSourceInfo={showDataSourceInfo} />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Main Financial Overview Section */}
          <MainFinancialOverview 
            finData={finData} 
            hasOpenFinance={hasOpenFinance} 
            getPortfolioSummary={getPortfolioSummary} 
          />
          
          {/* Net Worth Section */}
          <NetWorthSection 
            finData={finData} 
            netWorthHistory={netWorthHistory} 
            getPortfolioSummary={getPortfolioSummary}
            defaultTrend={defaultTrend}
          />
          
          {/* Assets & Liabilities Summary */}
          <AssetsLiabilitiesGrid 
            finData={finData} 
            getPortfolioSummary={getPortfolioSummary} 
          />
          
          {/* Financial Health Indicators */}
          <FinancialHealthIndicators 
            finData={finData} 
            getPortfolioSummary={getPortfolioSummary} 
          />
          
          {/* OpenFinance Insights Section */}
          <div className="mt-6">
            <div className="mb-4 border-b border-white/10 pb-2">
              <div className="flex items-center text-lg font-medium text-white gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Dados OpenFinance</span>
                <TypeSafeDataSourceTag source="synthetic" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Financial Behavior */}
              <FinancialBehaviorSection />
              
              {/* Cross-Institutional Analysis */}
              <CrossInstitutionalAnalysis />
            </div>
          </div>
          
          {/* Financial History Highlights */}
          <div className="mt-6">
            <div className="mb-4 flex justify-between items-center">
              <div className="text-lg font-medium text-white">
                Sua história financeira em 2025
                <TypeSafeDataSourceTag source="synthetic" />
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-blue-400" 
                onClick={() => setShowBehavioralInsights(!showBehavioralInsights)}
              >
                {showBehavioralInsights ? "Mostrar menos" : "Mostrar mais"}
              </Button>
            </div>
            
            <FinancialHistoryHighlights showBehavioralInsights={showBehavioralInsights} />
          </div>
          
          {/* Recommended Next Steps */}
          <RecommendedSteps />
          
          {/* Top Risks */}
          <TopRisks finData={finData} />
        </div>
      </CardContent>
    </Card>
  );
};

// Add missing imports
import { Shield } from "lucide-react";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

export default FinancialOverviewModule;

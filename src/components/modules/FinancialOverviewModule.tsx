import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Info, RefreshCw } from "lucide-react";
import { toNumber, ensureNumber } from "@/utils/typeConversionHelpers";

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
} from "./financialOverview/utils"; // generateNetWorthHistory now returns an object
import { PortfolioSummaryHistoryEntry } from "@/types/raioXTypes"; // Import if needed for typing

// Additional imports
import { Shield } from "lucide-react";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

interface FinancialOverviewModuleProps {
  fullWidth?: boolean;
  useSyntheticData?: boolean;
  steveJobsMode?: boolean;
}

const FinancialOverviewModule = ({ fullWidth = false, useSyntheticData = false, steveJobsMode = false }: FinancialOverviewModuleProps) => {
  const { data, hasOpenFinance, financialSummary, isAIAnalysisLoading, refreshAIAnalysis, selectedClient } = useRaioX();
  const [showBehavioralInsights, setShowBehavioralInsights] = useState(false);
  const [showDataSourceInfo, setShowDataSourceInfo] = useState(false);

  // Default trend values when not available
  const defaultTrend = "+3.5%";
  
  // Helper function to get client portfolio summary from real data if available
  const getPortfolioSummary = () => getPortfolioSummaryHelper(data);

  // Use real data when financial summary is available and not forced to use synthetic,
  // otherwise use synthetic data
  const finData = (financialSummary && !useSyntheticData) // Removed hasOpenFinance check here for simplicity, finData relies on financialSummary
    ? financialSummary
    : getSyntheticData(selectedClient ? toNumber(selectedClient) : null, getPortfolioSummary());
    
  // Get historical net worth data using portfolioSummaryHistory from context data
  const { points: netWorthHistory, dataSource: netWorthHistoryDataSource } = generateNetWorthHistory(
    ensureNumber(finData.netWorth), // Ensure currentNetWorth is a number
    data.portfolioSummaryHistory // Pass the actual history data
  );

  // Display loading view if loading OpenFinance data
  if (isAIAnalysisLoading) {
    return <LoadingView fullWidth={fullWidth} />;
  }

  // Display limited view if OpenFinance is not activated and not using the full synthetic version
  if (!hasOpenFinance && !useSyntheticData) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-3">
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
        <CardContent className="space-y-8">
          <NetWorthSection 
            finData={finData} 
            netWorthHistory={netWorthHistory} 
            netWorthHistoryDataSource={netWorthHistoryDataSource} // Pass the data source
            getPortfolioSummary={getPortfolioSummary}
            defaultTrend={defaultTrend}
          />
          
          <OpenFinanceBanner />

          <InvestmentStatsGrid 
            finData={finData} 
            getPortfolioSummary={getPortfolioSummary}
            data={data} 
          />
        </CardContent>
      </Card>
    );
  }

  // Determine what sections to show based on if we're in Beta or Full mode
  const isFullVersion = useSyntheticData;

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            {useSyntheticData ? "Meu Panorama Financeiro (Versão Full)" : "Meu Panorama Financeiro"}
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
            {useSyntheticData && (
              <Button variant="ghost" size="sm" onClick={refreshAIAnalysis} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden md:inline">Atualizar</span>
              </Button>
            )}
          </div>
        </div>
        <DataSourceInfoPanel showDataSourceInfo={showDataSourceInfo} />
      </CardHeader>
      <CardContent className="space-y-8">
        {useSyntheticData && (
          <MainFinancialOverview 
            finData={finData} 
            hasOpenFinance={hasOpenFinance || useSyntheticData} 
            getPortfolioSummary={getPortfolioSummary} 
          />
        )}
        
        <NetWorthSection 
          finData={finData} 
          netWorthHistory={netWorthHistory}
          netWorthHistoryDataSource={netWorthHistoryDataSource} // Pass the data source
          getPortfolioSummary={getPortfolioSummary}
          defaultTrend={defaultTrend}
        />
        
        <AssetsLiabilitiesGrid 
          finData={finData} 
          getPortfolioSummary={getPortfolioSummary} 
        />
        
        <FinancialHealthIndicators 
          finData={finData} 
          getPortfolioSummary={getPortfolioSummary}
          useSyntheticData={useSyntheticData}
        />
        
        {/* OpenFinance Insights Section - Full version only */}
        {useSyntheticData && (
          <div className="mt-8">
            <div className="mb-6 border-b border-white/10 pb-2">
              <div className="flex items-center text-lg font-medium text-white gap-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span>Dados OpenFinance</span>
                <TypeSafeDataSourceTag source="synthetic" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Financial Behavior */}
              <FinancialBehaviorSection useSyntheticData={useSyntheticData} />
              
              {/* Cross-Institutional Analysis */}
              <CrossInstitutionalAnalysis useSyntheticData={useSyntheticData} />
            </div>
          </div>
        )}
        
        {/* Financial History Highlights - Full version only */}
        {useSyntheticData && (
          <div className="mt-8">
            <div className="mb-6 flex justify-between items-center">
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
            
            <FinancialHistoryHighlights 
              showBehavioralInsights={showBehavioralInsights} 
              useSyntheticData={useSyntheticData} 
            />
          </div>
        )}
        
        {/* Recommended Next Steps - Full version only */}
        {useSyntheticData && <RecommendedSteps useSyntheticData={useSyntheticData} />}
        
        {/* Top Risks - Full version only */}
        {useSyntheticData && <TopRisks finData={finData} useSyntheticData={useSyntheticData} />}
      </CardContent>
    </Card>
  );
};

export default FinancialOverviewModule;

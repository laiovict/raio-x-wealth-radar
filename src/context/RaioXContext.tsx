
import React, { createContext, useContext, useState } from 'react';
import { 
  RaioXData, 
  RaioXContextProps, 
  RaioXProviderProps,
  FinancialSummary
} from '@/types/raioXTypes';
import { defaultRaioXData, sampleAIInsights } from '@/data/mockRaioXData';
import { generateFinancialSummary } from '@/utils/raioXUtils';
import { useRaioXData } from '@/hooks/useRaioXData';

// Export necessary types for modules to use
export type { FinancialSummary, AIInsight, PortfolioSummary, DividendHistory, ClientSummary } from '@/types/raioXTypes';

// Create context with default values
const RaioXContext = createContext<RaioXContextProps>({
  data: defaultRaioXData,
  hasOpenFinance: false,
  selectedClient: null,
  aiInsights: sampleAIInsights,
  portfolioSummary: undefined,
  profitability: undefined,
  dividendHistory: undefined,
  clientSummary: undefined,
  totalDividends: 0,
  averageMonthlyDividends: 0,
  stocks: [],
  hasOpenFinanceData: false,
  openFinanceAccounts: [],
  openFinanceInvestments: [],
  openFinanceTransactions: [],
  openFinanceInsights: null,
  consolidatedFinancialReport: null
});

export const RaioXProvider = ({ 
  children, 
  hasOpenFinance = false,
  selectedClient = null 
}: RaioXProviderProps) => {
  // State management for AI analysis
  const [isAIAnalysisLoading, setIsAIAnalysisLoading] = useState(false);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary | null>(null);
  
  // Use our new custom hook to fetch all data
  const { 
    portfolioData, 
    totalDividends, 
    averageMonthlyDividends, 
    stocks,
    hasOpenFinanceData,
    openFinanceAccounts,
    openFinanceInvestments,
    openFinanceTransactions,
    openFinanceInsights,
    consolidatedFinancialReport
  } = useRaioXData(selectedClient);
  
  // Function to refresh AI analysis
  const refreshAIAnalysis = () => {
    setIsAIAnalysisLoading(true);
    setTimeout(() => {
      setIsAIAnalysisLoading(false);
    }, 1500);
  };
  
  // Generate financial summary when portfolio summary changes
  React.useEffect(() => {
    if (portfolioData.portfolioSummary) {
      const newFinancialSummary = generateFinancialSummary(
        portfolioData.portfolioSummary, 
        portfolioData.dividendHistory
      );
      setFinancialSummary(newFinancialSummary);
    }
  }, [portfolioData.portfolioSummary, portfolioData.dividendHistory]);
  
  return (
    <RaioXContext.Provider
      value={{
        hasOpenFinance,
        data: portfolioData,
        selectedClient,
        financialSummary,
        isAIAnalysisLoading,
        refreshAIAnalysis,
        aiInsights: sampleAIInsights,
        portfolioSummary: portfolioData.portfolioSummary,
        profitability: portfolioData.profitability,
        dividendHistory: portfolioData.dividendHistory,
        clientSummary: portfolioData.clientSummary,
        totalDividends,
        averageMonthlyDividends,
        stocks,
        hasOpenFinanceData,
        openFinanceAccounts,
        openFinanceInvestments,
        openFinanceTransactions,
        openFinanceInsights,
        consolidatedFinancialReport
      }}
    >
      {children}
    </RaioXContext.Provider>
  );
};

export const useRaioX = () => useContext(RaioXContext);

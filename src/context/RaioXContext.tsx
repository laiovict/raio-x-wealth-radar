import React, { createContext, useContext, useState } from 'react';
import { 
  RaioXData, 
  RaioXContextProps, 
  RaioXProviderProps,
  FinancialSummary, // Keep existing import
  Allocation,
  Liquidity,
  AIInsight,
  PortfolioSummary,
  DividendHistory, 
  ClientSummary
} from '@/types/raioXTypes';
import { defaultRaioXData, sampleAIInsights } from '@/data/mockRaioXData';
import { generateFinancialSummary } from '@/utils/raioXUtils';
import { useRaioXData } from '@/hooks/useRaioXData';

// Export necessary types for modules to use
export type { FinancialSummary as FinancialSummaryType, AIInsight, PortfolioSummary, DividendHistory, ClientSummary, Allocation, Liquidity } from '@/types/raioXTypes'; // Renamed to avoid conflict

// Define an extended FinancialSummary type locally if raioXTypes.ts is read-only
interface ExtendedFinancialSummary extends FinancialSummary {
  annualDividendsThisYear?: number;
}

// Ensure sample AI insights have the required properties for timestamp
const enhancedAIInsights: AIInsight[] = sampleAIInsights.map(insight => ({
  ...insight,
  timestamp: new Date(),
  isNew: Math.random() > 0.7,
  priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)] as 'high' | 'medium' | 'low',
  agent: ['planner', 'investor', 'farmer', 'insurancer', 'credit'][Math.floor(Math.random() * 5)] as 'planner' | 'investor' | 'farmer' | 'insurancer' | 'credit'
}));

// Create default allocation and liquidity data
const defaultAllocation: Allocation = {
  current: {
    "Renda Fixa": 45,
    "Ações BR": 25,
    "Fundos": 20,
    "Caixa": 10,
    total: 100
  },
  recommended: {
    "Renda Fixa": 30,
    "Ações BR": 30,
    "Fundos": 15,
    "Internacional": 15,
    "Caixa": 10
  }
};

const defaultLiquidity: Liquidity = {
  currentIdle: 50000,
  recommended: 60000,
  difference: -10000,
  currentIdleMonths: 4,
  recommendedMonths: 6
};

// Set default projection data
const defaultProjection = {
  currentTotal: 100000,
  monthlyContribution: 2000,
  scenarios: {
    base: { "1 ano": 120000, "3 anos": 180000, "5 anos": 250000 },
    stress: { "1 ano": 110000, "3 anos": 150000, "5 anos": 200000 }
  }
};

// Extended default data
const extendedDefaultData: RaioXData = {
  ...defaultRaioXData,
  allocation: defaultAllocation,
  liquidity: defaultLiquidity,
  projection: defaultProjection,
  clientAge: 35,
  recommendations: [],
  sentiment: {
    overallScore: 75,
    categories: {
      investment: 80,
      planning: 70,
      protection: 75
    }
  }
};

// Create context with default values
const RaioXContext = createContext<RaioXContextProps & { annualDividendsThisYear?: number }>({
  data: extendedDefaultData,
  hasOpenFinance: false,
  selectedClient: null,
  aiInsights: enhancedAIInsights,
  portfolioSummary: undefined,
  profitability: undefined,
  dividendHistory: undefined,
  clientSummary: undefined,
  totalDividends: 0,
  averageMonthlyDividends: 0,
  annualDividendsThisYear: 0,
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
  const [financialSummary, setFinancialSummary] = useState<ExtendedFinancialSummary | null>(null);
  
  // Use our new custom hook to fetch all data
  const { 
    portfolioData, 
    totalDividends, 
    averageMonthlyDividends,
    annualDividendsThisYear,
    stocks,
    hasOpenFinanceData,
    openFinanceAccounts,
    openFinanceInvestments,
    openFinanceTransactions,
    openFinanceInsights,
    consolidatedFinancialReport
  } = useRaioXData(selectedClient ? Number(selectedClient) : null);
  
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

      // Add missing properties required for FinancialOverviewModule
      const enhancedFinancialSummary: ExtendedFinancialSummary = {
        ...newFinancialSummary,
        netWorth: parseFloat(String(portfolioData.portfolioSummary?.total_portfolio_value || "0")) - 0,
        monthlyIncome: 12000,
        monthlyExpenses: 8000,
        totalLiabilities: 0,
        savingsRate: 25,
        liquidAssets: parseFloat(String(portfolioData.portfolioSummary?.fixed_income_value || "0")) * 0.5,
        annualDividendsThisYear: annualDividendsThisYear
      };
      
      setFinancialSummary(enhancedFinancialSummary);
    } else {
      // If no portfolio summary, create a basic summary with annual dividends
      setFinancialSummary({
        totalAssets: 0,
        totalLiabilities: 0,
        netWorth: 0,
        monthlyIncome: 0,
        monthlyExpenses: 0,
        savingsRate: 0,
        liquidAssets: 0,
        debtToIncomeRatio: 0,
        emergencyFundCoverage: 0,
        investmentGrowthRate: 0,
        annualDividendsThisYear: annualDividendsThisYear,
        dataSource: 'synthetic'
      });
    }
  }, [portfolioData.portfolioSummary, portfolioData.dividendHistory, annualDividendsThisYear]);

  // Ensure portfolioData includes all required properties
  const enhancedPortfolioData: RaioXData = {
    ...portfolioData,
    allocation: portfolioData.allocation || defaultAllocation,
    liquidity: portfolioData.liquidity || defaultLiquidity,
    projection: portfolioData.projection || defaultProjection,
    clientAge: 35,
    recommendations: portfolioData.recommendations || [],
    financialSummary: financialSummary || undefined,
    sentiment: portfolioData.sentiment || {
      overallScore: 75,
      categories: {
        investment: 80,
        planning: 70,
        protection: 75
      }
    }
  };
  
  return (
    <RaioXContext.Provider
      value={{
        hasOpenFinance,
        data: enhancedPortfolioData,
        selectedClient,
        financialSummary,
        isAIAnalysisLoading,
        refreshAIAnalysis,
        aiInsights: enhancedAIInsights,
        portfolioSummary: portfolioData.portfolioSummary,
        profitability: portfolioData.profitability,
        dividendHistory: portfolioData.dividendHistory,
        clientSummary: portfolioData.clientSummary,
        totalDividends,
        averageMonthlyDividends,
        annualDividendsThisYear,
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


import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { 
  RaioXData, 
  RaioXContextProps, 
  RaioXProviderProps,
  FinancialSummary, 
  AIInsight, 
  PortfolioSummary,
  DividendHistory,
  ClientSummary
} from '@/types/raioXTypes';
import { defaultRaioXData, sampleAIInsights } from '@/data/mockRaioXData';
import { generateFinancialSummary, calculateTotalDividends, calculateMonthlyAverageDividends } from '@/utils/raioXUtils';
import { 
  getClientPortfolioSummary, 
  getClientFixedIncome, 
  getClientInvestmentFunds, 
  getClientRealEstate, 
  getClientStocks, 
  getClientProfitability,
  getClientDividendHistory,
  getClientSummary
} from '@/services/portfolioService';

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
  stocks: []
});

export const RaioXProvider = ({ 
  children, 
  hasOpenFinance = false,
  selectedClient = null 
}: RaioXProviderProps) => {
  const [isAIAnalysisLoading, setIsAIAnalysisLoading] = useState(false);
  const [financialSummary, setFinancialSummary] = useState<FinancialSummary | null>(null);
  const [portfolioData, setPortfolioData] = useState<RaioXData>(defaultRaioXData);
  const [totalDividends, setTotalDividends] = useState<number>(0);
  const [averageMonthlyDividends, setAverageMonthlyDividends] = useState<number>(0);
  const [stocks, setStocks] = useState<any[]>([]);
  
  // Function to refresh AI analysis
  const refreshAIAnalysis = () => {
    setIsAIAnalysisLoading(true);
    setTimeout(() => {
      setIsAIAnalysisLoading(false);
    }, 1500);
  };
  
  // Fetch real data when the selectedClient changes
  useEffect(() => {
    const fetchClientData = async () => {
      if (!selectedClient) return;
      
      try {
        // Fetch the client's portfolio data
        const summary = await getClientPortfolioSummary(selectedClient);
        const fixedIncome = await getClientFixedIncome(selectedClient);
        const investmentFunds = await getClientInvestmentFunds(selectedClient);
        const realEstate = await getClientRealEstate(selectedClient);
        const stocks = await getClientStocks(selectedClient);
        const profitability = await getClientProfitability(selectedClient);
        const dividendHistory = await getClientDividendHistory(selectedClient);
        const clientSummary = await getClientSummary(selectedClient);
        
        // Store stocks for other components to use
        if (stocks && stocks.length) {
          setStocks(stocks);
          console.log("Fetched stocks data:", stocks);
        }
        
        // Calculate dividend totals
        if (dividendHistory && dividendHistory.length > 0) {
          try {
            const totalDivs = calculateTotalDividends(dividendHistory);
            const avgMonthlyDivs = calculateMonthlyAverageDividends(dividendHistory);
            
            setTotalDividends(totalDivs);
            setAverageMonthlyDividends(avgMonthlyDivs);
            
            console.log("Dividend calculations:", {
              totalDividends: totalDivs,
              avgMonthlyDividends: avgMonthlyDivs,
              dividendCount: dividendHistory.length
            });
          } catch (error) {
            console.error("Error calculating dividend stats:", error);
          }
        }
        
        // Update portfolio data with real values from Supabase
        if (summary || fixedIncome.length || investmentFunds.length || realEstate.length || stocks.length || profitability || dividendHistory.length || clientSummary) {
          setPortfolioData(prevData => {
            // Update portfolio data
            const newData = {
              ...prevData,
              portfolioSummary: summary,
              fixedIncome: fixedIncome || [],
              investmentFunds: investmentFunds || [],
              realEstate: realEstate || [],
              stocks: stocks || [],
              profitability,
              dividendHistory: dividendHistory || [],
              clientSummary
            };
            
            // If we have client summary data, update the client name
            if (clientSummary && clientSummary.investor_name) {
              newData.clientName = clientSummary.investor_name;
            }
            
            return newData;
          });
        }
        
        // Generate financial summary based on real data if available
        if (summary) {
          const newFinancialSummary = generateFinancialSummary(summary, dividendHistory);
          setFinancialSummary(newFinancialSummary);
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };
    
    fetchClientData();
  }, [selectedClient]);
  
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
        stocks
      }}
    >
      {children}
    </RaioXContext.Provider>
  );
};

export const useRaioX = () => useContext(RaioXContext);

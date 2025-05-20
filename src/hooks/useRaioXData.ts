
import { useState, useEffect } from 'react';
import { 
  getClientPortfolioSummary, 
  getClientFixedIncome, 
  getClientInvestmentFunds, 
  getClientRealEstate, 
  getClientStocks, 
  getClientProfitability,
  getClientDividendHistory,
  getClientSummary,
  calculateTotalDividends,
  calculateMonthlyAverageDividends,
  generateConsolidatedFinancialReport
} from '@/services/portfolioService';

import {
  getClientOpenFinanceAccounts,
  getClientOpenFinanceInvestments,
  getClientOpenFinanceTransactions,
  generateOpenFinanceInsights
} from '@/services/openFinanceService';

import { 
  RaioXData, 
  PortfolioSummary,
  DividendHistory
} from '@/types/raioXTypes';
import { defaultRaioXData } from '@/data/mockRaioXData';

interface UseRaioXDataReturn {
  portfolioData: RaioXData;
  isLoading: boolean;
  totalDividends: number;
  averageMonthlyDividends: number;
  stocks: any[];
  hasOpenFinanceData: boolean;
  openFinanceAccounts: string[];
  openFinanceInvestments: any[];
  openFinanceTransactions: any[];
  openFinanceInsights: any;
  consolidatedFinancialReport: any;
}

/**
 * Custom hook to fetch all Raio-X data from Supabase
 */
export const useRaioXData = (selectedClient: number | null): UseRaioXDataReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<RaioXData>(defaultRaioXData);
  const [totalDividends, setTotalDividends] = useState<number>(0);
  const [averageMonthlyDividends, setAverageMonthlyDividends] = useState<number>(0);
  const [stocks, setStocks] = useState<any[]>([]);
  
  // OpenFinance related states
  const [hasOpenFinanceData, setHasOpenFinanceData] = useState<boolean>(false);
  const [openFinanceAccounts, setOpenFinanceAccounts] = useState<string[]>([]);
  const [openFinanceInvestments, setOpenFinanceInvestments] = useState<any[]>([]);
  const [openFinanceTransactions, setOpenFinanceTransactions] = useState<any[]>([]);
  const [openFinanceInsights, setOpenFinanceInsights] = useState<any>(null);
  const [consolidatedFinancialReport, setConsolidatedFinancialReport] = useState<any>(null);

  useEffect(() => {
    const fetchClientData = async () => {
      if (!selectedClient) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
      try {
        // Fetch the XP portfolio data
        const summary = await getClientPortfolioSummary(selectedClient);
        const fixedIncome = await getClientFixedIncome(selectedClient);
        const investmentFunds = await getClientInvestmentFunds(selectedClient);
        const realEstate = await getClientRealEstate(selectedClient);
        const stocks = await getClientStocks(selectedClient);
        const profitability = await getClientProfitability(selectedClient);
        const dividendHistory = await getClientDividendHistory(selectedClient);
        const clientSummary = await getClientSummary(selectedClient);
        
        // Fetch OpenFinance data
        const openFinanceAccounts = await getClientOpenFinanceAccounts(selectedClient);
        setOpenFinanceAccounts(openFinanceAccounts);
        
        // Check if we have OpenFinance accounts
        if (openFinanceAccounts && openFinanceAccounts.length > 0) {
          console.log(`Found ${openFinanceAccounts.length} OpenFinance accounts for client ${selectedClient}`);
          
          // Fetch OpenFinance investments (excluding XP to avoid duplication)
          const openFinanceInvestments = await getClientOpenFinanceInvestments(selectedClient);
          setOpenFinanceInvestments(openFinanceInvestments);
          
          // Fetch OpenFinance transactions
          const openFinanceTransactions = await getClientOpenFinanceTransactions(selectedClient, 500);
          setOpenFinanceTransactions(openFinanceTransactions);
          
          // Generate financial insights from OpenFinance transactions
          const openFinanceInsights = await generateOpenFinanceInsights(selectedClient);
          setOpenFinanceInsights(openFinanceInsights);
          
          // Set hasOpenFinanceData flag
          setHasOpenFinanceData(
            openFinanceAccounts.length > 0 && 
            (openFinanceInvestments.length > 0 || openFinanceTransactions.length > 0)
          );
        } else {
          setHasOpenFinanceData(false);
        }
        
        // Generate consolidated financial report
        const consolidatedReport = await generateConsolidatedFinancialReport(selectedClient);
        setConsolidatedFinancialReport(consolidatedReport);
        
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
        const hasRealData = summary || fixedIncome.length || investmentFunds.length || 
                            realEstate.length || stocks.length || profitability || 
                            dividendHistory.length || clientSummary;
        
        if (hasRealData) {
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
              clientSummary,
              // Add OpenFinance data to the portfolio data
              openFinanceData: {
                hasOpenFinanceData,
                openFinanceAccounts,
                openFinanceInvestments: openFinanceInvestments || [],
                openFinanceTransactions: openFinanceTransactions || [],
                openFinanceInsights,
              },
              // Add financial insights based on OpenFinance data
              financialInsightData: openFinanceInsights || prevData.financialInsightData
            };
            
            // If we have client summary data, update the client name
            if (clientSummary && clientSummary.investor_name) {
              newData.clientName = clientSummary.investor_name;
            }
            
            return newData;
          });
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClientData();
  }, [selectedClient]);

  return {
    portfolioData,
    isLoading,
    totalDividends,
    averageMonthlyDividends,
    stocks,
    hasOpenFinanceData,
    openFinanceAccounts,
    openFinanceInvestments,
    openFinanceTransactions,
    openFinanceInsights,
    consolidatedFinancialReport
  };
};

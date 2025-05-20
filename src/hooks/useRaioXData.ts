
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
import { toNumber } from '@/utils/typeConversionHelpers';

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
        const stocksData = await getClientStocks(selectedClient);
        const profitability = await getClientProfitability(selectedClient);
        const dividendHistory = await getClientDividendHistory(selectedClient);
        const clientSummary = await getClientSummary(selectedClient);
        
        console.log("Client summary:", clientSummary);
        
        // Try to get client name from summary or use default
        const clientName = clientSummary?.investor_name || `Cliente ${selectedClient}`;
        
        // Store actual stocks data to avoid sharing the state name
        if (stocksData && stocksData.length) {
          setStocks(stocksData);
          console.log("Fetched stocks data:", stocksData);
        }
        
        // Calculate dividend totals from real data if available
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
            // Use default values if calculation fails
            setTotalDividends(0);
            setAverageMonthlyDividends(0);
          }
        }
        
        // Fetch OpenFinance data
        const openFinanceAccounts = await getClientOpenFinanceAccounts(selectedClient);
        setOpenFinanceAccounts(openFinanceAccounts);
        
        // Check if we have OpenFinance accounts
        if (openFinanceAccounts && openFinanceAccounts.length > 0) {
          console.log(`Found ${openFinanceAccounts.length} OpenFinance accounts for client ${selectedClient}`);
          
          // Fetch OpenFinance investments
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
        
        // Check if we have any real data from Supabase
        const hasRealData = summary || 
                          (fixedIncome && fixedIncome.length) || 
                          (investmentFunds && investmentFunds.length) || 
                          (realEstate && realEstate.length) || 
                          (stocksData && stocksData.length) || 
                          profitability || 
                          (dividendHistory && dividendHistory.length) || 
                          clientSummary;
        
        if (hasRealData) {
          // Update portfolio data with real values from Supabase
          setPortfolioData(prevData => {
            // Create new portfolio data object
            return {
              ...prevData,
              clientName,
              portfolioSummary: summary,
              fixedIncome: fixedIncome || [],
              investmentFunds: investmentFunds || [],
              realEstate: realEstate || [],
              stocks: stocksData || [],
              profitability,
              dividendHistory: dividendHistory || [],
              clientSummary,
              // Add OpenFinance data
              openFinanceData: {
                hasOpenFinanceData,
                openFinanceAccounts,
                openFinanceInvestments: openFinanceInvestments || [],
                openFinanceTransactions: openFinanceTransactions || [],
                openFinanceInsights,
              },
              // Add financial insights based on OpenFinance data if available
              financialInsightData: hasOpenFinanceData && openFinanceInsights 
                ? openFinanceInsights 
                : prevData.financialInsightData,
              // Track OpenFinance status
              hasOpenFinance: hasOpenFinanceData
            };
          });
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
        // On error, revert to default data but preserve client info
        setPortfolioData(prevData => ({
          ...defaultRaioXData,
          clientName: `Cliente ${selectedClient}`,
          hasOpenFinance: false
        }));
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

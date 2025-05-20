
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
        let openFinanceAccounts: string[] = [];
        try {
          openFinanceAccounts = await getClientOpenFinanceAccounts(selectedClient);
          setOpenFinanceAccounts(openFinanceAccounts);
        } catch (error) {
          console.error("Error fetching OpenFinance accounts:", error);
          openFinanceAccounts = [];
          setOpenFinanceAccounts([]);
        }
        
        // Check if we have OpenFinance accounts
        let hasOFData = false;
        let ofInvestments: any[] = [];
        let ofTransactions: any[] = [];
        let ofInsights = null;
        
        if (openFinanceAccounts && openFinanceAccounts.length > 0) {
          console.log(`Found ${openFinanceAccounts.length} OpenFinance accounts for client ${selectedClient}`);
          
          try {
            // Fetch OpenFinance investments
            ofInvestments = await getClientOpenFinanceInvestments(selectedClient);
            setOpenFinanceInvestments(ofInvestments);
            
            // Fetch OpenFinance transactions
            ofTransactions = await getClientOpenFinanceTransactions(selectedClient, 500);
            setOpenFinanceTransactions(ofTransactions);
            
            // Generate financial insights from OpenFinance transactions
            ofInsights = await generateOpenFinanceInsights(selectedClient);
            setOpenFinanceInsights(ofInsights);
            
            // Set hasOpenFinanceData flag
            hasOFData = openFinanceAccounts.length > 0 && 
                    (ofInvestments.length > 0 || ofTransactions.length > 0);
            setHasOpenFinanceData(hasOFData);
          } catch (error) {
            console.error("Error fetching OpenFinance data:", error);
            hasOFData = false;
            setHasOpenFinanceData(false);
          }
        } else {
          hasOFData = false;
          setHasOpenFinanceData(false);
        }
        
        // Generate consolidated financial report
        let consolidatedReport = null;
        try {
          consolidatedReport = await generateConsolidatedFinancialReport(selectedClient);
          setConsolidatedFinancialReport(consolidatedReport);
        } catch (error) {
          console.error("Error generating consolidated financial report:", error);
          consolidatedReport = null;
          setConsolidatedFinancialReport(null);
        }
        
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
              portfolioSummary: summary || prevData.portfolioSummary,
              fixedIncome: fixedIncome || [],
              investmentFunds: investmentFunds || [],
              realEstate: realEstate || [],
              stocks: stocksData || [],
              profitability: profitability || prevData.profitability,
              dividendHistory: dividendHistory || [],
              clientSummary,
              // Add OpenFinance data
              openFinanceData: {
                hasOpenFinanceData: hasOFData,
                openFinanceAccounts: openFinanceAccounts || [],
                openFinanceInvestments: ofInvestments || [],
                openFinanceTransactions: ofTransactions || [],
                openFinanceInsights: ofInsights,
              },
              // Add financial insights based on OpenFinance data if available
              financialInsightData: hasOFData && ofInsights 
                ? ofInsights 
                : prevData.financialInsightData,
              // Track OpenFinance status
              hasOpenFinance: hasOFData
            };
          });
        } else {
          // If we don't have real data, use default data with client ID
          setPortfolioData(prevData => ({
            ...defaultRaioXData,
            clientName: `Cliente ${selectedClient}`,
            openFinanceData: {
              hasOpenFinanceData: hasOFData,
              openFinanceAccounts: openFinanceAccounts || [],
              openFinanceInvestments: ofInvestments || [],
              openFinanceTransactions: ofTransactions || [],
              openFinanceInsights: ofInsights,
            },
            financialInsightData: hasOFData && ofInsights 
              ? ofInsights 
              : prevData.financialInsightData,
            hasOpenFinance: hasOFData
          }));
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

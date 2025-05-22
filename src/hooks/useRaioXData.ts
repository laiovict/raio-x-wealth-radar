import { useState, useEffect } from 'react';
import { 
  calculateTotalDividends,
  calculateMonthlyAverageDividends
} from '@/services/portfolioService';

import { defaultRaioXData } from '@/data/mockRaioXData';
import { toNumber, ensureNumber } from '@/utils/typeConversionHelpers';
import { removeDuplicateDividends } from '@/utils/portfolioHelpers';
import { RaioXData, DividendHistory, PortfolioSummaryHistoryEntry } from '@/types/raioXTypes';
import { useClientData } from '@/hooks/useClientData';
import { useOpenFinanceData } from '@/hooks/useOpenFinanceData';

interface UseRaioXDataReturn {
  portfolioData: RaioXData;
  isLoading: boolean;
  totalDividends: number;
  averageMonthlyDividends: number;
  annualDividendsThisYear: number;
  stocks: any[];
  hasOpenFinanceData: boolean;
  openFinanceAccounts: any[];
  openFinanceInvestments: any[];
  openFinanceTransactions: any[];
  openFinanceInsights: any;
  consolidatedFinancialReport: any;
  error: string | null;
}

const getYearFromPaymentDate = (paymentDateStr: string | null | undefined): number | null => {
  if (!paymentDateStr) return null;
  const datePart = paymentDateStr.split(' ')[0];
  const parts = datePart.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    return isNaN(year) ? null : year;
  }
  return null;
};

/**
 * Custom hook to fetch all Raio-X data from Supabase
 * Handles both clients with and without Open Finance
 */
export const useRaioXData = (selectedClient: number | null): UseRaioXDataReturn => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [portfolioData, setPortfolioData] = useState<RaioXData>(defaultRaioXData);
  const [totalDividends, setTotalDividends] = useState<number>(0);
  const [averageMonthlyDividendsState, setAverageMonthlyDividendsState] = useState<number>(0);
  const [annualDividendsThisYear, setAnnualDividendsThisYear] = useState<number>(0);

  // Use our refactored hooks to fetch data
  const {
    clientPortfolioSummary,
    clientFixedIncome,
    clientInvestmentFunds,
    clientRealEstate,
    clientStocks,
    clientProfitability,
    clientDividendHistory,
    dedupedDividendHistory,
    clientSummary,
    clientPortfolioSummaryHistory,
    isLoading: isLoadingClient
  } = useClientData(selectedClient);
  
  const {
    openFinanceAccounts,
    openFinanceInvestments,
    openFinanceTransactions,
    openFinanceInsights,
    consolidatedFinancialReport,
    hasOpenFinanceData,
    isLoading: isLoadingOpenFinance
  } = useOpenFinanceData(selectedClient);

  useEffect(() => {
    // Don't process until all data is loaded
    if (isLoadingClient || isLoadingOpenFinance) {
      setIsLoading(true);
      return;
    }
    
    try {
      // Try to get client name from summary or use default
      const clientName = clientSummary?.investor_name || (selectedClient ? `Cliente ${selectedClient}` : defaultRaioXData.clientName);
      
      // Calculate dividend totals from real data if available
      if (dedupedDividendHistory && dedupedDividendHistory.length > 0) {
        try {
          const totalDivs = calculateTotalDividends(dedupedDividendHistory);
          const avgMonthlyDivs = calculateMonthlyAverageDividends(dedupedDividendHistory);
          
          setTotalDividends(ensureNumber(totalDivs));
          setAverageMonthlyDividendsState(ensureNumber(avgMonthlyDivs));

          // Calculate annual dividends for the current year
          const currentYear = new Date().getFullYear();
          const currentYearDividends = dedupedDividendHistory.reduce((sum, dividend) => {
            const paymentYear = getYearFromPaymentDate(dividend.payment_date);
            if (paymentYear === currentYear) {
              return sum + ensureNumber(dividend.value);
            }
            return sum;
          }, 0);
          setAnnualDividendsThisYear(currentYearDividends);
          
          console.log("Dividend calculations:", {
            totalDividends: totalDivs,
            avgMonthlyDividends: avgMonthlyDivs,
            annualDividendsThisYear: currentYearDividends,
            dividendCount: dedupedDividendHistory.length
          });
        } catch (error) {
          console.error("Error calculating dividend stats:", error);
          // Use default values if calculation fails
          setTotalDividends(0);
          setAverageMonthlyDividendsState(0);
          setAnnualDividendsThisYear(0);
        }
      } else {
        setTotalDividends(0);
        setAverageMonthlyDividendsState(0);
        setAnnualDividendsThisYear(0);
      }
      
      // Check if we have any real data from Supabase
      const hasRealClientData = clientPortfolioSummary || 
                            (clientFixedIncome && clientFixedIncome.length > 0) || 
                            (clientInvestmentFunds && clientInvestmentFunds.length > 0) || 
                            (clientRealEstate && clientRealEstate.length > 0) || 
                            (clientStocks && clientStocks.length > 0) || 
                            clientProfitability || 
                            (dedupedDividendHistory && dedupedDividendHistory.length > 0) || 
                            clientSummary ||
                            (clientPortfolioSummaryHistory && clientPortfolioSummaryHistory.length > 0);
      
      if (hasRealClientData) {
        // Update portfolio data with real values from Supabase
        setPortfolioData(prevData => {
          // Create new portfolio data object
          return {
            ...prevData,
            clientName,
            portfolioSummary: clientPortfolioSummary || prevData.portfolioSummary,
            portfolioSummaryHistory: clientPortfolioSummaryHistory || [], // Add history here
            fixedIncome: clientFixedIncome || [],
            investmentFunds: clientInvestmentFunds || [],
            realEstate: clientRealEstate || [],
            stocks: clientStocks || [],
            profitability: clientProfitability || prevData.profitability,
            dividendHistory: dedupedDividendHistory || [],
            clientSummary: clientSummary || prevData.clientSummary,
            // Add OpenFinance data if available
            openFinanceData: {
              hasOpenFinanceData,
              openFinanceAccounts: openFinanceAccounts || [],
              openFinanceInvestments: openFinanceInvestments || [],
              openFinanceTransactions: openFinanceTransactions || [],
              openFinanceInsights: openFinanceInsights,
            },
            // Add financial insights based on OpenFinance data if available
            financialInsightData: hasOpenFinanceData && openFinanceInsights 
              ? openFinanceInsights 
              : prevData.financialInsightData,
            // Track OpenFinance status
            hasOpenFinance: hasOpenFinanceData
          };
        });
      } else {
        // If we don't have real data, use default data with client ID
        setPortfolioData(prevData => ({
          ...defaultRaioXData,
          clientName: selectedClient ? `Cliente ${selectedClient}` : defaultRaioXData.clientName,
          portfolioSummaryHistory: clientPortfolioSummaryHistory || [], // Also add here for default case
          openFinanceData: {
            hasOpenFinanceData,
            openFinanceAccounts: openFinanceAccounts || [],
            openFinanceInvestments: openFinanceInvestments || [],
            openFinanceTransactions: openFinanceTransactions || [],
            openFinanceInsights: openFinanceInsights,
          },
          financialInsightData: hasOpenFinanceData && openFinanceInsights 
            ? openFinanceInsights 
            : prevData.financialInsightData,
          hasOpenFinance: hasOpenFinanceData
        }));
      }
    } catch (error) {
      console.error("Error preparing RaioX data:", error);
      setError("Failed to process client data. Please try again later.");
      
      // On error, revert to default data but preserve client info
      setPortfolioData(prevData => ({
        ...defaultRaioXData,
        clientName: selectedClient ? `Cliente ${selectedClient}` : defaultRaioXData.clientName,
        hasOpenFinance: false
      }));
    } finally {
      setIsLoading(false);
    }
  }, [
    isLoadingClient, 
    isLoadingOpenFinance, 
    selectedClient, 
    clientPortfolioSummary,
    clientFixedIncome,
    clientInvestmentFunds,
    clientRealEstate,
    clientStocks,
    clientProfitability,
    dedupedDividendHistory,
    clientSummary,
    clientPortfolioSummaryHistory, // Add to dependency array
    openFinanceAccounts,
    openFinanceInvestments,
    openFinanceTransactions,
    openFinanceInsights,
    consolidatedFinancialReport,
    hasOpenFinanceData
  ]);

  return {
    portfolioData,
    isLoading,
    totalDividends,
    averageMonthlyDividends: averageMonthlyDividendsState,
    annualDividendsThisYear,
    stocks: clientStocks || [],
    hasOpenFinanceData,
    openFinanceAccounts,
    openFinanceInvestments,
    openFinanceTransactions,
    openFinanceInsights,
    consolidatedFinancialReport,
    error
  };
};

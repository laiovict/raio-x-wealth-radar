
import { useState, useEffect } from 'react';
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
import { 
  RaioXData, 
  PortfolioSummary,
  DividendHistory
} from '@/types/raioXTypes';
import { calculateTotalDividends, calculateMonthlyAverageDividends } from '@/utils/raioXUtils';
import { defaultRaioXData } from '@/data/mockRaioXData';

interface UseRaioXDataReturn {
  portfolioData: RaioXData;
  isLoading: boolean;
  totalDividends: number;
  averageMonthlyDividends: number;
  stocks: any[];
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

  useEffect(() => {
    const fetchClientData = async () => {
      if (!selectedClient) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      
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
    stocks
  };
};

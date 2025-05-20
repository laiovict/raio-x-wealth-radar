
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

import { toNumber } from '@/utils/typeConversionHelpers';
import { removeDuplicateDividends } from '@/utils/portfolioHelpers';
import { DividendHistory } from '@/types/raioXTypes';

interface UseClientDataReturn {
  clientPortfolioSummary: any;
  clientFixedIncome: any[];
  clientInvestmentFunds: any[];
  clientRealEstate: any[];
  clientStocks: any[];
  clientProfitability: any;
  clientDividendHistory: DividendHistory[];
  dedupedDividendHistory: DividendHistory[];
  clientSummary: any;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch all client data from Supabase
 * (Basic XP data, not Open Finance)
 */
export const useClientData = (clientId: number | null): UseClientDataReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [clientPortfolioSummary, setClientPortfolioSummary] = useState<any>(null);
  const [clientFixedIncome, setClientFixedIncome] = useState<any[]>([]);
  const [clientInvestmentFunds, setClientInvestmentFunds] = useState<any[]>([]);
  const [clientRealEstate, setClientRealEstate] = useState<any[]>([]);
  const [clientStocks, setClientStocks] = useState<any[]>([]);
  const [clientProfitability, setClientProfitability] = useState<any>(null);
  const [clientDividendHistory, setClientDividendHistory] = useState<DividendHistory[]>([]);
  const [dedupedDividendHistory, setDedupedDividendHistory] = useState<DividendHistory[]>([]);
  const [clientSummary, setClientSummary] = useState<any>(null);
  
  useEffect(() => {
    const fetchClientData = async () => {
      if (!clientId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch portfolio data in parallel for efficiency
        const [
          summary,
          fixedIncome,
          investmentFunds,
          realEstate,
          stocks,
          profitability,
          dividendHistory,
          clientInfo
        ] = await Promise.all([
          getClientPortfolioSummary(clientId),
          getClientFixedIncome(clientId),
          getClientInvestmentFunds(clientId),
          getClientRealEstate(clientId),
          getClientStocks(clientId),
          getClientProfitability(clientId),
          getClientDividendHistory(clientId),
          getClientSummary(clientId)
        ]);
        
        // Store fetched data
        setClientPortfolioSummary(summary);
        setClientFixedIncome(fixedIncome || []);
        setClientInvestmentFunds(investmentFunds || []);
        setClientRealEstate(realEstate || []);
        setClientStocks(stocks || []);
        setClientProfitability(profitability);
        setClientDividendHistory(dividendHistory || []);
        
        // Remove duplicates from dividend history as per requirements
        const deduped = removeDuplicateDividends(dividendHistory || []);
        setDedupedDividendHistory(deduped);
        
        setClientSummary(clientInfo);
        
      } catch (err) {
        console.error("Error fetching client data:", err);
        setError("Failed to load client data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClientData();
  }, [clientId]);
  
  return {
    clientPortfolioSummary,
    clientFixedIncome,
    clientInvestmentFunds,
    clientRealEstate,
    clientStocks,
    clientProfitability,
    clientDividendHistory,
    dedupedDividendHistory,
    clientSummary,
    isLoading,
    error
  };
};

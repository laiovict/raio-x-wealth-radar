
import { useState, useEffect } from 'react';
import { toNumber } from '@/utils/typeConversionHelpers';
import { 
  getClientOpenFinanceAccounts,
  getClientOpenFinanceInvestments,
  getClientOpenFinanceTransactions,
  generateOpenFinanceInsights,
  generateConsolidatedFinancialReport
} from '@/services/openFinanceService';

interface UseOpenFinanceDataReturn {
  openFinanceAccounts: string[];
  openFinanceInvestments: any[];
  openFinanceTransactions: any[];
  openFinanceInsights: any;
  consolidatedFinancialReport: any;
  hasOpenFinanceData: boolean;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch all Open Finance data for a client
 */
export const useOpenFinanceData = (clientId: number | string | null): UseOpenFinanceDataReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasOpenFinanceData, setHasOpenFinanceData] = useState<boolean>(false);
  
  const [openFinanceAccounts, setOpenFinanceAccounts] = useState<string[]>([]);
  const [openFinanceInvestments, setOpenFinanceInvestments] = useState<any[]>([]);
  const [openFinanceTransactions, setOpenFinanceTransactions] = useState<any[]>([]);
  const [openFinanceInsights, setOpenFinanceInsights] = useState<any>(null);
  const [consolidatedFinancialReport, setConsolidatedFinancialReport] = useState<any>(null);
  
  useEffect(() => {
    const fetchOpenFinanceData = async () => {
      if (!clientId) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Convert clientId to number
        const numClientId = toNumber(clientId);
        
        // First, check if the client has any Open Finance accounts
        const accounts = await getClientOpenFinanceAccounts(numClientId);
        setOpenFinanceAccounts(accounts);
        
        // If no accounts, there's no Open Finance data
        if (!accounts || accounts.length === 0) {
          setHasOpenFinanceData(false);
          setIsLoading(false);
          return;
        }
        
        // Fetch Open Finance data in parallel
        const [
          investments,
          transactions,
          insights,
          report
        ] = await Promise.all([
          getClientOpenFinanceInvestments(numClientId),
          getClientOpenFinanceTransactions(numClientId, 500),
          generateOpenFinanceInsights(numClientId),
          generateConsolidatedFinancialReport(numClientId)
        ]);
        
        setOpenFinanceInvestments(investments || []);
        setOpenFinanceTransactions(transactions || []);
        setOpenFinanceInsights(insights);
        setConsolidatedFinancialReport(report);
        
        // Set flag based on whether we actually got data
        setHasOpenFinanceData(
          accounts.length > 0 && 
          (investments?.length > 0 || transactions?.length > 0)
        );
        
      } catch (err) {
        console.error("Error fetching Open Finance data:", err);
        setError("Failed to load Open Finance data. Please try again later.");
        setHasOpenFinanceData(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOpenFinanceData();
  }, [clientId]);
  
  return {
    openFinanceAccounts,
    openFinanceInvestments,
    openFinanceTransactions,
    openFinanceInsights,
    consolidatedFinancialReport,
    hasOpenFinanceData,
    isLoading,
    error
  };
};

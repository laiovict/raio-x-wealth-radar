import { supabase } from "@/integrations/supabase/client";
import { DataSourceType } from '@/types/raioXTypes';

/**
 * Fetches client portfolio summary from the database
 * @param clientId Client account ID
 * @returns Portfolio summary data
 */
export const getClientPortfolioSummary = async (clientId: number | null) => {
  if (!clientId) return null;
  
  try {
    const { data, error } = await supabase
      .from('investor_portfolio_summary')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching portfolio summary:", error);
      return null;
    }
    
    // Add dataSource metadata to indicate this is from Supabase
    return data ? { ...data, dataSource: 'supabase' as DataSourceType } : null;
  } catch (error) {
    console.error("Error in portfolio summary fetch:", error);
    return null;
  }
};

/**
 * Fetches client's fixed income investments
 * @param clientId Client account ID
 * @returns Fixed income investments
 */
export const getClientFixedIncome = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('fixed_income')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (error) {
      console.error("Error fetching fixed income:", error);
      return [];
    }
    
    // Add dataSource metadata to each item
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSourceType })) : [];
  } catch (error) {
    console.error("Error in fixed income fetch:", error);
    return [];
  }
};

/**
 * Fetches client's investment funds
 * @param clientId Client account ID
 * @returns Investment funds
 */
export const getClientInvestmentFunds = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('investment_funds')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (error) {
      console.error("Error fetching investment funds:", error);
      return [];
    }
    
    // Add dataSource metadata to each item
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSourceType })) : [];
  } catch (error) {
    console.error("Error in investment funds fetch:", error);
    return [];
  }
};

/**
 * Fetches client's real estate investments
 * @param clientId Client account ID
 * @returns Real estate investments
 */
export const getClientRealEstate = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('real_estate')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (error) {
      console.error("Error fetching real estate:", error);
      return [];
    }
    
    // Add dataSource metadata to each item
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSourceType })) : [];
  } catch (error) {
    console.error("Error in real estate fetch:", error);
    return [];
  }
};

/**
 * Fetches client's stocks
 * @param clientId Client account ID
 * @returns Stocks
 */
export const getClientStocks = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('stocks')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (error) {
      console.error("Error fetching stocks:", error);
      return [];
    }
    
    // Add dataSource metadata to each item
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSourceType })) : [];
  } catch (error) {
    console.error("Error in stocks fetch:", error);
    return [];
  }
};

/**
 * Fetches client's profitability data
 * @param clientId Client account ID
 * @returns Profitability data
 */
export const getClientProfitability = async (clientId: number | null) => {
  if (!clientId) return null;
  
  try {
    const { data, error } = await supabase
      .from('profitability_ytd')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching profitability:", error);
      return null;
    }
    
    // Add dataSource metadata to indicate this is from Supabase
    return data ? { ...data, dataSource: 'supabase' as DataSourceType } : null;
  } catch (error) {
    console.error("Error in profitability fetch:", error);
    return null;
  }
};

/**
 * Fetches client's dividend history, filtering out future unpaid dividends
 * @param clientId Client account ID
 * @returns Dividend history data (only paid dividends)
 */
export const getClientDividendHistory = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('portfolio_earnings_history')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId)
      .order('payment_date', { ascending: false });
    
    if (error) {
      console.error("Error fetching dividend history:", error);
      return [];
    }
    
    if (!data || !data.length) return [];
    
    // Filter out future dividends that haven't been paid yet
    // Only include dividends that have a payment date in the past
    const now = new Date();
    const paidDividends = data.filter(dividend => {
      if (!dividend.payment_date) return true; // Include if no date specified
      
      // Parse date (format: "YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD")
      const parts = dividend.payment_date.split(' ')[0].split('-');
      if (parts.length < 3) return true; // Include if can't parse date
      
      const paymentDate = new Date(
        parseInt(parts[0]), // Year
        parseInt(parts[1]) - 1, // Month (0-indexed)
        parseInt(parts[2]) // Day
      );
      
      return paymentDate <= now; // Only include if payment date is in the past
    });
    
    console.log(`Filtered dividends: ${paidDividends.length} paid out of ${data.length} total`);
    
    // Add dataSource metadata to each item
    return paidDividends.map(item => ({ ...item, dataSource: 'supabase' as DataSourceType }));
  } catch (error) {
    console.error("Error in dividend history fetch:", error);
    return [];
  }
};

/**
 * Fetches client's summary information
 * @param clientId Client account ID
 * @returns Client summary data
 */
export const getClientSummary = async (clientId: number | null) => {
  if (!clientId) return null;
  
  try {
    const { data, error } = await supabase
      .from('investors_summaries')
      .select('*')
      .eq('investor_account_on_brokerage_house', clientId)
      .maybeSingle();
    
    if (error) {
      console.error("Error fetching client summary:", error);
      return null;
    }
    
    // Add dataSource metadata to indicate this is from Supabase
    return data ? { ...data, dataSource: 'supabase' as DataSourceType } : null;
  } catch (error) {
    console.error("Error in client summary fetch:", error);
    return null;
  }
};

/**
 * Fetches client's portfolio summary history
 * @param clientId Client account ID
 * @returns Portfolio summary history data
 */
export const getClientPortfolioSummaryHistory = async (clientId: number | null) => {
  if (!clientId) return [];

  try {
    const { data, error } = await supabase
      .from('investor_portfolio_summary_history')
      .select('updated_at, total_portfolio_value')
      .eq('investor_account_on_brokerage_house', clientId)
      .order('updated_at', { ascending: true });

    if (error) {
      console.error("Error fetching portfolio summary history:", error);
      return [];
    }

    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSourceType })) : [];
  } catch (error) {
    console.error("Error in portfolio summary history fetch:", error);
    return [];
  }
};

export default {
  getClientPortfolioSummary,
  getClientFixedIncome,
  getClientInvestmentFunds,
  getClientRealEstate,
  getClientStocks,
  getClientProfitability,
  getClientDividendHistory,
  getClientSummary,
  getClientPortfolioSummaryHistory
};

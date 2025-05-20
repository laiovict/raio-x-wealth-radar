
import { supabase } from "@/integrations/supabase/client";

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
      .single();
    
    if (error) {
      console.error("Error fetching portfolio summary:", error);
      return null;
    }
    
    return data;
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
    
    return data || [];
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
    
    return data || [];
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
    
    return data || [];
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
    
    return data || [];
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
      .single();
    
    if (error) {
      console.error("Error fetching profitability:", error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Error in profitability fetch:", error);
    return null;
  }
};

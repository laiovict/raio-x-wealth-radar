
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

/**
 * Get OpenFinance accounts for a client
 * @param clientId Client ID to fetch accounts for
 * @returns Array of account IDs
 */
export const getClientOpenFinanceAccounts = async (clientId: number | null): Promise<string[]> => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('investorXOpenFinanceAccount')
      .select('account_id')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (error) {
      console.error('Error fetching OpenFinance accounts:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log(`No OpenFinance accounts found for client ${clientId}`);
      return [];
    }
    
    console.log(`Found ${data.length} OpenFinance accounts for client ${clientId}`);
    return data.map(item => item.account_id);
  } catch (error) {
    console.error('Error in getClientOpenFinanceAccounts:', error);
    return [];
  }
};

/**
 * Get OpenFinance investments for a client
 * @param clientId Client ID to fetch investments for
 * @returns Array of investment objects
 */
export const getClientOpenFinanceInvestments = async (clientId: number | null): Promise<any[]> => {
  if (!clientId) return [];
  
  try {
    // First get the linked items
    const { data: links, error: linksError } = await supabase
      .from('investorXOpenFinanceInvestments')
      .select('itemId')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (linksError || !links || links.length === 0) {
      console.log(`No OpenFinance investment links found for client ${clientId}`);
      return [];
    }
    
    // Get the item IDs
    const itemIds = links.map(link => link.itemId);
    
    // Now get the actual investments
    const { data, error } = await supabase
      .from('open_finance_investments')
      .select('*')
      .in('item_id', itemIds);
    
    if (error) {
      console.error('Error fetching OpenFinance investments:', error);
      return [];
    }
    
    console.log(`Found ${data?.length || 0} OpenFinance investments for client ${clientId}`);
    return data || [];
  } catch (error) {
    console.error('Error in getClientOpenFinanceInvestments:', error);
    return [];
  }
};

/**
 * Get OpenFinance transactions for a client
 * @param clientId Client ID to fetch transactions for
 * @param limit Number of transactions to return
 * @returns Array of transaction objects
 */
export const getClientOpenFinanceTransactions = async (clientId: number | null, limit = 100): Promise<any[]> => {
  if (!clientId) return [];
  
  try {
    // First get the accounts
    const accounts = await getClientOpenFinanceAccounts(clientId);
    
    if (accounts.length === 0) {
      return [];
    }
    
    // Now get the transactions for these accounts
    const { data, error } = await supabase
      .from('open_finance_transactions')
      .select('*')
      .in('account_id', accounts)
      .order('transacted_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching OpenFinance transactions:', error);
      return [];
    }
    
    console.log(`Found ${data?.length || 0} OpenFinance transactions for client ${clientId}`);
    return data || [];
  } catch (error) {
    console.error('Error in getClientOpenFinanceTransactions:', error);
    return [];
  }
};

/**
 * Generate insights from OpenFinance data
 * @param clientId Client ID to generate insights for
 * @returns Object with insights
 */
export const generateOpenFinanceInsights = async (clientId: number | null): Promise<any> => {
  if (!clientId) return null;
  
  try {
    // Get transactions first
    const transactions = await getClientOpenFinanceTransactions(clientId, 500);
    
    if (transactions.length === 0) {
      return null;
    }
    
    // Categorize transactions
    const categories: Record<string, { total: number, count: number }> = {};
    let totalSpent = 0;
    let totalIncome = 0;
    
    transactions.forEach(tx => {
      try {
        // Ensure tx and tx.category aren't null/undefined
        if (!tx || !tx.category) return;
      
        const category = typeof tx.category === 'object' && tx.category !== null
          ? (tx.category as { [key: string]: Json })?.name?.toString() || 'Outros'
          : tx.category?.toString() || 'Outros';
        
        const amount = Math.abs(Number(tx.amount || 0));
        
        // Skip transactions with zero amount
        if (amount === 0) return;
        
        // Determine if it's income or expense
        if (tx.type === 'INCOME' || tx.type === 'CREDIT') {
          totalIncome += amount;
        } else {
          totalSpent += amount;
          
          // Add to category
          if (!categories[category]) {
            categories[category] = { total: 0, count: 0 };
          }
          
          categories[category].total += amount;
          categories[category].count += 1;
        }
      } catch (err) {
        console.error('Error processing transaction for insights:', err);
      }
    });
    
    // Sort categories by total amount
    const sortedCategories = Object.entries(categories)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([name, data]) => ({
        name,
        total: data.total,
        count: data.count,
        percentage: Math.round((data.total / totalSpent) * 100)
      }));
    
    // Find recurring expenses (multiple transactions to same merchant)
    const merchants: Record<string, { total: number, count: number }> = {};
    
    transactions.forEach(tx => {
      try {
        if (!tx || !tx.merchant_json || tx.type === 'INCOME' || tx.type === 'CREDIT') return;
        
        let merchantName = 'Unknown';
        
        // Try to extract merchant name safely
        if (typeof tx.merchant_json === 'object' && tx.merchant_json !== null) {
          const merchantJson = tx.merchant_json as { [key: string]: Json };
          merchantName = merchantJson?.name?.toString() || 'Unknown';
        }
        
        if (merchantName === 'Unknown') return;
        
        const amount = Math.abs(Number(tx.amount || 0));
        
        if (!merchants[merchantName]) {
          merchants[merchantName] = { total: 0, count: 0 };
        }
        
        merchants[merchantName].total += amount;
        merchants[merchantName].count += 1;
      } catch (err) {
        console.error('Error processing merchant for insights:', err);
      }
    });
    
    // Filter for recurring (3 or more transactions)
    const recurringMerchants = Object.entries(merchants)
      .filter(([_, data]) => data.count >= 3)
      .sort((a, b) => b[1].total - a[1].total)
      .map(([name, data]) => ({
        name,
        total: data.total,
        count: data.count,
        average: data.total / data.count
      }));
    
    const monthlyAvgSpending = totalSpent / 6; // Assuming 6 months of data
    const monthlyAvgIncome = totalIncome / 6;
    
    // Return all insights
    return {
      totalTransactions: transactions.length,
      totalSpent,
      totalIncome,
      monthlyAvgSpending,
      monthlyAvgIncome,
      savingsRate: Math.round(((monthlyAvgIncome - monthlyAvgSpending) / monthlyAvgIncome) * 100),
      topCategories: sortedCategories.slice(0, 6),
      recurringExpenses: recurringMerchants.slice(0, 10),
      hasOpenFinanceData: true,
      insights: [
        {
          id: "spending-pattern",
          title: "Padrão de gastos",
          description: `Sua maior categoria de despesa é ${sortedCategories[0]?.name || 'Outros'} (${sortedCategories[0]?.percentage || 0}% do total).`,
          category: "budget",
          priority: "medium"
        },
        {
          id: "savings-rate",
          title: "Taxa de poupança",
          description: monthlyAvgIncome > monthlyAvgSpending 
            ? `Você economiza aproximadamente ${Math.round(((monthlyAvgIncome - monthlyAvgSpending) / monthlyAvgIncome) * 100)}% de sua renda mensal.`
            : "Suas despesas estão superando sua renda. Recomendamos revisar seu orçamento.",
          category: monthlyAvgIncome > monthlyAvgSpending ? "savings" : "risk",
          priority: monthlyAvgIncome > monthlyAvgSpending ? "low" : "high"
        },
        {
          id: "recurring-expenses",
          title: "Despesas recorrentes",
          description: `Você tem ${recurringMerchants.length} despesas recorrentes identificadas, totalizando R$ ${Math.round(recurringMerchants.reduce((acc, item) => acc + item.average, 0))} mensais.`,
          category: "budget",
          priority: "medium"
        }
      ],
      dataSource: 'supabase'
    };
    
  } catch (error) {
    console.error('Error in generateOpenFinanceInsights:', error);
    return null;
  }
};

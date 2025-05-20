
import { supabase } from "@/integrations/supabase/client";
import { parseValueToNumber } from "@/components/modules/dividends/dividendUtils";
import { DataSource } from "./portfolioService";

/**
 * Maps a client ID to OpenFinance accounts
 * @param clientId Client account ID
 * @returns Array of OpenFinance account IDs
 */
export const getClientOpenFinanceAccounts = async (clientId: number | null) => {
  if (!clientId) return [];
  
  try {
    const { data, error } = await supabase
      .from('investorXOpenFinanceAccount')
      .select('account_id')
      .eq('investor_account_on_brokerage_house', clientId);
    
    if (error) {
      console.error("Error fetching OpenFinance accounts:", error);
      return [];
    }
    
    return data ? data.map(item => item.account_id).filter(Boolean) : [];
  } catch (error) {
    console.error("Error in OpenFinance accounts fetch:", error);
    return [];
  }
};

/**
 * Fetches OpenFinance investments for a client, excluding XP investments
 * @param clientId Client account ID
 * @returns Array of OpenFinance investments
 */
export const getClientOpenFinanceInvestments = async (clientId: number | null) => {
  if (!clientId) return [];
  
  // First get the account IDs
  const accountIds = await getClientOpenFinanceAccounts(clientId);
  if (!accountIds.length) return [];
  
  try {
    // Fetch all open finance investments for these accounts
    const { data, error } = await supabase
      .from('open_finance_investments')
      .select('*')
      .in('item_id', accountIds);
    
    if (error) {
      console.error("Error fetching OpenFinance investments:", error);
      return [];
    }
    
    if (!data || !data.length) return [];
    
    // Filter out investments from XP to avoid duplication with XP data
    // This is based on the issuer information to identify XP investments
    const filteredInvestments = data.filter(investment => {
      // Check if the investment is from XP Investimentos
      const issuer = investment.issuer_json;
      if (!issuer) return true; // Keep if no issuer info (assume non-XP)
      
      // Check various fields that might identify XP
      const issuerName = typeof issuer === 'string' ? 
        issuer : 
        (typeof issuer === 'object' ? (issuer.name || '') : '');
      
      // Check if the issuer name contains XP-related keywords
      const isXpIssuer = [
        'xp investimentos', 
        'xp invest', 
        'xp corretora', 
        'xp',
        'xpi'
      ].some(keyword => 
        issuerName.toLowerCase().includes(keyword)
      );
      
      return !isXpIssuer; // Keep only non-XP investments
    });
    
    // Add dataSource metadata to each item
    return filteredInvestments.map(item => ({ ...item, dataSource: 'supabase' as DataSource }));
  } catch (error) {
    console.error("Error in OpenFinance investments fetch:", error);
    return [];
  }
};

/**
 * Fetches OpenFinance transactions for a client
 * @param clientId Client account ID
 * @param limit Optional limit of transactions to fetch
 * @param offset Optional offset for pagination
 * @returns Array of OpenFinance transactions
 */
export const getClientOpenFinanceTransactions = async (
  clientId: number | null,
  limit: number = 100,
  offset: number = 0
) => {
  if (!clientId) return [];
  
  // First get the account IDs
  const accountIds = await getClientOpenFinanceAccounts(clientId);
  if (!accountIds.length) return [];
  
  try {
    // Fetch transactions for these accounts with pagination
    const { data, error } = await supabase
      .from('open_finance_transactions')
      .select('*')
      .in('account_id', accountIds)
      .order('transacted_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) {
      console.error("Error fetching OpenFinance transactions:", error);
      return [];
    }
    
    // Add dataSource metadata to each item
    return data ? data.map(item => ({ ...item, dataSource: 'supabase' as DataSource })) : [];
  } catch (error) {
    console.error("Error in OpenFinance transactions fetch:", error);
    return [];
  }
};

/**
 * Calculate spending by category from transactions
 * @param transactions Array of transactions
 * @returns Object with category as key and total amount as value
 */
export const calculateSpendingByCategory = (transactions: any[]) => {
  if (!transactions || !transactions.length) return {};
  
  const spendingByCategory: Record<string, number> = {};
  
  transactions.forEach(transaction => {
    // Only consider expenses (negative amounts)
    if (transaction.amount >= 0) return;
    
    const category = transaction.category || 'Uncategorized';
    const amount = Math.abs(Number(transaction.amount));
    
    if (!spendingByCategory[category]) {
      spendingByCategory[category] = 0;
    }
    
    spendingByCategory[category] += amount;
  });
  
  return spendingByCategory;
};

/**
 * Find recurring transactions (e.g., subscriptions, bills)
 * @param transactions Array of transactions
 * @returns Array of identified recurring transactions
 */
export const identifyRecurringTransactions = (transactions: any[]) => {
  if (!transactions || transactions.length < 3) return [];
  
  // Group transactions by similar descriptions and amounts
  const transactionGroups: Record<string, any[]> = {};
  
  transactions.forEach(transaction => {
    // Skip positive amounts (income)
    if (transaction.amount >= 0) return;
    
    // Create a key based on merchant name (if exists) or description
    const merchantJson = transaction.merchant_json;
    const merchantName = merchantJson && typeof merchantJson === 'object' ? 
      merchantJson.name : null;
    
    const description = transaction.description ? 
      transaction.description.toLowerCase().trim() : '';
    
    // Round amount to nearest integer to account for small variations
    const roundedAmount = Math.round(Math.abs(Number(transaction.amount)));
    
    // Create a key combining merchant/description and amount
    const key = `${merchantName || description}|${roundedAmount}`;
    
    if (!transactionGroups[key]) {
      transactionGroups[key] = [];
    }
    
    transactionGroups[key].push(transaction);
  });
  
  // Identify recurring transactions (occur at least 2+ times)
  const recurring = Object.keys(transactionGroups)
    .filter(key => transactionGroups[key].length >= 2)
    .map(key => {
      const transactions = transactionGroups[key];
      const latestTransaction = transactions[0]; // Assuming sorted by date desc
      
      return {
        description: latestTransaction.description,
        merchant: latestTransaction.merchant_json?.name || null,
        amount: Math.abs(Number(latestTransaction.amount)),
        category: latestTransaction.category || 'Uncategorized',
        frequency: 'Monthly', // Simplified assumption
        occurrences: transactions.length,
        lastDate: latestTransaction.transacted_at,
        dataSource: 'supabase' as DataSource
      };
    });
  
  return recurring;
};

/**
 * Calculate total income and expenses from transactions
 * @param transactions Array of transactions
 * @returns Object with total income and expenses
 */
export const calculateIncomeAndExpenses = (transactions: any[]) => {
  if (!transactions || !transactions.length) return { income: 0, expenses: 0 };
  
  let income = 0;
  let expenses = 0;
  
  transactions.forEach(transaction => {
    const amount = Number(transaction.amount);
    
    if (amount > 0) {
      income += amount;
    } else {
      expenses += Math.abs(amount);
    }
  });
  
  return { income, expenses };
};

/**
 * Calculate monthly cash flow from transactions
 * @param transactions Array of transactions
 * @param monthsToAnalyze Number of months to analyze
 * @returns Array of monthly cash flow data
 */
export const calculateMonthlyCashFlow = (transactions: any[], monthsToAnalyze: number = 6) => {
  if (!transactions || !transactions.length) return [];
  
  // Group transactions by month
  const monthlyData: Record<string, { month: string, income: number, expenses: number }> = {};
  
  transactions.forEach(transaction => {
    if (!transaction.transacted_at) return;
    
    // Extract year and month from transacted_at
    const date = new Date(transaction.transacted_at);
    const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!monthlyData[yearMonth]) {
      monthlyData[yearMonth] = {
        month: yearMonth,
        income: 0,
        expenses: 0
      };
    }
    
    const amount = Number(transaction.amount);
    
    if (amount > 0) {
      monthlyData[yearMonth].income += amount;
    } else {
      monthlyData[yearMonth].expenses += Math.abs(amount);
    }
  });
  
  // Convert to array and sort by date
  return Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-monthsToAnalyze); // Get last X months
};

/**
 * Identify potential savings opportunities based on spending patterns
 * @param transactions Array of transactions
 * @returns Object with savings opportunities
 */
export const identifySavingsOpportunities = (transactions: any[]) => {
  if (!transactions || !transactions.length) return { amount: 0, suggestions: [] };
  
  const spendingByCategory = calculateSpendingByCategory(transactions);
  const suggestions: string[] = [];
  let potentialSavings = 0;
  
  // Look for high spending categories
  Object.entries(spendingByCategory).forEach(([category, amount]) => {
    // Simple heuristic: suggest 10% savings on categories with high spending
    if (amount > 1000) {
      const savingsAmount = amount * 0.1; // 10% potential savings
      potentialSavings += savingsAmount;
      
      suggestions.push(`Reduzir gastos em ${category} em 10% economizaria R$ ${savingsAmount.toFixed(0)} por mês.`);
    }
  });
  
  // Look for frequent small transactions that add up
  const smallTransactions = transactions.filter(
    t => t.amount < 0 && Math.abs(Number(t.amount)) < 50
  );
  
  if (smallTransactions.length > 10) {
    const totalSmallSpending = smallTransactions.reduce(
      (sum, t) => sum + Math.abs(Number(t.amount)), 0
    );
    
    const smallSavings = totalSmallSpending * 0.3; // 30% potential savings
    potentialSavings += smallSavings;
    
    suggestions.push(`Reduzir pequenas compras frequentes economizaria R$ ${smallSavings.toFixed(0)} por mês.`);
  }
  
  return {
    amount: potentialSavings,
    suggestions: suggestions,
    dataSource: transactions.length > 0 ? 'supabase' as DataSource : 'synthetic' as DataSource
  };
};

/**
 * Generate financial insights from OpenFinance data
 * @param clientId Client account ID
 * @returns Object with financial insights
 */
export const generateOpenFinanceInsights = async (clientId: number | null) => {
  if (!clientId) return null;
  
  // Fetch recent transactions (last 90 days)
  const transactions = await getClientOpenFinanceTransactions(clientId, 500);
  if (!transactions || transactions.length === 0) return null;
  
  // Calculate various insights
  const spendingByCategory = calculateSpendingByCategory(transactions);
  const recurringTransactions = identifyRecurringTransactions(transactions);
  const { income, expenses } = calculateIncomeAndExpenses(transactions);
  const monthlyCashFlow = calculateMonthlyCashFlow(transactions);
  const savingsOpportunities = identifySavingsOpportunities(transactions);
  
  // Find highest spending month
  const highestSpendingMonth = monthlyCashFlow.reduce(
    (highest, month) => month.expenses > highest.expenses ? month : highest,
    { month: '', expenses: 0, income: 0 }
  );
  
  // Find months with negative cash flow
  const negativeMonths = monthlyCashFlow.filter(month => month.expenses > month.income);
  
  // Convert spending by category to sorted array
  const topCategories = Object.entries(spendingByCategory)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5) // Top 5 categories
    .map(category => ({
      ...category,
      percentage: (category.amount / expenses) * 100
    }));
  
  return {
    highestSpendingMonth: {
      month: highestSpendingMonth.month,
      amount: highestSpendingMonth.expenses,
      categories: topCategories.slice(0, 3),
      dataSource: 'supabase' as DataSource,
      summary: `Em ${highestSpendingMonth.month.replace('-', '/')}, você gastou R$ ${highestSpendingMonth.expenses.toFixed(0)}, principalmente em ${topCategories[0]?.name || 'diversas categorias'}.`
    },
    wastedMoney: {
      total: savingsOpportunities.amount,
      categories: topCategories.slice(0, 3),
      dataSource: 'supabase' as DataSource,
      summary: `Você poderia economizar aproximadamente R$ ${savingsOpportunities.amount.toFixed(0)} por mês em gastos que podem ser otimizados.`
    },
    topCategories: {
      categories: topCategories,
      total: expenses,
      dataSource: 'supabase' as DataSource,
      summary: `Suas principais categorias de gastos são ${topCategories.slice(0, 2).map(c => c.name).join(' e ')} que somam R$ ${(topCategories[0].amount + (topCategories[1]?.amount || 0)).toFixed(0)}.`
    },
    negativeMonths: negativeMonths.length > 0 ? {
      count: negativeMonths.length,
      months: negativeMonths.map(m => m.month),
      totalDeficit: negativeMonths.reduce((sum, m) => sum + (m.expenses - m.income), 0),
      dataSource: 'supabase' as DataSource,
      summary: `Você teve ${negativeMonths.length} ${negativeMonths.length === 1 ? 'mês' : 'meses'} com gastos maiores que receitas.`
    } : null,
    potentialSavings: {
      amount: savingsOpportunities.amount,
      suggestions: savingsOpportunities.suggestions,
      dataSource: 'supabase' as DataSource,
      summary: `Com pequenas mudanças em seus hábitos, você poderia economizar até R$ ${savingsOpportunities.amount.toFixed(0)} por mês.`
    },
    recurringExpenses: recurringTransactions.length > 0 ? {
      items: recurringTransactions,
      total: recurringTransactions.reduce((sum, item) => sum + item.amount, 0),
      dataSource: 'supabase' as DataSource,
      summary: `Você tem ${recurringTransactions.length} despesas recorrentes totalizando R$ ${recurringTransactions.reduce((sum, item) => sum + item.amount, 0).toFixed(0)} por mês.`
    } : null,
    dataSource: 'supabase' as DataSource
  };
};

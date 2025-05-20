
/**
 * Utility functions for dividend calculations and data formatting
 */

/**
 * Format currency values according to Brazilian format
 */
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Format percentage values
 */
export const formatPercentage = (value: number) => {
  return `${value.toFixed(2)}%`;
};

/**
 * Parse string value to number, handling Brazilian currency format
 */
export const parseValueToNumber = (value: string): number => {
  if (!value) return 0;
  
  // Remove R$, spaces, and convert comma to dot
  const cleanValue = value.replace(/[^\d.,]/g, '').replace(',', '.');
  return parseFloat(cleanValue) || 0;
};

/**
 * Group dividends by month for chart display
 */
export const groupDividendsByMonth = (dividendHistory: any[]) => {
  if (!dividendHistory || !dividendHistory.length) return [];
  
  const monthlyData: Record<string, { month: string, amount: number, count: number }> = {};
  
  dividendHistory.forEach(item => {
    if (!item.payment_date) return;
    
    // Extract month and year
    const parts = item.payment_date.split(/[\s-]/); // Split by space or dash
    if (parts.length < 2) return;
    
    const year = parts[0];
    const month = parts[1];
    const monthNames = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    
    const monthName = `${monthNames[parseInt(month) - 1]}/${year.slice(2)}`;
    
    // Parse value using the helper function
    const value = parseValueToNumber(item.value || '0');
    
    if (!monthlyData[monthName]) {
      monthlyData[monthName] = {
        month: monthName,
        amount: 0,
        count: 0
      };
    }
    
    monthlyData[monthName].amount += value;
    monthlyData[monthName].count += 1;
  });
  
  // Convert to array and sort by date
  return Object.values(monthlyData)
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split('/');
      const [bMonth, bYear] = b.month.split('/');
      
      if (aYear !== bYear) return parseInt(aYear) - parseInt(bYear);
      
      const monthOrder: Record<string, number> = {
        'Jan': 1, 'Fev': 2, 'Mar': 3, 'Abr': 4, 'Mai': 5, 'Jun': 6,
        'Jul': 7, 'Ago': 8, 'Set': 9, 'Out': 10, 'Nov': 11, 'Dez': 12
      };
      
      return monthOrder[aMonth] - monthOrder[bMonth];
    })
    .slice(-12); // Get last 12 months
};

/**
 * Calculate monthly dividend yield based on portfolio total value
 */
export const calculateDividendYield = (monthlyDividends: number, portfolioValue: number): number => {
  if (!portfolioValue || portfolioValue <= 0) return 0;
  
  // Calculate annualized dividend yield percentage
  const annualDividends = monthlyDividends * 12;
  return (annualDividends / portfolioValue) * 100;
};

/**
 * Get dividend growth trend based on history
 * Returns -1 (declining), 0 (stable), or 1 (growing)
 */
export const getDividendTrend = (dividendHistory: any[]): number => {
  if (!dividendHistory || dividendHistory.length < 6) return 0; // Need at least 6 months of data
  
  const monthlyData = groupDividendsByMonth(dividendHistory);
  if (monthlyData.length < 6) return 0;
  
  // Compare first 3 months with last 3 months
  const firstThreeMonths = monthlyData.slice(0, 3).reduce((sum, item) => sum + item.amount, 0);
  const lastThreeMonths = monthlyData.slice(-3).reduce((sum, item) => sum + item.amount, 0);
  
  if (lastThreeMonths > firstThreeMonths * 1.1) return 1; // Growing (10% or more)
  if (lastThreeMonths < firstThreeMonths * 0.9) return -1; // Declining (10% or more)
  return 0; // Stable
};

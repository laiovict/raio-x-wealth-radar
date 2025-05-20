
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
    
    // Parse value
    const value = parseFloat(item.value?.replace(/[^\d.,]/g, '').replace(',', '.') || '0');
    
    if (!monthlyData[monthName]) {
      monthlyData[monthName] = {
        month: monthName,
        amount: 0,
        count: 0
      };
    }
    
    monthlyData[monthName].amount += (isNaN(value) ? 0 : value);
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

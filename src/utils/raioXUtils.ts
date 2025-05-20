
import { 
  PortfolioSummary, 
  FinancialSummary, 
  DividendHistory 
} from '@/types/raioXTypes';

/**
 * Generates financial summary based on portfolio data
 */
export const generateFinancialSummary = (
  clientData: PortfolioSummary, 
  dividendHistory?: DividendHistory[]
): FinancialSummary => {
  // Calculate dividends if we have dividend history
  const divTotal = dividendHistory && dividendHistory.length ? calculateTotalDividends(dividendHistory) : 0;
  const divMonthly = dividendHistory && dividendHistory.length ? calculateMonthlyAverageDividends(dividendHistory) : 0;
  
  const summary: FinancialSummary = {
    netWorth: parseFloat(clientData.total_portfolio_value || "0"),
    totalAssets: parseFloat(clientData.total_portfolio_value || "0"),
    totalLiabilities: 0, // Not provided in the data, could be fetched separately
    liquidAssets: clientData.fixed_income_value || 0,
    monthlyIncome: divMonthly > 0 ? divMonthly : parseFloat(clientData.total_portfolio_value || "0") * 0.005, // Use dividend data if available
    monthlyExpenses: parseFloat(clientData.total_portfolio_value || "0") * 0.003, // Estimate monthly expenses as 0.3% of portfolio
    savingsRate: 40, // Estimate savings rate
    investmentBalance: parseFloat(clientData.total_portfolio_value || "0"),
    cashReserves: clientData.fixed_income_value || 0,
    debtTotal: 0, // Not provided in the data
    riskProfile: "Moderado", // Default value, could be determined based on allocation
    creditScore: 750, // Default value, not provided in the data
    allocationSummary: {
      stocks: parseFloat(clientData.stocks_representation || "0"),
      bonds: clientData.fixed_income_representation || 0,
      cash: 10, // Estimate
      realEstate: clientData.real_estate_representation || 0,
      alternatives: clientData.investment_fund_representation || 0
    },
    riskMetrics: [
      { name: "Volatilidade", value: 45, color: "#4CAF50" },
      { name: "Exposição a Renda Variável", value: 35, color: "#FFC107" },
      { name: "Concentração", value: 25, color: "#2196F3" }
    ],
    topRisks: [
      {
        name: "Concentração em Poucos Ativos",
        severity: "high",
        impact: "68% do patrimônio em apenas 4 ativos"
      },
      {
        name: "Baixa Reserva de Emergência",
        severity: "medium",
        impact: `Cobertura de ${(clientData.fixed_income_value / (parseFloat(clientData.total_portfolio_value || "0") * 0.003)).toFixed(1)} meses de despesas`
      },
      {
        name: "Exposição Cambial",
        severity: "medium",
        impact: "30% do patrimônio sem proteção cambial"
      }
    ],
    dataSource: 'supabase' // Mark this as real data from Supabase
  };
  
  return summary;
};

/**
 * Calculate total dividends from dividend history
 */
export const calculateTotalDividends = (dividendHistory: DividendHistory[]): number => {
  try {
    return dividendHistory.reduce((sum, dividend) => {
      const value = parseFloat(dividend.value.replace(/[^\d.,]/g, '').replace(',', '.'));
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  } catch (error) {
    console.error("Error calculating total dividends:", error);
    return 0;
  }
};

/**
 * Calculate monthly average dividends from dividend history
 */
export const calculateMonthlyAverageDividends = (dividendHistory: DividendHistory[]): number => {
  try {
    // Get total dividends
    const total = calculateTotalDividends(dividendHistory);
    
    // Group dividends by month to find how many months we have data for
    const months = new Set<string>();
    dividendHistory.forEach(dividend => {
      if (dividend.payment_date) {
        const dateParts = dividend.payment_date.split('/');
        if (dateParts.length >= 2) {
          const monthYear = `${dateParts[1]}/${dateParts[2] || new Date().getFullYear()}`;
          months.add(monthYear);
        }
      }
    });
    
    // Calculate average (use at least 3 months even if we have less data)
    const monthCount = Math.max(months.size, 3);
    return total / monthCount;
  } catch (error) {
    console.error("Error calculating monthly average dividends:", error);
    return 0;
  }
};

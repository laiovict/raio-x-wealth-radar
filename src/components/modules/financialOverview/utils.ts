import { ensureNumber } from '@/utils/typeConversionHelpers';

/**
 * Generate synthetic history data for net worth chart
 * @param currentValue Current net worth value
 * @returns Array of monthly net worth data points
 */
export const generateNetWorthHistory = (currentValue: number) => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const result = [];
  
  // Start with a value 12% lower than current
  let startValue = currentValue * 0.88;
  
  // Generate monthly data with slight randomness
  for (let i = 0; i < 12; i++) {
    // Add some randomness to growth
    const monthlyGrowth = 1 + (0.005 + Math.random() * 0.01);
    startValue = Math.round(startValue * monthlyGrowth);
    
    result.push({
      month: months[i],
      amount: startValue,
      dataSource: 'synthetic' as const // Use const assertion to fix the type
    });
  }
  
  // Ensure the final value matches our target
  result[11].amount = currentValue;
  
  return result;
};

/**
 * Get synthetic financial summary data based on client ID
 * @param selectedClient Client ID
 * @param portfolioSummary Portfolio summary from real data if available
 * @returns Enhanced synthetic data
 */
export const getSyntheticData = (selectedClient: number | null, portfolioSummary: any) => {
  // Default synthetic values
  let netWorth = portfolioSummary?.totalPortfolioValue || 1250000;
  let totalAssets = portfolioSummary?.totalPortfolioValue || 1450000;
  let totalLiabilities = 200000; // Not provided in portfolio summary
  let liquidAssets = portfolioSummary?.fixedIncomeValue || 210000;
  let monthlyIncome = 42000; // Not provided in portfolio summary
  let monthlyExpenses = 28000; // Not provided in portfolio summary
  let savingsRate = 33.3; // Calculated if both income and expenses are available
  let monthlyTrend = "+4.3%";
  let savingsRateTrend = "+2.1%";
  
  // Customize based on selected client
  if (selectedClient) {
    switch (selectedClient) {
      // Laio Santos (240275) - High net worth client
      case 240275:
        if (!portfolioSummary) {
          netWorth = 4800000;
          totalAssets = 5300000;
          totalLiabilities = 500000;
          liquidAssets = 780000;
        }
        monthlyIncome = 95000;
        monthlyExpenses = 48000;
        savingsRate = 49.5;
        monthlyTrend = "+5.7%";
        savingsRateTrend = "+3.2%";
        break;
        
      // Ana Oliveira (316982) - Aggressive profile
      case 316982:
        if (!portfolioSummary) {
          netWorth = 1850000;
          totalAssets = 2200000;
          totalLiabilities = 350000;
          liquidAssets = 140000;
        }
        monthlyIncome = 38000;
        monthlyExpenses = 29000;
        savingsRate = 23.7;
        monthlyTrend = "+7.2%";
        savingsRateTrend = "-1.3%";
        break;
        
      // Marcos Santos (327272) - Conservative profile
      case 327272:
        if (!portfolioSummary) {
          netWorth = 980000;
          totalAssets = 995000;
          totalLiabilities = 15000;
          liquidAssets = 420000;
        }
        monthlyIncome = 26000;
        monthlyExpenses = 19500;
        savingsRate = 25.0;
        monthlyTrend = "+1.8%";
        savingsRateTrend = "+1.5%";
        break;
        
      default:
        // Keep default values
    }
  }
  
  // Flag all synthetic data
  const dataSource = 'synthetic';
  
  // Create synthetic financial summary with all required properties
  return {
    netWorth,
    totalAssets,
    totalLiabilities,
    liquidAssets,
    monthlyIncome,
    monthlyExpenses,
    savingsRate,
    monthlyTrend,
    savingsRateTrend,
    dataSource,
    // Required properties from the base FinancialSummary interface
    investmentBalance: totalAssets * 0.85, // 85% of assets are investments
    cashReserves: liquidAssets,
    debtTotal: totalLiabilities,
    riskProfile: "Moderado",
    creditScore: 750,
    allocationSummary: {
      stocks: portfolioSummary ? ensureNumber(portfolioSummary.stocks_representation || "0") : 30,
      bonds: portfolioSummary ? ensureNumber(portfolioSummary.fixed_income_representation || 0) : 40,
      cash: 10,
      realEstate: portfolioSummary ? ensureNumber(portfolioSummary.real_estate_representation || 0) : 10,
      alternatives: portfolioSummary ? ensureNumber(portfolioSummary.investment_fund_representation || 0) : 10
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
        impact: `Cobertura de ${(liquidAssets / monthlyExpenses).toFixed(1)} meses de despesas`
      },
      {
        name: "Exposição Cambial",
        severity: "medium",
        impact: "30% do patrimônio sem proteção cambial"
      }
    ]
  };
};

/**
 * Format currency values consistently
 * @param value Number or string to format as currency
 * @returns Formatted currency string
 */
export const formatCurrencyHelper = (value: number | string | undefined) => {
  if (value === undefined) return "R$ 0";
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(numValue);
};

/**
 * Get client portfolio summary from real data if available
 * @param data Portfolio data
 * @returns Formatted portfolio summary or null
 */
export const getPortfolioSummaryHelper = (data: any) => {
  if (data?.portfolioSummary) {
    return {
      totalPortfolioValue: parseFloat(data.portfolioSummary.total_portfolio_value || "0"),
      fixedIncomeValue: ensureNumber(data.portfolioSummary.fixed_income_value || 0),
      stocksValue: parseFloat(data.portfolioSummary.stocks_value || "0"),
      realEstateValue: ensureNumber(data.portfolioSummary.real_estate_value || 0),
      investmentFundValue: ensureNumber(data.portfolioSummary.investment_fund_value || 0),
      treasureValue: parseFloat(data.portfolioSummary.treasure_value || "0"),
      investmentInternationalValue: parseFloat(data.portfolioSummary.investment_international_value || "0"),
      dataSource: data.portfolioSummary.dataSource
    };
  }
  return null;
};

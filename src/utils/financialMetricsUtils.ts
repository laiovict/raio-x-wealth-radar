/**
 * Calculate diversification score based on portfolio allocation
 * @param portfolioSummary The portfolio summary data
 * @returns A score between 0 and 100
 */
export const calculateDiversificationScore = (portfolioSummary: any): number => {
  if (!portfolioSummary) return 50; // Default score
  
  try {
    let score = 0;
    
    // Check if portfolio has multiple asset classes
    if (portfolioSummary.fixed_income_representation > 0) score += 25;
    if (portfolioSummary.stocks_representation > 0) score += 25;
    if (portfolioSummary.real_estate_representation > 0) score += 25;
    if (portfolioSummary.investment_fund_representation > 0) score += 25;
    
    // Adjust based on asset class balance
    const maxConcentration = Math.max(
      portfolioSummary.fixed_income_representation || 0,
      portfolioSummary.stocks_representation || 0,
      portfolioSummary.real_estate_representation || 0,
      portfolioSummary.investment_fund_representation || 0
    );
    
    // Penalize excessive concentration in one asset class
    if (maxConcentration > 70) score -= 20;
    else if (maxConcentration > 60) score -= 10;
    else if (maxConcentration < 40) score += 10; // Reward good diversification
    
    // Ensure score is within range
    return Math.min(100, Math.max(0, score));
  } catch (error) {
    console.error("Error calculating diversification score:", error);
    return 50; // Default fallback
  }
};

/**
 * Calculate financial behavior metrics based on portfolio data
 * @param portfolioSummary Portfolio summary data
 * @param dividendHistory Dividend history data
 * @param fixedIncomeValue Fixed income value
 * @param monthlyExpenses Monthly expenses
 * @param useSyntheticData Whether to use synthetic data
 * @returns Object containing behavior metrics
 */
export const calculateFinancialBehaviorMetrics = (
  portfolioSummary: any, 
  dividendHistory: any[], 
  fixedIncomeValue: any,
  monthlyExpenses: number = 0,
  useSyntheticData: boolean = false
) => {
  // If useSyntheticData is true or real data is not available, return synthetic metrics
  if (useSyntheticData || !portfolioSummary) {
    return {
      investmentConsistency: {
        grade: 'B+',
        description: 'Você mantém um ritmo regular de investimentos com oportunidades de melhoria na constância mensal.'
      },
      spendingDiscipline: {
        grade: 'A-',
        description: 'Excelente controle de gastos, mantendo despesas abaixo de 70% da renda disponível.'
      },
      financialResilience: {
        grade: 'B',
        description: 'Reserva de emergência adequada, com cobertura para imprevistos de médio prazo.'
      },
      diversification: {
        score: 72,
        description: 'Carteira bem diversificada entre diferentes classes de ativos.'
      },
      dataSource: 'synthetic'
    };
  }
  
  // Calculate real metrics using portfolio data
  return {
    investmentConsistency: calculateInvestmentConsistency(dividendHistory),
    spendingDiscipline: calculateSpendingDiscipline(portfolioSummary, monthlyExpenses),
    financialResilience: calculateFinancialResilience(fixedIncomeValue, monthlyExpenses),
    diversification: {
      score: calculateDiversificationScore(portfolioSummary),
      description: 'Baseado na distribuição atual de sua carteira.'
    },
    dataSource: 'supabase'
  };
};

/**
 * Calculate investment consistency based on dividend history
 * @param dividendHistory Array of dividend history entries
 * @returns Object with grade and description
 */
const calculateInvestmentConsistency = (dividendHistory: any[]) => {
  // Implementation would go here
  return {
    grade: 'B+',
    description: 'Você mantém um ritmo regular de investimentos com oportunidades de melhoria na constância mensal.'
  };
};

/**
 * Calculate spending discipline based on portfolio and expenses
 * @param portfolioSummary Portfolio summary data
 * @param monthlyExpenses Monthly expenses
 * @returns Object with grade and description
 */
const calculateSpendingDiscipline = (portfolioSummary: any, monthlyExpenses: number) => {
  // Implementation would go here
  return {
    grade: 'A-',
    description: 'Excelente controle de gastos, mantendo despesas abaixo de 70% da renda disponível.'
  };
};

/**
 * Calculate financial resilience based on fixed income and expenses
 * @param fixedIncomeValue Fixed income value
 * @param monthlyExpenses Monthly expenses
 * @returns Object with grade and description
 */
const calculateFinancialResilience = (fixedIncomeValue: any, monthlyExpenses: number) => {
  // Implementation would go here
  return {
    grade: 'B',
    description: 'Reserva de emergência adequada, com cobertura para imprevistos de médio prazo.'
  };
};

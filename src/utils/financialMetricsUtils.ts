
import { ensureNumber } from './typeConversionHelpers';

/**
 * Calculate savings rate based on portfolio value and annual expenses
 * @param portfolioValue Total portfolio value
 * @param annualExpenses Annual expenses
 * @returns Savings rate data object
 */
export const calculateSavingsRate = (
  portfolioValue: any,
  annualExpenses: any
) => {
  // Try to parse values as numbers
  const portfolio = ensureNumber(portfolioValue);
  const expenses = ensureNumber(annualExpenses);
  
  // Default response when data is insufficient
  const defaultResponse = {
    rate: "25.0",
    trend: "+5.2%",
    dataSource: "synthetic"
  };

  // If we have both portfolio value and expenses, calculate savings rate
  if (portfolio && expenses && expenses > 0) {
    // Calculate actual savings rate (invested amount / total income)
    // Assuming total income is portfolio + expenses (simplification)
    const savingsRate = (portfolio / (portfolio + expenses)) * 100;
    const formattedRate = savingsRate.toFixed(1);
    
    return {
      rate: formattedRate,
      trend: "+3.8%", // This would ideally be calculated from historical data
      dataSource: "calculated"
    };
  }
  
  return defaultResponse;
};

/**
 * Calculate financial behavior metrics
 * @param portfolioSummary Portfolio summary object
 * @param dividendHistory Dividend history array
 * @param fixedIncomeValue Fixed income value
 * @param monthlyExpenses Monthly expenses
 * @param useSyntheticData Flag to force using synthetic data
 * @returns Financial behavior metrics object
 */
export const calculateFinancialBehaviorMetrics = (
  portfolioSummary: any,
  dividendHistory: any[],
  fixedIncomeValue: any,
  monthlyExpenses: any,
  useSyntheticData: boolean = false
) => {
  // If synthetic data is requested, return mock data
  if (useSyntheticData) {
    return {
      dataSource: "synthetic",
      investmentConsistency: {
        grade: "A",
        description: "Você investe consistentemente todos os meses",
        dataSource: "synthetic"
      },
      spendingDiscipline: {
        grade: "B+",
        description: "Seu padrão de gastos é consistente e controlado",
        dataSource: "synthetic"
      },
      financialResilience: {
        grade: "A-",
        description: "Sua reserva cobre 5.8 meses de despesas",
        dataSource: "synthetic"
      },
      diversification: {
        score: 73,
        dataSource: "synthetic"
      }
    };
  }

  // Calculate metrics using real data when available
  
  // Try to get real portfolio data
  const hasPortfolioData = portfolioSummary && 
    (portfolioSummary.fixed_income_value || 
     portfolioSummary.investment_fund_value || 
     portfolioSummary.stocks_value);
  
  // Check if we have dividend history
  const hasDividendData = dividendHistory && dividendHistory.length > 0;
  
  // Try to calculate investment consistency grade
  let investmentConsistencyGrade = {
    grade: "C",
    description: "Dados insuficientes para avaliar consistência",
    dataSource: "calculated"
  };
  
  if (hasDividendData) {
    // Count months with dividend payments as a proxy for investment consistency
    const months = new Set();
    dividendHistory.forEach(dividend => {
      if (dividend.payment_date) {
        const date = new Date(dividend.payment_date);
        const monthYear = `${date.getMonth()}-${date.getFullYear()}`;
        months.add(monthYear);
      }
    });
    
    const monthCount = months.size;
    if (monthCount > 10) {
      investmentConsistencyGrade = {
        grade: "A",
        description: "Você recebe dividendos consistentemente todos os meses",
        dataSource: "calculated"
      };
    } else if (monthCount > 6) {
      investmentConsistencyGrade = {
        grade: "B",
        description: `Você recebeu dividendos em ${monthCount} meses do último ano`,
        dataSource: "calculated"
      };
    } else {
      investmentConsistencyGrade = {
        grade: "C",
        description: `Você recebeu dividendos em apenas ${monthCount} meses do último ano`,
        dataSource: "calculated"
      };
    }
  }
  
  // Try to calculate spending discipline
  let spendingDisciplineGrade = {
    grade: "C",
    description: "Dados insuficientes para avaliar disciplina de gastos",
    dataSource: "calculated"
  };
  
  // If we have monthly expenses data
  if (monthlyExpenses) {
    spendingDisciplineGrade = {
      grade: "B",
      description: "Seu padrão de gastos parece controlado",
      dataSource: "calculated"
    };
  }
  
  // Try to calculate financial resilience
  let financialResilienceGrade = {
    grade: "C",
    description: "Dados insuficientes para avaliar resiliência financeira",
    dataSource: "calculated"
  };
  
  // If we have fixed income value and monthly expenses
  if (fixedIncomeValue && monthlyExpenses) {
    const fixedIncome = ensureNumber(fixedIncomeValue);
    const expenses = ensureNumber(monthlyExpenses);
    
    if (expenses > 0) {
      const coverageMonths = fixedIncome / expenses;
      
      if (coverageMonths >= 6) {
        financialResilienceGrade = {
          grade: "A",
          description: `Sua reserva cobre ${coverageMonths.toFixed(1)} meses de despesas`,
          dataSource: "calculated"
        };
      } else if (coverageMonths >= 3) {
        financialResilienceGrade = {
          grade: "B",
          description: `Sua reserva cobre ${coverageMonths.toFixed(1)} meses de despesas`,
          dataSource: "calculated"
        };
      } else {
        financialResilienceGrade = {
          grade: "C",
          description: `Sua reserva cobre apenas ${coverageMonths.toFixed(1)} meses de despesas`,
          dataSource: "calculated"
        };
      }
    }
  }
  
  // Calculate diversification score
  let diversificationScore = {
    score: 50,
    dataSource: "calculated"
  };
  
  if (hasPortfolioData) {
    let fixedIncome = ensureNumber(portfolioSummary.fixed_income_value || 0);
    let investmentFund = ensureNumber(portfolioSummary.investment_fund_value || 0);
    let stocks = ensureNumber(portfolioSummary.stocks_value || 0);
    let realEstate = ensureNumber(portfolioSummary.real_estate_value || 0);
    let international = ensureNumber(portfolioSummary.investment_international_value || 0);
    
    // Calculate total assets
    const totalAssets = fixedIncome + investmentFund + stocks + realEstate + international;
    
    if (totalAssets > 0) {
      // Calculate percentages
      const fixedIncomePercent = (fixedIncome / totalAssets) * 100;
      const investmentFundPercent = (investmentFund / totalAssets) * 100;
      const stocksPercent = (stocks / totalAssets) * 100;
      const realEstatePercent = (realEstate / totalAssets) * 100;
      const internationalPercent = (international / totalAssets) * 100;
      
      // Count asset classes with more than 5% allocation
      let assetClassCount = 0;
      if (fixedIncomePercent > 5) assetClassCount++;
      if (investmentFundPercent > 5) assetClassCount++;
      if (stocksPercent > 5) assetClassCount++;
      if (realEstatePercent > 5) assetClassCount++;
      if (internationalPercent > 5) assetClassCount++;
      
      // Calculate concentration in highest asset class
      const maxPercent = Math.max(
        fixedIncomePercent,
        investmentFundPercent,
        stocksPercent,
        realEstatePercent,
        internationalPercent
      );
      
      // Score based on asset class count and concentration
      // Higher score for more asset classes and lower concentration
      let score = Math.min(assetClassCount * 15, 60) + Math.max(0, 40 - maxPercent * 0.4);
      score = Math.min(100, Math.max(0, score));
      
      diversificationScore = {
        score: Math.round(score),
        dataSource: "calculated"
      };
    }
  }
  
  return {
    dataSource: "calculated",
    investmentConsistency: investmentConsistencyGrade,
    spendingDiscipline: spendingDisciplineGrade,
    financialResilience: financialResilienceGrade,
    diversification: diversificationScore
  };
};

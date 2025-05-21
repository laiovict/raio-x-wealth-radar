
import { PortfolioSummary, DividendHistory, AIInsight } from '@/types/raioXTypes';
import { v4 as uuidv4 } from 'uuid';
import { ensureNumber } from '@/utils/typeConversionHelpers';

// Deep clone utility function for objects
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T;
  }
  
  const clonedObj = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  
  return clonedObj;
};

// Generate insights based on portfolio data
export const generateAIInsights = (
  portfolioSummary?: PortfolioSummary,
  dividendHistory?: DividendHistory[]
): AIInsight[] => {
  const insights: AIInsight[] = [];

  // Example insight based on asset allocation
  if (portfolioSummary) {
    const fixedIncomeRatio = ensureNumber(portfolioSummary.fixed_income_representation || 0);
    const stocksRatio = ensureNumber(portfolioSummary.stocks_representation || 0);
    
    if (fixedIncomeRatio > 70) {
      insights.push({
        id: uuidv4(),
        title: "Alta concentração em renda fixa",
        description: "Seu portfólio está muito concentrado em renda fixa (mais de 70%). Considere diversificar para buscar melhores retornos de longo prazo.",
        category: "allocation",
        priority: "medium",
        isNew: true,
        timestamp: new Date(),
        agent: "investor",
        type: "risk",
        impact: "medium",
        dataSource: "calculated"
      });
    }
    
    if (stocksRatio > 80) {
      insights.push({
        id: uuidv4(),
        title: "Alta exposição à renda variável",
        description: "Sua carteira está fortemente posicionada em ações (mais de 80%). Verifique se este nível de risco está alinhado com seus objetivos.",
        category: "risk",
        priority: "high",
        isNew: true,
        timestamp: new Date(),
        agent: "investor",
        type: "risk",
        impact: "high",
        dataSource: "calculated"
      });
    }
  }

  // Example insight based on dividends
  if (dividendHistory && dividendHistory.length > 0) {
    const totalDividends = dividendHistory.reduce((sum, dividend) => {
      return sum + ensureNumber(dividend.value);
    }, 0);
    
    if (totalDividends > 5000) {
      insights.push({
        id: uuidv4(),
        title: "Fluxo significativo de dividendos",
        description: `Seus investimentos estão gerando mais de R$ 5.000 em dividendos. Uma estratégia de reinvestimento pode potencializar seus retornos.`,
        category: "income",
        priority: "medium",
        isNew: false,
        timestamp: new Date(),
        agent: "farmer",
        type: "opportunity",
        impact: "medium",
        dataSource: "calculated"
      });
    }
  }

  return insights;
};

// Alias for generateAIInsights for backward compatibility
export const generatePortfolioInsights = (
  portfolioSummary?: any,
  stocks?: any[],
  fixedIncome?: any[],
  investmentFunds?: any[],
  realEstate?: any[],
  profitability?: any,
  dividendHistory?: DividendHistory[]
): AIInsight[] => {
  // Start with basic insights based on portfolio summary and dividends
  const baseInsights = generateAIInsights(portfolioSummary, dividendHistory);
  
  // Add more specific insights based on the additional parameters
  const insights = [...baseInsights];
  
  // Check for high concentration in specific stocks
  if (stocks && stocks.length > 0) {
    const totalStocksValue = stocks.reduce((sum, stock) => sum + ensureNumber(stock.total_value), 0);
    
    // Find any single stock that represents more than 20% of the stock portfolio
    const highConcentrationStocks = stocks.filter(stock => 
      (ensureNumber(stock.total_value) / totalStocksValue) > 0.2
    );
    
    if (highConcentrationStocks.length > 0) {
      highConcentrationStocks.forEach(stock => {
        insights.push({
          id: uuidv4(),
          title: `Alta concentração em ${stock.asset}`,
          description: `${stock.asset} representa mais de 20% da sua carteira de ações. Considere diversificar para reduzir o risco.`,
          category: "concentration",
          priority: "medium",
          isNew: true,
          timestamp: new Date(),
          agent: "investor",
          type: "risk",
          impact: "medium",
          dataSource: "calculated"
        });
      });
    }
  }
  
  // Add insights about fixed income if applicable
  if (fixedIncome && fixedIncome.length > 0) {
    // Check for short-term fixed income allocation
    const shortTermCount = fixedIncome.filter(fi => {
      const maturityDate = new Date(fi.maturity_date);
      const today = new Date();
      const diffTime = maturityDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays < 180; // Less than 6 months
    }).length;
    
    if (shortTermCount > 3) {
      insights.push({
        id: uuidv4(),
        title: "Concentração em renda fixa de curto prazo",
        description: "Você tem várias aplicações de renda fixa com vencimento próximo. Planeje a reinvestimento desses recursos.",
        category: "planning",
        priority: "low",
        isNew: true,
        timestamp: new Date(),
        agent: "planner",
        type: "opportunity",
        impact: "low",
        dataSource: "calculated"
      });
    }
  }
  
  // Add profitability insights if available
  if (profitability) {
    const ytdReturn = ensureNumber(profitability.ytd);
    const sixMonthReturn = ensureNumber(profitability.six_months);
    
    if (ytdReturn < 0) {
      insights.push({
        id: uuidv4(),
        title: "Retorno negativo no ano",
        description: "Sua carteira está com rendimento negativo no ano corrente. Considere uma revisão da alocação.",
        category: "performance",
        priority: "high",
        isNew: true,
        timestamp: new Date(),
        agent: "investor",
        type: "risk",
        impact: "high",
        dataSource: "calculated"
      });
    } else if (ytdReturn > 12) {
      insights.push({
        id: uuidv4(),
        title: "Excelente performance no ano",
        description: "Seus investimentos estão performando muito bem este ano, com retorno acima de 12%.",
        category: "performance",
        priority: "low",
        isNew: true,
        timestamp: new Date(),
        agent: "investor",
        type: "opportunity",
        impact: "medium",
        dataSource: "calculated"
      });
    }
  }

  return insights;
};

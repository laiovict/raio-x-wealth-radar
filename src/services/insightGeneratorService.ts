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

// For backward compatibility, alias generateAIInsights as generatePortfolioInsights
export const generatePortfolioInsights = generateAIInsights;


import { PortfolioSummary, DividendHistory, AIInsight, DataSourceType } from '@/types/raioXTypes';
import { formatCurrency } from '@/utils/formattingUtils';
import { deepClone } from '@/utils/portfolioHelpers';

/**
 * Generates insights based on portfolio data
 */
export const generateAIInsights = (
  portfolioSummary: PortfolioSummary | null,
  dividendHistory: DividendHistory[] | null,
  useSynthetic = false
): AIInsight[] => {
  // If using synthetic data, return pre-defined insights
  if (useSynthetic) {
    return generateSyntheticInsights();
  }
  
  // Initialize insights array
  const insights: AIInsight[] = [];
  
  // If no real data, return empty array
  if (!portfolioSummary && (!dividendHistory || dividendHistory.length === 0)) {
    return [];
  }
  
  // Generate insights based on portfolio composition
  if (portfolioSummary) {
    const fixedIncomeValue = Number(portfolioSummary.fixed_income_value);
    const totalValue = Number(portfolioSummary.total_portfolio_value);
    
    // Check portfolio diversification
    if (totalValue > 0 && fixedIncomeValue / totalValue > 0.7) {
      insights.push({
        id: 'real-insight-1',
        title: 'Alta concentração em renda fixa',
        description: `${Math.round((fixedIncomeValue / totalValue) * 100)}% da sua carteira está em renda fixa. Considere diversificar para alcançar melhores retornos a longo prazo.`,
        category: 'allocation',
        priority: 'medium',
        timestamp: new Date(),
        agent: 'investor',
        impact: 'medium',
        type: 'insight',
        dataSource: 'supabase'
      });
    }
    
    // Add more real data insights here
  }
  
  // Generate insights based on dividend history
  if (dividendHistory && dividendHistory.length > 0) {
    // Calculate average dividend
    const totalDividends = dividendHistory.reduce((sum, div) => {
      const value = typeof div.value === 'string' ? parseFloat(div.value) : div.value;
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
    
    const averageDividend = totalDividends / dividendHistory.length;
    
    insights.push({
      id: 'real-insight-dividend-1',
      title: 'Análise de dividendos',
      description: `Seus investimentos geraram ${formatCurrency(totalDividends)} em dividendos, com média de ${formatCurrency(averageDividend)} por pagamento.`,
      category: 'income',
      priority: 'low',
      timestamp: new Date(),
      agent: 'farmer',
      impact: 'low',
      type: 'insight',
      dataSource: 'supabase'
    });
  }
  
  return insights;
};

/**
 * Generate synthetic insights for demo purposes
 */
const generateSyntheticInsights = (): AIInsight[] => {
  const now = new Date();
  
  return [
    {
      id: 'synthetic-1',
      title: 'Oportunidade em fundos imobiliários',
      description: 'Com a queda recente das taxas de juros, fundos imobiliários tendem a se valorizar. Considere aumentar sua exposição nesta classe de ativos.',
      category: 'opportunity',
      priority: 'high',
      timestamp: now,
      agent: 'investor',
      isSynthetic: true,
      type: 'opportunity',
      impact: 'high',
      dataSource: 'synthetic'
    },
    {
      id: 'synthetic-2',
      title: 'Concentração excessiva em tecnologia',
      description: 'Sua carteira possui 47% de concentração em empresas de tecnologia, o que aumenta o risco setorial. Considere diversificar para setores mais defensivos.',
      category: 'risk',
      priority: 'medium',
      timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
      agent: 'planner',
      isSynthetic: true,
      type: 'risk',
      impact: 'medium',
      dataSource: 'synthetic'
    },
    {
      id: 'synthetic-3',
      title: 'Reserva de emergência abaixo do ideal',
      description: 'Sua reserva atual cobre apenas 3 meses de despesas. O ideal seria aumentar para 6 meses, considerando seu perfil de renda.',
      category: 'planning',
      priority: 'high',
      timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      agent: 'planner',
      isSynthetic: true,
      type: 'risk',
      impact: 'high',
      dataSource: 'synthetic'
    },
    // Add more synthetic insights as needed
  ];
};

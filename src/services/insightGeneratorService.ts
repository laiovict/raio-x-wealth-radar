
import { DataSourceType, PortfolioSummary, DividendHistory, AIInsight } from '@/types/raioXTypes';
import { toNumber, ensureNumber } from '@/utils/typeConversionHelpers';
import { formatCurrency, formatPercentage } from '@/utils/formattingUtils';

/**
 * Generate insights based on portfolio data
 * @param portfolioSummary Portfolio summary data
 * @param stocks Stocks data
 * @param fixedIncome Fixed income data
 * @param investmentFunds Investment funds data
 * @param realEstate Real estate data
 * @param profitability Profitability data
 * @param dividendHistory Dividend history data
 * @returns Array of insights
 */
export const generatePortfolioInsights = (
  portfolioSummary: PortfolioSummary | null | undefined,
  stocks: any[] = [],
  fixedIncome: any[] = [],
  investmentFunds: any[] = [],
  realEstate: any[] = [],
  profitability: any = null,
  dividendHistory: DividendHistory[] = []
): AIInsight[] => {
  const insights: AIInsight[] = [];
  const currentDate = new Date();
  const hasRealData = !!(portfolioSummary || stocks.length || fixedIncome.length || 
                        investmentFunds.length || realEstate.length || profitability || 
                        dividendHistory.length);
  
  const dataSource: DataSourceType = hasRealData ? 'supabase' : 'synthetic';
  
  // Generate diversification insights
  if (portfolioSummary) {
    const fixedIncomePerc = toNumber(portfolioSummary.fixed_income_representation);
    const stocksPerc = toNumber(portfolioSummary.stocks_representation);
    const fundsPerc = toNumber(portfolioSummary.investment_fund_representation);
    const realEstatePerc = toNumber(portfolioSummary.real_estate_representation);
    
    // Check for over-concentration in fixed income
    if (fixedIncomePerc > 70) {
      insights.push({
        id: 'concentration-fixed-income',
        title: 'Alta concentração em Renda Fixa',
        description: `Sua carteira possui ${formatPercentage(String(fixedIncomePerc))} em produtos de renda fixa. Considere diversificar para aumentar o potencial de retorno de longo prazo.`,
        type: 'insight',
        category: 'diversificação',
        impact: 'medium',
        actions: [
          'Avaliar alocação em fundos multimercado',
          'Considerar ETFs para exposição diversificada ao mercado'
        ],
        agent: 'financial-advisor',
        priority: 'medium',
        isNew: true,
        timestamp: currentDate,
        dataSource
      });
    }
    
    // Check for opportunities to invest in stocks
    if (stocksPerc < 15 && fixedIncomePerc > 50) {
      insights.push({
        id: 'opportunity-stocks',
        title: 'Oportunidade em Renda Variável',
        description: 'Sua exposição ao mercado de ações está baixa. Considere aumentar gradualmente sua exposição para melhorar retornos de longo prazo.',
        type: 'opportunity',
        category: 'alocação',
        impact: 'high',
        actions: [
          'Incluir ETFs para exposição ao mercado de ações',
          'Avaliar ações de dividendos para início em renda variável'
        ],
        agent: 'financial-advisor',
        priority: 'high',
        isNew: true,
        timestamp: currentDate,
        dataSource
      });
    }
    
    // Check for lack of international diversification
    if (!portfolioSummary.investment_international_value || 
        toNumber(portfolioSummary.investment_international_value) < 5) {
      insights.push({
        id: 'international-diversification',
        title: 'Diversificação Internacional',
        description: 'Sua carteira possui pouca ou nenhuma exposição a mercados internacionais. Considere adicionar ativos globais para reduzir o risco país.',
        type: 'opportunity',
        category: 'diversificação',
        impact: 'medium',
        actions: [
          'Avaliar ETFs de mercados internacionais',
          'Considerar BDRs de empresas globais'
        ],
        agent: 'financial-advisor',
        priority: 'medium',
        isNew: true,
        timestamp: currentDate,
        dataSource
      });
    }
  }
  
  // Generate dividend insights
  if (dividendHistory && dividendHistory.length > 0) {
    let totalDividends = 0;
    let uniqueAssets = new Set<string>();
    
    // Calculate total dividends and unique dividend-paying assets
    dividendHistory.forEach(dividend => {
      totalDividends += toNumber(dividend.value);
      if (dividend.asset) uniqueAssets.add(dividend.asset);
    });
    
    // Insight about dividend portfolio
    if (uniqueAssets.size > 3) {
      insights.push({
        id: 'dividend-portfolio',
        title: 'Carteira de Dividendos',
        description: `Você recebeu dividendos de ${uniqueAssets.size} ativos diferentes nos últimos 12 meses, totalizando ${formatCurrency(String(totalDividends))}. Sua estratégia de dividendos está bem diversificada.`,
        type: 'insight',
        category: 'dividendos',
        impact: 'medium',
        actions: [
          'Considerar reinvestimento automático de dividendos',
          'Analisar quais ativos têm maior rentabilidade em dividendos'
        ],
        agent: 'financial-advisor',
        priority: 'medium',
        isNew: false,
        timestamp: currentDate,
        dataSource
      });
    } else if (uniqueAssets.size > 0) {
      insights.push({
        id: 'dividend-growth',
        title: 'Potencial de Crescimento em Dividendos',
        description: `Você está recebendo dividendos de ${uniqueAssets.size} ${uniqueAssets.size === 1 ? 'ativo' : 'ativos'}. Considere expandir sua carteira de dividendos para aumentar sua renda passiva.`,
        type: 'opportunity',
        category: 'dividendos',
        impact: 'medium',
        actions: [
          'Avaliar ações com histórico de pagamento de dividendos',
          'Considerar FIIs para diversificação de renda'
        ],
        agent: 'financial-advisor',
        priority: 'medium',
        isNew: true,
        timestamp: currentDate,
        dataSource
      });
    }
  }
  
  // Generate insights based on profitability
  if (profitability) {
    const ytdReturn = ensureNumber(profitability.ytd);
    const sixMonthReturn = ensureNumber(profitability.six_months);
    const twelveMonthReturn = ensureNumber(profitability.twelve_months);
    
    // Check for performance trends
    if (ytdReturn > 10) {
      insights.push({
        id: 'strong-performance',
        title: 'Desempenho Excepcional',
        description: `Sua carteira apresentou rentabilidade de ${formatPercentage(String(ytdReturn))} neste ano, superando a média do mercado. Sua estratégia tem se mostrado eficaz.`,
        type: 'insight',
        category: 'desempenho',
        impact: 'high',
        actions: [
          'Revisar alocações que tiveram maior contribuição',
          'Considerar rebalancear a carteira para manter o perfil de risco'
        ],
        agent: 'financial-advisor',
        priority: 'low',
        isNew: false,
        timestamp: currentDate,
        dataSource
      });
    } else if (ytdReturn < 0 && sixMonthReturn < 0) {
      insights.push({
        id: 'performance-concern',
        title: 'Alerta de Desempenho',
        description: `Sua carteira está com rentabilidade negativa de ${formatPercentage(String(ytdReturn))} neste ano. Considere revisar sua estratégia e alocações.`,
        type: 'risk',
        category: 'desempenho',
        impact: 'high',
        actions: [
          'Agendar revisão da carteira com seu assessor',
          'Analisar ativos com pior desempenho para possível substituição'
        ],
        agent: 'financial-advisor',
        priority: 'high',
        isNew: true,
        timestamp: currentDate,
        dataSource
      });
    }
    
    // Check for performance consistency
    if (twelveMonthReturn > 0 && sixMonthReturn > 0 && ytdReturn > 0) {
      insights.push({
        id: 'consistent-performance',
        title: 'Consistência de Resultados',
        description: 'Sua carteira manteve rentabilidade positiva nos últimos 12 meses, demonstrando consistência na estratégia adotada.',
        type: 'insight',
        category: 'desempenho',
        impact: 'medium',
        actions: [
          'Manter a estratégia atual de investimentos',
          'Considerar aumentar aportes regulares'
        ],
        agent: 'financial-advisor',
        priority: 'low',
        isNew: false,
        timestamp: currentDate,
        dataSource
      });
    }
  }
  
  // Generate stock-specific insights
  if (stocks && stocks.length > 0) {
    // Find stocks with negative performance
    const underperformingStocks = stocks.filter(stock => 
      toNumber(stock.performance) < 0
    );
    
    if (underperformingStocks.length > 0 && underperformingStocks.length <= 3) {
      insights.push({
        id: 'underperforming-stocks',
        title: 'Ações com Baixo Desempenho',
        description: `${underperformingStocks.length} ${underperformingStocks.length === 1 ? 'ação está' : 'ações estão'} com desempenho negativo em sua carteira. Considere reavaliar estas posições.`,
        type: 'risk',
        category: 'ações',
        impact: 'medium',
        actions: [
          'Analisar fundamentalmente as empresas em questão',
          'Considerar substituição ou redução das posições'
        ],
        agent: 'financial-advisor',
        priority: 'medium',
        isNew: true,
        timestamp: currentDate,
        dataSource
      });
    }
    
    // Check for concentration in specific stocks
    if (stocks.length >= 3) {
      // Sort stocks by total value (descending)
      const sortedStocks = [...stocks].sort((a, b) => 
        toNumber(b.total_value) - toNumber(a.total_value)
      );
      
      // Check if top stock is more than 30% of total stocks value
      if (sortedStocks.length > 0) {
        const topStock = sortedStocks[0];
        const totalStocksValue = stocks.reduce((sum, stock) => 
          sum + toNumber(stock.total_value), 0
        );
        
        const topStockPercentage = totalStocksValue > 0 
          ? (toNumber(topStock.total_value) / totalStocksValue) * 100 
          : 0;
        
        if (topStockPercentage > 30) {
          insights.push({
            id: 'stock-concentration',
            title: 'Concentração em Ações',
            description: `${topStock.asset || 'Uma ação'} representa ${formatPercentage(String(topStockPercentage))} do valor total em ações. Considere diversificar para reduzir riscos específicos.`,
            type: 'risk',
            category: 'diversificação',
            impact: 'high',
            actions: [
              'Reduzir gradualmente a exposição ao ativo concentrado',
              'Diversificar em outros setores do mercado'
            ],
            agent: 'financial-advisor',
            priority: 'high',
            isNew: true,
            timestamp: currentDate,
            dataSource
          });
        }
      }
    }
  }
  
  // If we have fixed income investments, check for maturity distribution
  if (fixedIncome && fixedIncome.length > 0) {
    // Todo: Add fixed income specific insights
    // This is a placeholder for future implementation
  }
  
  // Return all generated insights
  return insights;
};

/**
 * Generate tailored financial recommendations based on portfolio data
 * @param clientData Client portfolio and personal data
 * @returns Array of personalized recommendations
 */
export const generatePersonalizedRecommendations = (clientData: any) => {
  const recommendations = [];
  const dataSource: DataSourceType = clientData ? 'supabase' : 'synthetic';
  const currentDate = new Date();
  
  // Implementation will be expanded based on real data patterns
  // This is a placeholder for now
  
  return recommendations;
};

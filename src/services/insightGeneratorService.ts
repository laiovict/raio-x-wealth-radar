
import { DataSourceType, PortfolioSummary, DividendHistory, AIInsight } from '@/types/raioXTypes';
import { toNumber, ensureNumber } from '@/utils/typeConversionHelpers';
import { formatCurrency, formatPercentage } from '@/utils/formattingUtils';
import { calculateDiversificationScore } from '@/utils/financialMetricsUtils';

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
    
    // Calculate diversification score
    const { score: diversificationScore } = calculateDiversificationScore(portfolioSummary);
    
    // Add diversification score insight
    insights.push({
      id: 'diversification-score',
      title: 'Score de Diversificação',
      description: `Sua carteira tem um score de diversificação de ${diversificationScore}/100. ${
        diversificationScore > 75 ? 'Excelente diversificação entre classes de ativos.' :
        diversificationScore > 50 ? 'Boa diversificação, mas pode melhorar em algumas áreas.' :
        'Considere diversificar mais sua carteira para reduzir riscos.'
      }`,
      type: 'insight',
      category: 'diversificação',
      impact: diversificationScore > 70 ? 'low' : diversificationScore > 40 ? 'medium' : 'high',
      actions: [
        diversificationScore > 75 ? 'Manter a estratégia atual de diversificação' :
        'Avaliar exposição a diferentes classes de ativos',
        diversificationScore < 60 ? 'Considerar reduzir concentração em renda fixa' : 
        'Continuar monitorando a alocação entre classes de ativos'
      ],
      agent: 'financial-advisor',
      priority: diversificationScore > 70 ? 'low' : diversificationScore > 40 ? 'medium' : 'high',
      isNew: false,
      timestamp: currentDate,
      dataSource: dataSource
    });
    
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
    
    // Calculate passive income potential
    const monthlyAverage = totalDividends / 12;
    if (monthlyAverage > 0) {
      insights.push({
        id: 'passive-income',
        title: 'Renda Passiva',
        description: `Seus investimentos geram aproximadamente ${formatCurrency(String(monthlyAverage))} por mês em dividendos. Continue ampliando sua carteira de proventos para aumentar sua renda passiva.`,
        type: 'insight',
        category: 'renda-passiva',
        impact: 'medium',
        actions: [
          'Analisar ativos com maior dividend yield',
          'Estabelecer metas para renda passiva'
        ],
        agent: 'financial-advisor',
        priority: 'low',
        isNew: false,
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
    
    // Check for sector concentration
    const sectors = {
      financials: { count: 0, value: 0 },
      energy: { count: 0, value: 0 },
      materials: { count: 0, value: 0 },
      consumer: { count: 0, value: 0 },
      other: { count: 0, value: 0 }
    };
    
    // Simple sector categorization based on stock tickers (simplified)
    stocks.forEach(stock => {
      const ticker = String(stock.asset || '').toUpperCase();
      const value = toNumber(stock.total_value);
      
      if (/BB[AS][34]|ITUB[34]|ITSA[34]|SANB11/.test(ticker)) {
        sectors.financials.count++;
        sectors.financials.value += value;
      } else if (/PETR[34]|UGPA3|CSAN3/.test(ticker)) {
        sectors.energy.count++;
        sectors.energy.value += value;
      } else if (/VALE3|GGBR[34]|CSNA3/.test(ticker)) {
        sectors.materials.count++;
        sectors.materials.value += value;
      } else if (/ABEV3|MGLU3|LREN3|VVAR3/.test(ticker)) {
        sectors.consumer.count++;
        sectors.consumer.value += value;
      } else {
        sectors.other.count++;
        sectors.other.value += value;
      }
    });
    
    // Calculate total stocks value
    const totalStocksValue = Object.values(sectors).reduce((total, sector) => total + sector.value, 0);
    
    // Check for sector concentration
    for (const [sector, data] of Object.entries(sectors)) {
      const percentage = totalStocksValue > 0 ? (data.value / totalStocksValue) * 100 : 0;
      
      if (percentage > 50 && data.count >= 2) {
        const sectorNames = {
          financials: "Financeiro",
          energy: "Energia",
          materials: "Materiais",
          consumer: "Consumo",
          other: "Outros"
        };
        
        insights.push({
          id: `sector-concentration-${sector}`,
          title: `Concentração Setorial: ${sectorNames[sector as keyof typeof sectorNames]}`,
          description: `${formatPercentage(String(percentage))} de suas ações estão concentradas no setor ${sectorNames[sector as keyof typeof sectorNames]}. Considere diversificar em outros setores para reduzir o risco setorial.`,
          type: 'risk',
          category: 'diversificação',
          impact: 'medium',
          actions: [
            'Avaliar exposição a outros setores da economia',
            'Considerar ETFs setoriais para diversificação'
          ],
          agent: 'financial-advisor',
          priority: 'medium',
          isNew: true,
          timestamp: currentDate,
          dataSource
        });
        
        // Only show one sector concentration insight
        break;
      }
    }
  }
  
  // If we have fixed income investments, check for maturity distribution
  if (fixedIncome && fixedIncome.length > 0) {
    // Todo: Add fixed income specific insights
    // This is a placeholder for future implementation
    
    // Example: Check maturity profile
    const currentYear = new Date().getFullYear();
    const shortTermCount = fixedIncome.filter(fi => {
      if (!fi.maturity_date) return false;
      const maturityYear = parseInt(fi.maturity_date.split('/')[2] || '0');
      return maturityYear > 0 && maturityYear <= currentYear + 2;
    }).length;
    
    const longTermCount = fixedIncome.filter(fi => {
      if (!fi.maturity_date) return false;
      const maturityYear = parseInt(fi.maturity_date.split('/')[2] || '0');
      return maturityYear > currentYear + 5;
    }).length;
    
    if (shortTermCount > fixedIncome.length * 0.7 && fixedIncome.length >= 3) {
      insights.push({
        id: 'fixed-income-short-term',
        title: 'Renda Fixa de Curto Prazo',
        description: 'A maioria dos seus investimentos em renda fixa tem vencimento no curto prazo. Considere escalonar vencimentos para otimizar retornos.',
        type: 'opportunity',
        category: 'renda-fixa',
        impact: 'medium',
        actions: [
          'Avaliar títulos com vencimentos mais longos',
          'Implementar estratégia de escalonamento de vencimentos'
        ],
        agent: 'financial-advisor',
        priority: 'medium',
        isNew: true,
        timestamp: currentDate,
        dataSource
      });
    } else if (longTermCount > fixedIncome.length * 0.7 && fixedIncome.length >= 3) {
      insights.push({
        id: 'fixed-income-long-term',
        title: 'Renda Fixa de Longo Prazo',
        description: 'A maioria dos seus investimentos em renda fixa tem vencimento no longo prazo. Considere manter alguma liquidez para oportunidades.',
        type: 'insight',
        category: 'renda-fixa',
        impact: 'low',
        actions: [
          'Avaliar necessidade de liquidez',
          'Considerar alocação parcial em títulos mais líquidos'
        ],
        agent: 'financial-advisor',
        priority: 'low',
        isNew: true,
        timestamp: currentDate,
        dataSource
      });
    }
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

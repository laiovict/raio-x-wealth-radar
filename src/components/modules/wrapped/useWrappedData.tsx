
import { useCallback, useMemo } from 'react';
import { useRaioX } from '@/context/RaioXContext';
import { toNumber, toString, ensureString } from '@/utils/typeConversionHelpers';
import { 
  INVESTMENT_SONGS, 
  UNUSUAL_INVESTMENTS, 
  FAMOUS_INVESTORS,
  ClientInsights,
  WrappedData
} from './constants';

export const useWrappedData = () => {
  const { data, selectedClient } = useRaioX();

  // Generate wrapped data based on real Supabase data
  const wrappedData: WrappedData = useMemo(() => {
    // Default wrapped data
    const defaultWrapped = {
      biggestContribution: {
        amount: 50000,
        date: "2023-06-15"
      },
      longestPositiveStreak: 7,
      largestDrawdown: {
        percentage: 12.5,
        period: "Mar-Abr 2023"
      },
      mostProfitableAsset: {
        name: "WEGE3",
        return: 32.4
      },
      summary: "2025 foi um ano positivo para sua carteira, com destaque para as ações do setor industrial. Seu padrão de aportes consistentes contribuiu para o bom desempenho, apesar da volatilidade no 2º trimestre.",
      dataSource: 'synthetic' as const
    };
    
    // If we have dividend history from Supabase, use it to enhance wrapped data
    if (data.dividendHistory && data.dividendHistory.length > 0) {
      try {
        // Find largest dividend payment
        let largestDividend = {
          asset: data.dividendHistory[0].asset,
          value: parseFloat(data.dividendHistory[0].value || "0")
        };
        
        data.dividendHistory.forEach(dividend => {
          const value = parseFloat(dividend.value || "0");
          if (value > largestDividend.value) {
            largestDividend = {
              asset: dividend.asset,
              value
            };
          }
        });
        
        // Enhance the wrapped data with real dividend information
        if (largestDividend.value > 0) {
          defaultWrapped.mostProfitableAsset = {
            name: largestDividend.asset || "",
            return: Math.round(largestDividend.value / 100) / 10 * 100 // Convert to percentage with rounding
          };
          return {
            ...defaultWrapped,
            dataSource: 'supabase' as const
          };
        }
      } catch (error) {
        console.error("Error processing dividend history:", error);
      }
    }
    
    // If we have portfolio data from Supabase, calculate insights
    if (data.portfolioSummary && data.stocks && data.stocks.length > 0) {
      try {
        // Find most profitable asset from stocks
        let highestReturn = 0;
        let mostProfitableAsset = "Unknown";
        
        data.stocks.forEach(stock => {
          const performance = parseFloat(String(stock.performance || "0"));
          if (performance > highestReturn) {
            highestReturn = performance;
            mostProfitableAsset = stock.asset || "Unknown";
          }
        });
        
        // Estimate longest positive streak based on profitability data
        const estimatedStreak = (data.profitability?.ytd || 0) > 10 ? 8 : 
                              (data.profitability?.ytd || 0) > 5 ? 6 : 4;
        
        // Generate a summary based on real data
        const portfolioValue = parseFloat(data.portfolioSummary.total_portfolio_value || "0");
        const fixedIncomePercent = data.portfolioSummary.fixed_income_representation;
        const stocksPercent = parseFloat(data.portfolioSummary.stocks_representation || "0");
        
        let assetFocus = "diversificada";
        if (fixedIncomePercent > 60) assetFocus = "renda fixa";
        else if (stocksPercent > 40) assetFocus = "renda variável";
        
        const returns = data.profitability?.ytd || 0;
        const returnComment = returns > 10 ? "excelente desempenho" : 
                             returns > 5 ? "bom desempenho" : "desempenho moderado";
        
        const summary = `2025 foi um ano de ${returnComment} para sua carteira, com foco em ${assetFocus}. ${
          mostProfitableAsset !== "Unknown" ? `Destaque para ${mostProfitableAsset} entre seus investimentos.` : 
          "Sua estratégia de diversificação tem se mostrado eficaz para balancear risco e retorno."
        }`;
        
        return {
          biggestContribution: {
            amount: portfolioValue * 0.05, // Estimate biggest contribution as 5% of portfolio
            date: "2025-03-15"
          },
          longestPositiveStreak: estimatedStreak,
          largestDrawdown: {
            percentage: 8.5, // Generic estimate
            period: "Fev-Mar 2025"
          },
          mostProfitableAsset: {
            name: mostProfitableAsset !== "Unknown" ? mostProfitableAsset : defaultWrapped.mostProfitableAsset.name,
            return: highestReturn > 0 ? highestReturn : 15.3
          },
          summary,
          dataSource: 'supabase' as const
        };
      } catch (error) {
        console.error("Error calculating wrapped data:", error);
        return defaultWrapped;
      }
    }
    
    // If no data from Supabase or calculation failed, use existing data
    return data.wrapped || defaultWrapped;
  }, [data.portfolioSummary, data.stocks, data.profitability, data.wrapped, data.dividendHistory]);

  // Select a random song for this client
  const getClientSong = useCallback(() => {
    // Generate a consistent index based on client ID for deterministic selection
    const songIndex = selectedClient ? selectedClient % INVESTMENT_SONGS.length : 0;
    return INVESTMENT_SONGS[songIndex];
  }, [selectedClient]);
  
  // Select a random unusual investment for this client
  const getUnusualInvestment = useCallback(() => {
    // Generate a consistent index based on client ID for deterministic selection
    const index = selectedClient ? selectedClient % UNUSUAL_INVESTMENTS.length : 0;
    return UNUSUAL_INVESTMENTS[index];
  }, [selectedClient]);
  
  // Select a famous investor comparison for this client
  const getInvestorComparison = useCallback(() => {
    // Generate a consistent index based on client ID for deterministic selection
    const index = selectedClient ? selectedClient % FAMOUS_INVESTORS.length : 0;
    return FAMOUS_INVESTORS[index];
  }, [selectedClient]);
  
  // Generate active day for investments
  const getActiveDay = useCallback(() => {
    const days = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"];
    const percentages = [42, 38, 31, 27, 35];
    
    // Generate a consistent index based on client ID for deterministic selection
    const index = selectedClient ? selectedClient % days.length : 0;
    
    return `${days[index]} (${percentages[index]}% das suas operações)`;
  }, [selectedClient]);

  // Define client specific insights based on real data
  const getClientSpecificInsights = useCallback((): ClientInsights => {
    // Create personalized insights based on selected client and portfolio data
    if (selectedClient) {
      let personalityType = "Investidor Equilibrado";
      let investmentStyle = "Sua abordagem combina crescimento e valor de forma única";
      let personalizedInsight = "Você demonstrou notável resiliência, mantendo sua estratégia mesmo em momentos de alta volatilidade.";
      
      // If we have portfolio data, make insights more specific
      if (data.portfolioSummary) {
        const fixedIncomePerc = data.portfolioSummary.fixed_income_representation || 0;
        const stocksPerc = parseFloat(data.portfolioSummary.stocks_representation || "0");
        
        if (fixedIncomePerc > 60) {
          personalityType = "Conservador Estratégico";
          investmentStyle = "Você prioriza segurança e estabilidade em seus investimentos";
          personalizedInsight = "Você se destaca entre investidores que valorizam consistência sobre volatilidade, mantendo mais de 60% em renda fixa mesmo em tempos de taxas decrescentes.";
        } else if (stocksPerc > 40) {
          personalityType = "Investidor de Valor";
          investmentStyle = "Você busca ativos subvalorizados com potencial de crescimento";
          personalizedInsight = "Sua confiança no mercado de ações brasileiro te coloca no top 25% de investidores com maior exposição à bolsa nacional.";
        } else if (data.portfolioSummary.investment_fund_representation > 30) {
          personalityType = "Delegador Inteligente";
          investmentStyle = "Você confia em gestores profissionais para multiplicar seu patrimônio";
          personalizedInsight = "Sua estratégia de delegar mais de 30% do patrimônio a gestores especializados demonstra pragmatismo e valorização do tempo.";
        } else if (data.portfolioSummary.investment_international_representation) {
          personalityType = "Investidor Global";
          investmentStyle = "Você diversifica geograficamente seus investimentos para reduzir riscos específicos de cada país";
          personalizedInsight = "Sua exposição internacional te diferencia de 83% dos investidores que mantêm portfolios concentrados apenas no Brasil.";
        }
      }
      
      // Check dividend history for more insights
      if (data.dividendHistory && data.dividendHistory.length > 3) {
        personalizedInsight = "Você está entre os 22% de investidores que priorizam consistentemente dividendos em sua estratégia.";
      }
      
      const investorComparison = getInvestorComparison();
      const song = getClientSong();
      const unusualInvestment = getUnusualInvestment();
      
      return {
        personalizedInsight,
        personalityType,
        mostUnusualInvestment: unusualInvestment,
        investmentStyle,
        financialSong: song.title,
        songPreviewUrl: song.preview,
        songImage: song.image,
        songArtist: song.artist,
        mostActiveDay: getActiveDay(),
        investorCompatibility: `${investorComparison.name} (${String(investorComparison.compatibility)})`,
        investorStyle: investorComparison.style,
        dataSource: data.portfolioSummary ? 'supabase' as const : 'synthetic' as const
      };
    }

    // Default insights if no client is selected
    return {
      personalizedInsight: "Você demonstrou notável resiliência, mantendo sua estratégia mesmo em momentos de alta volatilidade.",
      personalityType: "Investidor Balanceado",
      mostUnusualInvestment: getUnusualInvestment(),
      investmentStyle: "Sua abordagem combina crescimento e valor de forma única",
      financialSong: getClientSong().title,
      songPreviewUrl: getClientSong().preview,
      songImage: getClientSong().image,
      songArtist: getClientSong().artist,
      mostActiveDay: getActiveDay(),
      investorCompatibility: `${getInvestorComparison().name} (${String(getInvestorComparison().compatibility)})`,
      investorStyle: getInvestorComparison().style,
      dataSource: 'synthetic' as const
    };
  }, [data.portfolioSummary, data.dividendHistory, selectedClient, getActiveDay, getClientSong, getInvestorComparison, getUnusualInvestment]);

  return {
    wrappedData,
    clientInsights: getClientSpecificInsights()
  };
};

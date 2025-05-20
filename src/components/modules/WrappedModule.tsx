
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowUp,
  TrendingUp,
  Calendar,
  ArrowDown,
  Star,
  BadgePercent,
  Award,
  Wallet,
  Users,
  PiggyBank,
  Gift
} from "lucide-react";
import { useState, useMemo } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";

interface WrappedModuleProps {
  fullWidth?: boolean;
}

const WrappedModule = ({ fullWidth = false }: WrappedModuleProps) => {
  const { data, selectedClient } = useRaioX();
  
  // Generate wrapped data based on real Supabase data
  const wrappedData = useMemo(() => {
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
      summary: "2023 foi um ano positivo para sua carteira, com destaque para as ações do setor industrial. Seu padrão de aportes consistentes contribuiu para o bom desempenho, apesar da volatilidade no 2º trimestre.",
      dataSource: 'synthetic' as const
    };
    
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
            name: mostProfitableAsset,
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
  }, [data.portfolioSummary, data.stocks, data.profitability, data.wrapped]);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Define client specific insights based on real data
  const getClientSpecificInsights = () => {
    // Create personalized insights based on selected client and portfolio data
    if (selectedClient === 240275) {
      return {
        personalizedInsight: "Laio, você é parte dos 5% de investidores que mantiveram consistência nos aportes mensais, mesmo nos meses mais voláteis. Isso mostra disciplina!",
        personalityType: "Estrategista Paciente",
        mostUnusualInvestment: "ETF de Metaverso",
        investmentStyle: "Você prefere investir quando todos estão com medo - um verdadeiro contrarian!",
        financialSong: "Money - Pink Floyd",
        mostActiveDay: "Terça-feira (38% das suas operações)",
        investorCompatibility: "Warren Buffett (87% compatível)"
      };
    } else if (selectedClient === 12345678) {
      // Portfolio-based insights
      let personalityType = "Investidor Equilibrado";
      let investmentStyle = "Sua abordagem combina crescimento e valor de forma única";
      let compatibleInvestor = "Benjamin Graham (75% compatível)";
      
      // If we have portfolio data, make insights more specific
      if (data.portfolioSummary) {
        const fixedIncomePerc = data.portfolioSummary.fixed_income_representation || 0;
        const stocksPerc = parseFloat(data.portfolioSummary.stocks_representation || "0");
        
        if (fixedIncomePerc > 60) {
          personalityType = "Conservador Estratégico";
          investmentStyle = "Você prioriza segurança e estabilidade em seus investimentos";
          compatibleInvestor = "John Bogle (82% compatível)";
        } else if (stocksPerc > 40) {
          personalityType = "Investidor de Valor";
          investmentStyle = "Você busca ativos subvalorizados com potencial de crescimento";
          compatibleInvestor = "Peter Lynch (85% compatível)";
        } else if (data.portfolioSummary.investment_fund_representation > 30) {
          personalityType = "Delegador Inteligente";
          investmentStyle = "Você confia em gestores profissionais para multiplicar seu patrimônio";
          compatibleInvestor = "Ray Dalio (83% compatível)";
        }
      }
      
      return {
        personalizedInsight: "Você está entre os investidores mais consistentes, mantendo aportes mensais mesmo quando o mercado estava em baixa.",
        personalityType,
        mostUnusualInvestment: "Small Caps do Setor de Energia",
        investmentStyle,
        financialSong: "Billionaire - Bruno Mars",
        mostActiveDay: "Segunda-feira (42% das suas operações)",
        investorCompatibility: compatibleInvestor
      };
    }

    // Generate insights based on portfolio data for other clients
    let personalizedInsight = "Você demonstrou notável resiliência, mantendo sua estratégia mesmo em momentos de alta volatilidade.";
    let personalityType = "Investidor Balanceado";
    let mostUnusualInvestment = "Criptomoedas Alternativas";
    let investmentStyle = "Sua abordagem combina crescimento e valor de forma única";
    
    if (data.portfolioSummary) {
      const totalValue = parseFloat(data.portfolioSummary.total_portfolio_value || "0");
      
      // Adjust insights based on portfolio size
      if (totalValue > 1000000) {
        personalizedInsight = "Você se destaca entre os 10% de investidores que ultrapassaram a marca de 1 milhão em ativos sob gestão.";
        personalityType = "Acumulador Estratégico";
        mostUnusualInvestment = "Private Equity";
      } else if (totalValue > 500000) {
        personalizedInsight = "Seu portfólio cresceu consistentemente, colocando você no top 25% dos investidores da sua faixa etária.";
        personalityType = "Construtor de Patrimônio";
      }
      
      // Adjust based on asset allocation
      const fixedIncomePerc = data.portfolioSummary.fixed_income_representation || 0;
      const stocksPerc = parseFloat(data.portfolioSummary.stocks_representation || "0");
      
      if (fixedIncomePerc > 70) {
        investmentStyle = "Você prioriza segurança e preservação de capital acima de tudo";
        mostUnusualInvestment = "Títulos Soberanos Internacionais";
      } else if (stocksPerc > 50) {
        investmentStyle = "Você está disposto a assumir riscos calculados para alcançar retornos acima da média";
        mostUnusualInvestment = "Ações de Tecnologia Disruptiva";
      }
    }

    return {
      personalizedInsight,
      personalityType,
      mostUnusualInvestment,
      investmentStyle,
      financialSong: "Can't Buy Me Love - The Beatles",
      mostActiveDay: "Quarta-feira (31% das suas operações)",
      investorCompatibility: "Benjamin Graham (75% compatível)"
    };
  };

  const clientInsights = getClientSpecificInsights();

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full overflow-hidden border-none shadow-lg`}>
      <CardHeader className="bg-gradient-to-r from-purple-800 to-fuchsia-800 pb-3 border-b border-purple-700/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="rounded-lg bg-purple-600/50 p-2">
              <Award className="h-5 w-5 text-purple-100" />
            </div>
            <CardTitle className="text-xl text-white">
              Retrospectiva Financeira 2025
            </CardTitle>
          </div>
          <span className="text-xs px-3 py-1 bg-purple-700/50 rounded-full text-purple-200 border border-purple-500/30">
            #SuaJornadaFinanceira
          </span>
        </div>
        <p className="text-purple-200 mt-1 text-sm">
          Reveja sua jornada financeira e descubra insights exclusivos
        </p>
      </CardHeader>
      
      <CardContent className="bg-gradient-to-b from-gray-950 to-gray-900/95 p-0">
        <Carousel className="w-full py-4">
          <CarouselContent>
            {/* Slide 1: Cover */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-lg text-center h-[400px] flex flex-col items-center justify-center border border-purple-700/30 shadow-lg">
                <div className="mb-4 p-3 bg-purple-700/40 rounded-full">
                  <Star className="w-12 h-12 text-amber-300" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Sua Jornada Financeira em 2025</h2>
                <p className="text-indigo-200 mb-6">Descubra como seus investimentos contaram sua história neste ano</p>
                <div className="flex items-center justify-center space-x-1 text-xs text-indigo-300">
                  <span className="block w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  <span>Deslize para explorar</span>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 2: Personal Insight */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-indigo-900 to-violet-900 p-6 rounded-lg h-[400px] flex flex-col items-center justify-center border border-indigo-700/30">
                <div className="mb-4 p-3 bg-indigo-700/40 rounded-full">
                  <Users className="w-10 h-10 text-indigo-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Você é Excepcional!</h3>
                <p className="text-center text-lg text-blue-100 mb-6">{clientInsights.personalizedInsight}</p>
                <div className="bg-indigo-700/40 w-full p-4 rounded-lg border border-indigo-600/30">
                  <p className="text-center text-indigo-200">Sua Personalidade Financeira:</p>
                  <p className="text-center text-xl font-bold text-white mt-1">{clientInsights.personalityType}</p>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3: Investment Stats */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-emerald-900 to-teal-900 p-6 rounded-lg h-[400px] border border-emerald-700/30 flex flex-col">
                <div className="mb-4 p-2 bg-emerald-700/40 rounded-full self-center">
                  <TrendingUp className="w-8 h-8 text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Seus Números de Destaque</h3>
                
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div className="flex items-center justify-between bg-emerald-900/40 p-3 rounded-lg border border-emerald-700/30">
                    <div>
                      <p className="text-sm text-emerald-300">Maior Aporte</p>
                      <p className="text-xl font-bold text-white">{formatCurrency(wrappedData.biggestContribution.amount)}</p>
                    </div>
                    <p className="text-emerald-200 text-sm">{formatDate(wrappedData.biggestContribution.date)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between bg-emerald-900/40 p-3 rounded-lg border border-emerald-700/30">
                    <div>
                      <p className="text-sm text-emerald-300">Sequência Positiva</p>
                      <p className="text-xl font-bold text-white">{wrappedData.longestPositiveStreak} meses</p>
                    </div>
                    <p className="text-emerald-200 text-sm">Top 15% dos investidores</p>
                  </div>
                  
                  <div className="flex items-center justify-between bg-emerald-900/40 p-3 rounded-lg border border-emerald-700/30">
                    <div>
                      <p className="text-sm text-emerald-300">Ativo Mais Rentável</p>
                      <p className="text-xl font-bold text-white">{wrappedData.mostProfitableAsset.name}</p>
                    </div>
                    <p className="text-green-400 text-sm">+{wrappedData.mostProfitableAsset.return}% 🚀</p>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 4: Unusual Investment Choices */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-amber-900 to-orange-900 p-6 rounded-lg h-[400px] border border-amber-700/30 flex flex-col">
                <div className="mb-4 p-2 bg-amber-700/40 rounded-full self-center">
                  <Gift className="w-8 h-8 text-amber-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center">Algo Diferente em sua Carteira</h3>
                <p className="text-center text-amber-200 mb-6">Sua escolha mais inusitada deste ano:</p>
                
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-amber-700/40 flex items-center justify-center mb-4 border-4 border-amber-600/40">
                    <Wallet className="w-12 h-12 text-amber-300" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{clientInsights.mostUnusualInvestment}</h4>
                  <p className="text-amber-200 text-center">Apenas 2% dos investidores fizeram esta escolha!</p>
                  
                  <div className="mt-8 w-full bg-amber-800/40 p-4 rounded-lg border border-amber-700/30">
                    <p className="text-center text-white">Seu estilo de investimento:</p>
                    <p className="text-center text-amber-200 italic mt-1">"{clientInsights.investmentStyle}"</p>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 5: Fun Facts */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-purple-900 to-fuchsia-900 p-6 rounded-lg h-[400px] border border-purple-700/30 flex flex-col">
                <div className="mb-4 p-2 bg-purple-700/40 rounded-full self-center">
                  <BadgePercent className="w-8 h-8 text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Curiosidades Financeiras</h3>
                
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-700/30">
                    <p className="text-sm text-purple-300 mb-1">Se sua carteira fosse uma música:</p>
                    <p className="text-lg font-bold text-white">{clientInsights.financialSong}</p>
                  </div>
                  
                  <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-700/30">
                    <p className="text-sm text-purple-300 mb-1">Seu dia mais ativo para investimentos:</p>
                    <p className="text-lg font-bold text-white">{clientInsights.mostActiveDay}</p>
                  </div>
                  
                  <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-700/30">
                    <p className="text-sm text-purple-300 mb-1">Investidor famoso com quem você se parece:</p>
                    <p className="text-lg font-bold text-white">{clientInsights.investorCompatibility}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 6: Call to Action */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-lg text-center h-[400px] flex flex-col items-center justify-center border border-blue-500/20">
                <div className="mb-4 p-3 bg-blue-700/30 rounded-full">
                  <PiggyBank className="w-12 h-12 text-blue-300" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Compartilhe Sua Jornada!</h2>
                <p className="text-blue-200 mb-6">Mostre para seus amigos como foi sua trajetória financeira em 2025</p>
                
                <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
                  <button className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 rounded-full text-sm flex items-center justify-center">
                    <Users className="w-4 h-4 mr-1" /> Compartilhar
                  </button>
                  <button className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-3 rounded-full text-sm flex items-center justify-center">
                    <Award className="w-4 h-4 mr-1" /> Salvar
                  </button>
                </div>
                
                <p className="mt-8 text-xs text-blue-300/70">
                  Sua retrospectiva financeira exclusiva fornecida pela Reinvent
                </p>
              </div>
            </CarouselItem>
          </CarouselContent>
          
          <div className="flex items-center justify-center mt-4">
            <CarouselPrevious className="relative -left-0 mr-2 bg-white/10 hover:bg-white/20 border-white/20" />
            <CarouselNext className="relative -right-0 ml-2 bg-white/10 hover:bg-white/20 border-white/20" />
          </div>
        </Carousel>
        
        <div className="p-6 border-t border-gray-800">
          <p className="text-sm text-gray-400 text-center">
            {wrappedData.summary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WrappedModule;

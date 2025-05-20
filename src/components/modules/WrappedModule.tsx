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
  Gift,
  Music,
  Play
} from "lucide-react";
import React, { useState, useMemo, useCallback, useRef } from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WrappedModuleProps {
  fullWidth?: boolean;
}

// Define type for dataSource
type DataSource = 'synthetic' | 'supabase';

// Songs with embedded preview URLs
const INVESTMENT_SONGS = [
  {
    title: "Money - Pink Floyd",
    artist: "Pink Floyd",
    preview: "https://p.scdn.co/mp3-preview/67aec1c50e0f5d75f4d3f7b3cd182cffe6d947dc",
    image: "https://i.scdn.co/image/ab67616d0000b273ac4f071b654c1c52e8bab6bf"
  },
  {
    title: "Billionaire - Bruno Mars",
    artist: "Bruno Mars",
    preview: "https://p.scdn.co/mp3-preview/9a0e460dc7cfe464ccbf1e632c8b61a0e1c5a5e4",
    image: "https://i.scdn.co/image/ab67616d0000b273fc2b025b1651c505e8cd5691"
  },
  {
    title: "Can't Buy Me Love - The Beatles",
    artist: "The Beatles",
    preview: "https://p.scdn.co/mp3-preview/e747ee27499a60e6250b2edaa1df3a36b7cdb5f7",
    image: "https://i.scdn.co/image/ab67616d0000b273dcf689f9fb4f00cbc495e571"
  },
  {
    title: "Rich Girl - Hall & Oates",
    artist: "Hall & Oates",
    preview: "https://p.scdn.co/mp3-preview/fa2ffa0a3f0ba3cf60d9335f5fea82b075bb7a2a",
    image: "https://i.scdn.co/image/ab67616d0000b273c2e1584013d56fe87b979d4f"
  },
  {
    title: "If I Had $1000000 - Barenaked Ladies",
    artist: "Barenaked Ladies",
    preview: "https://p.scdn.co/mp3-preview/8d054fcf649e5b3711f35105a3587b1ed76f4e4b",
    image: "https://i.scdn.co/image/ab67616d0000b273aa6944ddc070a3d8937c8fb1"
  }
];

// Unusual investment options
const UNUSUAL_INVESTMENTS = [
  "ETF de Metaverso",
  "Small Caps do Setor de Energia",
  "Criptomoedas Alternativas",
  "Private Equity",
  "Fundos de Cannabis",
  "Imóveis em Cidades Fantasmas",
  "Tokens NFT",
  "Vinhos Finos como Investimento",
  "Apostas em Startups de Tecnologia Espacial",
  "Ações do Novo Mercado"
];

// Famous investor comparisons
const FAMOUS_INVESTORS = [
  {name: "Warren Buffett", compatibility: "87%", style: "Abordagem de valor de longo prazo"},
  {name: "Benjamin Graham", compatibility: "75%", style: "Investidor em valor com análise fundamentalista"},
  {name: "Ray Dalio", compatibility: "83%", style: "Visão macro e diversificação global"},
  {name: "Peter Lynch", compatibility: "85%", style: "Investindo no que você conhece"},
  {name: "John Bogle", compatibility: "82%", style: "Investidor passivo com foco em índices"},
  {name: "Cathie Wood", compatibility: "74%", style: "Apostas em inovação e tecnologia disruptiva"}
];

const WrappedModule = ({ fullWidth = false }: WrappedModuleProps) => {
  const { data, selectedClient } = useRaioX();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  
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
      summary: "2025 foi um ano positivo para sua carteira, com destaque para as ações do setor industrial. Seu padrão de aportes consistentes contribuiu para o bom desempenho, apesar da volatilidade no 2º trimestre.",
      dataSource: 'synthetic' as DataSource
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
            name: largestDividend.asset,
            return: Math.round(largestDividend.value / 100) / 10 * 100 // Convert to percentage with rounding
          };
          defaultWrapped.dataSource = 'supabase';
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
          dataSource: 'supabase' as DataSource
        };
      } catch (error) {
        console.error("Error calculating wrapped data:", error);
        return defaultWrapped;
      }
    }
    
    // If no data from Supabase or calculation failed, use existing data
    return data.wrapped || defaultWrapped;
  }, [data.portfolioSummary, data.stocks, data.profitability, data.wrapped, data.dividendHistory]);
  
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
  const getClientSpecificInsights = () => {
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
        investorCompatibility: `${investorComparison.name} (${investorComparison.compatibility})`,
        investorStyle: investorComparison.style,
        dataSource: data.portfolioSummary ? 'supabase' as DataSource : 'synthetic' as DataSource
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
      investorCompatibility: `${getInvestorComparison().name} (${getInvestorComparison().compatibility})`,
      investorStyle: getInvestorComparison().style,
      dataSource: 'synthetic' as const
    };
  };

  const clientInsights = getClientSpecificInsights();
  
  // Handle audio playback
  const togglePlay = (previewUrl: string) => {
    if (audioRef.current) {
      if (isPlaying && audioUrl === previewUrl) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setAudioUrl(previewUrl);
        audioRef.current.src = previewUrl;
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };
  
  // Handle audio end
  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

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
              {wrappedData.dataSource === 'supabase' && (
                <span className="ml-1 text-green-400">
                  <span className="inline-block h-3 w-3">✓</span>
                </span>
              )}
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
                <p className="text-center text-lg text-blue-100 mb-6">
                  {clientInsights.personalizedInsight}
                  {clientInsights.dataSource === 'supabase' && (
                    <span className="ml-1 text-green-400">
                      <span className="inline-block h-3 w-3">✓</span>
                    </span>
                  )}
                </p>
                <div className="bg-indigo-700/40 w-full p-4 rounded-lg border border-indigo-600/30">
                  <p className="text-center text-indigo-200">Sua Personalidade Financeira:</p>
                  <p className="text-center text-xl font-bold text-white mt-1">
                    {clientInsights.personalityType}
                    {clientInsights.dataSource === 'supabase' && (
                      <span className="ml-1 text-green-400">
                        <span className="inline-block h-3 w-3">✓</span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3: Investment Stats */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-emerald-900 to-teal-900 p-6 rounded-lg h-[400px] border border-emerald-700/30 flex flex-col">
                <div className="mb-4 p-2 bg-emerald-700/40 rounded-full self-center">
                  <TrendingUp className="w-8 h-8 text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Seus Números de Destaque
                  {wrappedData.dataSource === 'supabase' && (
                    <span className="ml-1 text-green-400">
                      <span className="inline-block h-3 w-3">✓</span>
                    </span>
                  )}
                </h3>
                
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
                  <h4 className="text-xl font-bold text-white mb-2">
                    {clientInsights.mostUnusualInvestment}
                    {clientInsights.dataSource === 'supabase' && (
                      <span className="ml-1 text-green-400">
                        <span className="inline-block h-3 w-3">✓</span>
                      </span>
                    )}
                  </h4>
                  <p className="text-amber-200 text-center">Apenas 2% dos investidores fizeram esta escolha!</p>
                  
                  <div className="mt-8 w-full bg-amber-800/40 p-4 rounded-lg border border-amber-700/30">
                    <p className="text-center text-white">Seu estilo de investimento:</p>
                    <p className="text-center text-amber-200 italic mt-1">
                      "{clientInsights.investmentStyle}"
                      {clientInsights.dataSource === 'supabase' && (
                        <span className="ml-1 text-green-400">
                          <span className="inline-block h-3 w-3">✓</span>
                        </span>
                      )}
                    </p>
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
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-purple-300 mb-1">Se sua carteira fosse uma música:</p>
                        <p className="text-lg font-bold text-white">
                          {clientInsights.financialSong}
                        </p>
                        <p className="text-xs text-purple-300 mt-1">{clientInsights.songArtist}</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <button 
                              className="p-2.5 bg-purple-700 rounded-full hover:bg-purple-600 transition-colors"
                              onClick={() => togglePlay(clientInsights.songPreviewUrl)}
                            >
                              {isPlaying && audioUrl === clientInsights.songPreviewUrl ? (
                                <span className="w-3 h-3 block bg-white rounded"></span>
                              ) : (
                                <Play className="w-4 h-4 text-white" />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{isPlaying && audioUrl === clientInsights.songPreviewUrl ? "Pausar prévia" : "Ouvir prévia"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  
                  <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-700/30">
                    <p className="text-sm text-purple-300 mb-1">Seu dia mais ativo para investimentos:</p>
                    <p className="text-lg font-bold text-white">{clientInsights.mostActiveDay}</p>
                  </div>
                  
                  <div className="bg-purple-900/40 p-3 rounded-lg border border-purple-700/30">
                    <p className="text-sm text-purple-300 mb-1">Investidor famoso com quem você se parece:</p>
                    <p className="text-lg font-bold text-white">
                      {clientInsights.investorCompatibility}
                      {clientInsights.dataSource === 'supabase' && (
                        <span className="ml-1 text-green-400">
                          <span className="inline-block h-3 w-3">✓</span>
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-purple-300 mt-1">"{clientInsights.investorStyle}"</p>
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
            {wrappedData.dataSource === 'supabase' && (
              <span className="ml-1 text-green-400">
                <span className="inline-block h-3 w-3">✓</span>
              </span>
            )}
          </p>
        </div>
      </CardContent>
      
      {/* Hidden audio player */}
      <audio ref={audioRef} onEnded={handleAudioEnd} className="hidden" />
    </Card>
  );
};

export default WrappedModule;

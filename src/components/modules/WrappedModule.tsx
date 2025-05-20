
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
import { useState } from "react";
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
  const { wrapped } = data;
  
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

  // Define client specific insights
  const getClientSpecificInsights = () => {
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
      return {
        personalizedInsight: "Você está entre os investidores mais consistentes, mantendo aportes mensais mesmo quando o mercado estava em baixa.",
        personalityType: "Diversificador Estratégico",
        mostUnusualInvestment: "Small Caps do Setor de Energia",
        investmentStyle: "Você é paciente e metódico, sempre buscando valor no longo prazo",
        financialSong: "Billionaire - Bruno Mars",
        mostActiveDay: "Segunda-feira (42% das suas operações)",
        investorCompatibility: "Ray Dalio (83% compatível)"
      };
    }

    // Default insights
    return {
      personalizedInsight: "Você demonstrou notável resiliência, mantendo sua estratégia mesmo em momentos de alta volatilidade.",
      personalityType: "Investidor Balanceado",
      mostUnusualInvestment: "Criptomoedas Alternativas",
      investmentStyle: "Sua abordagem combina crescimento e valor de forma única",
      financialSong: "Can't Buy Me Love - The Beatles",
      mostActiveDay: "Quarta-feira (31% das suas operações)",
      investorCompatibility: "Benjamin Graham (75% compatível)"
    };
  };

  const clientInsights = getClientSpecificInsights();

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-2 bg-gradient-to-r from-blue-900/70 to-purple-900/70 border-b border-blue-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-amber-400" />
            <CardTitle className="text-xl text-white">
              Retrospectiva Financeira 2025
            </CardTitle>
          </div>
          <span className="text-xs px-2 py-1 bg-blue-700/50 rounded-full text-blue-200 border border-blue-500/30">
            #SuaJornadaFinanceira
          </span>
        </div>
      </CardHeader>
      
      <CardContent className="bg-gradient-to-b from-gray-900/90 to-gray-900/80 p-0">
        <Carousel className="w-full py-4">
          <CarouselContent>
            {/* Slide 1: Cover */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-lg text-center h-[400px] flex flex-col items-center justify-center border border-blue-500/20 shadow-lg shadow-blue-900/20">
                <div className="mb-4 p-3 bg-blue-700/30 rounded-full">
                  <Star className="w-12 h-12 text-amber-300" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Sua Jornada Financeira em 2025</h2>
                <p className="text-blue-200 mb-6">Descubra como seus investimentos contaram sua história neste ano</p>
                <div className="flex items-center justify-center space-x-1 text-xs text-blue-300">
                  <span className="block w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  <span>Deslize para explorar</span>
                </div>
              </div>
            </CarouselItem>
            
            {/* Slide 2: Personal Insight */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-indigo-900 to-violet-900 p-6 rounded-lg h-[400px] flex flex-col items-center justify-center border border-indigo-500/20">
                <div className="mb-4 p-3 bg-indigo-700/30 rounded-full">
                  <Users className="w-10 h-10 text-indigo-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Você é Excepcional!</h3>
                <p className="text-center text-lg text-blue-100 mb-6">{clientInsights.personalizedInsight}</p>
                <div className="bg-indigo-700/40 w-full p-4 rounded-lg border border-indigo-500/30">
                  <p className="text-center text-indigo-200">Sua Personalidade Financeira:</p>
                  <p className="text-center text-xl font-bold text-white mt-1">{clientInsights.personalityType}</p>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3: Investment Stats */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-emerald-900 to-teal-900 p-6 rounded-lg h-[400px] border border-emerald-500/20 flex flex-col">
                <div className="mb-4 p-2 bg-emerald-700/30 rounded-full self-center">
                  <TrendingUp className="w-8 h-8 text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Seus Números de Destaque</h3>
                
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div className="flex items-center justify-between bg-emerald-800/40 p-3 rounded-lg border border-emerald-600/20">
                    <div>
                      <p className="text-sm text-emerald-300">Maior Aporte</p>
                      <p className="text-xl font-bold text-white">{formatCurrency(wrapped.biggestContribution.amount)}</p>
                    </div>
                    <p className="text-emerald-200 text-sm">{formatDate(wrapped.biggestContribution.date)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between bg-emerald-800/40 p-3 rounded-lg border border-emerald-600/20">
                    <div>
                      <p className="text-sm text-emerald-300">Sequência Positiva</p>
                      <p className="text-xl font-bold text-white">{wrapped.longestPositiveStreak} meses</p>
                    </div>
                    <p className="text-emerald-200 text-sm">Top 15% dos investidores</p>
                  </div>
                  
                  <div className="flex items-center justify-between bg-emerald-800/40 p-3 rounded-lg border border-emerald-600/20">
                    <div>
                      <p className="text-sm text-emerald-300">Ativo Mais Rentável</p>
                      <p className="text-xl font-bold text-white">{wrapped.mostProfitableAsset.name}</p>
                    </div>
                    <p className="text-green-400 text-sm">+{wrapped.mostProfitableAsset.return}% 🚀</p>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 4: Unusual Investment Choices */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-amber-900 to-orange-900 p-6 rounded-lg h-[400px] border border-amber-500/20 flex flex-col">
                <div className="mb-4 p-2 bg-amber-700/30 rounded-full self-center">
                  <Gift className="w-8 h-8 text-amber-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center">Algo Diferente em sua Carteira</h3>
                <p className="text-center text-amber-200 mb-6">Sua escolha mais inusitada deste ano:</p>
                
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-amber-700/40 flex items-center justify-center mb-4 border-4 border-amber-500/40">
                    <Wallet className="w-12 h-12 text-amber-300" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{clientInsights.mostUnusualInvestment}</h4>
                  <p className="text-amber-200 text-center">Apenas 2% dos investidores fizeram esta escolha!</p>
                  
                  <div className="mt-8 w-full bg-amber-800/40 p-4 rounded-lg border border-amber-600/20">
                    <p className="text-center text-white">Seu estilo de investimento:</p>
                    <p className="text-center text-amber-200 italic mt-1">"{clientInsights.investmentStyle}"</p>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 5: Fun Facts */}
            <CarouselItem className="px-2">
              <div className="bg-gradient-to-br from-purple-900 to-fuchsia-900 p-6 rounded-lg h-[400px] border border-purple-500/20 flex flex-col">
                <div className="mb-4 p-2 bg-purple-700/30 rounded-full self-center">
                  <BadgePercent className="w-8 h-8 text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 text-center">Curiosidades Financeiras</h3>
                
                <div className="flex-1 flex flex-col justify-center space-y-6">
                  <div className="bg-purple-800/40 p-3 rounded-lg border border-purple-600/20">
                    <p className="text-sm text-purple-300 mb-1">Se sua carteira fosse uma música:</p>
                    <p className="text-lg font-bold text-white">{clientInsights.financialSong}</p>
                  </div>
                  
                  <div className="bg-purple-800/40 p-3 rounded-lg border border-purple-600/20">
                    <p className="text-sm text-purple-300 mb-1">Seu dia mais ativo para investimentos:</p>
                    <p className="text-lg font-bold text-white">{clientInsights.mostActiveDay}</p>
                  </div>
                  
                  <div className="bg-purple-800/40 p-3 rounded-lg border border-purple-600/20">
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
        
        <div className="p-6">
          <p className="text-sm text-gray-400 text-center">
            {wrapped.summary}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WrappedModule;

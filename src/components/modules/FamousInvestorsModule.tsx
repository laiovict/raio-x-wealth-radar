import { useRaioX } from "@/context/RaioXContext";
import React from "react";

interface FamousInvestorsModuleProps {
  fullWidth?: boolean;
  useSyntheticData?: boolean;  // Adding this prop
}

const FamousInvestorsModule = ({ fullWidth = false, useSyntheticData = false }: FamousInvestorsModuleProps) => {
  const { data, selectedClient } = useRaioX();
  const { t } = useLanguage();
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [userVoted, setUserVoted] = useState<'like' | 'dislike' | null>(null);
  const { isStreaming, isComplete } = useStreamingContent(false, 300, true, 1500);

  // Handle like/dislike votes
  const handleVote = (type: 'like' | 'dislike') => {
    if (userVoted === type) {
      // User is un-voting
      setUserVoted(null);
      if (type === 'like') {
        setLikesCount(prev => prev - 1);
      } else {
        setDislikesCount(prev => prev - 1);
      }
      toast({
        title: "Voto removido",
        description: "Sua avaliação foi removida com sucesso."
      });
    } else {
      // User is changing vote or voting for first time
      if (userVoted) {
        // Switch vote
        if (userVoted === 'like') {
          setLikesCount(prev => prev - 1);
          setDislikesCount(prev => prev + 1);
        } else {
          setLikesCount(prev => prev + 1);
          setDislikesCount(prev => prev - 1);
        }
      } else {
        // First vote
        if (type === 'like') {
          setLikesCount(prev => prev + 1);
        } else {
          setDislikesCount(prev => prev + 1);
        }
      }
      setUserVoted(type);
      toast({
        title: type === 'like' ? "Você gostou desta seção" : "Você não gostou desta seção",
        description: "Obrigado pelo seu feedback! Estamos sempre buscando melhorar."
      });
    }
  };

  // Get client age from context or use default
  const getClientAge = () => {
    if (selectedClient === 240275) {
      return 34;
    } else if (selectedClient === 12345678) {
      return 42;
    }
    return 38; // Default age
  };

  const clientAge = getClientAge();
  const clientName = selectedClient === 240275 ? "Laio" : "Cliente";

  // Exemplo de dados de investidores famosos
  const investors = [
    {
      name: "Warren Buffett",
      quote: "Seja ganancioso quando outros estão com medo, e tenha medo quando outros estão gananciosos.",
      strategy: "Investimento em valor, empresas com vantagens competitivas duradouras",
      personalizedAdvice: isStreaming ? 
        "Gerando conselho personalizado..." : 
        `Na sua idade (${clientAge} anos), Warren Buffett se concentrava em empresas com forte geração de fluxo de caixa. Ele provavelmente recomendaria que você mantenha uma posição significativa em negócios com vantagens competitivas duradouras, mesmo que o mercado esteja volátil. Com base no seu perfil, ele sugeriria considerar empresas como a XP Inc. que têm modelos de negócios robustos e fluxos de caixa previsíveis, pois não é nem muito cedo nem muito tarde para investimentos de qualidade.`,
      bg: "from-blue-600/20 to-blue-900/30",
      accent: "bg-blue-400/20",
      pattern: "radial-gradient(circle at 30% 40%, rgba(56, 189, 248, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 10%, rgba(14, 165, 233, 0.2) 0%, transparent 30%)",
    },
    {
      name: "Ray Dalio",
      quote: "O dinheiro é só uma ferramenta para ajudar você a conseguir o que quer, não é o objetivo em si.",
      strategy: "Diversificação global, alocação em todas as condições de mercado",
      personalizedAdvice: isStreaming ? 
        "Gerando conselho personalizado..." : 
        `Para uma pessoa de ${clientAge} anos como você, Ray Dalio recomendaria diversificação em todas as classes de ativos. Considerando seu momento de vida e o atual cenário econômico brasileiro, ele sugeriria manter aproximadamente 50% em ativos globais para proteção contra incertezas locais. Ele destacaria a importância de incluir ouro e TIPS (títulos protegidos contra inflação) como proteção contra cenários extremos, especialmente com as tensões geopolíticas atuais.`,
      bg: "from-emerald-600/20 to-emerald-900/30",
      accent: "bg-emerald-400/20",
      pattern: "radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 30%, rgba(5, 150, 105, 0.2) 0%, transparent 40%)",
    },
    {
      name: "Benjamin Graham",
      quote: "No curto prazo, o mercado é uma máquina de votação, mas no longo prazo, é uma máquina de pesagem.",
      strategy: "Margem de segurança, análise fundamental detalhada",
      personalizedAdvice: isStreaming ? 
        "Gerando conselho personalizado..." : 
        `Benjamin Graham diria que aos ${clientAge} anos, você está em um ponto ideal para aplicar seus princípios de margem de segurança. Ele sugeriria que, nesta fase de consolidação financeira, você deveria buscar ações negociadas abaixo do valor patrimonial, especialmente em setores tradicionais que estão fora de moda no atual ciclo de mercado. Para seu caso específico, ele recomendaria manter uma proporção de 60/40 entre ações e títulos de renda fixa, ajustando essa proporção conforme as oportunidades de valor aparecem.`,
      bg: "from-amber-600/20 to-amber-900/30",
      accent: "bg-amber-400/20",
      pattern: "radial-gradient(circle at 60% 20%, rgba(251, 191, 36, 0.15) 0%, transparent 40%), radial-gradient(circle at 30% 70%, rgba(245, 158, 11, 0.1) 0%, transparent 30%)",
    },
    {
      name: "Peter Lynch",
      quote: "Invista no que você conhece.",
      strategy: "Crescimento a preço razoável, vantagens competitivas claras",
      personalizedAdvice: isStreaming ? 
        "Gerando conselho personalizado..." : 
        `Peter Lynch aconselharia você, aos ${clientAge} anos, a investir em setores que você conhece profissionalmente ou como consumidor. Considerando sua experiência e fase de vida, ele recomendaria buscar empresas com crescimento anual de 15-20% que ainda não foram descobertas pelo mercado. Lynch destacaria que com seus conhecimentos específicos e experiência, você tem vantagens que Wall Street não possui. Para seu perfil, ele provavelmente sugeriria dedicar 25% do portfólio a empresas menores em setores que você entende profundamente.`,
      bg: "from-purple-600/20 to-purple-900/30",
      accent: "bg-purple-400/20",
      pattern: "radial-gradient(circle at 40% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.2) 0%, transparent 30%)",
    },
    {
      name: "Howard Marks",
      quote: "As coisas mais perigosas são aquelas em que os riscos não são visíveis.",
      strategy: "Contrário, ciclos de mercado, psicologia do investidor",
      personalizedAdvice: isStreaming ? 
        "Gerando conselho personalizado..." : 
        `Howard Marks observaria que aos ${clientAge} anos, você tem experiência suficiente para reconhecer padrões de mercado, mas também tempo para se recuperar de erros. Ele aconselharia aproveitar o atual momento de otimismo excessivo no setor de tecnologia para adotar uma postura contrária e cautelosa. Especificamente para alguém com seu perfil e objetivos financeiros, ele recomendaria aumentar gradualmente posições em setores cíclicos atualmente impopulares, mantendo liquidez para oportunidades que surgirão quando o sentimento de mercado inevitavelmente mudar.`,
      bg: "from-red-600/20 to-red-900/30",
      accent: "bg-red-400/20",
      pattern: "radial-gradient(circle at 20% 40%, rgba(248, 113, 113, 0.1) 0%, transparent 40%), radial-gradient(circle at 70% 60%, rgba(239, 68, 68, 0.15) 0%, transparent 30%)",
    }
  ];

  return (
    <Card className={`bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5 shadow-xl overflow-hidden ${fullWidth ? "col-span-full" : ""}`}>
      <CardHeader className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-b border-white/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold text-white">{t('famousInvestorsTitle')}</CardTitle>
            <Badge className="bg-blue-600/50 text-blue-100 border-blue-500/30 flex gap-1 items-center">
              <Sparkles className="h-3 w-3" /> GenAI
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`${userVoted === 'like' ? 'bg-green-900/20 text-green-400' : 'text-gray-400'}`}
                onClick={() => handleVote('like')}
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <span className="text-xs text-gray-400">{likesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className={`${userVoted === 'dislike' ? 'bg-red-900/20 text-red-400' : 'text-gray-400'}`}
                onClick={() => handleVote('dislike')}
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
              <span className="text-xs text-gray-400">{dislikesCount}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Carousel className="w-full">
          <CarouselContent>
            {investors.map((investor, index) => (
              <CarouselItem key={index}>
                <div 
                  className="rounded-xl overflow-hidden h-full" 
                  style={{
                    background: `linear-gradient(145deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.8)), ${investor.pattern}`,
                    backgroundBlendMode: "normal, overlay",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="relative h-full">
                    {/* Artistic background elements */}
                    <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-gradient-to-br from-amber-600/10 to-orange-600/10 rounded-full blur-2xl"></div>
                    
                    {/* Content - Removed photos section and adjusted layout */}
                    <div className={`relative z-10 p-8 h-full backdrop-blur-sm rounded-xl ${investor.bg} bg-opacity-30`}>
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-3">
                          {investor.name}
                        </h3>
                        <p className="text-xl italic text-white/90 mb-4 leading-relaxed">
                          "{investor.quote}"
                        </p>
                      </div>
                      
                      <div className={`${investor.accent} backdrop-blur-md rounded-lg p-5 border border-white/10 shadow-inner`}>
                        <h4 className="text-lg font-medium text-white/90 mb-2">Estratégia de Investimento:</h4>
                        <p className="text-white/80 leading-relaxed">{investor.strategy}</p>
                      </div>
                      
                      <div className="mt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Brain className="h-5 w-5 text-blue-300" />
                          <h4 className="text-lg font-medium text-white/90">Conselho Personalizado:</h4>
                          {isStreaming && <Badge className="animate-pulse bg-blue-600/50 text-blue-100 border-blue-500/30">Gerando</Badge>}
                        </div>
                        <div className={`bg-slate-800/70 border border-white/10 p-4 rounded-lg text-white/80 ${isStreaming ? 'animate-pulse' : ''}`}>
                          <p className="leading-relaxed">{investor.personalizedAdvice}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <p className="text-sm text-white/60 bg-white/5 inline-block px-3 py-1 rounded-full">
                          Deslize para ver mais investidores
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-6">
            <CarouselPrevious className="relative inline-flex h-10 w-10 bg-white/10 hover:bg-white/20 border border-white/10" />
            <CarouselNext className="relative inline-flex h-10 w-10 bg-white/10 hover:bg-white/20 border border-white/10" />
          </div>
        </Carousel>
      </CardContent>
    </Card>
  );
};

export default FamousInvestorsModule;

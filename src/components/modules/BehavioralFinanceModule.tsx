
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useRaioX } from "@/context/RaioXContext";
import { Brain, AlertTriangle, TrendingUp, TrendingDown, Lock, Calendar, LineChart, ThumbsUp, ThumbsDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface BehaviorTrait {
  name: string;
  score: number; // 0-100
  description: string;
  recommendation: string;
  icon: React.ReactNode;
}

const BehavioralFinanceModule = ({ fullWidth = false }) => {
  const { t } = useLanguage();
  const { data, hasOpenFinance, selectedClient } = useRaioX();
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [userVoted, setUserVoted] = useState<'like' | 'dislike' | null>(null);
  
  // Sample behavioral traits for the demo
  const behaviorTraits: BehaviorTrait[] = [
    {
      name: t('lossAversion'),
      score: 72,
      description: t('lossAversionDesc'),
      recommendation: t('lossAversionRec'),
      icon: <TrendingDown className="h-5 w-5 text-red-400" />
    },
    {
      name: t('recencyBias'),
      score: 45,
      description: t('recencyBiasDesc'),
      recommendation: t('recencyBiasRec'),
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />
    },
    {
      name: t('overconfidence'),
      score: 62,
      description: t('overconfidenceDesc'),
      recommendation: t('overconfidenceRec'),
      icon: <TrendingUp className="h-5 w-5 text-blue-400" />
    },
  ];
  
  // Enhanced behavioral traits for different client personas
  const clientTraitsMap: Record<number, BehaviorTrait[]> = {
    // Laio Santos (240275) - Existing customization
    240275: [
      {
        name: t('emotionalInvesting'),
        score: 81,
        description: t('emotionalInvestingDescLaio'),
        recommendation: t('emotionalInvestingRecLaio'),
        icon: <Brain className="h-5 w-5 text-purple-400" />
      },
      ...behaviorTraits
    ],
    
    // Ana Oliveira - Client with arrojado profile
    316982: [
      {
        name: "Risco Elevado",
        score: 88,
        description: "Você tende a buscar riscos elevados em seus investimentos, muitas vezes ignorando sinais de alerta. Nos últimos 3 meses, aumentou posições em ativos voláteis mesmo em momentos de instabilidade do mercado.",
        recommendation: "Defina limites claros para exposição a alto risco (máximo 30% da carteira) e estipule stop loss para proteger seu patrimônio de quedas acentuadas.",
        icon: <AlertTriangle className="h-5 w-5 text-orange-400" />
      },
      {
        name: "Performance Chasing",
        score: 75,
        description: "Identificamos que você frequentemente investe em fundos e ações com base apenas no desempenho recente, sem analisar os fundamentos. Esta tendência foi observada em 8 de suas 12 últimas operações.",
        recommendation: "Antes de investir em um ativo com alto rendimento recente, analise seu histórico de longo prazo e os fundamentos que justifiquem a continuidade desse desempenho.",
        icon: <TrendingUp className="h-5 w-5 text-fuchsia-400" />
      },
      {
        name: "Diversificação Seletiva",
        score: 40,
        description: "Você mantém boa diversificação em renda variável, mas ignora completamente classes como renda fixa internacional e multimercados.",
        recommendation: "Mesmo com perfil arrojado, mantenha ao menos 15% em ativos descorrelacionados para proteger sua carteira em momentos de estresse de mercado.",
        icon: <LineChart className="h-5 w-5 text-blue-400" />
      }
    ],
    
    // Marcos Santos - Cliente com perfil conservador
    327272: [
      {
        name: "Aversão Extrema a Perdas",
        score: 91,
        description: "Você demonstra forte resistência a qualquer oscilação negativa, mesmo momentânea, resgatando investimentos ao menor sinal de queda. Em 2024, realizou 6 resgates em momentos de baixa, cristalizando perdas desnecessárias.",
        recommendation: "Estabeleça um horizonte mínimo para avaliação de investimentos (sugerimos 6 meses) antes de tomar decisões baseadas em oscilações de curto prazo.",
        icon: <TrendingDown className="h-5 w-5 text-red-500" />
      },
      {
        name: "Concentração em Poupança",
        score: 84,
        description: "Mesmo com perfil conservador, a concentração de 68% dos recursos em poupança representa perda significativa de rentabilidade. Esta escolha custou aproximadamente R$ 24.000 em rendimentos nos últimos 2 anos.",
        recommendation: "Migre gradualmente para produtos conservadores de maior rentabilidade como CDBs de bancos grandes, Tesouro Selic e fundos DI, mantendo a segurança que valoriza.",
        icon: <Lock className="h-5 w-5 text-gray-400" />
      },
      {
        name: "Status Quo Bias",
        score: 77,
        description: "Identificamos resistência a mudanças em sua carteira. Você mantém os mesmos investimentos há mais de 5 anos sem reavaliações, mesmo com mudanças significativas no cenário econômico.",
        recommendation: "Estabeleça revisões semestrais da carteira, mesmo que seja para confirmar que deseja manter a estratégia atual. Consulte seu assessor para estas revisões.",
        icon: <AlertTriangle className="h-5 w-5 text-amber-400" />
      }
    ]
  };

  // Generic behavioral insights for all users (even without OpenFinance)
  const genericTraits: BehaviorTrait[] = [
    {
      name: "Viés de Confirmação",
      score: 65,
      description: "Você tende a buscar informações que confirmam suas crenças existentes sobre investimentos e ignora dados contrários. Isso pode levar a decisões enviesadas.",
      recommendation: "Procure ativamente por pontos de vista contrários antes de tomar decisões de investimento. Considere seguir especialistas com visões diferentes da sua.",
      icon: <Brain className="h-5 w-5 text-indigo-400" />
    },
    {
      name: "Efeito Disposição",
      score: 78,
      description: "Você demonstra a tendência de vender ativos com lucro muito cedo e manter ativos perdedores por tempo excessivo, esperando uma recuperação.",
      recommendation: "Estabeleça regras claras para venda de ativos antes de investir. Reavalie periodicamente seus investimentos com base em fundamentos, não no preço de compra.",
      icon: <TrendingDown className="h-5 w-5 text-orange-400" />
    },
    {
      name: "Aversão à Ambiguidade",
      score: 59,
      description: "Você evita investir em produtos ou mercados menos familiares, mesmo quando apresentam boas oportunidades de retorno ou diversificação.",
      recommendation: "Dedique tempo para estudar classes de ativos menos familiares. Comece com pequenas alocações para ganhar confiança em novos mercados.",
      icon: <AlertTriangle className="h-5 w-5 text-blue-400" />
    }
  ];

  // Determine which traits to display based on the selected client
  const getClientTraits = () => {
    // If a client is selected and we have specific traits for them
    if (selectedClient && clientTraitsMap[selectedClient]) {
      return clientTraitsMap[selectedClient];
    }
    
    // Default traits if no specific client is selected or no custom traits available
    return hasOpenFinance ? behaviorTraits : genericTraits;
  };

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
  
  // If OpenFinance is not activated at all, show generic behavioral traits
  if (!hasOpenFinance) {
    return (
      <Card className={`glass-morphism p-6 ${fullWidth ? 'w-full' : ''}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{t('behavioralFinanceTitle')}</h2>
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
        
        <p className="text-gray-300 mb-6">
          Estas são as tendências comportamentais que podem impactar seus investimentos. 
          Para uma análise mais detalhada, ative o Open Finance.
        </p>
        
        <div className="space-y-6">
          {genericTraits.map((trait, index) => (
            <div key={index} className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-gray-700/50 mr-3">
                    {trait.icon}
                  </div>
                  <h3 className="font-semibold text-white">{trait.name}</h3>
                </div>
                <div className="text-sm font-medium text-blue-400">{trait.score}/100</div>
              </div>
              
              <Progress value={trait.score} className="h-2 mb-4" />
              
              <p className="text-sm text-gray-400 mb-3">{trait.description}</p>
              
              <div className="bg-blue-900/20 p-3 rounded border border-blue-900/30">
                <p className="text-sm text-blue-300">
                  <span className="font-bold">{t('recommendation')}: </span>
                  {trait.recommendation}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            variant="outline"
            className="border-blue-500 text-blue-400 hover:bg-blue-900/30"
            onClick={() => {
              // Dispatch custom event to activate OpenFinance in parent component
              document.dispatchEvent(new Event('activate-openfinance'));
            }}
          >
            {t('activateOpenFinance')}
          </Button>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className={`glass-morphism p-6 ${fullWidth ? 'w-full' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">{t('behavioralFinanceTitle')}</h2>
        <div className="flex items-center gap-4">
          <div className="bg-green-600/20 text-green-400 text-xs px-3 py-1 rounded-full flex items-center">
            <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span>
            {t('openFinanceActive')} 
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
      </div>
      
      <p className="text-gray-300 mb-6">{t('behavioralFinanceDesc')}</p>
      
      <div className="space-y-6">
        {getClientTraits().map((trait, index) => (
          <div key={index} className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-700/50 mr-3">
                  {trait.icon}
                </div>
                <h3 className="font-semibold text-white">{trait.name}</h3>
              </div>
              <div className="text-sm font-medium text-blue-400">{trait.score}/100</div>
            </div>
            
            <Progress value={trait.score} className="h-2 mb-4" />
            
            <p className="text-sm text-gray-400 mb-3">{trait.description}</p>
            
            <div className="bg-blue-900/20 p-3 rounded border border-blue-900/30">
              <p className="text-sm text-blue-300">
                <span className="font-bold">{t('recommendation')}: </span>
                {trait.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BehavioralFinanceModule;

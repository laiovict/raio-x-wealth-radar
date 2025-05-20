
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useRaioX } from "@/context/RaioXContext";
import { Brain, AlertTriangle, TrendingUp, TrendingDown, Lock, Calendar, LineChart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

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
  
  // This should be determined based on real user data
  const hasOpenFinanceSixMonths = hasOpenFinance && data?.openFinanceMonths >= 6;
  
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

  // Determine which traits to display based on the selected client
  const getClientTraits = () => {
    // If a client is selected and we have specific traits for them
    if (selectedClient && clientTraitsMap[selectedClient]) {
      return clientTraitsMap[selectedClient];
    }
    
    // Default traits if no specific client is selected or no custom traits available
    return behaviorTraits;
  };

  // Check if OpenFinance is active but client has less than 6 months of history
  if (hasOpenFinance && !hasOpenFinanceSixMonths) {
    return (
      <Card className={`glass-morphism p-6 ${fullWidth ? 'w-full' : ''}`}>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Calendar className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">{t('behavioralFinanceTitle')}</h3>
          <p className="text-gray-400 mb-4 max-w-md">
            Em 6 meses, vamos mostrar em detalhe como funciona seu comportamento financeiro.
            Estamos coletando mais dados para oferecer uma análise precisa.
          </p>
        </div>
      </Card>
    );
  }
  
  // If OpenFinance is not activated at all, show the activation screen
  if (!hasOpenFinance) {
    return (
      <Card className={`glass-morphism p-6 ${fullWidth ? 'w-full' : ''}`}>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Lock className="h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">{t('behavioralFinanceTitle')}</h3>
          <p className="text-gray-400 mb-4 max-w-md">{t('behavioralFinanceLockedDesc')}</p>
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
        <div className="bg-green-600/20 text-green-400 text-xs px-3 py-1 rounded-full flex items-center">
          <span className="bg-green-500 w-2 h-2 rounded-full mr-2"></span>
          {t('openFinanceActive')} 
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

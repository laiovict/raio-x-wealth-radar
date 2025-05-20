
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useRaioX } from "@/context/RaioXContext";
import { Brain, AlertTriangle, TrendingUp, TrendingDown, Lock, Calendar } from "lucide-react";
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

  // Special customized content for client 240275 (Laio Santos)
  const customizedClientData = selectedClient === 240275 ? {
    traits: [
      {
        name: t('emotionalInvesting'),
        score: 81,
        description: t('emotionalInvestingDescLaio'),
        recommendation: t('emotionalInvestingRecLaio'),
        icon: <Brain className="h-5 w-5 text-purple-400" />
      },
      ...behaviorTraits
    ]
  } : {
    traits: behaviorTraits
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
        {customizedClientData.traits.map((trait, index) => (
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

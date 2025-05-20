import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Lightbulb, TrendingUp, Shield, AlertTriangle, Leaf } from "lucide-react";
import { useRaioX } from "@/context/RaioXContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define recommended action type
interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  impact: string;
  effort: string;
  buttonText: string;
  buttonLink: string;
  category: string;
  chatMessage?: string;
  icon?: string;
}

const RecommendedActionsModule = ({ fullWidth = false }) => {
  const { data, selectedClient } = useRaioX();
  const { t } = useLanguage();
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleActionCompletion = (actionId: string) => {
    if (completedActions.includes(actionId)) {
      setCompletedActions(completedActions.filter((id) => id !== actionId));
    } else {
      setCompletedActions([...completedActions, actionId]);
    }
  };

  // Handle action button click
  const handleActionClick = (action: RecommendedAction) => {
    // If we have a custom chat message, redirect to chat with that message
    const messageText = action.chatMessage || `Nicolas, preciso implementar a ação: ${action.title}. ${action.description}`;
    
    // Create custom event to pre-load message in the chat
    const event = new CustomEvent('load-chat-message', { 
      detail: { message: messageText }
    });
    document.dispatchEvent(event);
    
    // Navigate to chat tab
    const tabsEvent = new CustomEvent('navigate-to-tab', {
      detail: { tabId: 'chat' }
    });
    document.dispatchEvent(tabsEvent);
  };

  // Sample recommended actions - these would come from data or API in a real app
  const getRecommendedActions = (): RecommendedAction[] => {
    // Default actions for all clients
    const defaultActions: RecommendedAction[] = [
      {
        id: "diversify-portfolio",
        title: "Diversificar sua carteira",
        description: "Seus investimentos estão concentrados em poucas classes de ativos. Considere diversificar para reduzir o risco.",
        impact: "Alto",
        effort: "Médio",
        buttonText: "Ver sugestões",
        buttonLink: "#diversification",
        chatMessage: "Nicolas, preciso diversificar minha carteira de investimentos. Pode me sugerir algumas estratégias?",
        category: "investment",
        icon: "TrendingUp"
      },
      {
        id: "emergency-fund",
        title: "Aumentar reserva de emergência",
        description: "Sua reserva atual cobre apenas 3 meses de despesas. O ideal é ter pelo menos 6 meses.",
        impact: "Alto",
        effort: "Médio",
        buttonText: "Planejar reserva",
        buttonLink: "#emergency",
        chatMessage: "Nicolas, preciso aumentar minha reserva de emergência. Como posso fazer isso de forma eficiente?",
        category: "planning",
        icon: "Shield"
      },
      {
        id: "tax-efficiency",
        title: "Otimizar eficiência tributária",
        description: "Existem oportunidades para reduzir sua carga tributária através de investimentos mais eficientes.",
        impact: "Médio",
        effort: "Baixo",
        buttonText: "Ver estratégias",
        buttonLink: "#tax",
        chatMessage: "Nicolas, preciso otimizar a eficiência tributária dos meus investimentos. Quais estratégias você recomenda?",
        category: "tax",
        icon: "Leaf"
      }
    ];
    
    // Client-specific actions
    if (selectedClient === 240275) {
      return [
        {
          id: "rebalance-portfolio",
          title: "Rebalancear alocação internacional",
          description: "Laio, sua exposição a renda variável internacional está abaixo do ideal para seu perfil de investidor. Recomendamos aumentar para 20%.",
          impact: "Alto",
          effort: "Baixo",
          buttonText: "Ver detalhes",
          buttonLink: "#rebalance",
          chatMessage: "Nicolas, preciso rebalancear minha alocação internacional. Pode me ajudar a aumentar para 20%?",
          category: "investment",
          icon: "TrendingUp"
        },
        {
          id: "retirement-plan",
          title: "Revisar plano de aposentadoria",
          description: "Com base na sua meta de aposentadoria, o aporte mensal atual não será suficiente. Considere aumentar as contribuições.",
          impact: "Alto",
          effort: "Médio",
          buttonText: "Atualizar plano",
          buttonLink: "#retirement",
          chatMessage: "Nicolas, preciso revisar meu plano de aposentadoria. Meu aporte mensal não está sendo suficiente.",
          category: "planning",
          icon: "Shield"
        },
        ...defaultActions
      ];
    } else if (selectedClient === 12345678) {
      return [
        {
          id: "risk-assessment",
          title: "Reavaliar perfil de risco",
          description: "Seus investimentos atuais têm risco maior que seu perfil declarado. Vamos revisar suas preferências?",
          impact: "Alto",
          effort: "Baixo",
          buttonText: "Refazer perfil",
          buttonLink: "#risk",
          chatMessage: "Nicolas, preciso reavaliar meu perfil de risco. Meus investimentos atuais parecem ter um risco maior do que o que me sinto confortável.",
          category: "planning",
          icon: "AlertTriangle"
        },
        ...defaultActions
      ];
    }
    
    return defaultActions;
  };

  // Get the recommended actions based on client
  const recommendedActions = getRecommendedActions();

  // Function to get appropriate icon component
  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp className="h-5 w-5 text-blue-400" />;
      case "Shield":
        return <Shield className="h-5 w-5 text-green-400" />;
      case "AlertTriangle":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case "Leaf":
        return <Leaf className="h-5 w-5 text-emerald-400" />;
      default:
        return <Lightbulb className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <Card className={`glass-morphism p-6 ${fullWidth ? 'w-full' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{t('recommendedActions')}</h2>
        <div className="flex items-center text-blue-300">
          <Lightbulb className="h-4 w-4 mr-2" />
          {t('aiSuggestions')}
        </div>
      </div>
      
      <ul className="space-y-4">
        {recommendedActions.map((action) => (
          <li 
            key={action.id} 
            className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  {getIconComponent(action.icon)}
                  <h3 className="font-semibold text-white">{action.title}</h3>
                </div>
                <p className="text-sm text-gray-400">{action.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-blue-300">
                    {t('impact')}: {action.impact}
                  </span>
                  <span className="text-xs text-blue-300">
                    {t('effort')}: {action.effort}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={() => toggleActionCompletion(action.id)}
                className="p-1 rounded-full hover:bg-gray-700/50 transition-colors ml-4"
              >
                {completedActions.includes(action.id) ? (
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                ) : (
                  <Circle className="h-6 w-6 text-gray-500" />
                )}
              </button>
            </div>
            
            <div className="mt-3 flex justify-end">
              <Button 
                variant="gradient" 
                size="sm"
                className="recommended-action-button"
                onClick={() => handleActionClick(action)}
              >
                {action.buttonText}
              </Button>
            </div>
          </li>
        ))}
        {recommendedActions.length === 0 && (
          <li className="bg-gray-800/40 rounded-lg p-6 text-center">
            <p className="text-gray-400">Nenhuma ação recomendada no momento.</p>
          </li>
        )}
      </ul>
    </Card>
  );
};

export default RecommendedActionsModule;

import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Brain, 
  Lightbulb,
  BarChart,
  Shield,
  BadgePercent,
  CheckCircle2,
  Circle,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

interface InteligenciaModuleProps {
  fullWidth?: boolean;
}

const InteligenciaModule = ({ fullWidth = false }: InteligenciaModuleProps) => {
  const { data, selectedClient } = useRaioX();
  const { t } = useLanguage();
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("actions");
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Add a loading state to simulate streaming content
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  
  const toggleActionCompletion = (actionId: string) => {
    if (completedActions.includes(actionId)) {
      setCompletedActions(completedActions.filter((id) => id !== actionId));
    } else {
      setCompletedActions([...completedActions, actionId]);
    }
  };

  // Function to handle recommendation execution
  const handleExecute = (recommendation: any) => {
    // Create a message to send to the chat
    const messageText = `Nicolas, preciso executar a recomendação: ${recommendation.action}. ${recommendation.description}`;
    
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

  // Function to handle action button click (for recommended actions tab)
  const handleActionClick = (action: any) => {
    // Create a message to send to the chat
    const messageText = `Nicolas, preciso implementar a ação: ${action.title}. ${action.description}`;
    
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

  // Function to handle insight click
  const handleInsightClick = (insight: any) => {
    // Create a message to send to the chat
    const messageText = `Nicolas, preciso saber mais sobre o insight: ${insight.title}. ${insight.description}`;
    
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

  // Get client-specific recommended actions
  const getRecommendedActions = () => {
    // Default actions for all clients
    const defaultActions = [
      {
        id: "diversify-portfolio",
        title: "Diversificar sua carteira",
        description: "Seus investimentos estão concentrados em poucas classes de ativos. Considere diversificar para reduzir o risco.",
        impact: "Alto",
        effort: "Médio",
        buttonText: "Ver sugestões",
        buttonLink: "#diversification",
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
        category: "tax",
        icon: "BadgePercent"
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
          category: "investment",
          icon: "BarChart"
        },
        {
          id: "retirement-plan",
          title: "Revisar plano de aposentadoria",
          description: "Com base na sua meta de aposentadoria, o aporte menual atual não será suficiente. Considere aumentar as contribuições.",
          impact: "Alto",
          effort: "Médio",
          buttonText: "Atualizar plano",
          buttonLink: "#retirement",
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
          category: "planning",
          icon: "AlertTriangle"
        },
        ...defaultActions
      ];
    }
    
    return defaultActions;
  };

  // Function to get appropriate icon component
  const getIconComponent = (iconName?: string) => {
    switch (iconName) {
      case "TrendingUp":
        return <TrendingUp className="h-5 w-5 text-blue-400" />;
      case "Shield":
        return <Shield className="h-5 w-5 text-green-400" />;
      case "AlertTriangle":
        return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      case "BadgePercent":
        return <BadgePercent className="h-5 w-5 text-emerald-400" />;
      case "BarChart":
        return <BarChart className="h-5 w-5 text-indigo-400" />;
      default:
        return <Lightbulb className="h-5 w-5 text-blue-400" />;
    }
  };

  const recommendedActions = getRecommendedActions();
  const { recommendations } = data;
  
  // Define insights here using data.financialInsights instead of data.insights
  const insights = data.financialInsights || [
    {
      id: "market-shift",
      title: "Mudança de cenário macroeconômico",
      description: "Com o Banco Central sinalizando cortes na taxa de juros, é momento de revisar sua alocação em renda fixa.",
      category: "market",
      date: "2025-05-15",
      importance: "high"
    },
    {
      id: "dividend-season",
      title: "Temporada de dividendos se aproximando",
      description: "Grandes empresas devem anunciar distribuição de dividendos no próximo mês, considere antecipar compras.",
      category: "stocks",
      date: "2025-05-10",
      importance: "medium"
    },
    {
      id: "inflation-rise",
      title: "Inflação acima do esperado",
      description: "Dados recentes mostram inflação acima da meta, o que pode impactar investimentos de renda fixa.",
      category: "economy",
      date: "2025-05-08",
      importance: "high"
    },
    {
      id: "sector-rotation",
      title: "Rotação setorial em curso",
      description: "Observamos movimento de saída do setor financeiro para tecnologia, avalie seu posicionamento.",
      category: "market",
      date: "2025-05-05",
      importance: "medium"
    }
  ];

  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case "high":
        return "border-l-4 border-red-500";
      case "medium":
        return "border-l-4 border-amber-500";
      default:
        return "border-l-4 border-blue-500";
    }
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full overflow-hidden border-none shadow-lg`}>
      <CardHeader className="bg-gradient-to-r from-indigo-800 to-purple-800 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-indigo-600/50 p-2">
              <Brain className="h-5 w-5 text-indigo-100" />
            </div>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              Inteligência Financeira
              <Badge className="bg-indigo-700/70 text-indigo-100 hover:bg-indigo-600 border-indigo-500/30 ml-2 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Powered by AI
              </Badge>
            </CardTitle>
          </div>
        </div>
        <p className="text-indigo-200 mt-1 text-sm">
          Recomendações personalizadas baseadas na análise de seu perfil financeiro
        </p>
      </CardHeader>
      <CardContent className="bg-gradient-to-b from-gray-950 to-gray-900/95 p-0">
        <Tabs 
          defaultValue="actions" 
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full grid grid-cols-3 rounded-none border-b border-gray-800">
            <TabsTrigger 
              value="actions" 
              className="data-[state=active]:bg-indigo-900/30 rounded-none border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-300"
            >
              Ações Recomendadas
            </TabsTrigger>
            <TabsTrigger 
              value="recommendations" 
              className="data-[state=active]:bg-indigo-900/30 rounded-none border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-300"
            >
              Prioridades
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="data-[state=active]:bg-indigo-900/30 rounded-none border-b-2 data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-300"
            >
              Insights de Mercado
            </TabsTrigger>
          </TabsList>

          {isLoaded ? (
            <>
              {/* Tab 1: Ações Recomendadas */}
              <TabsContent value="actions" className="p-4">
                <ul className="space-y-4">
                  {recommendedActions.map((action) => (
                    <li 
                      key={action.id} 
                      className="bg-gray-800/40 rounded-lg p-4 border border-gray-700/50 hover:bg-gray-800/60 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-indigo-900/30 border border-indigo-700/30">
                              {getIconComponent(action.icon)}
                            </div>
                            <h3 className="font-semibold text-white">{action.title}</h3>
                          </div>
                          <p className="text-sm text-gray-400">{action.description}</p>
                          <div className="flex items-center space-x-3">
                            <span className="text-xs px-2 py-1 rounded-full bg-indigo-900/30 border border-indigo-700/20 text-indigo-300">
                              Impacto: {action.impact}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-900/30 border border-blue-700/20 text-blue-300">
                              Esforço: {action.effort}
                            </span>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => toggleActionCompletion(action.id)}
                          className="p-1 rounded-full hover:bg-gray-700/50 transition-colors ml-4"
                          aria-label={completedActions.includes(action.id) ? "Marcar como não concluído" : "Marcar como concluído"}
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
                          variant="outline" 
                          size="sm"
                          className="bg-indigo-900/30 text-indigo-300 border-indigo-700/50 hover:bg-indigo-800/50"
                          onClick={() => handleActionClick(action)}
                        >
                          {action.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </TabsContent>

              {/* Tab 2: Recomendações Prioritárias */}
              <TabsContent value="recommendations" className="p-4">
                <div className="space-y-4">
                  {recommendations?.map((recommendation, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-800/40 rounded-lg border border-gray-700/50 overflow-hidden transition-all hover:bg-gray-800/60"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                          <div className="flex items-center">
                            <div className="p-2 rounded-lg bg-indigo-900/30 border border-indigo-700/30 mr-3">
                              <Shield className="h-5 w-5 text-indigo-400" />
                            </div>
                            <span className="text-lg font-semibold text-white">
                              {recommendation.action}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className={`flex items-center gap-1 px-2 py-1 border ${getUrgencyColor(recommendation.urgency)}`}>
                              {getUrgencyIcon(recommendation.urgency)}
                              <span>Urgência: {recommendation.urgency}</span>
                            </Badge>
                            <Badge className={`px-2 py-1 border ${getImpactColor(recommendation.impact)}`}>
                              Impacto: {recommendation.impact}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {recommendation.description}
                        </p>
                        <div className="flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="bg-indigo-900/30 text-indigo-300 border-indigo-700/50 hover:bg-indigo-800/50"
                            onClick={() => handleExecute(recommendation)}
                          >
                            Executar <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Tab 3: Insights de Mercado */}
              <TabsContent value="insights" className="p-4">
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div 
                      key={insight.id} 
                      className={`bg-gray-800/40 rounded-lg p-4 ${getImportanceClass(insight.importance || 'medium')} hover:bg-gray-800/60 transition-colors`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-lg bg-blue-900/30 border border-blue-700/30">
                            <Lightbulb className="h-5 w-5 text-blue-400" />
                          </div>
                          <h3 className="font-medium text-white mb-2">{insight.title}</h3>
                        </div>
                        <Badge className="bg-gray-700 text-gray-300 border border-gray-600/50">
                          {insight.date ? new Date(insight.date).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'}) : 
                          insight.timestamp ? new Date(insight.timestamp).toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'}) :
                          new Date().toLocaleDateString('pt-BR', {day: '2-digit', month: 'short'})}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-400 mb-3 ml-10">{insight.description}</p>
                      <div className="flex items-center justify-between mt-1 ml-10">
                        <Badge variant="outline" className="text-xs text-gray-400 border-gray-700 bg-gray-800/50">
                          {insight.category}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-900/20"
                          onClick={() => handleInsightClick(insight)}
                        >
                          Saiba mais <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </>
          ) : (
            <div className="p-4 space-y-4">
              <div className="h-24 bg-gray-800/40 animate-pulse rounded-lg"></div>
              <div className="h-24 bg-gray-800/40 animate-pulse rounded-lg"></div>
              <div className="h-24 bg-gray-800/40 animate-pulse rounded-lg"></div>
            </div>
          )}
        </Tabs>

        <div className="p-6 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            As recomendações e insights são gerados com base na análise de seus dados financeiros, tendências de mercado e objetivos pessoais. Atualizamos estas informações regularmente para mantê-lo informado sobre as melhores decisões financeiras.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteligenciaModule;

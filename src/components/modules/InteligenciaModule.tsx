
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

  // Add the missing functions that were causing the errors
  const getUrgencyColor = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "alto":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200";
      case "médio":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200";
      case "baixo":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency.toLowerCase()) {
      case "alto":
        return <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />;
      case "médio":
        return <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case "baixo":
        return <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />;
      default:
        return null;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "alto":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200";
      case "médio":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200";
      case "baixo":
        return "bg-violet-100 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
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
  
  // Define a safe way to access recommendations
  const recommendations = data?.recommendations || [];
  
  // Define insights here using data.financialInsightData instead of data.financialInsights
  const insights = data.financialInsightData ? data.financialInsightData.insights || [] : [
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
    <Card className={`${fullWidth ? "w-full" : "w-full"} h-full overflow-hidden border-none shadow-lg dark:bg-slate-800/30`}>
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 pb-3">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-white/20 p-2 shadow-xl">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <CardTitle className="text-xl text-white">
            {t('intelligence.title', 'Inteligência Financeira')}
          </CardTitle>
        </div>
      </CardHeader>
      
      <div className="px-3 pt-3 pb-0 border-b border-gray-200 dark:border-gray-700">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="actions" className="text-xs sm:text-sm">
              {t('intelligence.actions', 'Ações')}
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-xs sm:text-sm">
              {t('intelligence.insights', 'Insights')}
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xs sm:text-sm">
              {t('intelligence.recommendations', 'Recomendações')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <CardContent className="p-0">
        <TabsContent value="actions" className="p-4 space-y-3 m-0">
          <div className="space-y-4">
            {getRecommendedActions().map((action) => (
              <div 
                key={action.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/5 hover:bg-white/10 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                onClick={() => handleActionClick(action)}
              >
                <div className="flex gap-3 items-start">
                  <div className="rounded-lg bg-blue-500/20 p-2 flex-shrink-0 mt-1">
                    {action.icon === "TrendingUp" && <TrendingUp className="h-5 w-5 text-blue-400" />}
                    {action.icon === "Shield" && <Shield className="h-5 w-5 text-green-400" />}
                    {action.icon === "AlertTriangle" && <AlertTriangle className="h-5 w-5 text-amber-400" />}
                    {action.icon === "BadgePercent" && <BadgePercent className="h-5 w-5 text-emerald-400" />}
                    {action.icon === "BarChart" && <BarChart className="h-5 w-5 text-purple-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-1">
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-300 border-blue-500/20 hover:border-blue-500/40">
                        {action.category === 'investment' ? 'Investimento' : 
                          action.category === 'planning' ? 'Planejamento' : 
                          action.category === 'tax' ? 'Impostos' : action.category}
                      </Badge>
                      <Badge variant="outline" className={`
                        ${action.impact === 'Alto' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 
                          action.impact === 'Médio' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' : 
                          'bg-green-500/10 text-green-300 border-green-500/20'}
                      `}>
                        Impacto: {action.impact}
                      </Badge>
                      <Badge variant="outline" className={`
                        ${action.effort === 'Alto' ? 'bg-red-500/10 text-red-300 border-red-500/20' : 
                          action.effort === 'Médio' ? 'bg-amber-500/10 text-amber-300 border-amber-500/20' : 
                          'bg-green-500/10 text-green-300 border-green-500/20'}
                      `}>
                        Esforço: {action.effort}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{action.description}</p>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      {action.buttonText} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="p-4 space-y-4 m-0">
          {/* We'll use financialInsightData instead of financialInsights */}
          {data.financialInsightData ? (
            <div className="space-y-4">
              {/* Add null check and default empty array */}
              {(data.financialInsightData.insights || []).map((insight: any, index: number) => (
                <div 
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/5"
                  onClick={() => handleInsightClick(insight)}
                >
                  <div className="flex gap-2 mb-2">
                    <Badge className={`bg-${insight.type === 'positive' ? 'green' : insight.type === 'negative' ? 'red' : 'blue'}-600/50`}>
                      {insight.type === 'positive' ? 'Positivo' : 
                        insight.type === 'negative' ? 'Atenção' : 'Informativo'}
                    </Badge>
                    <Badge variant="outline" className="bg-gray-800/50">
                      {insight.category}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">{insight.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{insight.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="bg-gray-800/50 text-gray-400">
                      {insight.date}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                    >
                      Ver detalhes <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="rounded-full bg-blue-500/20 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Nenhum insight disponível</h3>
              <p className="text-sm text-gray-400">
                Ative o Open Finance para habilitar insights personalizados baseados nos seus dados financeiros.
              </p>
              <Button
                className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                Ativar Open Finance <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recommendations" className="p-4 space-y-4 m-0">
          {recommendations && recommendations.length > 0 ? (
            <div className="space-y-4">
              {/* Use data.recommendations with null check */}
              {recommendations.map((recommendation, index) => (
                <div 
                  key={index}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  onClick={() => handleExecute(recommendation)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-2">
                      <Badge className={`bg-${recommendation.urgency === 'high' ? 'red' : recommendation.urgency === 'medium' ? 'amber' : 'green'}-600/50`}>
                        {recommendation.urgency === 'high' ? 'Alta Prioridade' : 
                          recommendation.urgency === 'medium' ? 'Média Prioridade' : 'Baixa Prioridade'}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-700/30">
                        {recommendation.category}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="bg-gray-800/50 text-gray-400">
                      {recommendation.date}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">{recommendation.action}</h3>
                  <p className="text-sm text-gray-400 mb-3">{recommendation.description}</p>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  >
                    Executar <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="rounded-full bg-green-500/20 p-4 mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Sem recomendações pendentes</h3>
              <p className="text-sm text-gray-400">
                Todas as suas recomendações financeiras foram executadas. Continue monitorando seu portfólio para novas oportunidades.
              </p>
            </div>
          )}
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default InteligenciaModule;

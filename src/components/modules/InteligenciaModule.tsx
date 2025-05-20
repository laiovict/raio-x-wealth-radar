
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  LineChart, 
  BarChart3, 
  PieChart, 
  Lightbulb, 
  ArrowRight, 
  ArrowUp, 
  ArrowDown,
  TrendingUp,
  BadgeCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/utils/formattingUtils";

interface InteligenciaModuleProps {
  fullWidth?: boolean;
}

const InteligenciaModule = ({ fullWidth = false }: InteligenciaModuleProps) => {
  const { data, isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();
  const [activeTab, setActiveTab] = useState<string>("insights");
  
  // Simulate loading time for enhanced UX
  const [loadingStates, setLoadingStates] = useState({
    insights: false,
    actions: false,
    recommendations: false
  });
  
  useEffect(() => {
    if (activeTab) {
      setLoadingStates(prev => ({ ...prev, [activeTab]: true }));
      
      const timer = setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [activeTab]: false }));
      }, 600);
      
      return () => clearTimeout(timer);
    }
  }, [activeTab]);
  
  const actionStatuses = [
    { id: 'liquidity', label: 'Reserva de emergência', status: 'pending' },
    { id: 'risk', label: 'Perfil de risco', status: 'complete' },
    { id: 'diversification', label: 'Diversificação', status: 'partial' }
  ];
  
  const getActionStatus = (status: string) => {
    switch (status) {
      case 'complete':
        return <Badge className="bg-green-100 text-green-800 ml-auto">Completo</Badge>;
      case 'partial':
        return <Badge className="bg-amber-100 text-amber-800 ml-auto">Parcial</Badge>;
      case 'pending':
        return <Badge className="bg-red-100 text-red-800 ml-auto">Pendente</Badge>;
      default:
        return null;
    }
  };
  
  const getActionProgress = (status: string) => {
    switch (status) {
      case 'complete':
        return <div className="w-full h-2 bg-green-500 rounded-full"></div>;
      case 'partial':
        return (
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
          </div>
        );
      case 'pending':
        return <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>;
      default:
        return null;
    }
  };

  const getIconForInsight = (category: string) => {
    switch (category.toLowerCase()) {
      case 'allocation':
        return <PieChart className="h-10 w-10 text-blue-600 dark:text-blue-400 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md" />;
      case 'risk':
        return <BarChart3 className="h-10 w-10 text-red-600 dark:text-red-400 p-2 bg-red-100 dark:bg-red-900/30 rounded-md" />;
      case 'opportunity':
        return <LineChart className="h-10 w-10 text-green-600 dark:text-green-400 p-2 bg-green-100 dark:bg-green-900/30 rounded-md" />;
      case 'budget':
        return <ArrowDown className="h-10 w-10 text-amber-600 dark:text-amber-400 p-2 bg-amber-100 dark:bg-amber-900/30 rounded-md" />;
      case 'tax':
        return <BadgeCheck className="h-10 w-10 text-purple-600 dark:text-purple-400 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-md" />;
      case 'savings':
        return <ArrowUp className="h-10 w-10 text-emerald-600 dark:text-emerald-400 p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-md" />;
      default:
        return <Lightbulb className="h-10 w-10 text-indigo-600 dark:text-indigo-400 p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-md" />;
    }
  };
  
  const getBackgroundForInsight = (category: string) => {
    switch (category.toLowerCase()) {
      case 'allocation':
        return 'border-blue-200 dark:border-blue-800/50';
      case 'risk':
        return 'border-red-200 dark:border-red-800/50';
      case 'opportunity':
        return 'border-green-200 dark:border-green-800/50';
      case 'budget':
        return 'border-amber-200 dark:border-amber-800/50';
      case 'tax':
        return 'border-purple-200 dark:border-purple-800/50';
      case 'savings':
        return 'border-emerald-200 dark:border-emerald-800/50';
      default:
        return 'border-indigo-200 dark:border-indigo-800/50';
    }
  };
  
  const getBackgroundForAction = (id: string) => {
    switch (id) {
      case 'liquidity':
        return 'border-blue-200 dark:border-blue-800/50';
      case 'risk':
        return 'border-amber-200 dark:border-amber-800/50';
      case 'diversification':
        return 'border-green-200 dark:border-green-800/50';
      default:
        return 'border-gray-200 dark:border-gray-700';
    }
  };
  
  const getIconForRecommendation = (urgency: string) => {
    if (!urgency) return null;
    
    switch (urgency.toLowerCase()) {
      case 'alto':
        return <ArrowUp className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'médio':
        return <ArrowRight className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case 'baixo':
        return <BadgeCheck className="h-5 w-5 text-green-600 dark:text-green-400" />;
      default:
        return null;
    }
  };
  
  const getRecommendedActions = () => {
    return [
      {
        id: 'diversify',
        title: 'Diversificar portfólio',
        description: 'Aumente sua exposição a ativos internacionais para reduzir risco local',
        potentialImpact: '+2.4% a.a.',
        urgency: 'Médio',
        icon: <PieChart className="h-10 w-10 text-blue-600 dark:text-blue-400 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-md" />
      },
      {
        id: 'emergency',
        title: 'Reserva de emergência',
        description: 'Sua reserva atual cobre 4 meses de despesas, aumente para 6 meses de segurança',
        potentialImpact: 'Risco -30%',
        urgency: 'Alto',
        icon: <ArrowUp className="h-10 w-10 text-red-600 dark:text-red-400 p-2 bg-red-100 dark:bg-red-900/30 rounded-md" />
      },
      {
        id: 'tax',
        title: 'Otimização tributária',
        description: 'Considere migrar parte dos investimentos para produtos com isenção fiscal',
        potentialImpact: 'Economia R$ 3.200',
        urgency: 'Médio',
        icon: <BadgeCheck className="h-10 w-10 text-green-600 dark:text-green-400 p-2 bg-green-100 dark:bg-green-900/30 rounded-md" />
      }
    ];
  };

  const recommendedActions = getRecommendedActions();
  
  // Define a safe way to access recommendations
  const recommendations = data?.recommendations || [];
  
  // Define insights here using data.financialInsightData instead of data.financialInsights
  const insights = data.financialInsightData ? data.financialInsightData.insights || [] : [
    {
      id: "market-shift",
      title: "Mudança de cenário macroeconômico",
      description: "A recente redução na taxa Selic deve impactar os rendimentos de renda fixa. Considere diversificar para ativos com maior potencial de valorização.",
      category: "opportunity",
      priority: "medium"
    },
    {
      id: "concentration-risk",
      title: "Concentração excessiva em renda fixa",
      description: "Sua carteira tem 68% em renda fixa, o que pode limitar retornos no cenário atual de juros em queda.",
      category: "risk", 
      priority: "high"
    },
    {
      id: "dividend-increase",
      title: "Aumento de dividendos",
      description: "Seus rendimentos em dividendos aumentaram 24% nos últimos 6 meses, mostrando boa escolha de ativos pagadores.",
      category: "savings",
      priority: "low"
    }
  ];

  return (
    <Card className={fullWidth ? "w-full" : "w-full"}>
      <CardHeader className="pb-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-indigo-800 dark:text-indigo-300 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Inteligência Financeira
          </CardTitle>
          
          <button
            onClick={refreshAIAnalysis}
            disabled={isAIAnalysisLoading}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            {isAIAnalysisLoading ? "Atualizando..." : "Atualizar análise"}
          </button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="insights" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-4 border-b border-gray-200 dark:border-gray-700">
          <TabsList className="bg-transparent -mb-px py-0">
            <TabsTrigger value="insights" className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 rounded-none">
              Insights
            </TabsTrigger>
            <TabsTrigger value="actions" className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 rounded-none">
              Ações
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="py-2 px-4 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 rounded-none">
              Recomendações
            </TabsTrigger>
          </TabsList>
        </div>
      
        <CardContent className="p-0">
          <TabsContent value="actions" className="p-4 space-y-3 m-0">
            <div className="space-y-4">
              {getRecommendedActions().map((action) => (
                <div 
                  key={action.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/5 hover:bg-white/10 dark:hover:bg-gray-700/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    {action.icon}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">{action.title}</h3>
                        <div className="flex items-center">
                          <Badge className={action.urgency === 'Alto' ? 'bg-red-100 text-red-800' : action.urgency === 'Médio' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}>
                            {action.urgency}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800 ml-2">
                            {action.potentialImpact}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-3">Status do plano</h3>
              <div className="space-y-3">
                {actionStatuses.map((status) => (
                  <div key={status.id} className={`p-3 border rounded-lg ${getBackgroundForAction(status.id)}`}>
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium">{status.label}</span>
                      {getActionStatus(status.status)}
                    </div>
                    {getActionProgress(status.status)}
                  </div>
                ))}
              </div>
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
                  >
                    <div className="flex items-start gap-4">
                      {getIconForInsight(insight.category)}
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">{insight.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {loadingStates.insights ? (
                  <div className="space-y-4 animate-pulse">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                          <div className="flex-1">
                            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {insights.map((insight, index) => (
                      <div 
                        key={index}
                        className={`p-4 border ${getBackgroundForInsight(insight.category)} rounded-lg bg-white/5`}
                      >
                        <div className="flex items-start gap-4">
                          {getIconForInsight(insight.category)}
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-1">{insight.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{insight.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
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
                  >
                    <div className="flex items-center mb-2">
                      {getIconForRecommendation(recommendation.urgency)}
                      <span className="text-lg font-medium ml-2">{recommendation.action}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{recommendation.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`${recommendation.urgency === 'Alto' ? 'bg-red-100 text-red-800' : recommendation.urgency === 'Médio' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                        Urgência: {recommendation.urgency}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        Impacto: {recommendation.impact}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">Nenhuma recomendação disponível no momento.</p>
                <p className="text-gray-400 text-sm mt-1">Recomendações serão geradas com base na análise do seu portfólio.</p>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default InteligenciaModule;

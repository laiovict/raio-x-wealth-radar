import { useRaioX } from "@/context/RaioXContext";
import type { AIInsight } from "@/types/raioXTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Search, Filter, ChevronRight, Brain, TrendingUp, TrendingDown, Shield, Calculator, Leaf } from "lucide-react";
import { useState } from "react";

interface AIInsightsHubModuleProps {
  fullWidth?: boolean;
}

const AIInsightsHubModule = ({ fullWidth = false }: AIInsightsHubModuleProps) => {
  const { hasOpenFinance, aiInsights, isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [agentFilter, setAgentFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle OpenFinance activation button click
  const handleActivateOpenFinance = () => {
    const event = new CustomEvent('activate-openfinance');
    document.dispatchEvent(event);
  };
  
  // Function to handle view details click
  const handleViewDetails = (insightId: string) => {
    console.log(`Viewing details for insight with ID: ${insightId}`);
    // In a real implementation, this would navigate to or open a modal with insight details
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'risk':
        return 'bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300 border border-red-300 dark:border-red-800';
      case 'opportunity':
        return 'bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-300 dark:border-green-800';
      case 'goal':
        return 'bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-300 dark:border-blue-800';
      case 'education':
        return 'bg-purple-200 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-300 dark:border-purple-800';
      case 'tax':
        return 'bg-orange-200 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300 border border-orange-300 dark:border-orange-800';
      case 'budget':
        return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-800';
      case 'allocation':
        return 'bg-indigo-200 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800';
      case 'savings':
        return 'bg-teal-200 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border border-teal-300 dark:border-teal-800';
      default:
        return 'bg-gray-200 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300 border border-gray-300 dark:border-gray-800';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-200 text-red-800 dark:bg-red-900/50 dark:text-red-300 border border-red-300 dark:border-red-800';
      case 'medium':
        return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-800';
      case 'low':
        return 'bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-300 dark:border-green-800';
      default:
        return 'bg-gray-200 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300 border border-gray-300 dark:border-gray-800';
    }
  };

  const getAgentColor = (agent?: string) => {
    switch (agent) {
      case 'planner':
        return 'bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-300 dark:border-blue-800';
      case 'investor':
        return 'bg-green-200 text-green-800 dark:bg-green-900/50 dark:text-green-300 border border-green-300 dark:border-green-800';
      case 'farmer':
        return 'bg-orange-200 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300 border border-orange-300 dark:border-orange-800';
      case 'insurancer':
        return 'bg-purple-200 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 border border-purple-300 dark:border-purple-800';
      case 'credit':
        return 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border border-yellow-300 dark:border-yellow-800';
      default:
        return 'bg-gray-200 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300 border border-gray-300 dark:border-gray-800';
    }
  };

  const getAgentIcon = (agent?: string) => {
    switch (agent) {
      case 'planner':
        return <Brain className="h-4 w-4" />;
      case 'investor':
        return <TrendingUp className="h-4 w-4" />;
      case 'farmer':
        return <Leaf className="h-4 w-4" />;
      case 'insurancer':
        return <Shield className="h-4 w-4" />;
      case 'credit':
        return <Calculator className="h-4 w-4" />;
      default:
        return <Brain className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'risk': return 'Risco';
      case 'opportunity': return 'Oportunidade';
      case 'goal': return 'Objetivo';
      case 'education': return 'Educacional';
      case 'tax': return 'Impostos';
      case 'budget': return 'Orçamento';
      case 'allocation': return 'Alocação';
      case 'savings': return 'Poupança';
      default: return category;
    }
  };

  const getAgentLabel = (agent?: string) => {
    switch (agent) {
      case 'planner': return 'Planejador';
      case 'investor': return 'Investidor';
      case 'farmer': return 'Agricultor';
      case 'insurancer': return 'Segurador';
      case 'credit': return 'Crédito';
      default: return 'Assistente';
    }
  };

  const getPriorityLabel = (priority?: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return 'Normal';
    }
  };

  // Filter insights based on category, agent and search
  const filteredInsights = aiInsights ? aiInsights.filter(insight => {
    const matchesCategory = !categoryFilter || insight.category === categoryFilter;
    const matchesAgent = !agentFilter || insight.agent === agentFilter;
    const matchesSearch = !searchQuery || 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesAgent && matchesSearch;
  }) : [];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Hoje';
    } else if (diffDays === 1) {
      return 'Ontem';
    } else {
      return `${diffDays} dias atrás`;
    }
  };

  // Categories for filter
  const categories = [
    { id: 'risk', label: 'Risco' },
    { id: 'opportunity', label: 'Oportunidade' },
    { id: 'goal', label: 'Objetivo' },
    { id: 'tax', label: 'Impostos' },
    { id: 'budget', label: 'Orçamento' },
    { id: 'education', label: 'Educacional' },
    { id: 'allocation', label: 'Alocação' },
    { id: 'savings', label: 'Poupança' }
  ];

  // Agents for filter
  const agents = [
    { id: 'planner', label: 'Planejador' },
    { id: 'investor', label: 'Investidor' },
    { id: 'farmer', label: 'Agricultor' },
    { id: 'insurancer', label: 'Segurador' },
    { id: 'credit', label: 'Crédito' }
  ];

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/20 glass-morphism`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-indigo-600 dark:text-indigo-300">
          Central de Insights IA
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar insights..." 
              className="pl-10 pr-4 py-2 w-full bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="flex items-center">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={refreshAIAnalysis} 
              className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
              disabled={isAIAnalysisLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isAIAnalysisLoading ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">{isAIAnalysisLoading ? 'Atualizando...' : 'Atualizar'}</span>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <Filter className="h-4 w-4" />
            <span>Categorias:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap">
            <Badge 
              className={`cursor-pointer ${!categoryFilter ? 'bg-indigo-600 dark:bg-indigo-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'} hover:bg-indigo-700 dark:hover:bg-indigo-600`}
              onClick={() => setCategoryFilter(null)}
            >
              Todos
            </Badge>
            {categories.map(category => (
              <Badge 
                key={category.id}
                className={`cursor-pointer ${categoryFilter === category.id ? 'bg-indigo-600 dark:bg-indigo-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'} hover:bg-indigo-700 dark:hover:bg-indigo-600`}
                onClick={() => setCategoryFilter(categoryFilter === category.id ? null : category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 mt-2">
            <Brain className="h-4 w-4" />
            <span>Agentes:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap">
            <Badge 
              className={`cursor-pointer ${!agentFilter ? 'bg-indigo-600 dark:bg-indigo-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'} hover:bg-indigo-700 dark:hover:bg-indigo-600`}
              onClick={() => setAgentFilter(null)}
            >
              Todos
            </Badge>
            {agents.map(agent => (
              <Badge 
                key={agent.id}
                className={`cursor-pointer ${agentFilter === agent.id ? 'bg-indigo-600 dark:bg-indigo-700 text-white' : 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200'} hover:bg-indigo-700 dark:hover:bg-indigo-600`}
                onClick={() => setAgentFilter(agentFilter === agent.id ? null : agent.id)}
              >
                {agent.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Insights List */}
        <div className="space-y-4">
          {!hasOpenFinance ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Insights IA Básicos</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-white/5 hover:bg-white/10 border-blue-500/50"
                  onClick={handleActivateOpenFinance}
                >
                  Ativar OpenFinance para mais insights
                </Button>
              </div>
              
              {/* Basic insights without OpenFinance */}
              <div className="space-y-3">
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white/80 dark:bg-gray-800/80 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-indigo-600 text-white">Novo</Badge>
                        <Badge className={getCategoryColor('education')}>
                          {getCategoryLabel('education')}
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-medium">Conheça as características de cada tipo de investimento</h3>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Hoje</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    Entender as características de cada tipo de investimento é essencial para tomar decisões informadas. 
                    Explore a diferença entre renda fixa e variável.
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      onClick={() => handleViewDetails('basic-1')}
                    >
                      Ver detalhes <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white/80 dark:bg-gray-800/80 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor('opportunity')}>
                          {getCategoryLabel('opportunity')}
                        </Badge>
                        <Badge className={getPriorityColor('medium')}>
                          Prioridade: {getPriorityLabel('medium')}
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-medium">Diversificação é chave para redução de risco</h3>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">2 dias atrás</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    Sua carteira mostra concentração em poucos ativos. Considere diversificar 
                    entre diferentes classes para reduzir o risco geral da sua carteira.
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      onClick={() => handleViewDetails('basic-2')}
                    >
                      Ver detalhes <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white/80 dark:bg-gray-800/80 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getCategoryColor('goal')}>
                          {getCategoryLabel('goal')}
                        </Badge>
                        <Badge className={getAgentColor('planner')}>
                          <div className="flex items-center gap-1">
                            {getAgentIcon('planner')}
                            <span>{getAgentLabel('planner')}</span>
                          </div>
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 dark:text-white font-medium">Defina objetivos financeiros claros</h3>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">5 dias atrás</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    Estabelecer metas financeiras específicas ajuda a direcionar suas estratégias de investimento. 
                    Defina prioridades como aposentadoria, educação ou compra de imóveis.
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                      onClick={() => handleViewDetails('basic-3')}
                    >
                      Ver detalhes <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ) : isAIAnalysisLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <p className="text-gray-400">Gerando novos insights IA...</p>
            </div>
          ) : filteredInsights.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Nenhum insight encontrado com os filtros atuais.</p>
            </div>
          ) : (
            filteredInsights.map((insight) => (
              <div 
                key={insight.id}
                className={`border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white/80 dark:bg-gray-800/80 shadow-sm ${insight.isNew ? 'ring-2 ring-indigo-500/50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      {insight.isNew && <Badge className="bg-indigo-600 text-white">Novo</Badge>}
                      <Badge className={getCategoryColor(insight.category)}>
                        {getCategoryLabel(insight.category)}
                      </Badge>
                      {insight.priority && (
                        <Badge className={getPriorityColor(insight.priority)}>
                          Prioridade: {getPriorityLabel(insight.priority)}
                        </Badge>
                      )}
                      {insight.agent && (
                        <Badge className={getAgentColor(insight.agent)}>
                          <div className="flex items-center gap-1">
                            {getAgentIcon(insight.agent)}
                            <span>{getAgentLabel(insight.agent)}</span>
                          </div>
                        </Badge>
                      )}
                      {insight.isSynthetic && <Badge variant="outline" className="text-gray-600 dark:text-gray-400 border-gray-400 dark:border-gray-500">Beta</Badge>}
                    </div>
                    <h3 className="text-gray-900 dark:text-white font-medium">{insight.title}</h3>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">{formatDate(insight.timestamp)}</span>
                </div>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{insight.description}</p>
                <div className="mt-3 flex justify-end">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                    onClick={() => handleViewDetails(insight.id)}
                  >
                    Ver detalhes <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIInsightsHubModule;

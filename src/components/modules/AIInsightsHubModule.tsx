
import { useRaioX, AIInsight } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Search, Filter, ChevronRight } from "lucide-react";
import { useState } from "react";

interface AIInsightsHubModuleProps {
  fullWidth?: boolean;
}

const AIInsightsHubModule = ({ fullWidth = false }: AIInsightsHubModuleProps) => {
  const { hasOpenFinance, aiInsights, isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'risk':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'opportunity':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'goal':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'education':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'tax':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'budget':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
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
      default: return category;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  // Filter insights based on category and search
  const filteredInsights = aiInsights.filter(insight => {
    const matchesCategory = !categoryFilter || insight.category === categoryFilter;
    const matchesSearch = !searchQuery || 
      insight.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      insight.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
  ];

  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Central de Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="w-16 h-16 text-amber-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Insights IA Indisponíveis</h3>
            <p className="text-gray-400 max-w-md mb-4">
              Para acessar insights personalizados da IA, é necessário ativar o OpenFinance para permitir a análise de seus dados financeiros.
            </p>
            <Button variant="outline" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800">
              Ativar OpenFinance
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isAIAnalysisLoading) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Central de Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400">Gerando novos insights IA...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Central de Insights IA
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshAIAnalysis} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden md:inline">Atualizar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar insights..." 
              className="pl-10 pr-4 py-2 w-full bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap">
            <Badge 
              className={`cursor-pointer ${!categoryFilter ? 'bg-blue-600' : 'bg-white/10'} hover:bg-blue-700`}
              onClick={() => setCategoryFilter(null)}
            >
              Todos
            </Badge>
            {categories.map(category => (
              <Badge 
                key={category.id}
                className={`cursor-pointer ${categoryFilter === category.id ? 'bg-blue-600' : 'bg-white/10'} hover:bg-blue-700`}
                onClick={() => setCategoryFilter(categoryFilter === category.id ? null : category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Insights List */}
        <div className="space-y-4">
          {filteredInsights.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Nenhum insight encontrado com os filtros atuais.</p>
            </div>
          ) : (
            filteredInsights.map((insight) => (
              <div 
                key={insight.id}
                className={`border border-white/10 rounded-lg p-4 bg-white/5 ${insight.isNew ? 'ring-2 ring-blue-500/50' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {insight.isNew && <Badge className="bg-blue-600">Novo</Badge>}
                      <Badge className={getCategoryColor(insight.category)}>
                        {getCategoryLabel(insight.category)}
                      </Badge>
                      <Badge className={getPriorityColor(insight.priority)}>
                        Prioridade: {getPriorityLabel(insight.priority)}
                      </Badge>
                    </div>
                    <h3 className="text-white font-medium">{insight.title}</h3>
                  </div>
                  <span className="text-xs text-gray-400">{formatDate(insight.timestamp)}</span>
                </div>
                <p className="mt-2 text-sm text-gray-300">{insight.description}</p>
                <div className="mt-3 flex justify-end">
                  <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-900/20">
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

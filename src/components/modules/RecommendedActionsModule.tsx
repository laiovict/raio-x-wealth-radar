
import { useRaioX, RecommendedAction } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, ChevronRight, ArrowRight } from "lucide-react";

interface RecommendedActionsModuleProps {
  fullWidth?: boolean;
}

const RecommendedActionsModule = ({ fullWidth = false }: RecommendedActionsModuleProps) => {
  const { hasOpenFinance, recommendedActions, isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();
  
  // Function to handle OpenFinance activation button click
  const handleActivateOpenFinance = () => {
    const event = new CustomEvent('activate-openfinance');
    document.dispatchEvent(event);
  };
  
  // Function to handle action execution
  const handleExecuteAction = (actionId: string) => {
    console.log(`Executing action with ID: ${actionId}`);
    // In a real implementation, this would execute the action
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'allocation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'tax':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'cash':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'goal':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'risk':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '●';
      case 'medium':
        return '●●';
      case 'complex':
        return '●●●';
      default:
        return '●';
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-500';
      case 'medium':
        return 'text-amber-500';
      case 'complex':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'allocation': return 'Alocação';
      case 'tax': return 'Impostos';
      case 'cash': return 'Fluxo de Caixa';
      case 'goal': return 'Objetivo';
      case 'risk': return 'Risco';
      default: return category;
    }
  };
  
  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return urgency;
    }
  };
  
  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Média';
      case 'complex': return 'Complexa';
      default: return difficulty;
    }
  };

  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Ações Recomendadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="w-16 h-16 text-amber-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Recomendações Indisponíveis</h3>
            <p className="text-gray-400 max-w-md mb-4">
              Para receber recomendações personalizadas, é necessário ativar o OpenFinance para permitir a análise completa de seus dados financeiros.
            </p>
            <Button 
              variant="outline" 
              className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800"
              onClick={handleActivateOpenFinance}
            >
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
            Ações Recomendadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400">Calculando recomendações personalizadas...</p>
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
            Ações Recomendadas
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshAIAnalysis} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden md:inline">Atualizar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendedActions.map((action) => (
            <div 
              key={action.id}
              className="border border-white/10 rounded-lg p-4 bg-white/5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(action.category)}>
                      {getCategoryLabel(action.category)}
                    </Badge>
                    <Badge className={getUrgencyColor(action.urgency)}>
                      {getUrgencyLabel(action.urgency)}
                    </Badge>
                    <span className={`text-xs ${getDifficultyColor(action.difficulty)}`}>
                      Dificuldade: {getDifficultyIcon(action.difficulty)} {getDifficultyLabel(action.difficulty)}
                    </span>
                  </div>
                  <h3 className="text-white font-medium">{action.title}</h3>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-300">{action.description}</p>
              <div className="mt-2 p-2 bg-white/5 rounded-md text-sm text-blue-300">
                <span className="font-medium">Impacto Esperado:</span> {action.impact}
              </div>
              <div className="mt-3 flex justify-end">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white hover:from-blue-700 hover:to-indigo-800"
                  onClick={() => handleExecuteAction(action.id)}
                >
                  Executar <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedActionsModule;

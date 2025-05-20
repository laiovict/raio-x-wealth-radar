
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, ArrowRight, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface InvestmentPlanningModuleProps {
  fullWidth?: boolean;
}

const InvestmentPlanningModule = ({ fullWidth = false }: InvestmentPlanningModuleProps) => {
  const { hasOpenFinance, isAIAnalysisLoading, refreshAIAnalysis } = useRaioX();

  // Function to handle OpenFinance activation button click
  const handleActivateOpenFinance = () => {
    const event = new CustomEvent('activate-openfinance');
    document.dispatchEvent(event);
  };

  // Sample data for investment planning
  const investmentPlan = {
    targetAmount: 2500000,
    currentAmount: 850000,
    monthlyContribution: 5000,
    recommendedContribution: 7500,
    yearsToGoal: 15,
    expectedReturn: 8.5,
    riskProfile: "Moderado",
    assetAllocation: [
      { class: "Renda Fixa", current: 60, recommended: 45, color: "from-blue-500 to-blue-600" },
      { class: "Renda Variável (BR)", current: 25, recommended: 20, color: "from-green-500 to-green-600" },
      { class: "Renda Variável (Int.)", current: 10, recommended: 20, color: "from-purple-500 to-purple-600" },
      { class: "Alternativos", current: 5, recommended: 15, color: "from-amber-500 to-amber-600" },
    ],
    recommendations: [
      "Aumentar contribuição mensal para R$ 7.500",
      "Diversificar carteira com mais exposição internacional",
      "Reduzir concentração em renda fixa para melhorar retorno esperado",
      "Considerar investimentos alternativos para diversificação"
    ]
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate goal progress
  const goalProgress = Math.round((investmentPlan.currentAmount / investmentPlan.targetAmount) * 100);

  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Planejamento de Investimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertTriangle className="w-16 h-16 text-amber-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Planejamento Indisponível</h3>
            <p className="text-gray-400 max-w-md mb-4">
              Para acessar seu plano personalizado de investimentos, é necessário ativar o OpenFinance para permitir a análise completa de seus dados financeiros.
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
            Planejamento de Investimentos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400">Calculando seu plano de investimentos...</p>
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
            Planejamento de Investimentos
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={refreshAIAnalysis} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden md:inline">Atualizar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Goal Progress Section */}
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-2">Meta de Investimentos</h3>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Progresso:</span>
                <span className="text-blue-400">{goalProgress}% completo</span>
              </div>
              <Progress value={goalProgress} className="h-2 mb-4" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Atual: {formatCurrency(investmentPlan.currentAmount)}</span>
                <span className="text-gray-400">Meta: {formatCurrency(investmentPlan.targetAmount)}</span>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Aporte mensal atual:</span>
                  <span className="text-white font-medium">{formatCurrency(investmentPlan.monthlyContribution)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Aporte recomendado:</span>
                  <span className="text-green-400 font-medium">{formatCurrency(investmentPlan.recommendedContribution)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Anos para atingir:</span>
                  <span className="text-white font-medium">{investmentPlan.yearsToGoal} anos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Retorno esperado:</span>
                  <span className="text-white font-medium">{investmentPlan.expectedReturn}% a.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Perfil de risco:</span>
                  <span className="text-white font-medium">{investmentPlan.riskProfile}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">Recomendações</h3>
              <ul className="space-y-2">
                {investmentPlan.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Asset Allocation Section */}
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-4">Alocação de Ativos</h3>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-400">Alocação Atual</h4>
                <div className="grid grid-cols-4 gap-1 mb-4">
                  {investmentPlan.assetAllocation.map((asset, index) => (
                    <div 
                      key={`current-${index}`}
                      className="h-8" 
                      style={{width: `${asset.current}%`}} 
                    >
                      <div className={`h-full w-full bg-gradient-to-r ${asset.color} rounded-sm`}></div>
                    </div>
                  ))}
                </div>
                
                <h4 className="text-sm font-medium text-gray-400">Alocação Recomendada</h4>
                <div className="grid grid-cols-4 gap-1 mb-2">
                  {investmentPlan.assetAllocation.map((asset, index) => (
                    <div 
                      key={`recommended-${index}`}
                      className="h-8" 
                      style={{width: `${asset.recommended}%`}}
                    >
                      <div className={`h-full w-full bg-gradient-to-r ${asset.color} rounded-sm`}></div>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {investmentPlan.assetAllocation.map((asset, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${asset.color}`}></div>
                      <div className="flex-1 flex justify-between">
                        <span className="text-xs text-gray-400">{asset.class}</span>
                        <span className="text-xs text-white">
                          {asset.current}% → {asset.recommended}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-white mb-3">Próximos Passos</h3>
              <div className="space-y-3">
                <Button
                  variant="outline" 
                  size="sm"
                  className="w-full justify-start text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                  onClick={() => console.log("Adjust monthly contribution")}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Ajustar contribuição mensal
                </Button>
                
                <Button
                  variant="outline" 
                  size="sm"
                  className="w-full justify-start text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                  onClick={() => console.log("Rebalance portfolio")}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Rebalancear carteira
                </Button>
                
                <Button
                  variant="outline" 
                  size="sm"
                  className="w-full justify-start text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                  onClick={() => console.log("Update investment plan")}
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  Atualizar plano de investimentos
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            onClick={() => console.log("View detailed investment plan")}
          >
            Ver Plano Detalhado <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentPlanningModule;

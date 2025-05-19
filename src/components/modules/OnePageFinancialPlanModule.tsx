
import { useState } from "react";
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Pencil, Check, ArrowUp, ArrowDown, Minus, Target, Wallet, PiggyBank, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnePageFinancialPlanModuleProps {
  fullWidth?: boolean;
}

const OnePageFinancialPlanModule = ({ fullWidth = false }: OnePageFinancialPlanModuleProps) => {
  const { data, hasOpenFinance, financialSummary } = useRaioX();
  const [isEditingPurpose, setIsEditingPurpose] = useState(false);
  const [financialPurpose, setFinancialPurpose] = useState(
    data.financialPurpose || "Construir segurança financeira para minha família e ter liberdade para escolher como viver minha vida."
  );
  const [tempPurpose, setTempPurpose] = useState(financialPurpose);

  // Format currency
  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "N/A";
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSavePurpose = () => {
    setFinancialPurpose(tempPurpose);
    setIsEditingPurpose(false);
    // In a real app, we would save this to the backend
  };

  // Get top 3 goals from the life goals data
  const topGoals = data.lifeGoals?.goals.slice(0, 3) || [];
  
  // Monthly cash flow data
  const monthlyIncome = financialSummary?.monthlyIncome || 18500;
  const monthlyExpenses = financialSummary?.monthlyExpenses || 12000;
  const monthlySavings = monthlyIncome - monthlyExpenses;
  const savingsRate = ((monthlySavings / monthlyIncome) * 100).toFixed(1);
  
  // Cash flow trend (would be calculated from historical data)
  const cashFlowTrend = "up"; // "up", "down", or "stable"
  
  // Next actions (would come from AI recommendations)
  const nextActions = [
    { 
      id: "1", 
      description: "Aumentar aporte para aposentadoria em R$ 850/mês",
      deadline: "Até 30/06/2025", 
      completed: false,
      priority: "high" 
    },
    { 
      id: "2", 
      description: "Revisar seguros pessoais e de vida",
      deadline: "Até 15/07/2025", 
      completed: false,
      priority: "medium" 
    },
    { 
      id: "3", 
      description: "Rebalancear portfólio para reduzir exposição em tecnologia",
      deadline: "Próximos 45 dias", 
      completed: false,
      priority: "medium" 
    }
  ];
  
  // Toggle action completion
  const toggleActionCompletion = (id: string) => {
    // In a real app, we would update this in the backend
    console.log(`Toggling action ${id}`);
  };

  if (!hasOpenFinance) {
    return (
      <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Plano Financeiro RaioX em Uma Página
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Target className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Ative o OpenFinance para Acessar seu Plano Personalizado</h3>
            <p className="text-gray-400 max-w-md mb-4">
              O Plano Financeiro RaioX em Uma Página sintetiza sua situação financeira, objetivos e próximos passos em uma visão clara e acionável.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              Ativar OpenFinance
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader>
        <CardTitle className="text-xl bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent flex items-center">
          <Target className="mr-2 h-5 w-5" />
          Plano Financeiro RaioX em Uma Página
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 1. Financial Purpose (The "Why") */}
        <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-lg p-5 border border-blue-900/30">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-white font-medium">Meu Propósito Financeiro</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={() => {
                if (isEditingPurpose) {
                  handleSavePurpose();
                } else {
                  setTempPurpose(financialPurpose);
                  setIsEditingPurpose(true);
                }
              }}
            >
              {isEditingPurpose ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
            </Button>
          </div>
          
          {isEditingPurpose ? (
            <textarea
              value={tempPurpose}
              onChange={(e) => setTempPurpose(e.target.value)}
              className="w-full bg-white/5 rounded-md p-3 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Por que o dinheiro é importante para você? O que você quer alcançar com seus recursos financeiros?"
            />
          ) : (
            <p className="text-gray-200 italic">&ldquo;{financialPurpose}&rdquo;</p>
          )}
        </div>
        
        {/* 2. Key Goals (The "What" and "Where") */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white font-medium flex items-center">
              <Target className="mr-2 h-5 w-5 text-blue-400" />
              Meus Objetivos Principais
            </h3>
            <Button variant="outline" size="sm" className="h-8 text-xs">
              Ver Todos
            </Button>
          </div>
          
          <div className="space-y-4">
            {topGoals.map((goal, index) => (
              <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center">
                      <h4 className="text-white font-medium">{goal.name}</h4>
                      <Badge className="ml-2" variant={
                        goal.adjustmentNeeded <= 0 ? "success" :
                        goal.adjustmentNeeded <= 5 ? "warning" : "destructive"
                      }>
                        {goal.adjustmentNeeded <= 0 ? "No Caminho" : "Requer Atenção"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">Meta: {formatCurrency(goal.targetAmount)} até {goal.timeframe}</p>
                  </div>
                  <span className="text-lg font-semibold text-white">{goal.progress}%</span>
                </div>
                
                <Progress value={goal.progress} className="h-2" variant={
                  goal.adjustmentNeeded <= 0 ? "success" :
                  goal.adjustmentNeeded <= 5 ? "warning" : "destructive"
                } />
                
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Atual: {formatCurrency(goal.currentAmount)}</span>
                  <span>Faltam: {formatCurrency(goal.targetAmount - goal.currentAmount)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 3. Current Financial Snapshot (The "Where I Am") */}
        <div>
          <h3 className="text-white font-medium flex items-center mb-3">
            <Wallet className="mr-2 h-5 w-5 text-blue-400" />
            Meu Instantâneo Financeiro
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Patrimônio Líquido</p>
              <div className="flex items-center">
                <span className="text-xl font-bold text-white">{formatCurrency(financialSummary?.netWorth)}</span>
                <div className="ml-2 text-green-400 flex items-center text-xs">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>+4.3% (30d)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Fluxo de Caixa Mensal</p>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Receita Média:</span>
                  <span className="text-white">{formatCurrency(monthlyIncome)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Despesa Média:</span>
                  <span className="text-white">{formatCurrency(monthlyExpenses)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium pt-1 border-t border-white/10 mt-1">
                  <span className="text-gray-300">Saldo Médio:</span>
                  <span className={cn(
                    "flex items-center",
                    monthlySavings > 0 ? "text-green-400" : "text-red-400"
                  )}>
                    {monthlySavings > 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {formatCurrency(Math.abs(monthlySavings))}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Taxa de Poupança</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">{savingsRate}%</span>
                <div className={cn(
                  "flex items-center text-xs",
                  cashFlowTrend === "up" ? "text-green-400" : 
                  cashFlowTrend === "down" ? "text-red-400" : "text-gray-400"
                )}>
                  {cashFlowTrend === "up" ? (
                    <>
                      <ArrowUp className="h-3 w-3 mr-1" />
                      <span>Tendência Positiva</span>
                    </>
                  ) : cashFlowTrend === "down" ? (
                    <>
                      <ArrowDown className="h-3 w-3 mr-1" />
                      <span>Tendência Negativa</span>
                    </>
                  ) : (
                    <>
                      <Minus className="h-3 w-3 mr-1" />
                      <span>Estável</span>
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                <span className="text-blue-400">Dica:</span> Uma taxa de poupança saudável fica entre 15-20% da renda.
              </p>
            </div>
          </div>
        </div>
        
        {/* 4. Next Crucial Actions (The "How" / "What to Do Now") */}
        <div>
          <h3 className="text-white font-medium flex items-center mb-3">
            <CalendarClock className="mr-2 h-5 w-5 text-blue-400" />
            Minhas Próximas Ações
          </h3>
          
          <div className="space-y-3">
            {nextActions.map((action) => (
              <div 
                key={action.id} 
                className={cn(
                  "flex items-start p-4 rounded-lg border",
                  action.completed 
                    ? "bg-green-900/20 border-green-900/30 line-through opacity-60" 
                    : "bg-white/5 border-white/10"
                )}
              >
                <Button
                  variant={action.completed ? "success" : "outline"}
                  size="sm"
                  className="h-6 w-6 p-0 mr-3 mt-0.5 flex-shrink-0"
                  onClick={() => toggleActionCompletion(action.id)}
                >
                  <Check className="h-3 w-3" />
                </Button>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "font-medium",
                      action.completed ? "text-gray-400" : "text-white"
                    )}>
                      {action.description}
                    </p>
                    <Badge 
                      variant={
                        action.priority === "high" ? "destructive" : 
                        action.priority === "medium" ? "warning" : "default"
                      }
                      className="ml-2"
                    >
                      {action.priority === "high" ? "Alta" : 
                       action.priority === "medium" ? "Média" : "Baixa"}
                    </Badge>
                  </div>
                  {action.deadline && (
                    <p className="text-xs text-gray-400 mt-1">
                      Prazo: {action.deadline}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              Ver Todas as Ações Recomendadas
            </Button>
          </div>
        </div>
        
        {/* Plan Footer */}
        <div className="flex justify-between items-center text-xs text-gray-400 pt-2 border-t border-white/10">
          <div>Última Atualização: 19 de Maio de 2025</div>
          <div className="flex items-center">
            <Pencil className="h-3 w-3 mr-1" />
            <span>Revise seu plano regularmente</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnePageFinancialPlanModule;

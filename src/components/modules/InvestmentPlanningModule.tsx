
import { useRaioX } from "@/context/RaioXContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "@/utils/formattingUtils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Target, Calendar, PiggyBank, TrendingUp, ChartBar, Star } from "lucide-react";
import { toNumber } from '@/utils/typeConversionHelpers';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { DataSourceType } from '@/types/raioXTypes';

interface InvestmentPlanningModuleProps {
  fullWidth?: boolean;
  useSyntheticData?: boolean;
}

const InvestmentPlanningModule = ({ fullWidth = false, useSyntheticData = false }: InvestmentPlanningModuleProps) => {
  const { data } = useRaioX();
  
  // Sample financial goals data - in a real app, this would come from API/context
  const financialGoals = [
    {
      id: "retirement",
      title: "Aposentadoria",
      targetValue: 2000000,
      currentValue: 450000,
      targetDate: "2045",
      monthlyContribution: 3500,
      requiredReturn: 8.5,
      emoji: "🏖️"
    },
    {
      id: "house",
      title: "Casa de Praia",
      targetValue: 700000,
      currentValue: 120000,
      targetDate: "2030",
      monthlyContribution: 2800,
      requiredReturn: 7.2,
      emoji: "🏡"
    },
    {
      id: "education",
      title: "Educação dos Filhos",
      targetValue: 400000,
      currentValue: 85000,
      targetDate: "2035",
      monthlyContribution: 1200,
      requiredReturn: 6.8,
      emoji: "🎓"
    }
  ];

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 overflow-hidden border-none shadow-xl`}>
      <CardHeader className="pb-4 bg-gradient-to-r from-slate-100 to-white dark:from-slate-800 dark:to-slate-900 rounded-t-lg border-b border-slate-200 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-white">
                Planejamento de Investimentos
              </CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Projeções e aportes para realizar seus objetivos
              </p>
            </div>
          </div>
          <TypeSafeDataSourceTag source={data.allocation?.dataSource as DataSourceType} />
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className="h-[600px]">
          {/* Introduction Section */}
          <div className="p-6 pb-3">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800/30">
              <h3 className="text-blue-800 dark:text-blue-300 font-medium mb-2">Sua Jornada Financeira</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                Com base na sua situação atual e nos seus objetivos, calculamos os aportes necessários para você realizar seus sonhos no tempo planejado. Veja abaixo seus principais objetivos financeiros e o plano para alcançá-los.
              </p>
            </div>
          </div>
          
          {/* Financial Goals */}
          <div className="px-6 pb-6">
            <h3 className="text-lg font-medium text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-500" />
              Seus Objetivos Financeiros
            </h3>
            
            <div className="space-y-5">
              {financialGoals.map((goal) => (
                <div 
                  key={goal.id}
                  className="bg-white dark:bg-slate-800/60 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50 overflow-hidden"
                >
                  {/* Goal Header */}
                  <div className="bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50 p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-xl">
                        {goal.emoji}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-800 dark:text-white">{goal.title}</h4>
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                          <Calendar className="h-3.5 w-3.5 mr-1" /> Meta para {goal.targetDate}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200">
                      {formatCurrency(goal.targetValue)}
                    </Badge>
                  </div>
                  
                  {/* Goal Progress */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-500 dark:text-slate-400">Progresso</span>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {Math.round((goal.currentValue / goal.targetValue) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                        style={{width: `${(goal.currentValue / goal.targetValue) * 100}%`}}
                      ></div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Valor atual</p>
                        <p className="text-base font-medium text-slate-800 dark:text-white">{formatCurrency(goal.currentValue)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Valor alvo</p>
                        <p className="text-base font-medium text-slate-800 dark:text-white">{formatCurrency(goal.targetValue)}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Recommended Investment Plan */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700/30">
                    <h5 className="font-medium text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                      <ChartBar className="h-4 w-4 text-indigo-500" /> Plano de Investimento
                    </h5>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <PiggyBank className="h-4 w-4 text-green-500" />
                          <p className="text-xs text-slate-500 dark:text-slate-400">Aporte mensal</p>
                        </div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{formatCurrency(goal.monthlyContribution)}</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-amber-500" />
                          <p className="text-xs text-slate-500 dark:text-slate-400">Prazo</p>
                        </div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{parseInt(goal.targetDate) - new Date().getFullYear()} anos</p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <TrendingUp className="h-4 w-4 text-blue-500" />
                          <p className="text-xs text-slate-500 dark:text-slate-400">Retorno necessário</p>
                        </div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{formatPercentage(goal.requiredReturn / 100)}</p>
                      </div>
                    </div>
                    
                    {/* Timeline visualization */}
                    <div className="mt-4 relative">
                      <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{width: '25%'}}></div>
                        <div className="absolute h-3 w-3 bg-white dark:bg-slate-900 border-2 border-green-500 rounded-full -top-[3px]" style={{left: '25%'}}></div>
                        <div className="absolute top-4 text-xs font-medium text-slate-600 dark:text-slate-400" style={{left: '25%', transform: 'translateX(-50%)'}}>Você está aqui</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary Card */}
            <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/30">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-indigo-800 dark:text-indigo-300">Total de aportes mensais</h4>
                <span className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
                  {formatCurrency(financialGoals.reduce((sum, goal) => sum + goal.monthlyContribution, 0))}
                </span>
              </div>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-2">
                Este valor representa {formatPercentage(0.32)} da sua renda mensal atual.
              </p>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default InvestmentPlanningModule;

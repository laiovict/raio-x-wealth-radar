
import React, { useMemo } from 'react';
import { useRaioX } from '@/context/RaioXContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Coins, TrendingUp, AlertTriangle } from 'lucide-react';
import { ModuleDataState, BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import { FinancialGoal, GoalsSummary } from '@/types/goalTypes';
import { DataSourceType } from '@/types/raioXTypes';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { formatCurrency } from '@/utils/formattingUtils';
import { differenceInMonths, parseISO } from 'date-fns';

interface FinancialGoalsModuleProps extends BaseModuleProps {
  dataState?: ModuleDataState<{ goals: FinancialGoal[], summary: GoalsSummary }>;
}

// Priority colors
const PRIORITY_COLORS = {
  high: 'bg-red-500 hover:bg-red-600',
  medium: 'bg-amber-500 hover:bg-amber-600',
  low: 'bg-blue-500 hover:bg-blue-600',
};

// Goal category icons
const CATEGORY_ICONS = {
  emergency: () => <AlertTriangle size={16} />,
  housing: () => <Coins size={16} />,
  education: () => <TrendingUp size={16} />,
  retirement: () => <Coins size={16} />,
  travel: () => <Calendar size={16} />,
  vehicle: () => <Coins size={16} />,
  business: () => <TrendingUp size={16} />,
  other: () => <Coins size={16} />,
};

const GoalCard = ({ goal }: { goal: FinancialGoal }) => {
  const timeRemaining = useMemo(() => {
    const months = differenceInMonths(parseISO(goal.deadline), new Date());
    return months > 0 ? `${months} meses` : 'Prazo vencido';
  }, [goal.deadline]);
  
  const CategoryIcon = CATEGORY_ICONS[goal.category] || CATEGORY_ICONS.other;
  
  return (
    <div className="p-4 border rounded-md bg-slate-800/50 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-white">{goal.name}</h3>
        <Badge className={`${PRIORITY_COLORS[goal.priority]} text-xs`}>
          {goal.priority === 'high' ? 'Alta' : goal.priority === 'medium' ? 'Média' : 'Baixa'}
        </Badge>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Progresso</span>
          <span>{goal.progress.toFixed(1)}%</span>
        </div>
        <Progress value={goal.progress} className="h-2" />
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-400 text-xs">Meta</p>
          <p className="font-medium text-white">{formatCurrency(goal.targetAmount)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Atual</p>
          <p className="font-medium text-white">{formatCurrency(goal.currentAmount)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Aporte mensal</p>
          <p className="font-medium text-white">{formatCurrency(goal.monthlyContribution)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs">Prazo</p>
          <p className="font-medium text-white">{timeRemaining}</p>
        </div>
      </div>
      
      <div className="mt-3 flex items-center gap-2">
        <CategoryIcon />
        <span className="text-xs text-gray-300">
          {goal.achievable ? 
            `Alcançável com retorno de ${goal.requiredReturn.toFixed(1)}%` : 
            'Meta em risco - recalcular'
          }
        </span>
      </div>
    </div>
  );
};

const GoalsSummarySection = ({ summary }: { summary: GoalsSummary }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-300 mb-3">Resumo</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-gradient-to-br from-blue-950/70 to-indigo-950/70 rounded-md shadow">
          <p className="text-xs text-gray-400">Objetivos</p>
          <p className="text-xl font-medium">{summary.totalGoals}</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-blue-950/70 to-indigo-950/70 rounded-md shadow">
          <p className="text-xs text-gray-400">Alcançáveis</p>
          <p className="text-xl font-medium">{summary.achievableGoals} de {summary.totalGoals}</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-blue-950/70 to-indigo-950/70 rounded-md shadow">
          <p className="text-xs text-gray-400">Total necessário</p>
          <p className="text-xl font-medium">{formatCurrency(summary.totalRequired)}</p>
        </div>
        <div className="p-3 bg-gradient-to-br from-blue-950/70 to-indigo-950/70 rounded-md shadow">
          <p className="text-xs text-gray-400">Poupado até agora</p>
          <p className="text-xl font-medium">{formatCurrency(summary.totalSaved)}</p>
        </div>
      </div>
    </div>
  );
};

const FinancialGoalsModuleBase = ({ fullWidth = false, dataState }: FinancialGoalsModuleProps) => {
  const data = dataState?.data;
  const dataSource = dataState?.dataSource || 'synthetic';
  const goals = data?.goals || [];
  const summary = data?.summary;

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
            Objetivos Financeiros
          </CardTitle>
          <TypeSafeDataSourceTag source={dataSource as DataSourceType} />
        </div>
      </CardHeader>
      <CardContent>
        {summary && <GoalsSummarySection summary={summary} />}
        
        {goals.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {goals.map((goal) => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>Nenhum objetivo financeiro definido.</p>
            <p className="mt-2 text-sm text-gray-500">
              {dataState?.isSynthetic 
                ? "Visualizando dados sintéticos (Versão Full)"
                : "Dados reais indisponíveis (RaioX Beta)"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Get real financial goals data from RaioX context
const getRealFinancialGoals = (props: FinancialGoalsModuleProps) => {
  const { data } = useRaioX();
  
  // Extract any financial goals data from the context
  // This is where we would fetch from a real API/database
  if (!data || !data.clientSummary) {
    console.log("FinancialGoalsModule: No client data available, using synthetic data");
    return null;
  }
  
  // For now, return null to use synthetic data
  // In the future, this will parse real data from the API
  return null;
};

// Define synthetic financial goals data as a fallback
const getSyntheticFinancialGoals = (props: FinancialGoalsModuleProps) => {
  // Based on the CIO review document
  const goals = [
    {
      id: "1",
      name: "Reserva de Emergência",
      targetAmount: 300000,
      currentAmount: 250000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180).toISOString(), // 6 months
      priority: "high" as const,
      category: "emergency" as const,
      monthlyContribution: 5000,
      progress: 83.3,
      achievable: true,
      requiredReturn: 5.0,
      dataSource: "synthetic" as DataSourceType
    },
    {
      id: "2",
      name: "Viagem para Paris",
      targetAmount: 50000,
      currentAmount: 30000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString(), // 1 year
      priority: "medium" as const,
      category: "travel" as const,
      monthlyContribution: 2000,
      progress: 60.0,
      achievable: true,
      requiredReturn: 7.5,
      dataSource: "synthetic" as DataSourceType
    },
    {
      id: "3",
      name: "Faculdade da Filha",
      targetAmount: 500000,
      currentAmount: 120000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10).toISOString(), // 10 years
      priority: "high" as const,
      category: "education" as const,
      monthlyContribution: 3000,
      progress: 24.0,
      achievable: true,
      requiredReturn: 8.0,
      dataSource: "synthetic" as DataSourceType
    },
    {
      id: "4",
      name: "Casa Própria",
      targetAmount: 1500000,
      currentAmount: 100000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 5).toISOString(), // 5 years
      priority: "high" as const,
      category: "housing" as const,
      monthlyContribution: 5000,
      progress: 6.7,
      achievable: false,
      requiredReturn: 15.0, // Too high to be realistic
      dataSource: "synthetic" as DataSourceType
    },
    {
      id: "5",
      name: "Aposentadoria",
      targetAmount: 5000000,
      currentAmount: 200000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 20).toISOString(), // 20 years
      priority: "high" as const,
      category: "retirement" as const,
      monthlyContribution: 5000,
      progress: 4.0,
      achievable: true,
      requiredReturn: 9.5,
      dataSource: "synthetic" as DataSourceType
    },
    {
      id: "6",
      name: "Carro",
      targetAmount: 120000,
      currentAmount: 30000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 2).toISOString(), // 2 years
      priority: "low" as const,
      category: "vehicle" as const,
      monthlyContribution: 2000,
      progress: 25.0,
      achievable: false,
      requiredReturn: 13.2,
      dataSource: "synthetic" as DataSourceType
    }
  ];
  
  // Calculate summary statistics
  const totalRequired = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const achievableGoals = goals.filter(goal => goal.achievable).length;
  
  // Find highest priority goal with lowest progress
  const highPriorityGoals = goals.filter(goal => goal.priority === 'high');
  const highestPriority = highPriorityGoals.sort((a, b) => a.progress - b.progress)[0] || null;
  
  // Find goal with nearest deadline
  const nearestDeadline = [...goals].sort((a, b) => 
    new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  )[0] || null;
  
  const summary = {
    totalGoals: goals.length,
    achievableGoals,
    totalRequired,
    totalSaved,
    highestPriority,
    nearestDeadline,
    dataSource: "synthetic" as DataSourceType
  };
  
  return {
    goals,
    summary
  };
};

// Create the enhanced module with data safety
const FinancialGoalsModule = withSafeData(
  FinancialGoalsModuleBase,
  getRealFinancialGoals,
  getSyntheticFinancialGoals,
  'supabase' // Default source type if not overridden by data
);

export default FinancialGoalsModule;

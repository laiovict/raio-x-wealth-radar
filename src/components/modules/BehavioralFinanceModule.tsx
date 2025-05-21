
import { useRaioX } from "@/context/RaioXContext";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { Badge } from "@/components/ui";
import { Brain, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { SafeProgress } from "@/components/ui";
import { calculateFinancialBehaviorMetrics } from "@/utils/financialMetricsUtils";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { BaseModuleProps } from '@/types/moduleTypes';
import { withSafeData } from '@/components/hoc/withSafeData';
import { DataSourceType } from '@/types/raioXTypes';

interface BehavioralFinanceModuleProps extends BaseModuleProps {
  // Additional props specific to this module
}

// The base component implementation
const BehavioralFinanceModuleBase = ({ 
  fullWidth = false, 
  dataState 
}: BehavioralFinanceModuleProps & { 
  dataState: any // We'll type this properly in a complete implementation
}) => {
  const { data } = useRaioX();
  
  // Get behavioral metrics from real data or synthetic data
  const behaviorMetrics = calculateFinancialBehaviorMetrics(
    data.portfolioSummary,
    data.dividendHistory,
    data.portfolioSummary?.fixed_income_value,
    data.monthlyExpenses || 0, // Use 0 as default if undefined
    dataState.isSynthetic
  );
  
  // Helper function to get color based on grade
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-400';
    if (grade.startsWith('B')) return 'text-blue-400';
    if (grade.startsWith('C')) return 'text-yellow-400';
    return 'text-red-400';
  };
  
  // Helper function to get background color based on grade
  const getGradeBgColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-900/20 border-green-500/30';
    if (grade.startsWith('B')) return 'bg-blue-900/20 border-blue-500/30';
    if (grade.startsWith('C')) return 'bg-yellow-900/20 border-yellow-500/30';
    return 'bg-red-900/20 border-red-500/30';
  };

  return (
    <Card className={`${fullWidth ? "w-full" : "w-full"} border border-white/10 glass-morphism`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Finanças Comportamentais
            </span>
          </CardTitle>
          <TypeSafeDataSourceTag source={behaviorMetrics.dataSource as DataSourceType} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Investment Consistency */}
          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-blue-400" />
                <h3 className="font-medium text-white">Consistência nos Investimentos</h3>
              </div>
              <Badge className={`${getGradeBgColor(behaviorMetrics.investmentConsistency.grade)}`}>
                <span className={getGradeColor(behaviorMetrics.investmentConsistency.grade)}>
                  {behaviorMetrics.investmentConsistency.grade}
                </span>
              </Badge>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              {behaviorMetrics.investmentConsistency.description}
            </p>
          </div>
          
          {/* Spending Discipline */}
          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-green-400" />
                <h3 className="font-medium text-white">Disciplina de Gastos</h3>
              </div>
              <Badge className={`${getGradeBgColor(behaviorMetrics.spendingDiscipline.grade)}`}>
                <span className={getGradeColor(behaviorMetrics.spendingDiscipline.grade)}>
                  {behaviorMetrics.spendingDiscipline.grade}
                </span>
              </Badge>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              {behaviorMetrics.spendingDiscipline.description}
            </p>
          </div>
          
          {/* Financial Resilience */}
          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <h3 className="font-medium text-white">Resiliência Financeira</h3>
              </div>
              <Badge className={`${getGradeBgColor(behaviorMetrics.financialResilience.grade)}`}>
                <span className={getGradeColor(behaviorMetrics.financialResilience.grade)}>
                  {behaviorMetrics.financialResilience.grade}
                </span>
              </Badge>
            </div>
            <p className="text-sm text-gray-400 mb-3">
              {behaviorMetrics.financialResilience.description}
            </p>
          </div>
          
          {/* Diversification Score */}
          <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-700/50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-white">Pontuação de Diversificação</h3>
              <span className="text-blue-400 font-medium">{behaviorMetrics.diversification.score}/100</span>
            </div>
            <SafeProgress 
              value={behaviorMetrics.diversification.score} 
              className="h-2 mb-2"
              indicatorClassName={
                behaviorMetrics.diversification.score > 70 ? "bg-green-500" :
                behaviorMetrics.diversification.score > 50 ? "bg-blue-500" :
                behaviorMetrics.diversification.score > 30 ? "bg-yellow-500" : "bg-red-500"
              }
            />
            <p className="text-sm text-gray-400">
              {behaviorMetrics.diversification.score > 70 ? "Excelente diversificação de ativos" :
               behaviorMetrics.diversification.score > 50 ? "Boa diversificação, com oportunidades de melhoria" :
               behaviorMetrics.diversification.score > 30 ? "Diversificação limitada, considere expandir" : 
               "Diversificação insuficiente, alto risco de concentração"}
            </p>
          </div>
          
          {/* Behavioral Insights */}
          <div className="p-4 border rounded-lg bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/20">
            <h3 className="font-medium text-purple-400 mb-2">Insights Comportamentais</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                <span>Você tende a manter investimentos por longo prazo, o que é positivo para sua estratégia.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                <span>Há indícios de aversão à perda em momentos de volatilidade do mercado.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mt-1.5"></div>
                <span>Sua disciplina de investimento regular supera 80% dos investidores.</span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Get real data function for withSafeData HOC
const getRealBehaviorData = (props: BehavioralFinanceModuleProps) => {
  // Here we would extract real data from the RaioX context
  // For now just return null as a placeholder
  return null;
};

// Get synthetic data function for withSafeData HOC
const getSyntheticBehaviorData = (props: BehavioralFinanceModuleProps) => {
  // Return synthetic data
  return {
    // Synthetic data structure would go here
    isSynthetic: true
  };
};

// Create the safe module using the HOC
const BehavioralFinanceModule = withSafeData(
  BehavioralFinanceModuleBase,
  getRealBehaviorData,
  getSyntheticBehaviorData
);

export default BehavioralFinanceModule;

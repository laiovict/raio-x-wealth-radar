
import React from 'react';
import { Badge } from "@/components/ui/badge";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { useRaioX } from "@/context/RaioXContext";
import { calculateFinancialBehaviorMetrics } from "@/utils/financialMetricsUtils";

interface FinancialBehaviorSectionProps {
  useSyntheticData?: boolean;
}

const FinancialBehaviorSection = ({ useSyntheticData = false }: FinancialBehaviorSectionProps) => {
  const { 
    data, 
    portfolioSummary, 
    dividendHistory, 
    hasOpenFinanceData,
    openFinanceInsights 
  } = useRaioX();

  // Calculate financial behavior metrics
  const financialBehaviorData = calculateFinancialBehaviorMetrics(
    portfolioSummary,
    dividendHistory,
    portfolioSummary?.fixed_income_value,
    hasOpenFinanceData && openFinanceInsights?.monthlyExpenses
      ? openFinanceInsights.monthlyExpenses
      : undefined,
    useSyntheticData // Pass the synthetic data flag
  );

  return (
    <div className="space-y-4">
      <h4 className="text-base font-medium text-white">
        Seu Comportamento Financeiro
        <TypeSafeDataSourceTag source={financialBehaviorData.dataSource} />
      </h4>
      
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm font-medium text-white">
            Recorrência de Investimentos
            <TypeSafeDataSourceTag source={financialBehaviorData.investmentConsistency.dataSource} />
          </div>
          <div className="text-xs text-gray-400">{financialBehaviorData.investmentConsistency.description}</div>
        </div>
        <Badge className="bg-green-600 hover:bg-green-700">{financialBehaviorData.investmentConsistency.grade}</Badge>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm font-medium text-white">
            Disciplina de Gastos
            <TypeSafeDataSourceTag source={financialBehaviorData.spendingDiscipline.dataSource} />
          </div>
          <div className="text-xs text-gray-400">{financialBehaviorData.spendingDiscipline.description}</div>
        </div>
        <Badge className="bg-yellow-600 hover:bg-yellow-700">{financialBehaviorData.spendingDiscipline.grade}</Badge>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm font-medium text-white">
            Resiliência Financeira
            <TypeSafeDataSourceTag source={financialBehaviorData.financialResilience.dataSource} />
          </div>
          <div className="text-xs text-gray-400">{financialBehaviorData.financialResilience.description}</div>
        </div>
        <Badge className="bg-green-600 hover:bg-green-700">{financialBehaviorData.financialResilience.grade}</Badge>
      </div>

      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm font-medium text-white">
            Score de Diversificação
            <TypeSafeDataSourceTag source={financialBehaviorData.diversification.dataSource} />
          </div>
          <div className="text-xs text-gray-400">
            {financialBehaviorData.diversification.score > 75 
              ? "Excelente diversificação entre classes de ativos" 
              : financialBehaviorData.diversification.score > 50 
                ? "Boa diversificação, mas pode melhorar" 
                : "Diversificação limitada, considere expandir classes de ativos"}
          </div>
        </div>
        <Badge className={`${
          financialBehaviorData.diversification.score > 75 
            ? "bg-green-600 hover:bg-green-700" 
            : financialBehaviorData.diversification.score > 50 
              ? "bg-yellow-600 hover:bg-yellow-700" 
              : "bg-red-600 hover:bg-red-700"
        }`}>
          {financialBehaviorData.diversification.score}/100
        </Badge>
      </div>
    </div>
  );
};

export default FinancialBehaviorSection;

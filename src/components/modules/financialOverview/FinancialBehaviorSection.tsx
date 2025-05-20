
import React from 'react';
import { Badge } from "@/components/ui/badge";
import DataSourceTag from './DataSourceTag';

const FinancialBehaviorSection = () => {
  // Financial behavior data - this is all synthetic
  const financialBehaviorData = {
    investmentConsistency: {
      grade: "A+",
      description: "Investiu consistentemente nos últimos 24 meses",
      dataSource: 'synthetic' as const
    },
    spendingDiscipline: {
      grade: "B",
      description: "Excedeu o orçamento em 18% em 3 dos últimos 6 meses",
      dataSource: 'synthetic' as const
    },
    financialResilience: {
      grade: "A",
      description: "Reserva de emergência cobre 8 meses de despesas",
      dataSource: 'synthetic' as const
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-base font-medium text-white">
        Seu Comportamento Financeiro
        <DataSourceTag dataSource="synthetic" />
      </h4>
      
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm font-medium text-white">
            Recorrência de Investimentos
            <DataSourceTag dataSource={financialBehaviorData.investmentConsistency.dataSource} />
          </div>
          <div className="text-xs text-gray-400">{financialBehaviorData.investmentConsistency.description}</div>
        </div>
        <Badge className="bg-green-600 hover:bg-green-700">{financialBehaviorData.investmentConsistency.grade}</Badge>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm font-medium text-white">
            Disciplina de Gastos
            <DataSourceTag dataSource={financialBehaviorData.spendingDiscipline.dataSource} />
          </div>
          <div className="text-xs text-gray-400">{financialBehaviorData.spendingDiscipline.description}</div>
        </div>
        <Badge className="bg-yellow-600 hover:bg-yellow-700">{financialBehaviorData.spendingDiscipline.grade}</Badge>
      </div>
      
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
        <div>
          <div className="text-sm font-medium text-white">
            Resiliência Financeira
            <DataSourceTag dataSource={financialBehaviorData.financialResilience.dataSource} />
          </div>
          <div className="text-xs text-gray-400">{financialBehaviorData.financialResilience.description}</div>
        </div>
        <Badge className="bg-green-600 hover:bg-green-700">{financialBehaviorData.financialResilience.grade}</Badge>
      </div>
    </div>
  );
};

export default FinancialBehaviorSection;

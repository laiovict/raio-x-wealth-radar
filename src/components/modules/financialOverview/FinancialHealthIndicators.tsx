
import React from 'react';
import { formatCurrency } from "@/utils/raioXUtils";
import { ArrowUp } from "lucide-react";
import DataSourceTag from './DataSourceTag';
import { ensureNumber } from '@/utils/typeConversionHelpers';

interface FinancialHealthIndicatorsProps {
  finData: any;
  getPortfolioSummary: () => any;
}

const FinancialHealthIndicators = ({ finData, getPortfolioSummary }: FinancialHealthIndicatorsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Taxa de Poupança
          <DataSourceTag dataSource="synthetic" />
        </div>
        <div className="text-xl font-bold text-white">{finData.savingsRate}%</div>
        <div className="flex items-center text-xs text-green-400 mt-1">
          <ArrowUp className="h-3 w-3 mr-1" />
          <span>
            {finData.savingsRateTrend || "+2.0%"} vs. média
            <DataSourceTag dataSource="synthetic" />
          </span>
        </div>
      </div>
      <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/40 to-purple-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Liquidez Imediata
          <DataSourceTag dataSource={getPortfolioSummary()?.dataSource} />
        </div>
        <div className="text-xl font-bold text-white">{formatCurrency(finData.liquidAssets)}</div>
        <div className="flex items-center text-xs text-amber-400 mt-1">
          <span>
            Cobertura de {(ensureNumber(finData.liquidAssets) / ensureNumber(finData.monthlyExpenses)).toFixed(1)} meses
            <DataSourceTag dataSource="synthetic" />
          </span>
        </div>
      </div>
      <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-900/40 to-indigo-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Fluxo Líquido Mensal
          <DataSourceTag dataSource="synthetic" />
        </div>
        <div className="text-xl font-bold text-white">
          {formatCurrency(ensureNumber(finData.monthlyIncome) - ensureNumber(finData.monthlyExpenses))}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          <span>
            Receita: {formatCurrency(finData.monthlyIncome)}
            <DataSourceTag dataSource="synthetic" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthIndicators;

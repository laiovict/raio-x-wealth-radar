
import React from 'react';
import { formatCurrency } from "@/utils/raioXUtils";
import { ArrowUp } from "lucide-react";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';
import { ensureNumber } from '@/utils/typeConversionHelpers';
import { calculateSavingsRate } from '@/utils/financialMetricsUtils';

interface FinancialHealthIndicatorsProps {
  finData: any;
  getPortfolioSummary: () => any;
}

const FinancialHealthIndicators = ({ finData, getPortfolioSummary }: FinancialHealthIndicatorsProps) => {
  // Get portfolio summary and calculate savings rate
  const portfolioSummary = getPortfolioSummary();
  const savingsRateData = calculateSavingsRate(
    portfolioSummary?.total_portfolio_value,
    finData.monthlyExpenses ? finData.monthlyExpenses * 12 : undefined
  );

  // Calculate liquid assets from portfolio summary
  const liquidAssets = ensureNumber(portfolioSummary?.fixed_income_value) + 
                      (ensureNumber(portfolioSummary?.investment_fund_value) * 0.7);
                      
  // Calculate monthly net flow
  const monthlyIncome = ensureNumber(finData.monthlyIncome);
  const monthlyExpenses = ensureNumber(finData.monthlyExpenses);
  const monthlyNetFlow = monthlyIncome - monthlyExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Taxa de Poupança
          <TypeSafeDataSourceTag source={savingsRateData.dataSource} />
        </div>
        <div className="text-xl font-bold text-white">{savingsRateData.rate}%</div>
        <div className="flex items-center text-xs text-green-400 mt-1">
          <ArrowUp className="h-3 w-3 mr-1" />
          <span>
            {savingsRateData.trend} vs. média
            <TypeSafeDataSourceTag source={savingsRateData.dataSource} />
          </span>
        </div>
      </div>
      <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/40 to-purple-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Liquidez Imediata
          <TypeSafeDataSourceTag source={portfolioSummary?.dataSource || 'synthetic'} />
        </div>
        <div className="text-xl font-bold text-white">{formatCurrency(liquidAssets.toString())}</div>
        <div className="flex items-center text-xs text-amber-400 mt-1">
          <span>
            Cobertura de {(liquidAssets / (monthlyExpenses || liquidAssets * 0.05)).toFixed(1)} meses
            <TypeSafeDataSourceTag source={portfolioSummary?.dataSource || 'synthetic'} />
          </span>
        </div>
      </div>
      <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-900/40 to-indigo-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Fluxo Líquido Mensal
          <TypeSafeDataSourceTag source={finData.dataSource || 'synthetic'} />
        </div>
        <div className="text-xl font-bold text-white">
          {formatCurrency(monthlyNetFlow.toString())}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          <span>
            Receita: {formatCurrency(monthlyIncome.toString())}
            <TypeSafeDataSourceTag source={finData.dataSource || 'synthetic'} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthIndicators;


import React from 'react';
import { formatCurrency } from "@/utils/raioXUtils";
import DataSourceTag from './DataSourceTag';

interface InvestmentStatsGridProps {
  finData: any;
  getPortfolioSummary: () => any;
  data: any;
}

const InvestmentStatsGrid = ({ finData, getPortfolioSummary, data }: InvestmentStatsGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/40 to-purple-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Total Investido
          <DataSourceTag dataSource={getPortfolioSummary()?.dataSource} />
        </div>
        <div className="text-xl font-bold text-white">{formatCurrency(finData.totalAssets)}</div>
      </div>
      <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-blue-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Retorno Acumulado
          <DataSourceTag dataSource={data.profitability?.dataSource} />
        </div>
        <div className="text-xl font-bold text-white">
          {data.profitability ? `${data.profitability.ytd?.toFixed(2)}%` : "+12.3%"}
        </div>
      </div>
      <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/40 to-green-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Dividendos Anuais
          <DataSourceTag dataSource="synthetic" />
        </div>
        <div className="text-xl font-bold text-white">{formatCurrency(finData.monthlyIncome * 0.15 * 12)}</div>
      </div>
    </div>
  );
};

export default InvestmentStatsGrid;

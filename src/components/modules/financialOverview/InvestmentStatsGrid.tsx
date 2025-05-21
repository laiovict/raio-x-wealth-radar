
import React from 'react';
import { formatCurrency } from "@/utils/raioXUtils";
import DataSourceTag from './DataSourceTag';
import { cssClasses } from '@/utils/style-themes';

interface InvestmentStatsGridProps {
  finData: any;
  getPortfolioSummary: () => any;
  data: any;
}

const InvestmentStatsGrid = ({ finData, getPortfolioSummary, data }: InvestmentStatsGridProps) => {
  return (
    <div className={cssClasses.statGrid}>
      <div className="reinvent-stat-card bg-gradient-to-br from-purple-900/30 to-purple-800/10">
        <div className="text-sm text-gray-400 mb-1">
          Total Investido
          <DataSourceTag dataSource={getPortfolioSummary()?.dataSource} />
        </div>
        <div className="text-xl font-bold text-white">{formatCurrency(finData.totalAssets)}</div>
      </div>
      <div className="reinvent-stat-card bg-gradient-to-br from-blue-900/30 to-blue-800/10">
        <div className="text-sm text-gray-400 mb-1">
          Retorno Acumulado
          <DataSourceTag dataSource={data.profitability?.dataSource} />
        </div>
        <div className="text-xl font-bold text-white">
          {data.profitability ? `${data.profitability.ytd?.toFixed(2)}%` : "+12.3%"}
        </div>
      </div>
      <div className="reinvent-stat-card bg-gradient-to-br from-green-900/30 to-green-800/10">
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

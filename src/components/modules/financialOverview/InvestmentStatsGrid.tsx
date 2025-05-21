
import React from 'react';
import { formatCurrency } from "@/utils/raioXUtils";
import DataSourceTag from './DataSourceTag'; // Assuming this handles 'supabase' | 'synthetic'
// import { cssClasses } from '@/utils/style-themes'; // Not used in the provided snippet

interface InvestmentStatsGridProps {
  finData: any; // This is FinancialSummary, now potentially with annualDividendsThisYear
  getPortfolioSummary: () => any; // This returns PortfolioSummary
  data: any; // This is RaioXData
}

const InvestmentStatsGrid = ({ finData, getPortfolioSummary, data }: InvestmentStatsGridProps) => {
  const portfolioSummary = getPortfolioSummary();
  const annualDividendsDataSource = finData?.annualDividendsThisYear > 0 && (data.dividendHistory && data.dividendHistory.length > 0) ? 'supabase' : 'synthetic';
  const annualDividendsValue = finData?.annualDividendsThisYear > 0 ? finData.annualDividendsThisYear : (finData?.monthlyIncome || 0) * 0.15 * 12; // Fallback to old calculation if new one is zero or not present

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="reinvent-stat-card bg-gradient-to-br from-purple-900/30 to-purple-800/10 p-5 rounded-lg">
        <div className="text-sm text-gray-400 mb-2 flex items-center justify-between">
          <span>Total Investido</span>
          <DataSourceTag dataSource={portfolioSummary?.dataSource || 'synthetic'} />
        </div>
        <div className="text-2xl font-bold text-white">{formatCurrency(finData?.totalAssets || portfolioSummary?.total_portfolio_value || 0)}</div>
      </div>
      <div className="reinvent-stat-card bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-5 rounded-lg">
        <div className="text-sm text-gray-400 mb-2 flex items-center justify-between">
          <span>Retorno Acumulado</span>
          <DataSourceTag dataSource={data.profitability?.dataSource || 'synthetic'} />
        </div>
        <div className="text-2xl font-bold text-white">
          {data.profitability?.ytd ? `${data.profitability.ytd?.toFixed(2)}%` : "+12.3%"}
        </div>
      </div>
      <div className="reinvent-stat-card bg-gradient-to-br from-green-900/30 to-green-800/10 p-5 rounded-lg">
        <div className="text-sm text-gray-400 mb-2 flex items-center justify-between">
          <span>Dividendos Anuais</span>
          <DataSourceTag dataSource={annualDividendsDataSource} />
        </div>
        <div className="text-2xl font-bold text-white">
          {formatCurrency(annualDividendsValue)}
        </div>
      </div>
    </div>
  );
};

export default InvestmentStatsGrid;


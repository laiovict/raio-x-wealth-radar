
import React from 'react';
import { formatCurrency } from "@/utils/raioXUtils";
import DataSourceTag from './DataSourceTag';

interface AssetsLiabilitiesGridProps {
  finData: any;
  getPortfolioSummary: () => any;
}

const AssetsLiabilitiesGrid = ({ finData, getPortfolioSummary }: AssetsLiabilitiesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="stat-card bg-gradient-to-br from-blue-900/30 to-blue-800/10">
        <div className="flex items-center justify-between mb-2">
          <div className="stat-label">Total de Ativos</div>
          <DataSourceTag dataSource={getPortfolioSummary()?.dataSource} />
        </div>
        <div className="stat-value">{formatCurrency(finData.totalAssets)}</div>
        <div className="stat-trend-up">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          +8.3% desde último trimestre
        </div>
      </div>
      
      <div className="stat-card bg-gradient-to-br from-red-900/30 to-red-800/10">
        <div className="flex items-center justify-between mb-2">
          <div className="stat-label">Total de Passivos</div>
          <DataSourceTag dataSource="synthetic" />
        </div>
        <div className="stat-value">{formatCurrency(finData.totalLiabilities)}</div>
        <div className="stat-trend-down">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
          </svg>
          -3.5% desde último trimestre
        </div>
      </div>
    </div>
  );
};

export default AssetsLiabilitiesGrid;

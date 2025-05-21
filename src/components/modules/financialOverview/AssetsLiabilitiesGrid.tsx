
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
      <div className="p-6 rounded-lg bg-gradient-to-br from-blue-900/40 to-blue-800/20">
        <div className="text-sm text-gray-400 mb-2 flex items-center justify-between">
          Total de Ativos
          <DataSourceTag dataSource={getPortfolioSummary()?.dataSource} />
        </div>
        <div className="text-2xl font-bold text-white">{formatCurrency(finData.totalAssets)}</div>
      </div>
      <div className="p-6 rounded-lg bg-gradient-to-br from-red-900/40 to-red-800/20">
        <div className="text-sm text-gray-400 mb-2 flex items-center justify-between">
          Total de Passivos
          <DataSourceTag dataSource="synthetic" />
        </div>
        <div className="text-2xl font-bold text-white">{formatCurrency(finData.totalLiabilities)}</div>
      </div>
    </div>
  );
};

export default AssetsLiabilitiesGrid;

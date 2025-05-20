
import React from 'react';
import { formatCurrency } from "@/utils/raioXUtils";
import DataSourceTag from './DataSourceTag';

interface AssetsLiabilitiesGridProps {
  finData: any;
  getPortfolioSummary: () => any;
}

const AssetsLiabilitiesGrid = ({ finData, getPortfolioSummary }: AssetsLiabilitiesGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-blue-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Total de Ativos
          <DataSourceTag dataSource={getPortfolioSummary()?.dataSource} />
        </div>
        <div className="text-xl font-bold text-white">{formatCurrency(finData.totalAssets)}</div>
      </div>
      <div className="p-4 rounded-lg bg-gradient-to-br from-red-900/40 to-red-800/20">
        <div className="text-sm text-gray-400 mb-1">
          Total de Passivos
          <DataSourceTag dataSource="synthetic" />
        </div>
        <div className="text-xl font-bold text-white">{formatCurrency(finData.totalLiabilities)}</div>
      </div>
    </div>
  );
};

export default AssetsLiabilitiesGrid;


import React from 'react';
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/raioXUtils";
import DataSourceTag from './DataSourceTag';

interface MainFinancialOverviewProps {
  finData: any;
  hasOpenFinance: boolean;
  getPortfolioSummary: () => any;
}

const MainFinancialOverview = ({ finData, hasOpenFinance, getPortfolioSummary }: MainFinancialOverviewProps) => {
  return (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-white/5">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div>
          <h2 className="text-lg text-blue-400">Seu panorama financeiro</h2>
          <p className="text-sm text-gray-400">Uma visão completa da sua jornada financeira</p>
        </div>
        <div className="text-sm text-right">
          <div className="text-gray-400">Data do diagnóstico</div>
          <div className="text-white font-medium">19 de Maio, 2025</div>
          {hasOpenFinance && (
            <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500/30 mt-1">
              OpenFinance
            </Badge>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-lg p-4">
          <div className="text-sm text-gray-400">
            Patrimônio total
            <DataSourceTag dataSource={getPortfolioSummary()?.dataSource} />
          </div>
          <div className="text-2xl font-bold text-white">{formatCurrency(finData.netWorth)}</div>
          <div className="text-sm text-green-400">
            +12,5% desde o último trimestre
            <DataSourceTag dataSource="synthetic" />
          </div>
        </div>
        
        <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4">
          <div className="text-sm text-gray-400">
            Score de diversificação
            <DataSourceTag dataSource="synthetic" />
          </div>
          <div className="text-2xl font-bold text-white">73/100</div>
          <div className="text-sm text-blue-400">
            Melhor que 65% dos investidores
            <DataSourceTag dataSource="synthetic" />
          </div>
        </div>
        
        <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
          <div className="text-sm text-gray-400">
            Potencial de otimização
            <DataSourceTag dataSource="synthetic" />
          </div>
          <div className="text-2xl font-bold text-white">+R$ 37.500/ano</div>
          <div className="text-sm text-gray-400">
            Com ajustes na alocação atual
            <DataSourceTag dataSource="synthetic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFinancialOverview;

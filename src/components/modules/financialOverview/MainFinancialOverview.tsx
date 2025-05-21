
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/raioXUtils";
import DataSourceTag from './DataSourceTag';
import { cssClasses } from '@/utils/style-themes';

interface MainFinancialOverviewProps {
  finData: any;
  hasOpenFinance: boolean;
  getPortfolioSummary: () => any;
}

const MainFinancialOverview = ({ finData, hasOpenFinance, getPortfolioSummary }: MainFinancialOverviewProps) => {
  return (
    <div className="reinvent-card p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
        <div>
          <h2 className="reinvent-title text-xl md:text-2xl">Seu panorama financeiro</h2>
          <p className="reinvent-subtitle">Uma visão completa da sua jornada financeira</p>
        </div>
        <div className="text-sm text-right mt-2 md:mt-0">
          <div className="text-gray-400">Data do diagnóstico</div>
          <div className="text-white font-medium">19 de Maio, 2025</div>
          {hasOpenFinance && (
            <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-500/30 mt-1">
              OpenFinance
            </Badge>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="reinvent-stat-card">
          <div className="text-sm text-gray-400 mb-1 flex items-center justify-between">
            <span>Patrimônio total</span>
            <DataSourceTag dataSource={getPortfolioSummary()?.dataSource} />
          </div>
          <div className="text-xl md:text-2xl font-bold text-white">{formatCurrency(finData.netWorth)}</div>
          <div className="text-sm text-green-400 mt-1">
            +12,5% desde o último trimestre
          </div>
        </div>
        
        <div className="reinvent-stat-card">
          <div className="text-sm text-gray-400 mb-1 flex items-center justify-between">
            <span>Score de diversificação</span>
            <DataSourceTag dataSource="synthetic" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-white">73/100</div>
          <div className="text-sm text-blue-400 mt-1">
            Melhor que 65% dos investidores
          </div>
        </div>
        
        <div className="reinvent-stat-card">
          <div className="text-sm text-gray-400 mb-1 flex items-center justify-between">
            <span>Potencial de otimização</span>
            <DataSourceTag dataSource="synthetic" />
          </div>
          <div className="text-xl md:text-2xl font-bold text-white">{formatCurrency(37500)}/ano</div>
          <div className="text-sm text-gray-400 mt-1">
            Com ajustes na alocação atual
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFinancialOverview;

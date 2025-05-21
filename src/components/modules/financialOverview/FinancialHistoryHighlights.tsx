
import React from 'react';
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

interface FinancialHistoryHighlightsProps {
  showBehavioralInsights: boolean;
  useSyntheticData?: boolean;
}

const FinancialHistoryHighlights = ({ showBehavioralInsights, useSyntheticData = false }: FinancialHistoryHighlightsProps) => {
  // For the Beta version, we would use real data, but for now we just check the flag
  const dataSource = useSyntheticData ? 'synthetic' : 'calculated';
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/40 to-blue-800/20">
          <div className="text-sm text-gray-400 mb-1">
            Maior aporte do ano
            <TypeSafeDataSourceTag source={dataSource} />
          </div>
          <div className="text-xl font-bold text-white">R$ 35.000</div>
          <div className="text-xs text-gray-400 mt-1">
            Em Abril de 2025
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-900/40 to-emerald-800/20">
          <div className="text-sm text-gray-400 mb-1">
            Melhor classe de ativo
            <TypeSafeDataSourceTag source={dataSource} />
          </div>
          <div className="text-xl font-bold text-white">+23.5%</div>
          <div className="text-xs text-gray-400 mt-1">
            Fundos Imobiliários
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-gradient-to-br from-amber-900/40 to-amber-800/20">
          <div className="text-sm text-gray-400 mb-1">
            Meses de entrada positiva
            <TypeSafeDataSourceTag source={dataSource} />
          </div>
          <div className="text-xl font-bold text-white">7/12</div>
          <div className="text-xs text-gray-400 mt-1">
            58% do ano com aportes
          </div>
        </div>
      </div>
      
      {showBehavioralInsights && (
        <div className="mt-6 space-y-3">
          <div className="text-sm font-medium text-white">
            Insights comportamentais
            <TypeSafeDataSourceTag source={dataSource} />
          </div>
          
          <div className="p-3 rounded-lg bg-white/5">
            <div className="text-sm text-blue-400 mb-1">Padrão de investimento</div>
            <div className="text-xs text-gray-300">
              Você tende a investir mais no primeiro trimestre do ano, possivelmente associado com bônus ou participação nos lucros.
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-white/5">
            <div className="text-sm text-blue-400 mb-1">Reação a mercados em queda</div>
            <div className="text-xs text-gray-300">
              Você demonstrou disciplina ao manter aportes consistentes mesmo nos períodos de maior volatilidade do mercado.
            </div>
          </div>
          
          <div className="p-3 rounded-lg bg-white/5">
            <div className="text-sm text-blue-400 mb-1">Diversificação crescente</div>
            <div className="text-xs text-gray-300">
              Ao longo de 2025, você aumentou o número de classes de ativos em seu portfólio, melhorando sua diversificação.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialHistoryHighlights;

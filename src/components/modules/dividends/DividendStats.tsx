
import React from 'react';
import { CoinsIcon, TrendingUp, Calendar } from 'lucide-react';
import { formatCurrency } from './dividendUtils';

interface DividendStatsProps {
  totalDividends: number;
  averageMonthlyDividends: number;
  dividendCount: number;
}

const DividendStats: React.FC<DividendStatsProps> = ({
  totalDividends,
  averageMonthlyDividends,
  dividendCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/10 rounded-lg p-4 border border-green-500/20">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-400 text-sm">Total Recebido (12 meses)</h3>
          <CoinsIcon className="h-5 w-5 text-green-400" />
        </div>
        <p className="text-2xl font-semibold text-green-400 mt-2">{formatCurrency(totalDividends || 0)}</p>
      </div>
      
      <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/10 rounded-lg p-4 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-400 text-sm">Média Mensal</h3>
          <TrendingUp className="h-5 w-5 text-blue-400" />
        </div>
        <p className="text-2xl font-semibold text-blue-400 mt-2">{formatCurrency(averageMonthlyDividends || 0)}</p>
      </div>
      
      <div className="bg-gradient-to-br from-purple-900/20 to-indigo-900/10 rounded-lg p-4 border border-purple-500/20">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-400 text-sm">Eventos de Pagamento</h3>
          <Calendar className="h-5 w-5 text-purple-400" />
        </div>
        <p className="text-2xl font-semibold text-purple-400 mt-2">{dividendCount || 0}</p>
      </div>
    </div>
  );
};

export default DividendStats;

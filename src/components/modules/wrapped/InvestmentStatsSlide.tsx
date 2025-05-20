
import React from 'react';
import { TrendingUp } from 'lucide-react';
import CarouselSlideBase from './CarouselSlideBase';
import { formatCurrency, formatDate } from '@/utils/formattingUtils';
import { DataSourceType } from '@/types/raioXTypes';

interface WrappedData {
  biggestContribution?: {
    amount: number;
    date: string;
  };
  longestPositiveStreak?: number;
  largestDrawdown?: {
    percentage: number;
    period: string;
  };
  mostProfitableAsset?: {
    name: string;
    return: number;
  };
  summary?: string;
  dataSource?: DataSourceType | 'supabase' | 'synthetic';
}

interface InvestmentStatsSlideProps {
  wrappedData: WrappedData;
}

const InvestmentStatsSlide: React.FC<InvestmentStatsSlideProps> = ({ wrappedData }) => {
  return (
    <CarouselSlideBase>
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 p-6 rounded-lg h-[400px] border border-emerald-700/30 flex flex-col">
        <div className="mb-4 p-2 bg-emerald-700/40 rounded-full self-center">
          <TrendingUp className="w-8 h-8 text-emerald-300" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-4 text-center">
          Seus Números de Destaque
          {wrappedData.dataSource === 'supabase' && (
            <span className="ml-1 text-green-400">
              <span className="inline-block h-3 w-3">✓</span>
            </span>
          )}
        </h3>
        
        <div className="flex-1 flex flex-col justify-center space-y-6">
          <div className="flex items-center justify-between bg-emerald-900/40 p-3 rounded-lg border border-emerald-700/30">
            <div>
              <p className="text-sm text-emerald-300">Maior Aporte</p>
              <span className="text-2xl font-bold">
                {formatCurrency(wrappedData.biggestContribution?.amount.toString() || "0")}
              </span>
            </div>
            <p className="text-emerald-200 text-sm">
              {formatDate(wrappedData.biggestContribution?.date || new Date().toISOString())}
            </p>
          </div>
          
          <div className="flex items-center justify-between bg-emerald-900/40 p-3 rounded-lg border border-emerald-700/30">
            <div>
              <p className="text-sm text-emerald-300">Sequência Positiva</p>
              <p className="text-lg font-bold text-white">{wrappedData.longestPositiveStreak || '7'}</p>
            </div>
            <p className="text-emerald-200 text-sm">Top 15% dos investidores</p>
          </div>
          
          <div className="flex items-center justify-between bg-emerald-900/40 p-3 rounded-lg border border-emerald-700/30">
            <div>
              <p className="text-sm text-emerald-300">Ativo Mais Rentável</p>
              <p className="text-xl font-bold text-white">{wrappedData.mostProfitableAsset?.name}</p>
            </div>
            <p className="text-green-400 text-sm">+{wrappedData.mostProfitableAsset?.return}% 🚀</p>
          </div>
        </div>
      </div>
    </CarouselSlideBase>
  );
};

export default InvestmentStatsSlide;

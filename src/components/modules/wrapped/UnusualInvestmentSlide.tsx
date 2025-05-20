
import React from 'react';
import { Gift, Wallet } from 'lucide-react';
import CarouselSlideBase from './CarouselSlideBase';
import { DataSourceType } from '@/types/raioXTypes';

interface UnusualInvestmentSlideProps {
  mostUnusualInvestment: string;
  investmentStyle: string;
  dataSource: DataSourceType | 'supabase' | 'synthetic';
}

const UnusualInvestmentSlide: React.FC<UnusualInvestmentSlideProps> = ({ 
  mostUnusualInvestment, 
  investmentStyle, 
  dataSource 
}) => {
  return (
    <CarouselSlideBase>
      <div className="bg-gradient-to-br from-amber-900 to-orange-900 p-6 rounded-lg h-[400px] border border-amber-700/30 flex flex-col">
        <div className="mb-4 p-2 bg-amber-700/40 rounded-full self-center">
          <Gift className="w-8 h-8 text-amber-300" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 text-center">Algo Diferente em sua Carteira</h3>
        <p className="text-center text-amber-200 mb-6">Sua escolha mais inusitada deste ano:</p>
        
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-amber-700/40 flex items-center justify-center mb-4 border-4 border-amber-600/40">
            <Wallet className="w-12 h-12 text-amber-300" />
          </div>
          <h4 className="text-xl font-bold text-white mb-2">
            {mostUnusualInvestment}
            {dataSource === 'supabase' && (
              <span className="ml-1 text-green-400">
                <span className="inline-block h-3 w-3">✓</span>
              </span>
            )}
          </h4>
          <p className="text-amber-200 text-center">Apenas 2% dos investidores fizeram esta escolha!</p>
          
          <div className="mt-8 w-full bg-amber-800/40 p-4 rounded-lg border border-amber-700/30">
            <p className="text-center text-white">Seu estilo de investimento:</p>
            <p className="text-center text-amber-200 italic mt-1">
              "{investmentStyle}"
              {dataSource === 'supabase' && (
                <span className="ml-1 text-green-400">
                  <span className="inline-block h-3 w-3">✓</span>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </CarouselSlideBase>
  );
};

export default UnusualInvestmentSlide;


import React from 'react';
import { Users } from 'lucide-react';
import CarouselSlideBase from './CarouselSlideBase';
import DataSourceIndicator from '@/components/modules/financialPlan/DataSourceIndicator';
import { DataSourceType } from '@/types/raioXTypes';

interface InsightSlideProps {
  personalizedInsight: string;
  personalityType: string;
  dataSource: DataSourceType | 'supabase' | 'synthetic';
}

const InsightSlide: React.FC<InsightSlideProps> = ({ 
  personalizedInsight,
  personalityType,
  dataSource
}) => {
  return (
    <CarouselSlideBase>
      <div className="bg-gradient-to-br from-indigo-900 to-violet-900 p-6 rounded-lg h-[400px] flex flex-col items-center justify-center border border-indigo-700/30">
        <div className="mb-4 p-3 bg-indigo-700/40 rounded-full">
          <Users className="w-10 h-10 text-indigo-300" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Você é Excepcional!</h3>
        <p className="text-center text-lg text-blue-100 mb-6">
          {personalizedInsight}
          {dataSource === 'supabase' && (
            <span className="ml-1 text-green-400">
              <span className="inline-block h-3 w-3">✓</span>
            </span>
          )}
        </p>
        <div className="bg-indigo-700/40 w-full p-4 rounded-lg border border-indigo-600/30">
          <p className="text-center text-indigo-200">Sua Personalidade Financeira:</p>
          <p className="text-center text-xl font-bold text-white mt-1">
            {personalityType}
            {dataSource === 'supabase' && (
              <span className="ml-1 text-green-400">
                <span className="inline-block h-3 w-3">✓</span>
              </span>
            )}
          </p>
        </div>
      </div>
    </CarouselSlideBase>
  );
};

export default InsightSlide;

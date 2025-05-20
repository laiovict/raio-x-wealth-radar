
import React from 'react';
import { Star } from 'lucide-react';
import CarouselSlideBase from './CarouselSlideBase';

const CoverSlide = () => {
  return (
    <CarouselSlideBase>
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-lg text-center h-[400px] flex flex-col items-center justify-center border border-purple-700/30 shadow-lg">
        <div className="mb-4 p-3 bg-purple-700/40 rounded-full">
          <Star className="w-12 h-12 text-amber-300" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Sua Jornada Financeira em 2025</h2>
        <p className="text-indigo-200 mb-6">Descubra como seus investimentos contaram sua história neste ano</p>
        <div className="flex items-center justify-center space-x-1 text-xs text-indigo-300">
          <span className="block w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span>Deslize para explorar</span>
        </div>
      </div>
    </CarouselSlideBase>
  );
};

export default CoverSlide;

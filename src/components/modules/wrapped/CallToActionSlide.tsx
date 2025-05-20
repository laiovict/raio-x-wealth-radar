
import React from 'react';
import { PiggyBank, Users, Award } from 'lucide-react';
import CarouselSlideBase from './CarouselSlideBase';

const CallToActionSlide = () => {
  return (
    <CarouselSlideBase>
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-lg text-center h-[400px] flex flex-col items-center justify-center border border-blue-500/20">
        <div className="mb-4 p-3 bg-blue-700/30 rounded-full">
          <PiggyBank className="w-12 h-12 text-blue-300" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Compartilhe Sua Jornada!</h2>
        <p className="text-blue-200 mb-6">Mostre para seus amigos como foi sua trajetória financeira em 2025</p>
        
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          <button className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-3 rounded-full text-sm flex items-center justify-center">
            <Users className="w-4 h-4 mr-1" /> Compartilhar
          </button>
          <button className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-3 rounded-full text-sm flex items-center justify-center">
            <Award className="w-4 h-4 mr-1" /> Salvar
          </button>
        </div>
        
        <p className="mt-8 text-xs text-blue-300/70">
          Sua retrospectiva financeira exclusiva fornecida pela Reinvent
        </p>
      </div>
    </CarouselSlideBase>
  );
};

export default CallToActionSlide;

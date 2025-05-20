
import React from 'react';
import { TrendingUp } from 'lucide-react';

const EmptyRecommendations: React.FC = () => {
  return (
    <div className="text-center py-8">
      <TrendingUp className="w-12 h-12 mx-auto text-gray-400 mb-3" />
      <p className="text-gray-500">Nenhuma recomendação disponível no momento.</p>
      <p className="text-gray-400 text-sm mt-1">Recomendações serão geradas com base na análise do seu portfólio.</p>
    </div>
  );
};

export default EmptyRecommendations;

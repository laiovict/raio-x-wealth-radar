
import React from 'react';
import { CoinsIcon } from 'lucide-react';

const EmptyDividendState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <CoinsIcon className="w-16 h-16 text-gray-500 mb-4" />
      <p className="text-gray-400 max-w-md">
        Dados de dividendos não disponíveis para este cliente.
      </p>
    </div>
  );
};

export default EmptyDividendState;

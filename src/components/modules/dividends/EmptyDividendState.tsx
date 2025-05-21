
import React from 'react';
import { CoinsIcon, ArrowRight } from 'lucide-react';

interface EmptyDividendStateProps {
  isDataLoading?: boolean;
}

const EmptyDividendState: React.FC<EmptyDividendStateProps> = ({ isDataLoading = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <CoinsIcon className="w-16 h-16 text-gray-500 mb-4" />
      {isDataLoading ? (
        <p className="text-gray-400 max-w-md">
          Carregando dados de dividendos...
        </p>
      ) : (
        <>
          <p className="text-gray-400 max-w-md mb-4">
            Dados de dividendos não disponíveis para este cliente.
          </p>
          <p className="text-gray-500 text-sm max-w-md">
            Os dados de dividendos são obtidos automaticamente da tabela de histórico de proventos.
          </p>
          <div className="mt-4 flex items-center text-blue-400 text-sm hover:text-blue-300 transition-colors cursor-pointer">
            <span>Contate o suporte para mais informações</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </>
      )}
    </div>
  );
};

export default EmptyDividendState;

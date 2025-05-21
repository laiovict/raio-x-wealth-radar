
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react";
import TypeSafeDataSourceTag from '@/components/common/TypeSafeDataSourceTag';

interface RecommendedStepsProps {
  useSyntheticData?: boolean;
}

const RecommendedSteps = ({ useSyntheticData = false }: RecommendedStepsProps) => {
  // For real data in the Beta version, we'd use a different source, but for now we just check the flag
  const dataSource = useSyntheticData ? 'synthetic' : 'calculated';
  
  return (
    <div className="mt-8">
      <div className="mb-4">
        <div className="text-lg font-medium text-white">
          Próximos passos recomendados
          <TypeSafeDataSourceTag source={dataSource} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-900/10">
          <div className="flex items-start mb-3">
            <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5" />
            <div>
              <div className="font-medium text-white mb-1">Aumentar reserva de emergência</div>
              <div className="text-xs text-gray-400 mb-3">Adicione mais R$ 10.000 à sua reserva para atingir o ideal de 6 meses de despesas.</div>
              <Button variant="outline" size="sm" className="text-xs border-emerald-500/20 hover:bg-emerald-900/30 hover:text-white">
                Ver detalhes <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-900/10">
          <div className="flex items-start mb-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 mr-3 mt-0.5" />
            <div>
              <div className="font-medium text-white mb-1">Diversificar investimentos</div>
              <div className="text-xs text-gray-400 mb-3">Sua exposição à renda variável está abaixo do ideal para seu perfil e objetivos.</div>
              <Button variant="outline" size="sm" className="text-xs border-amber-500/20 hover:bg-amber-900/30 hover:text-white">
                Ver sugestões <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-blue-500/20 bg-blue-900/10">
          <div className="flex items-start mb-3">
            <TrendingUp className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
            <div>
              <div className="font-medium text-white mb-1">Rever alocação internacional</div>
              <div className="text-xs text-gray-400 mb-3">Considere aumentar sua exposição a ativos internacionais para melhor diversificação.</div>
              <Button variant="outline" size="sm" className="text-xs border-blue-500/20 hover:bg-blue-900/30 hover:text-white">
                Explorar opções <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedSteps;
